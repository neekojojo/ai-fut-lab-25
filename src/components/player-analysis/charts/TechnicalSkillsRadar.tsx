
import React from 'react';
import { Radar, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, ResponsiveContainer } from 'recharts';

interface RadarData {
  attribute: string;
  value: number;
}

interface TechnicalSkillsRadarProps {
  data: RadarData[];
}

const TechnicalSkillsRadar: React.FC<TechnicalSkillsRadarProps> = ({ data }) => {
  return (
    <ResponsiveContainer width="100%" height="100%">
      <RadarChart cx="50%" cy="50%" outerRadius="80%" data={data}>
        <PolarGrid />
        <PolarAngleAxis dataKey="attribute" />
        <PolarRadiusAxis angle={90} domain={[0, 100]} />
        <Radar
          name="المهارات"
          dataKey="value"
          stroke="#6366F1"
          fill="#6366F1"
          fillOpacity={0.6}
        />
      </RadarChart>
    </ResponsiveContainer>
  );
};

export default TechnicalSkillsRadar;
