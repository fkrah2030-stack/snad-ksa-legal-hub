import { useEffect } from "react";
import { useNavigate, Outlet } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";
import { ClientSidebar } from "./ClientSidebar";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Loader2 } from "lucide-react";
import { NotificationsPopover } from "@/components/NotificationsPopover";

const ClientLayout = () => {
  const { user, loading } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!loading && !user) {
      navigate("/login");
    }
  }, [user, loading, navigate]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  if (!user) return null;

  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full font-arabic" dir="rtl">
        <ClientSidebar />
        <div className="flex-1 flex flex-col">
          <header className="h-16 border-b border-border bg-primary text-primary-foreground flex items-center justify-between px-4 sticky top-0 z-40">
            <div className="flex items-center gap-3">
              <SidebarTrigger className="text-primary-foreground" />
              <h2 className="text-sm font-medium text-primary-foreground/70 hidden sm:block">لوحة تحكم المستفيد</h2>
            </div>
            <div className="flex items-center gap-3">
              <NotificationsPopover />
              <Avatar className="h-8 w-8 border border-primary-foreground/20">
                <AvatarFallback className="bg-secondary text-secondary-foreground text-xs">
                  {user.email?.charAt(0).toUpperCase() || "U"}
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

export default ClientLayout;
