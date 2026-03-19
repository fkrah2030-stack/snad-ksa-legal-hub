import { useEffect, useState } from "react";
import { useNavigate, Outlet } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";
import { AdminSidebar } from "./AdminSidebar";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Loader2, Bell, Globe, Calendar, RefreshCw } from "lucide-react";

const AdminLayout = () => {
  const { user, loading, isAdmin } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!loading && (!user || !isAdmin)) {
      navigate("/login");
    }
  }, [user, loading, isAdmin, navigate]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  if (!user || !isAdmin) return null;

  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full font-arabic" dir="rtl">
        <AdminSidebar />
        <div className="flex-1 flex flex-col">
          {/* Admin Header */}
           <header className="border-b border-border bg-primary text-primary-foreground sticky top-0 z-40">
              {/* Info bar */}
              <div className="px-4 md:px-6 py-2 bg-primary-foreground/5 border-b border-primary-foreground/10 flex flex-wrap items-center justify-between gap-2 text-xs text-primary-foreground/60">
                <div className="flex items-center gap-4 flex-wrap">
                  <span className="font-bold text-primary-foreground/90">منصة سند القانونية 2026</span>
                  <span className="flex items-center gap-1"><Globe size={12} />www.snadlegal.org</span>
                </div>
                <div className="flex items-center gap-4 flex-wrap">
                  <span className="flex items-center gap-1">
                    <Calendar size={12} />
                    {new Date().toLocaleDateString("ar-SA", { weekday: "long", year: "numeric", month: "long", day: "numeric" })}
                  </span>
                  <span className="flex items-center gap-1 text-secondary"><RefreshCw size={12} />تاريخ التجديد: 28-2-2027</span>
                </div>
              </div>
              {/* Main header */}
              <div className="h-14 flex items-center justify-between px-4 md:px-6">
                <div className="flex items-center gap-3">
                  <SidebarTrigger className="text-primary-foreground" />
                  <h2 className="text-sm font-medium text-primary-foreground/70 hidden sm:block">لوحة تحكم الأدمن</h2>
                </div>
                <div className="flex items-center gap-3">
                  <button className="relative p-2 rounded-lg hover:bg-primary-foreground/10 transition-colors">
                    <Bell size={18} className="text-primary-foreground/70" />
                    <span className="absolute top-1 right-1 w-2 h-2 bg-destructive rounded-full" />
                  </button>
                  <Avatar className="h-8 w-8 border border-primary-foreground/20">
                    <AvatarFallback className="bg-secondary text-secondary-foreground text-xs">
                      {user.email?.charAt(0).toUpperCase() || "A"}
                    </AvatarFallback>
                  </Avatar>
                </div>
              </div>
          </header>

          {/* Content */}
          <main className="flex-1 p-4 md:p-6 bg-background">
            <Outlet />
          </main>
        </div>
      </div>
    </SidebarProvider>
  );
};

export default AdminLayout;
