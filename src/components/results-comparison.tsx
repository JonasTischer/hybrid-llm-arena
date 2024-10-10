'use client';

import React, { useState, useEffect } from 'react';
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from '@/components/ui/tabs';
import { HumanVoteChart } from '@/components/HumanVoteChart';
import { LLMJudgeChart } from '@/components/LLMJudgeChart';
import { MetricsComparison } from '@/components/MetricsComparison';
import { LLMJudgeEvaluation } from '@/components/LLMJudgeEvaluation';
import { PromptHistory } from '@/components/PromptHistory';
import { Metrics, PromptResult } from '@/types';

type Props = {
  responses: { api1: string; api2: string };
  userVotes: { api1: number; api2: number };
  promptResults: PromptResult[];
};

export const ResultsComparison: React.FC<Props> = ({
  responses,
  userVotes,
  promptResults,
}) => {
  const [metrics, setMetrics] = useState<Metrics[]>([]);
  const [judgeVote, setJudgeVote] = useState<{
    winner: 'api1' | 'api2';
    reason: string;
  } | null>(null);
  const [humanVoteHistory, setHumanVoteHistory] = useState<
    { timestamp: string; api1: number; api2: number }[]
  >([]);
  const [llmVoteHistory, setLLMVoteHistory] = useState<
    { timestamp: string; api1: number; api2: number }[]
  >([]);

  useEffect(() => {
    // Simulating metrics and judge vote (replace with actual logic)
    setMetrics([
      {
        name: 'Text Clarity',
        api1Score: Math.random() * 100,
        api2Score: Math.random() * 100,
      },
      {
        name: 'Response Length',
        api1Score: Math.random() * 100,
        api2Score: Math.random() * 100,
      },
      {
        name: 'Relevance (LLM Judge)',
        api1Score: Math.random() * 100,
        api2Score: Math.random() * 100,
      },
      {
        name: 'Factual Accuracy (LLM Judge)',
        api1Score: Math.random() * 100,
        api2Score: Math.random() * 100,
      },
    ]);

    setJudgeVote({
      winner: 'api1',
      reason:
        'API 1 provided a more concise and relevant answer while maintaining high factual accuracy.',
    });

    // Update vote history
    const timestamp = new Date().toISOString();
    setHumanVoteHistory((prev) => [
      ...prev,
      { timestamp, api1: userVotes.api1, api2: userVotes.api2 },
    ]);
    setLLMVoteHistory((prev) => [
      ...prev,
      {
        timestamp,
        api1: Math.floor(Math.random() * 10),
        api2: Math.floor(Math.random() * 10),
      },
    ]);
  }, [responses, userVotes]);

  return (
    <Tabs defaultValue="comparison" className="w-full">
      <TabsList className="grid w-full grid-cols-3">
        <TabsTrigger value="comparison">
          Detailed Comparison
        </TabsTrigger>
        <TabsTrigger value="history">Prompt History</TabsTrigger>
        <TabsTrigger value="leaderboard">Leaderboard</TabsTrigger>
      </TabsList>
      <TabsContent value="leaderboard">
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <HumanVoteChart data={humanVoteHistory} />
            <LLMJudgeChart data={llmVoteHistory} />
          </div>
        </div>
      </TabsContent>
      <TabsContent value="comparison">
        <div className="space-y-6">
          <MetricsComparison metrics={metrics} />
          <LLMJudgeEvaluation judgeVote={judgeVote} />
        </div>
      </TabsContent>
      <TabsContent value="history">
        <PromptHistory promptResults={promptResults} />
      </TabsContent>
    </Tabs>
  );
};
