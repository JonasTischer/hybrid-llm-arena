import React from 'react';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';

interface MetricsComparisonProps {
  metrics: Array<{
    name: string;
    api1Score: number;
    api2Score: number;
  }>;
}

const getColorForScore = (score: number): string => {
  if (score >= 66) return 'hsl(var(--success))';
  if (score >= 33) return 'hsl(var(--warning))';
  return 'hsl(var(--destructive))';
};

export const MetricsComparison: React.FC<MetricsComparisonProps> = ({
  metrics,
}) => {
  const totalApi1Score =
    metrics.reduce((sum, metric) => sum + metric.api1Score, 0) /
    metrics.length;
  const totalApi2Score =
    metrics.reduce((sum, metric) => sum + metric.api2Score, 0) /
    metrics.length;

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-2xl font-bold">
          Metrics Comparison
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-3 gap-4">
          <div className="font-medium">Metric</div>
          <div className="font-medium text-center">API 1</div>
          <div className="font-medium text-center">API 2</div>
          {metrics.map((metric) => (
            <React.Fragment key={metric.name}>
              <div className="flex items-center">{metric.name}</div>
              <div>
                <Progress
                  value={metric.api1Score}
                  className="h-2"
                  indicatorColor={getColorForScore(metric.api1Score)}
                />
                <div className="text-xs text-center mt-1">
                  {metric.api1Score.toFixed(1)}
                </div>
              </div>
              <div>
                <Progress
                  value={metric.api2Score}
                  className="h-2"
                  indicatorColor={getColorForScore(metric.api2Score)}
                />
                <div className="text-xs text-center mt-1">
                  {metric.api2Score.toFixed(1)}
                </div>
              </div>
            </React.Fragment>
          ))}
          <div className="flex items-center font-medium">
            Total Score
          </div>
          <div>
            <Progress
              value={totalApi1Score}
              className="h-2"
              indicatorColor={getColorForScore(totalApi1Score)}
            />
            <div className="text-base font-bold text-center mt-1">
              {totalApi1Score.toFixed(1)}
            </div>
          </div>
          <div>
            <Progress
              value={totalApi2Score}
              className="h-2"
              indicatorColor={getColorForScore(totalApi2Score)}
            />
            <div className="text-base font-bold text-center mt-1">
              {totalApi2Score.toFixed(1)}
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
