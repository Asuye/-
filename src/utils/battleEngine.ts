import type { BattleState, BattleLogEntry, BattleUnit, Enemy } from '@/types/battle';
import type { CalculatedStats, SpecialEffect } from '@/types/ability';
import { getEffectIcon, getEffectName } from './abilityEngine';

export function createBattleState(playerStats: CalculatedStats, enemy: Enemy): BattleState {
  return {
    turn: 1,
    phase: 'player',
    player: {
      name: '冒险家',
      maxHp: playerStats.hp,
      currentHp: playerStats.hp,
      attack: playerStats.attack,
      defense: playerStats.defense,
      speed: playerStats.speed,
      critRate: playerStats.critRate,
      critDamage: playerStats.critDamage
    },
    enemy: {
      name: enemy.name,
      maxHp: enemy.maxHp,
      currentHp: enemy.maxHp,
      attack: enemy.attack,
      defense: enemy.defense,
      speed: enemy.speed,
      critRate: enemy.critRate,
      critDamage: enemy.critDamage
    },
    logs: [
      {
        turn: 1,
        actor: '系统',
        action: '战斗开始',
        effect: `你遇到了 ${enemy.name}！`
      }
    ]
  };
}

export function calculateDamage(attacker: BattleUnit, defender: BattleUnit, specialEffects: SpecialEffect[]): { damage: number; isCritical: boolean; effects: string[] } {
  let damage = attacker.attack;
  const effects: string[] = [];
  
  // 处理破甲效果
  const pierceEffects = specialEffects.filter(e => e.type === 'pierce');
  if (pierceEffects.length > 0) {
    const totalPierce = pierceEffects.reduce((sum, e) => sum + e.value, 0);
    const defenseReduction = defender.defense * (totalPierce / 100);
    defender.defense = Math.max(0, defender.defense - defenseReduction);
    effects.push(`破甲效果：降低防御 ${Math.round(defenseReduction)}`);
  }
  
  // 计算防御
  const defenseReduction = Math.max(0, defender.defense * 0.5);
  damage = Math.max(1, damage - defenseReduction);
  
  // 计算暴击
  const isCritical = Math.random() * 100 < attacker.critRate;
  if (isCritical) {
    damage = Math.round(damage * (1 + attacker.critDamage / 100));
    effects.push('暴击！');
  }
  
  return { damage, isCritical, effects };
}

export function processPlayerTurn(state: BattleState, specialEffects: SpecialEffect[]): BattleState {
  const newState = { ...state };
  const logs: BattleLogEntry[] = [...state.logs];
  
  // 处理连击效果
  const doubleStrike = specialEffects.find(e => e.type === 'double_strike');
  const tripleStrike = specialEffects.find(e => e.type === 'triple_strike');
  
  let strikes = 1;
  if (tripleStrike && Math.random() * 100 < (tripleStrike.chance || 0)) {
    strikes = 3;
    logs.push({
      turn: state.turn,
      actor: '冒险家',
      action: '三连击',
      specialEffect: '触发三连击效果！'
    });
  } else if (doubleStrike && Math.random() * 100 < (doubleStrike.chance || 0)) {
    strikes = 2;
    logs.push({
      turn: state.turn,
      actor: '冒险家',
      action: '双重打击',
      specialEffect: '触发双重打击效果！'
    });
  }
  
  for (let i = 0; i < strikes; i++) {
    const { damage, isCritical, effects } = calculateDamage(
      newState.player,
      newState.enemy,
      specialEffects
    );
    
    newState.enemy.currentHp = Math.max(0, newState.enemy.currentHp - damage);
    
    logs.push({
      turn: state.turn,
      actor: '冒险家',
      action: i > 0 ? `攻击 ${i+1}` : '攻击',
      target: newState.enemy.name,
      damage,
      effect: effects.join(', ')
    });
    
    // 处理吸血效果
    const lifestealEffects = specialEffects.filter(e => e.type === 'lifesteal');
    if (lifestealEffects.length > 0 && damage > 0) {
      const totalLifesteal = lifestealEffects.reduce((sum, e) => sum + e.value, 0);
      const healAmount = Math.round(damage * (totalLifesteal / 100));
      newState.player.currentHp = Math.min(newState.player.maxHp, newState.player.currentHp + healAmount);
      
      logs.push({
        turn: state.turn,
        actor: '冒险家',
        action: '吸血',
        heal: healAmount
      });
    }
    
    // 处理中毒效果
    const poisonEffects = specialEffects.filter(e => e.type === 'poison');
    if (poisonEffects.length > 0) {
      const totalPoison = poisonEffects.reduce((sum, e) => sum + e.value, 0);
      const poisonDamage = Math.round(newState.enemy.maxHp * (totalPoison / 100));
      newState.enemy.currentHp = Math.max(0, newState.enemy.currentHp - poisonDamage);
      
      logs.push({
        turn: state.turn,
        actor: '冒险家',
        action: '中毒',
        target: newState.enemy.name,
        damage: poisonDamage,
        effect: '中毒伤害'
      });
    }
    
    // 处理灼烧效果
    const burnEffects = specialEffects.filter(e => e.type === 'burn');
    if (burnEffects.length > 0) {
      const totalBurn = burnEffects.reduce((sum, e) => sum + e.value, 0);
      const burnDamage = Math.round(newState.enemy.maxHp * (totalBurn / 100));
      newState.enemy.currentHp = Math.max(0, newState.enemy.currentHp - burnDamage);
      
      logs.push({
        turn: state.turn,
        actor: '冒险家',
        action: '灼烧',
        target: newState.enemy.name,
        damage: burnDamage,
        effect: '灼烧伤害'
      });
    }
  }
  
  // 检查胜利条件
  if (newState.enemy.currentHp <= 0) {
    logs.push({
      turn: state.turn,
      actor: '系统',
      action: '战斗胜利',
      effect: '你击败了敌人！'
    });
    newState.phase = 'victory';
  } else {
    newState.phase = 'enemy';
  }
  
  return {
    ...newState,
    logs
  };
}

export function processEnemyTurn(state: BattleState, specialEffects: SpecialEffect[]): BattleState {
  const newState = { ...state };
  const logs: BattleLogEntry[] = [...state.logs];
  
  // 处理闪避效果
  const dodgeEffects = specialEffects.filter(e => e.type === 'dodge');
  const totalDodge = dodgeEffects.reduce((sum, e) => sum + (e.chance || 0), 0);
  
  if (Math.random() * 100 < totalDodge) {
    logs.push({
      turn: state.turn,
      actor: '冒险家',
      action: '闪避',
      effect: '成功闪避了敌人的攻击！'
    });
  } else {
    // 敌人攻击
    const damage = Math.max(1, newState.enemy.attack - newState.player.defense * 0.3);
    newState.player.currentHp = Math.max(0, newState.player.currentHp - damage);
    
    logs.push({
      turn: state.turn,
      actor: newState.enemy.name,
      action: '攻击',
      target: '冒险家',
      damage
    });
    
    // 处理反击效果
    const counterEffects = specialEffects.filter(e => e.type === 'counter');
    if (counterEffects.length > 0) {
      const totalCounter = counterEffects.reduce((sum, e) => sum + (e.chance || 0), 0);
      if (Math.random() * 100 < totalCounter) {
        const counterDamage = Math.round(damage * 0.5);
        newState.enemy.currentHp = Math.max(0, newState.enemy.currentHp - counterDamage);
        
        logs.push({
          turn: state.turn,
          actor: '冒险家',
          action: '反击',
          target: newState.enemy.name,
          damage: counterDamage,
          effect: '触发反击效果！'
        });
      }
    }
    
    // 处理荆棘效果
    const thornsEffects = specialEffects.filter(e => e.type === 'thorns');
    if (thornsEffects.length > 0) {
      const totalThorns = thornsEffects.reduce((sum, e) => sum + e.value, 0);
      const thornsDamage = Math.round(damage * (totalThorns / 100));
      newState.enemy.currentHp = Math.max(0, newState.enemy.currentHp - thornsDamage);
      
      logs.push({
        turn: state.turn,
        actor: '冒险家',
        action: '荆棘',
        target: newState.enemy.name,
        damage: thornsDamage,
        effect: '荆棘反伤'
      });
    }
  }
  
  // 检查失败条件
  if (newState.player.currentHp <= 0) {
    logs.push({
      turn: state.turn,
      actor: '系统',
      action: '战斗失败',
      effect: '你被击败了...'
    });
    newState.phase = 'defeat';
  } else {
    newState.turn += 1;
    newState.phase = 'player';
  }
  
  return {
    ...newState,
    logs
  };
}

export function processBattle(state: BattleState, specialEffects: SpecialEffect[]): BattleState {
  if (state.phase === 'player') {
    return processPlayerTurn(state, specialEffects);
  } else if (state.phase === 'enemy') {
    return processEnemyTurn(state, specialEffects);
  }
  return state;
}
