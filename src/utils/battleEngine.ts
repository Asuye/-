import type { BattleUnit, BattleState, BattleLogEntry } from '@/types/battle';
import type { Enemy } from '@/types/battle';
import type { Card, Stats } from '@/types/card';
import type { ActiveBond } from '@/types/bond';
import { applyEffects } from './bondCalculator';

export function createBattleUnitFromCards(cards: Card[], bonds: ActiveBond[]): BattleUnit {
  if (cards.length === 0) {
    return {
      name: '玩家',
      maxHp: 100,
      currentHp: 100,
      attack: 10,
      defense: 10,
      speed: 10,
      skills: [{ name: '普通攻击', cooldown: 1, currentCooldown: 0 }]
    };
  }
  
  const totalStats: Stats = {
    attack: 0,
    defense: 0,
    hp: 0,
    speed: 0
  };
  
  for (const card of cards) {
    totalStats.attack += card.baseStats.attack;
    totalStats.defense += card.baseStats.defense;
    totalStats.hp += card.baseStats.hp;
    totalStats.speed += card.baseStats.speed;
  }
  
  const avgStats: Stats = {
    attack: Math.floor(totalStats.attack / cards.length),
    defense: Math.floor(totalStats.defense / cards.length),
    hp: Math.floor(totalStats.hp / cards.length),
    speed: Math.floor(totalStats.speed / cards.length)
  };
  
  const effects = bonds.flatMap(b => b.effects);
  const boostedStats = applyEffects(avgStats, effects);
  
  const skills = cards.map(card => ({
    name: card.skill.name,
    cooldown: card.skill.cooldown,
    currentCooldown: 0
  }));
  
  return {
    name: '玩家',
    maxHp: boostedStats.hp,
    currentHp: boostedStats.hp,
    attack: boostedStats.attack,
    defense: boostedStats.defense,
    speed: boostedStats.speed,
    skills
  };
}

export function createBattleUnitFromEnemy(enemy: Enemy): BattleUnit {
  return {
    name: enemy.name,
    maxHp: enemy.stats.hp,
    currentHp: enemy.stats.hp,
    attack: enemy.stats.attack,
    defense: enemy.stats.defense,
    speed: enemy.stats.speed,
    skills: enemy.skills.map(s => ({
      name: s.name,
      cooldown: s.cooldown,
      currentCooldown: 0
    }))
  };
}

export function calculateDamage(attacker: BattleUnit, defender: BattleUnit, multiplier: number = 1): number {
  const baseDamage = attacker.attack * multiplier;
  const defenseReduction = defender.defense * 0.5;
  const finalDamage = Math.max(1, Math.floor(baseDamage - defenseReduction));
  return finalDamage;
}

export function executePlayerAttack(state: BattleState): BattleState {
  const newLogs: BattleLogEntry[] = [...state.logs];
  const newPlayer = { ...state.player };
  const newEnemy = { ...state.enemy };
  
  const damage = calculateDamage(newPlayer, newEnemy);
  newEnemy.currentHp = Math.max(0, newEnemy.currentHp - damage);
  
  newLogs.push({
    turn: state.turn,
    actor: newPlayer.name,
    action: '攻击',
    target: newEnemy.name,
    damage
  });
  
  const newPhase = newEnemy.currentHp <= 0 ? 'victory' : 'enemy';
  
  return {
    ...state,
    player: newPlayer,
    enemy: newEnemy,
    logs: newLogs,
    phase: newPhase
  };
}

export function executePlayerSkill(state: BattleState, skillIndex: number): BattleState {
  const newLogs: BattleLogEntry[] = [...state.logs];
  const newPlayer = { ...state.player, skills: [...state.player.skills] };
  const newEnemy = { ...state.enemy };
  
  const skill = newPlayer.skills[skillIndex];
  if (skill.currentCooldown > 0) {
    return state;
  }
  
  const damage = calculateDamage(newPlayer, newEnemy, 1.5);
  newEnemy.currentHp = Math.max(0, newEnemy.currentHp - damage);
  skill.currentCooldown = skill.cooldown;
  
  newLogs.push({
    turn: state.turn,
    actor: newPlayer.name,
    action: `使用 ${skill.name}`,
    target: newEnemy.name,
    damage
  });
  
  const newPhase = newEnemy.currentHp <= 0 ? 'victory' : 'enemy';
  
  return {
    ...state,
    player: newPlayer,
    enemy: newEnemy,
    logs: newLogs,
    phase: newPhase
  };
}

export function executeEnemyTurn(state: BattleState): BattleState {
  const newLogs: BattleLogEntry[] = [...state.logs];
  const newPlayer = { ...state.player };
  const newEnemy = { ...state.enemy, skills: [...state.enemy.skills] };
  
  let availableSkills = newEnemy.skills.filter(s => s.currentCooldown === 0);
  const useSkill = availableSkills.length > 0 && Math.random() > 0.3;
  
  let damage: number;
  let actionName: string;
  
  if (useSkill && availableSkills.length > 0) {
    const skill = availableSkills[Math.floor(Math.random() * availableSkills.length)];
    damage = calculateDamage(newEnemy, newPlayer, 1.3);
    actionName = skill.name;
    skill.currentCooldown = skill.cooldown;
  } else {
    damage = calculateDamage(newEnemy, newPlayer);
    actionName = '攻击';
  }
  
  newPlayer.currentHp = Math.max(0, newPlayer.currentHp - damage);
  
  newLogs.push({
    turn: state.turn,
    actor: newEnemy.name,
    action: actionName,
    target: newPlayer.name,
    damage
  });
  
  const newPhase = newPlayer.currentHp <= 0 ? 'defeat' : 'player';
  
  for (const skill of newPlayer.skills) {
    if (skill.currentCooldown > 0) {
      skill.currentCooldown--;
    }
  }
  for (const skill of newEnemy.skills) {
    if (skill.currentCooldown > 0) {
      skill.currentCooldown--;
    }
  }
  
  return {
    ...state,
    turn: state.turn + 1,
    player: newPlayer,
    enemy: newEnemy,
    logs: newLogs,
    phase: newPhase
  };
}

export function initializeBattle(cards: Card[], bonds: ActiveBond[], enemy: Enemy): BattleState {
  return {
    turn: 1,
    phase: 'player',
    player: createBattleUnitFromCards(cards, bonds),
    enemy: createBattleUnitFromEnemy(enemy),
    activeBonds: bonds,
    logs: [{
      turn: 0,
      actor: '系统',
      action: `战斗开始！你遇到了 ${enemy.name}！`
    }]
  };
}
