import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/hooks/useAuth";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { MessageSquare, Calendar, Star, DollarSign } from "lucide-react";

const LawyerDashboard = () => {
  const { user } = useAuth();
  const [stats, setStats] = useState({ consultations: 0, pending: 0, completed: 0, totalRevenue: 0 });

  useEffect(() => {
    const fetchStats = async () => {
      if (!user) return;
      const { data: lawyer } = await supabase
        .from("lawyers")
        .select("id")
        .eq("user_id", user.id)
        .maybeSingle();

      if (lawyer) {
        const { data: consultations } = await supabase
          .from("consultations")
          .select("*")
          .eq("lawyer_id", lawyer.id);

        const all = consultations || [];
        setStats({
          consultations: all.length,
          pending: all.filter((c) => c.status === "pending").length,
          completed: all.filter((c) => c.status === "completed").length,
          totalRevenue: all.filter((c) => c.status === "completed").reduce((sum, c) => sum + c.price, 0),
        });
      }
    };
    fetchStats();
  }, [user]);

  const cards = [
    { title: "إجمالي الاستشارات", value: stats.consultations, icon: MessageSquare, color: "text-primary" },
    { title: "قيد الانتظار", value: stats.pending, icon: Calendar, color: "text-secondary" },
    { title: "مكتملة", value: stats.completed, icon: Star, color: "text-green-600" },
    { title: "إجمالي الإيرادات", value: `${stats.totalRevenue.toLocaleString()} ر.س`, icon: DollarSign, color: "text-secondary" },
  ];

  return (
    <div>
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-foreground">مرحباً بك</h1>
        <p className="text-muted-foreground text-sm mt-1">إليك ملخص نشاطك</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {cards.map((card) => (
          <Card key={card.title}>
            <CardContent className="p-5">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-muted-foreground text-xs mb-1">{card.title}</p>
                  <p className="text-2xl font-bold text-foreground">{card.value}</p>
                </div>
                <div className={`p-3 rounded-xl bg-muted ${card.color}`}>
                  <card.icon size={22} />
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default LawyerDashboard;
