import { Card, CardContent } from "@/components/ui/card";
import { Star } from "lucide-react";

const LawyerReviews = () => {
  return (
    <div>
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-foreground">التقييمات</h1>
        <p className="text-muted-foreground text-sm mt-1">تقييمات العملاء لخدماتك</p>
      </div>

      <Card>
        <CardContent className="flex flex-col items-center justify-center py-16 text-muted-foreground">
          <Star size={48} className="mb-4 opacity-30" />
          <p className="text-lg font-medium">لا توجد تقييمات حالياً</p>
          <p className="text-sm mt-1">ستظهر هنا التقييمات بعد إتمام الاستشارات</p>
        </CardContent>
      </Card>
    </div>
  );
};

export default LawyerReviews;
