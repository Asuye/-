export interface StageChoice {
  id: string;
  text: string;
  nextNodeId: string;
  requiredStat?: { stat: string; value: number };
}

export interface StageNode {
  id: string;
  type: 'story' | 'battle' | 'choice' | 'reward';
  text: string;
  speaker?: string;
  choices?: StageChoice[];
  enemyId?: string;
  rewards?: { gold: number; exp: number; cardIds?: string[] };
  nextNodeId?: string;
}

export interface Stage {
  id: string;
  name: string;
  description: string;
  requiredLevel: number;
  nodes: StageNode[];
  startNodeId: string;
  rewards: {
    firstClear: { gold: number; gems: number; cardId?: string };
  };
}
