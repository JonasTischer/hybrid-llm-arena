'use client';

import React from 'react';
import { TrendingDown, TrendingUp } from 'lucide-react';
import {
  Area,
  AreaChart,
  CartesianGrid,
  XAxis,
  YAxis,
  ResponsiveContainer,
} from 'recharts';

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  ChartConfig,
  ChartContainer,
  ChartLegend,
  ChartLegendContent,
  ChartTooltip,
  ChartTooltipContent,
} from '@/components/ui/chart';

type LLMJudgeData = {
  timestamp: string;
  api1: number;
  api2: number;
};

interface LLMJudgeChartProps {
  data: LLMJudgeData[];
}

const chartConfig = {
  api1: {
    label: 'API 1',
    color: 'hsl(var(--chart-1))',
    icon: TrendingDown,
  },
  api2: {
    label: 'API 2',
    color: 'hsl(var(--chart-2))',
    icon: TrendingUp,
  },
} satisfies ChartConfig;

export const LLMJudgeChart: React.FC<LLMJudgeChartProps> = ({
  data,
}) => {
  if (data.length === 0) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>LLM Judge Vote History</CardTitle>
          <CardDescription>No votes recorded yet</CardDescription>
        </CardHeader>
      </Card>
    );
  }

  const latestData = data[data.length - 1];
  const previousData =
    data.length > 1 ? data[data.length - 2] : { api1: 0, api2: 0 };
  const totalVotes = latestData.api1 + latestData.api2;
  const previousTotalVotes = previousData.api1 + previousData.api2;
  const voteChange =
    previousTotalVotes > 0
      ? ((totalVotes - previousTotalVotes) / previousTotalVotes) * 100
      : 0;

  return (
    <Card>
      <CardHeader>
        <CardTitle>LLM Judge Vote History</CardTitle>
        <CardDescription>
          Showing cumulative LLM judge votes over time
        </CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig}>
          <ResponsiveContainer width="100%" height={300}>
            <AreaChart
              data={data}
              margin={{
                top: 10,
                right: 30,
                left: 0,
                bottom: 0,
              }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis
                dataKey="timestamp"
                tickFormatter={(value) =>
                  new Date(value).toLocaleTimeString()
                }
              />
              <YAxis />
              <ChartTooltip
                content={<ChartTooltipContent indicator="line" />}
              />
              <Area
                type="monotone"
                dataKey="api1"
                stackId="1"
                stroke="hsl(var(--chart-1))"
                fill="hsl(var(--chart-1))"
              />
              <Area
                type="monotone"
                dataKey="api2"
                stackId="1"
                stroke="hsl(var(--chart-2))"
                fill="hsl(var(--chart-2))"
              />
              <ChartLegend content={<ChartLegendContent />} />
            </AreaChart>
          </ResponsiveContainer>
        </ChartContainer>
      </CardContent>
      <CardFooter>
        <div className="flex w-full items-start gap-2 text-sm">
          <div className="grid gap-2">
            <div className="flex items-center gap-2 font-medium leading-none">
              {voteChange !== 0 ? (
                <>
                  {voteChange > 0 ? 'Trending up' : 'Trending down'}{' '}
                  by {Math.abs(voteChange).toFixed(1)}% this session
                  {voteChange > 0 ? (
                    <TrendingUp className="h-4 w-4" />
                  ) : (
                    <TrendingDown className="h-4 w-4" />
                  )}
                </>
              ) : (
                'No trend data available yet'
              )}
            </div>
            <div className="flex items-center gap-2 leading-none text-muted-foreground">
              Total votes: {totalVotes}
            </div>
          </div>
        </div>
      </CardFooter>
    </Card>
  );
};
