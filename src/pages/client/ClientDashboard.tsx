import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/hooks/useAuth";
import { Card, CardContent } from "@/components/ui/card";
import { MessageSquare, FileText, CreditCard, CheckCircle } from "lucide-react";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";

const ClientDashboard = () => {
  const { user } = useAuth();
  const [stats, setStats] = useState({ total: 0, completed: 0, pending: 0, totalSpent: 0 });

  useEffect(() => {
    const fetchStats = async () => {
      if (!user) return;
      const { data } = await supabase
        .from("consultations")
        .select("*")
        .eq("client_id", user.id);

      const all = data || [];
      setStats({
        total: all.length,
        completed: all.filter((c) => c.status === "completed").length,
        pending: all.filter((c) => c.status === "pending").length,
        totalSpent: all.filter((c) => c.status === "completed").reduce((sum, c) => sum + c.price, 0),
      });
    };
    fetchStats();
  }, [user]);

  const cards = [
    { title: "عدد الطلبات", value: stats.total, icon: MessageSquare },
    { title: "إجمالي الطلبات المعتمدة", value: stats.completed, icon: CheckCircle },
    { title: "قيد الانتظار", value: stats.pending, icon: FileText },
    { title: "إجمالي المبالغ", value: `${stats.totalSpent.toLocaleString()} ر.س`, icon: CreditCard },
  ];

  return (
    <div>
      {/* User info card */}
      <div className="bg-primary rounded-2xl p-6 mb-6 flex items-center gap-4">
        <Avatar className="h-16 w-16 border-2 border-secondary">
          <AvatarFallback className="bg-secondary text-secondary-foreground text-xl">
            {user?.user_metadata?.full_name?.charAt(0) || "U"}
          </AvatarFallback>
        </Avatar>
        <div className="text-primary-foreground">
          <p className="text-primary-foreground/60 text-xs">الاسم</p>
          <h2 className="text-lg font-bold">{user?.user_metadata?.full_name || "مستفيد"}</h2>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {cards.map((card) => (
          <Card key={card.title} className="border">
            <CardContent className="p-4 text-center">
              <p className="text-muted-foreground text-xs mb-2">{card.title}</p>
              <p className="text-xl font-bold text-foreground">{card.value}</p>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default ClientDashboard;
