
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { SimilarityMetric } from '@/utils/ml/playerMLService';
import { ComparisonAttributeChart } from './ComparisonAttributeChart';

interface AttributeComparisonCardProps {
  comparisonData: SimilarityMetric[];
  isLoading: boolean;
  professionalName: string;
}

export const AttributeComparisonCard: React.FC<AttributeComparisonCardProps> = ({
  comparisonData,
  isLoading,
  professionalName
}) => {
  return (
    <Card>
      <CardHeader className="pb-2">
        <CardTitle>Attribute Comparison</CardTitle>
        <CardDescription>
          How specific attributes compare to {professionalName || "professionals"}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <ComparisonAttributeChart 
          comparisonData={comparisonData}
          isLoading={isLoading}
          professionalName={professionalName}
        />
      </CardContent>
    </Card>
  );
};
