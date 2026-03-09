import { Card, CardContent } from "@/components/ui/card";
import { Calendar } from "lucide-react";

const LawyerAppointments = () => {
  return (
    <div>
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-foreground">المواعيد</h1>
        <p className="text-muted-foreground text-sm mt-1">إدارة مواعيدك القادمة</p>
      </div>

      <Card>
        <CardContent className="flex flex-col items-center justify-center py-16 text-muted-foreground">
          <Calendar size={48} className="mb-4 opacity-30" />
          <p className="text-lg font-medium">لا توجد مواعيد حالياً</p>
          <p className="text-sm mt-1">ستظهر هنا المواعيد عند حجزها من العملاء</p>
        </CardContent>
      </Card>
    </div>
  );
};

export default LawyerAppointments;
