import React from 'react';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { PromptResult } from '@/types';

interface PromptHistoryProps {
  promptResults: PromptResult[];
}

export const PromptHistory: React.FC<PromptHistoryProps> = ({
  promptResults,
}) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Prompt History</CardTitle>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Prompt</TableHead>
              <TableHead>Human Vote</TableHead>
              <TableHead>LLM Judge Vote</TableHead>
              <TableHead>API 1 Score</TableHead>
              <TableHead>API 2 Score</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {promptResults.map((result, index) => (
              <TableRow key={index}>
                <TableCell>{result.prompt}</TableCell>
                <TableCell>
                  {result.humanVote === 'api1' ? 'API 1' : 'API 2'}
                </TableCell>
                <TableCell>
                  {result.judgeVote.winner === 'api1'
                    ? 'API 1'
                    : 'API 2'}
                </TableCell>
                <TableCell>
                  {result.judgeVote.metrics[0].api1Score}
                </TableCell>
                <TableCell>
                  {result.judgeVote.metrics[0].api2Score}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
};
