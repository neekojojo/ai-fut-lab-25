
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ArrowRight, FileText } from 'lucide-react';
import { Link } from 'react-router-dom';

interface Analysis {
  id: string;
  date: string;
  score: number;
}

interface RecentAnalysesProps {
  analyses: Analysis[];
}

const RecentAnalyses: React.FC<RecentAnalysesProps> = ({ analyses }) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>التحليلات السابقة</CardTitle>
        <CardDescription>آخر جلسات تحليل تم إجراؤها</CardDescription>
      </CardHeader>
      <CardContent className="space-y-5">
        {analyses.map(analysis => (
          <div key={analysis.id} className="flex items-center justify-between p-3 rounded-md border border-border/50 hover:bg-accent/50 transition-colors">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-md bg-primary/10 flex items-center justify-center">
                <FileText className="h-5 w-5 text-primary" />
              </div>
              <div>
                <p className="font-medium">تقييم أداء</p>
                <p className="text-sm text-muted-foreground">
                  {new Date(analysis.date).toLocaleDateString('ar-SA', {
                    year: 'numeric',
                    month: 'short',
                    day: 'numeric'
                  })}
                </p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <div className="text-center">
                <p className="text-lg font-bold">{analysis.score}</p>
                <p className="text-xs text-muted-foreground">التقييم</p>
              </div>
              <Button size="icon" variant="ghost" asChild>
                <Link to={`/advanced-analysis/${analysis.id}`}>
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </Button>
            </div>
          </div>
        ))}
        
        <Button variant="outline" className="w-full" asChild>
          <Link to="/">
            <span>إجراء تحليل جديد</span>
          </Link>
        </Button>
      </CardContent>
    </Card>
  );
};

export default RecentAnalyses;
