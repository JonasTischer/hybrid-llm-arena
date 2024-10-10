import React from 'react';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardFooter,
} from '@/components/ui/card';

interface ResponseCardProps {
  apiName: string;
  response: string;
  onVote: () => void;
  isSelected: boolean;
  isDisabled: boolean;
}

export const ResponseCard: React.FC<ResponseCardProps> = ({
  apiName,
  response,
  onVote,
  isSelected,
  isDisabled
}) => {
  return (
    <Card className={`h-full flex flex-col ${isSelected ? 'border-green-500 border-2' : ''}`}>
      <CardHeader>
        <CardTitle>{apiName} Response</CardTitle>
      </CardHeader>
      <CardContent className="flex-grow">
        <p className="text-sm">{response}</p>
      </CardContent>
      <CardFooter>
        <Button onClick={onVote} className="w-full" disabled={isDisabled}>
          Vote for {apiName}
        </Button>
      </CardFooter>
    </Card>
  );
};