export const PREDICTIVE_FEATURES_TABLE_DATA = [
  {
    Demographic_Feature: 'number of single parents',
    Rank_By_Causal_Strength: '1',
    Rank_By_Random_Forest_Feature_Importance: '1',
    Average_Rank: '1.0',
    Ensemble_Rank: '1'
  },
  {
    Demographic_Feature: 'number of persons in poverty',
    Rank_By_Causal_Strength: '4',
    Rank_By_Random_Forest_Feature_Importance: '2',
    Average_Rank: '3.0',
    Ensemble_Rank: '2'
  },
  {
    Demographic_Feature: 'per capita income',
    Rank_By_Causal_Strength: '3',
    Rank_By_Random_Forest_Feature_Importance: '5',
    Average_Rank: '4.0',
    Ensemble_Rank: '3'
  },
  {
    Demographic_Feature: 'number of persons age 17 and younger',
    Rank_By_Causal_Strength: '6',
    Rank_By_Random_Forest_Feature_Importance: '4',
    Average_Rank: '5.0',
    Ensemble_Rank: '4'
  },
  {
    Demographic_Feature: 'number of persons without high school diploma',
    Rank_By_Causal_Strength: '12',
    Rank_By_Random_Forest_Feature_Importance: '3',
    Average_Rank: '7.5',
    Ensemble_Rank: '5'
  },
  {
    Demographic_Feature: 'number of persons living in group quarters',
    Rank_By_Causal_Strength: '2',
    Rank_By_Random_Forest_Feature_Importance: '18',
    Average_Rank: '10.0',
    Ensemble_Rank: '6'
  },
  {
    Demographic_Feature: 'number of households with crowding',
    Rank_By_Causal_Strength: '5',
    Rank_By_Random_Forest_Feature_Importance: '16',
    Average_Rank: '10.5',
    Ensemble_Rank: '7'
  }
];

export const PREDICTIVE_FEATURES_TABLE_NOTES = [
  {
    Note_Prefix: 'Table 1.',
    Note_Text:
      'Top five features related to child maltreatment based on county-level total maltreatment counts for the state of Texas, 2011-2019. Analysis was performed with two different models; features are ranked according to their influence in each model type. The top five features and rankings are shown for each model; features ranked in the top five for both models are highlighted in yellow.'
  },
  {
    Note_Prefix: '\u1d43',
    Note_Text:
      'Ranking by absolute value of estimated causal strength where 1 indicates the largest causal impact'
  },
  {
    Note_Prefix: '\u1d47',
    Note_Text:
      'Ranking by random forest feature importance where 1 indicates the most important feature'
  }
];
