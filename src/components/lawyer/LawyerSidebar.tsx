import {
  LayoutDashboard,
  MessageSquare,
  Calendar,
  User,
  Settings,
  Star,
  LogOut,
  Home,
  Briefcase,
  Inbox,
  ChevronLeft,
} from "lucide-react";
import { NavLink as RouterNavLink, useLocation, useNavigate, Link } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";
import snadLogo from "@/assets/snad-logo.png";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const mainItems = [
  { title: "لوحة التحكم", url: "/lawyer-dashboard", icon: LayoutDashboard },
  { title: "خدماتي", url: "/lawyer-dashboard/services", icon: Briefcase },
  { title: "القضايا", url: "/lawyer-dashboard/cases", icon: Inbox },
  { title: "الاستشارات", url: "/lawyer-dashboard/consultations", icon: MessageSquare },
  { title: "المواعيد", url: "/lawyer-dashboard/appointments", icon: Calendar },
  { title: "التقييمات", url: "/lawyer-dashboard/reviews", icon: Star },
];

const accountItems = [
  { title: "الملف الشخصي", url: "/lawyer-dashboard/profile", icon: User },
  { title: "الإعدادات", url: "/lawyer-dashboard/settings", icon: Settings },
];

export function LawyerSidebar() {
  const location = useLocation();
  const navigate = useNavigate();
  const { signOut } = useAuth();

  const isActive = (path: string) =>
    path === "/lawyer-dashboard"
      ? location.pathname === "/lawyer-dashboard"
      : location.pathname.startsWith(path);

  const handleLogout = async () => {
    await signOut();
    navigate("/");
  };

  return (
    <div className="w-64 h-screen bg-sidebar border-l border-sidebar-border flex flex-col sticky top-0 overflow-y-auto">
      {/* Logo */}
      <div className="p-5 border-b border-sidebar-border flex items-center justify-center">
        <Link to="/lawyer-dashboard">
          <img src={snadLogo} alt="سند" className="h-20 w-auto object-contain" />
        </Link>
      </div>

      {/* Navigation */}
      <nav className="flex-1 py-4 px-3 space-y-1">
        <p className="text-[10px] font-bold text-sidebar-foreground/40 uppercase tracking-wider px-3 mb-2">إدارة الطلبات</p>
        {mainItems.map((item) => {
          const active = isActive(item.url);
          return (
            <RouterNavLink
              key={item.title}
              to={item.url}
              end={item.url === "/lawyer-dashboard"}
              className={cn(
                "flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all duration-200",
                active
                  ? "bg-sidebar-accent text-sidebar-accent-foreground shadow-sm"
                  : "text-sidebar-foreground/70 hover:bg-sidebar-accent/50 hover:text-sidebar-foreground"
              )}
            >
              <item.icon size={18} className={active ? "text-sidebar-primary" : ""} />
              <span>{item.title}</span>
              {active && <ChevronLeft size={14} className="mr-auto" />}
            </RouterNavLink>
          );
        })}

        <div className="my-4 border-t border-border" />

        <p className="text-[10px] font-bold text-muted-foreground/60 uppercase tracking-wider px-3 mb-2">معلومات الحساب</p>
        {accountItems.map((item) => {
          const active = isActive(item.url);
          return (
            <RouterNavLink
              key={item.title}
              to={item.url}
              className={cn(
                "flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all duration-200",
                active
                  ? "bg-primary text-primary-foreground shadow-sm"
                  : "text-foreground/70 hover:bg-muted hover:text-foreground"
              )}
            >
              <item.icon size={18} className={active ? "text-secondary" : ""} />
              <span>{item.title}</span>
            </RouterNavLink>
          );
        })}
      </nav>

      {/* Footer */}
      <div className="border-t border-border p-3 space-y-1">
        <Link to="/">
          <Button variant="ghost" size="sm" className="w-full justify-start gap-2 text-muted-foreground text-xs rounded-xl">
            <Home size={14} />
            العودة للموقع
          </Button>
        </Link>
        <Button
          variant="ghost"
          size="sm"
          onClick={handleLogout}
          className="w-full justify-start gap-2 text-destructive text-xs rounded-xl"
        >
          <LogOut size={14} />
          تسجيل الخروج
        </Button>
      </div>
    </div>
  );
}
