import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Users, Scale, MessageSquare, Briefcase, TrendingUp, Clock } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface Stats {
  lawyers: number;
  users: number;
  consultations: number;
  services: number;
  pendingConsultations: number;
  completedConsultations: number;
}

const Dashboard = () => {
  const [stats, setStats] = useState<Stats>({
    lawyers: 0, users: 0, consultations: 0, services: 0,
    pendingConsultations: 0, completedConsultations: 0,
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      const [lawyers, profiles, consultations, services, pending, completed] = await Promise.all([
        supabase.from("lawyers").select("id", { count: "exact", head: true }),
        supabase.from("profiles").select("id", { count: "exact", head: true }),
        supabase.from("consultations").select("id", { count: "exact", head: true }),
        supabase.from("services").select("id", { count: "exact", head: true }),
        supabase.from("consultations").select("id", { count: "exact", head: true }).eq("status", "pending"),
        supabase.from("consultations").select("id", { count: "exact", head: true }).eq("status", "completed"),
      ]);

      setStats({
        lawyers: lawyers.count || 0,
        users: profiles.count || 0,
        consultations: consultations.count || 0,
        services: services.count || 0,
        pendingConsultations: pending.count || 0,
        completedConsultations: completed.count || 0,
      });
      setLoading(false);
    };
    fetchStats();
  }, []);

  const statCards = [
    { title: "إجمالي المحامين", value: stats.lawyers, icon: Scale, color: "text-blue-600", bg: "bg-blue-50" },
    { title: "إجمالي المستخدمين", value: stats.users, icon: Users, color: "text-green-600", bg: "bg-green-50" },
    { title: "إجمالي الاستشارات", value: stats.consultations, icon: MessageSquare, color: "text-purple-600", bg: "bg-purple-50" },
    { title: "الخدمات المنشورة", value: stats.services, icon: Briefcase, color: "text-orange-600", bg: "bg-orange-50" },
    { title: "استشارات معلقة", value: stats.pendingConsultations, icon: Clock, color: "text-yellow-600", bg: "bg-yellow-50" },
    { title: "استشارات مكتملة", value: stats.completedConsultations, icon: TrendingUp, color: "text-emerald-600", bg: "bg-emerald-50" },
  ];

  return (
    <div>
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-foreground">لوحة التحكم</h1>
        <p className="text-muted-foreground text-sm mt-1">نظرة عامة على إحصائيات المنصة</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {statCards.map((stat) => (
          <Card key={stat.title} className="hover:shadow-md transition-shadow">
            <CardContent className="p-5">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-muted-foreground text-xs mb-1">{stat.title}</p>
                  <p className="text-3xl font-bold text-foreground">
                    {loading ? "..." : stat.value.toLocaleString("ar-SA")}
                  </p>
                </div>
                <div className={`${stat.bg} p-3 rounded-xl`}>
                  <stat.icon size={22} className={stat.color} />
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Recent Activity */}
      <Card className="mt-6">
        <CardHeader>
          <CardTitle className="text-lg">آخر النشاطات</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground text-sm text-center py-8">لا توجد نشاطات حديثة بعد</p>
        </CardContent>
      </Card>
    </div>
  );
};

export default Dashboard;
