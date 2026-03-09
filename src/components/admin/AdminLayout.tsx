import { useEffect } from "react";
import { useNavigate, Outlet } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";
import { AdminSidebar } from "./AdminSidebar";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Loader2, Bell } from "lucide-react";

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
          <header className="h-16 border-b border-border bg-primary text-primary-foreground flex items-center justify-between px-4 sticky top-0 z-40">
            <div className="flex items-center gap-3">
              <SidebarTrigger />
              <h2 className="text-sm font-medium text-muted-foreground hidden sm:block">لوحة تحكم الأدمن</h2>
            </div>
            <div className="flex items-center gap-3">
              <button className="relative p-2 rounded-lg hover:bg-muted transition-colors">
                <Bell size={18} className="text-muted-foreground" />
                <span className="absolute top-1 right-1 w-2 h-2 bg-destructive rounded-full" />
              </button>
              <Avatar className="h-8 w-8 border border-border">
                <AvatarFallback className="bg-primary text-primary-foreground text-xs">
                  {user.email?.charAt(0).toUpperCase() || "A"}
                </AvatarFallback>
              </Avatar>
            </div>
          </header>

          {/* Content */}
          <main className="flex-1 p-4 md:p-6 bg-muted/30">
            <Outlet />
          </main>
        </div>
      </div>
    </SidebarProvider>
  );
};

export default AdminLayout;
