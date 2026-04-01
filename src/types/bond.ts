export interface BondRequirement {
  tag: string;
  count: number;
}

export interface BondEffect {
  type: 'stat_boost' | 'skill_enhance' | 'special';
  target: 'self' | 'team';
  value: number;
  isPercentage: boolean;
  stat?: string;
  description?: string;
}

export interface Bond {
  id: string;
  name: string;
  description: string;
  requiredTags: BondRequirement[];
  effects: BondEffect[];
  icon: string;
}

export interface ActiveBond extends Bond {
  sourceCards: string[];
}
