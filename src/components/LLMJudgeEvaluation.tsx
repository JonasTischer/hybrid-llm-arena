import React from 'react'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

interface LLMJudgeEvaluationProps {
  judgeVote: { winner: string; reason: string } | null
}

export const LLMJudgeEvaluation: React.FC<LLMJudgeEvaluationProps> = ({ judgeVote }) => {
  if (!judgeVote) return null

  return (
    <Card>
      <CardHeader>
        <CardTitle>LLM Judge Evaluation</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="bg-muted p-4 rounded-md">
          <p className="font-medium">Winner: API {judgeVote.winner === 'api1' ? '1' : '2'}</p>
          <p className="mt-2 text-sm text-muted-foreground">{judgeVote.reason}</p>
        </div>
      </CardContent>
    </Card>
  )
}