export interface ApiConfig {
  endpoint: string;
  token: string;
}

export interface PromptResult {
  timestamp: Date;
  prompt: string;
  humanVote: 'api1' | 'api2';
  judgeVote: {
    winner: 'api1' | 'api2';
    metrics: Metrics[];
  };
}

export interface Metrics {
  name: string;
  api1Score: number;
  api2Score: number;
}
