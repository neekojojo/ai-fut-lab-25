
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ProfessionalPlayer } from '@/utils/ml/playerMLService';
import { Pagination } from "@/components/ui/pagination";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight, Filter } from "lucide-react";
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuCheckboxItem, 
  DropdownMenuTrigger 
} from "@/components/ui/dropdown-menu";

interface SimilarPlayersPanelProps {
  playerComparison: ProfessionalPlayer[];
}

const SimilarPlayersPanel: React.FC<SimilarPlayersPanelProps> = ({ playerComparison }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [positionFilter, setPositionFilter] = useState<string>('all');
  const playersPerPage = 3;

  // تطبيق الفلاتر
  const filteredPlayers = playerComparison.filter(player => {
    if (positionFilter === 'all') return true;
    return player.position === positionFilter;
  });

  // حساب صفحات العرض
  const totalPages = Math.ceil(filteredPlayers.length / playersPerPage);
  const indexOfLastPlayer = currentPage * playersPerPage;
  const indexOfFirstPlayer = indexOfLastPlayer - playersPerPage;
  const currentPlayers = filteredPlayers.slice(indexOfFirstPlayer, indexOfLastPlayer);

  // التنقل بين الصفحات
  const handleNextPage = () => {
    setCurrentPage(prev => Math.min(prev + 1, totalPages));
  };

  const handlePrevPage = () => {
    setCurrentPage(prev => Math.max(prev - 1, 1));
  };

  return (
    <Card className="w-full">
      <CardHeader className="flex flex-row items-center justify-between pb-4">
        <div>
          <CardTitle>لاعبون مشابهون</CardTitle>
          <CardDescription>مقارنة مع لاعبين محترفين ذوي أسلوب لعب مشابه</CardDescription>
        </div>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" size="sm" className="h-8">
              <Filter className="h-4 w-4 mr-2" />
              تصفية
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuCheckboxItem 
              checked={positionFilter === 'all'}
              onCheckedChange={() => setPositionFilter('all')}
            >
              جميع المراكز
            </DropdownMenuCheckboxItem>
            <DropdownMenuCheckboxItem 
              checked={positionFilter === 'forward'}
              onCheckedChange={() => setPositionFilter('forward')}
            >
              الهجوم
            </DropdownMenuCheckboxItem>
            <DropdownMenuCheckboxItem 
              checked={positionFilter === 'midfielder'}
              onCheckedChange={() => setPositionFilter('midfielder')}
            >
              الوسط
            </DropdownMenuCheckboxItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          {currentPlayers.map((player, index) => (
            <div key={index} className="border rounded-lg p-4 space-y-3">
              <div className="flex items-center space-x-3 rtl:space-x-reverse">
                <div className="h-12 w-12 flex-shrink-0 overflow-hidden rounded-full bg-gray-100">
                  <img 
                    src={"/placeholder.svg"} 
                    alt={player.name} 
                    className="h-full w-full object-cover"
                  />
                </div>
                <div>
                  <h3 className="font-semibold">{player.name}</h3>
                  <p className="text-sm text-muted-foreground">{player.team} • {player.position === "forward" ? "مهاجم" : "وسط"}</p>
                </div>
                <div className="ml-auto">
                  <Badge>{player.similarity}% تشابه</Badge>
                </div>
              </div>
              
              <div>
                <h4 className="text-sm font-medium mb-2">أوجه التشابه:</h4>
                <div className="flex flex-wrap gap-2">
                  {player.strengths && player.strengths.map((similarity, i) => (
                    <Badge key={i} variant="outline" className="bg-green-50">
                      {similarity}
                    </Badge>
                  ))}
                </div>
              </div>
              
              <div>
                <h4 className="text-sm font-medium mb-2">ما يمكن تعلمه:</h4>
                <p className="text-sm">التركيز على تحسين نقاط القوة المماثلة</p>
              </div>
              
              {player.nationality && (
                <div className="pt-2">
                  <span className="text-sm text-muted-foreground">
                    {player.nationality} • {player.age} سنة • تقييم: {player.rating}
                  </span>
                </div>
              )}
            </div>
          ))}
          
          {filteredPlayers.length === 0 && (
            <div className="text-center py-8">
              <p className="text-muted-foreground">لا يوجد لاعبين مطابقين للفلتر المحدد</p>
            </div>
          )}
          
          {filteredPlayers.length > 0 && (
            <div className="flex items-center justify-between pt-4">
              <Button 
                variant="outline" 
                size="sm" 
                onClick={handlePrevPage}
                disabled={currentPage === 1}
              >
                <ChevronRight className="h-4 w-4 ml-2 rtl:rotate-180" />
                السابق
              </Button>
              <div className="text-sm text-muted-foreground">
                صفحة {currentPage} من {totalPages}
              </div>
              <Button 
                variant="outline" 
                size="sm" 
                onClick={handleNextPage}
                disabled={currentPage === totalPages}
              >
                التالي
                <ChevronLeft className="h-4 w-4 mr-2 rtl:rotate-180" />
              </Button>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default SimilarPlayersPanel;
