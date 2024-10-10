'use client';

import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { ApiConfigComponent } from '@/components/api-config';
import { PromptSelection } from '@/components/prompt-selection';
import { ResponseCard } from '@/components/response-card';
import { ResultsComparison } from '@/components/results-comparison';
import { ApiConfig, PromptResult } from '@/types';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';

export default function Home() {
  const [api1, setApi1] = useState<ApiConfig>({
    endpoint: '',
    token: '',
  });
  const [api2, setApi2] = useState<ApiConfig>({
    endpoint: '',
    token: '',
  });
  const [prompts, setPrompts] = useState<string[]>([]);
  const [currentPrompt, setCurrentPrompt] = useState('');
  const [responses, setResponses] = useState({ api1: '', api2: '' });
  const [votes, setVotes] = useState({ api1: 0, api2: 0 });
  const [promptResults, setPromptResults] = useState<PromptResult[]>(
    []
  );
  const [showConfig, setShowConfig] = useState(false);
  const [showPromptSelection, setShowPromptSelection] =
    useState(false);
  const [currentVote, setCurrentVote] = useState<
    'api1' | 'api2' | null
  >(null);

  const getRandomPrompt = () => {
    const availablePrompts = prompts.filter(
      (prompt) => prompt !== currentPrompt
    );
    if (availablePrompts.length === 0) return currentPrompt;
    const randomIndex = Math.floor(
      Math.random() * availablePrompts.length
    );
    return availablePrompts[randomIndex];
  };

  const handleSendNextPrompt = async () => {
    // Set the next prompt
    setCurrentPrompt(getRandomPrompt());

    // Reset current vote and responses
    setCurrentVote(null);
    setResponses({ api1: '', api2: '' });

    setResponses({
      api1: `API 1 response for: ${currentPrompt}`,
      api2: `API 2 response for: ${currentPrompt}`,
    });
  };

  const handleVote = (api: 'api1' | 'api2') => {
    setVotes((prev) => ({ ...prev, [api]: prev[api] + 1 }));
    setCurrentVote(api);

    // Simulate LLM judge vote and metrics
    const judgeVote = {
      winner: Math.random() > 0.5 ? 'api1' : 'api2',
      reason: 'Simulated reason',
      metrics: [
        {
          name: 'Overall Score',
          api1Score: Math.random() * 100,
          api2Score: Math.random() * 100,
        },
      ],
    };

    // Add result to promptResults
    setPromptResults((prev) => [
      ...prev,
      {
        timestamp: new Date(),
        prompt: currentPrompt,
        humanVote: api,
        judgeVote: {
          winner: judgeVote.winner as 'api1' | 'api2',
          reason: judgeVote.reason,
          metrics: judgeVote.metrics,
        },
      },
    ]);
  };

  return (
    <div className="container mx-auto p-4 space-y-8">
      <Card>
        <CardHeader>
          <CardTitle className="text-3xl font-bold">
            HybridLLM Arena
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Button
            onClick={() => setShowConfig(!showConfig)}
            className="mb-4 mr-2"
          >
            {showConfig ? 'Hide API Config' : 'Show API Config'}
          </Button>
          <Button
            onClick={() =>
              setShowPromptSelection(!showPromptSelection)
            }
            className="mb-4"
          >
            {showPromptSelection
              ? 'Hide Prompt Selection'
              : 'Show Prompt Selection'}
          </Button>
          {showConfig && (
            <div className="grid grid-cols-2 gap-4">
              <ApiConfigComponent
                apiConfig={api1}
                setApiConfig={setApi1}
                apiName="API 1"
              />
              <ApiConfigComponent
                apiConfig={api2}
                setApiConfig={setApi2}
                apiName="API 2"
              />
            </div>
          )}
        </CardContent>
      </Card>

      <Card className={showPromptSelection ? '' : 'hidden'}>
        <CardHeader>
          <CardTitle>Prompt Selection</CardTitle>
        </CardHeader>
        <CardContent>
          <PromptSelection
            prompts={prompts}
            currentPrompt={currentPrompt}
            setPrompts={setPrompts}
            setCurrentPrompt={setCurrentPrompt}
          />
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Current Prompt</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="mb-4">
            {currentPrompt || 'No prompt selected'}
          </p>
          <Button
            onClick={handleSendNextPrompt}
            disabled={
              !currentPrompt ||
              (!!responses.api1 && !!responses.api2 && !currentVote)
            }
          >
            Send next prompt
          </Button>
        </CardContent>
      </Card>

      {responses.api1 && responses.api2 && (
        <div className="grid grid-cols-2 gap-4">
          <ResponseCard
            apiName="API 1"
            response={responses.api1}
            onVote={() => handleVote('api1')}
            isSelected={currentVote === 'api1'}
            isDisabled={currentVote !== null}
          />
          <ResponseCard
            apiName="API 2"
            response={responses.api2}
            onVote={() => handleVote('api2')}
            isSelected={currentVote === 'api2'}
            isDisabled={currentVote !== null}
          />
        </div>
      )}

      {currentVote && (
        <ResultsComparison
          responses={responses}
          userVotes={votes}
          promptResults={promptResults}
        />
      )}
    </div>
  );
}
