import { useEffect } from "react";
import { useNavigate, Outlet } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";
import { LawyerSidebar } from "./LawyerSidebar";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Loader2, Bell } from "lucide-react";

const LawyerLayout = () => {
  const { user, loading, roles } = useAuth();
  const navigate = useNavigate();
  const isLawyer = roles.includes("lawyer") || roles.includes("admin");

  useEffect(() => {
    if (!loading && (!user || !isLawyer)) {
      navigate("/login");
    }
  }, [user, loading, isLawyer, navigate]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  if (!user || !isLawyer) return null;

  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full font-arabic" dir="rtl">
        <LawyerSidebar />
        <div className="flex-1 flex flex-col">
          <header className="h-16 border-b border-border bg-primary text-primary-foreground flex items-center justify-between px-4 sticky top-0 z-40">
            <div className="flex items-center gap-3">
              <SidebarTrigger className="text-primary-foreground" />
              <h2 className="text-sm font-medium text-primary-foreground/70 hidden sm:block">لوحة تحكم المحامي</h2>
            </div>
            <div className="flex items-center gap-3">
              <button className="relative p-2 rounded-lg hover:bg-primary-foreground/10 transition-colors">
                <Bell size={18} className="text-primary-foreground/70" />
              </button>
              <Avatar className="h-8 w-8 border border-primary-foreground/20">
                <AvatarFallback className="bg-secondary text-secondary-foreground text-xs">
                  {user.email?.charAt(0).toUpperCase() || "M"}
                </AvatarFallback>
              </Avatar>
            </div>
          </header>

          <main className="flex-1 p-4 md:p-6 bg-muted/20">
            <Outlet />
          </main>
        </div>
      </div>
    </SidebarProvider>
  );
};

export default LawyerLayout;
