import React from 'react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { ApiConfig } from '@/types';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

interface ApiConfigProps {
  apiConfig: ApiConfig;
  setApiConfig: React.Dispatch<React.SetStateAction<ApiConfig>>;
  apiName: string;
}

export const ApiConfigComponent: React.FC<ApiConfigProps> = ({
  apiConfig,
  setApiConfig,
  apiName,
}) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>{apiName} Configuration</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor={`${apiName}-endpoint`} className="text-sm font-medium">
            {apiName} Endpoint
          </Label>
          <Input
            id={`${apiName}-endpoint`}
            value={apiConfig.endpoint}
            onChange={(e) =>
              setApiConfig({ ...apiConfig, endpoint: e.target.value })
            }
            placeholder="https://api.example.com/v1"
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor={`${apiName}-token`} className="text-sm font-medium">
            {apiName} Token
          </Label>
          <Input
            id={`${apiName}-token`}
            type="password"
            value={apiConfig.token}
            onChange={(e) =>
              setApiConfig({ ...apiConfig, token: e.target.value })
            }
            placeholder="Your API token"
          />
        </div>
      </CardContent>
    </Card>
  );
};
