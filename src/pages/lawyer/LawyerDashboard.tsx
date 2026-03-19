import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/hooks/useAuth";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { MessageSquare, Calendar, Star, DollarSign, Briefcase, Inbox, ArrowLeft, Clock, TrendingUp } from "lucide-react";
import { Link } from "react-router-dom";

const LawyerDashboard = () => {
  const { user } = useAuth();
  const [stats, setStats] = useState({
    consultations: 0,
    pending: 0,
    completed: 0,
    totalRevenue: 0,
    services: 0,
    caseRequests: 0,
    pendingCases: 0,
  });
  const [recentCases, setRecentCases] = useState<any[]>([]);

  useEffect(() => {
    const fetchStats = async () => {
      if (!user) return;
      const { data: lawyer } = await supabase
        .from("lawyers")
        .select("id")
        .eq("user_id", user.id)
        .maybeSingle();

      if (!lawyer) return;

      const [consultRes, servicesRes, casesRes] = await Promise.all([
        supabase.from("consultations").select("*").eq("lawyer_id", lawyer.id),
        supabase.from("lawyer_services").select("id").eq("lawyer_id", lawyer.id),
        supabase.from("case_requests").select("*").eq("lawyer_id", lawyer.id).order("created_at", { ascending: false }),
      ]);

      const consultations = consultRes.data || [];
      const cases = casesRes.data || [];

      setStats({
        consultations: consultations.length,
        pending: consultations.filter((c) => c.status === "pending").length,
        completed: consultations.filter((c) => c.status === "completed").length,
        totalRevenue: consultations.filter((c) => c.status === "completed").reduce((s, c) => s + c.price, 0),
        services: servicesRes.data?.length || 0,
        caseRequests: cases.length,
        pendingCases: cases.filter((c) => c.status === "pending").length,
      });

      setRecentCases(cases.slice(0, 5));
    };
    fetchStats();
  }, [user]);

  const statCards = [
    { title: "إجمالي الاستشارات", value: stats.consultations, icon: MessageSquare, accent: false },
    { title: "طلبات القضايا", value: stats.caseRequests, icon: Inbox, accent: false },
    { title: "قيد الانتظار", value: stats.pendingCases, icon: Clock, accent: true },
    { title: "الإيرادات", value: `${stats.totalRevenue.toLocaleString()} ر.س`, icon: DollarSign, accent: true },
  ];

  const quickLinks = [
    { title: "خدماتي", desc: `${stats.services} خدمة مسجلة`, icon: Briefcase, url: "/lawyer-dashboard/services" },
    { title: "القضايا", desc: `${stats.pendingCases} طلب جديد`, icon: Inbox, url: "/lawyer-dashboard/cases" },
    { title: "الاستشارات", desc: `${stats.pending} قيد الانتظار`, icon: MessageSquare, url: "/lawyer-dashboard/consultations" },
    { title: "التقييمات", desc: "عرض تقييمات العملاء", icon: Star, url: "/lawyer-dashboard/reviews" },
  ];

  return (
    <div className="space-y-6">
      {/* Stats Grid */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {statCards.map((card) => (
          <Card key={card.title} className={card.accent ? "border-secondary/20 bg-secondary/5" : ""}>
            <CardContent className="p-5">
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-muted-foreground text-xs mb-2">{card.title}</p>
                  <p className={`text-2xl font-black ${card.accent ? "text-secondary" : "text-foreground"}`}>{card.value}</p>
                </div>
                <div className={`p-2.5 rounded-xl ${card.accent ? "bg-secondary/10" : "bg-primary/5"}`}>
                  <card.icon size={20} className={card.accent ? "text-secondary" : "text-primary"} />
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Quick Access + Recent */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Quick Links */}
        <div className="lg:col-span-1 space-y-3">
          <h2 className="text-sm font-bold text-foreground mb-3">الوصول السريع</h2>
          {quickLinks.map((link) => (
            <Link key={link.title} to={link.url}>
              <Card className="hover:shadow-md hover:border-primary/20 transition-all cursor-pointer group mb-3">
                <CardContent className="p-4 flex items-center gap-3">
                  <div className="p-2 rounded-xl bg-primary/5 group-hover:bg-primary/10 transition-colors">
                    <link.icon size={18} className="text-primary" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-bold text-foreground">{link.title}</p>
                    <p className="text-xs text-muted-foreground">{link.desc}</p>
                  </div>
                  <ArrowLeft size={14} className="text-muted-foreground group-hover:text-primary transition-colors" />
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>

        {/* Recent Cases */}
        <div className="lg:col-span-2">
          <div className="flex items-center justify-between mb-3">
            <h2 className="text-sm font-bold text-foreground">آخر طلبات القضايا</h2>
            <Link to="/lawyer-dashboard/cases">
              <Button variant="ghost" size="sm" className="text-xs text-primary gap-1">
                عرض الكل <ArrowLeft size={12} />
              </Button>
            </Link>
          </div>
          <Card>
            <CardContent className="p-0">
              {recentCases.length === 0 ? (
                <div className="p-8 text-center">
                  <Inbox size={32} className="mx-auto text-muted-foreground/20 mb-3" />
                  <p className="text-muted-foreground text-sm">لا توجد طلبات حالياً</p>
                  <p className="text-muted-foreground/60 text-xs mt-1">ستظهر هنا طلبات العملاء الجديدة</p>
                </div>
              ) : (
                <div className="divide-y divide-border">
                  {recentCases.map((c) => (
                    <div key={c.id} className="p-4 flex items-center justify-between hover:bg-muted/50 transition-colors">
                      <div className="flex items-center gap-3">
                        <div className={`w-2 h-2 rounded-full ${c.status === "pending" ? "bg-secondary" : c.status === "accepted" ? "bg-primary" : "bg-muted-foreground"}`} />
                        <div>
                          <p className="text-sm font-medium text-foreground">{c.title}</p>
                          <p className="text-xs text-muted-foreground">{c.client_name} • {new Date(c.created_at).toLocaleDateString("ar-SA")}</p>
                        </div>
                      </div>
                      <span className={`text-[10px] px-2 py-1 rounded-full font-medium ${
                        c.status === "pending"
                          ? "bg-secondary/10 text-secondary"
                          : c.status === "accepted"
                          ? "bg-primary/10 text-primary"
                          : "bg-muted text-muted-foreground"
                      }`}>
                        {c.status === "pending" ? "جديد" : c.status === "accepted" ? "مقبول" : c.status === "in_progress" ? "قيد التنفيذ" : c.status === "completed" ? "مكتمل" : c.status}
                      </span>
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default LawyerDashboard;
