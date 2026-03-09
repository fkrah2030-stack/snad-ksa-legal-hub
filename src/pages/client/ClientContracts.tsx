import { Card, CardContent } from "@/components/ui/card";
import { FileText } from "lucide-react";

const ClientContracts = () => {
  return (
    <div>
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-foreground">العقود والاتفاقيات</h1>
        <p className="text-muted-foreground text-sm mt-1">عقودك واتفاقياتك القانونية</p>
      </div>

      <Card>
        <CardContent className="flex flex-col items-center justify-center py-16 text-muted-foreground">
          <FileText size={48} className="mb-4 opacity-30" />
          <p className="text-lg font-medium">لا توجد عقود حالياً</p>
          <p className="text-sm mt-1">ستظهر هنا العقود بعد إتمام الاستشارات</p>
        </CardContent>
      </Card>
    </div>
  );
};

export default ClientContracts;
