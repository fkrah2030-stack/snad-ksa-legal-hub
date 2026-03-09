import { Card, CardContent } from "@/components/ui/card";
import { CreditCard } from "lucide-react";

const ClientPayments = () => {
  return (
    <div>
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-foreground">المالية</h1>
        <p className="text-muted-foreground text-sm mt-1">سجل مدفوعاتك وفواتيرك</p>
      </div>

      <Card>
        <CardContent className="flex flex-col items-center justify-center py-16 text-muted-foreground">
          <CreditCard size={48} className="mb-4 opacity-30" />
          <p className="text-lg font-medium">لا توجد عمليات مالية</p>
          <p className="text-sm mt-1">ستظهر هنا سجل المدفوعات</p>
        </CardContent>
      </Card>
    </div>
  );
};

export default ClientPayments;
