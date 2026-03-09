import {
  LayoutDashboard,
  MessageSquare,
  Calendar,
  User,
  Settings,
  Star,
  LogOut,
  Home,
  FileText,
} from "lucide-react";
import { NavLink } from "@/components/NavLink";
import { useLocation, useNavigate, Link } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";
import snadLogo from "@/assets/snad-logo.png";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarFooter,
  useSidebar,
} from "@/components/ui/sidebar";
import { Button } from "@/components/ui/button";

const mainItems = [
  { title: "لوحة التحكم", url: "/lawyer-dashboard", icon: LayoutDashboard },
  { title: "الاستشارات", url: "/lawyer-dashboard/consultations", icon: MessageSquare },
  { title: "المواعيد", url: "/lawyer-dashboard/appointments", icon: Calendar },
  { title: "التقييمات", url: "/lawyer-dashboard/reviews", icon: Star },
];

const systemItems = [
  { title: "الملف الشخصي", url: "/lawyer-dashboard/profile", icon: User },
  { title: "الإعدادات", url: "/lawyer-dashboard/settings", icon: Settings },
];

export function LawyerSidebar() {
  const { state } = useSidebar();
  const collapsed = state === "collapsed";
  const location = useLocation();
  const navigate = useNavigate();
  const { signOut } = useAuth();

  const handleLogout = async () => {
    await signOut();
    navigate("/");
  };

  return (
    <Sidebar side="right" collapsible="icon" className="border-r-0 border-l border-sidebar-border">
      <div className="p-4 border-b border-sidebar-border flex items-center justify-center">
        <Link to="/lawyer-dashboard">
          <img
            src={snadLogo}
            alt="سند"
            className={`${collapsed ? "h-8" : "h-12"} w-auto object-contain transition-all`}
          />
        </Link>
      </div>

      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>إدارة الطلبات</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {mainItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <NavLink
                      to={item.url}
                      end={item.url === "/lawyer-dashboard"}
                      className="hover:bg-sidebar-accent text-sidebar-foreground"
                      activeClassName="bg-sidebar-accent text-sidebar-primary font-medium"
                    >
                      <item.icon className="ml-2 h-4 w-4" />
                      {!collapsed && <span>{item.title}</span>}
                    </NavLink>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        <SidebarGroup>
          <SidebarGroupLabel>معلومات الحساب</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {systemItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <NavLink
                      to={item.url}
                      className="hover:bg-sidebar-accent text-sidebar-foreground"
                      activeClassName="bg-sidebar-accent text-sidebar-primary font-medium"
                    >
                      <item.icon className="ml-2 h-4 w-4" />
                      {!collapsed && <span>{item.title}</span>}
                    </NavLink>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      <SidebarFooter className="border-t border-sidebar-border p-3 space-y-2">
        <Link to="/">
          <Button variant="ghost" size="sm" className="w-full justify-start gap-2 text-sidebar-foreground/60 text-xs">
            <Home size={14} />
            {!collapsed && "العودة للموقع"}
          </Button>
        </Link>
        <Button
          variant="ghost"
          size="sm"
          onClick={handleLogout}
          className="w-full justify-start gap-2 text-destructive text-xs"
        >
          <LogOut size={14} />
          {!collapsed && "تسجيل الخروج"}
        </Button>
      </SidebarFooter>
    </Sidebar>
  );
}
