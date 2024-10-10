import React from 'react'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"

interface VotingSummaryProps {
  userVotes: { api1: number; api2: number }
}

export const VotingSummary: React.FC<VotingSummaryProps> = ({ userVotes }) => {
  const totalVotes = userVotes.api1 + userVotes.api2
  const api1WinRate = totalVotes > 0 ? (userVotes.api1 / totalVotes) * 100 : 0
  const api2WinRate = totalVotes > 0 ? (userVotes.api2 / totalVotes) * 100 : 0

  return (
    <Card>
      <CardHeader>
        <CardTitle>Voting Summary</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div>
            <div className="flex justify-between mb-1">
              <span className="text-sm font-medium">API 1</span>
              <span className="text-sm font-medium">{api1WinRate.toFixed(1)}%</span>
            </div>
            <Progress value={api1WinRate} className="w-full h-2" />
          </div>
          <div>
            <div className="flex justify-between mb-1">
              <span className="text-sm font-medium">API 2</span>
              <span className="text-sm font-medium">{api2WinRate.toFixed(1)}%</span>
            </div>
            <Progress value={api2WinRate} className="w-full h-2" />
          </div>
        </div>
        <div className="mt-4 text-sm text-muted-foreground">
          <p>Total Votes: {totalVotes}</p>
          <p>API 1 Votes: {userVotes.api1}</p>
          <p>API 2 Votes: {userVotes.api2}</p>
        </div>
      </CardContent>
    </Card>
  )
}