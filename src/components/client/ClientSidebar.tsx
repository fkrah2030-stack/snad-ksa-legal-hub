import {
  LayoutDashboard,
  MessageSquare,
  FileText,
  User,
  Settings,
  CreditCard,
  LogOut,
  Home,
  Shield,
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
  { title: "لوحة التحكم", url: "/client-dashboard", icon: LayoutDashboard },
  { title: "استشاراتي", url: "/client-dashboard/consultations", icon: MessageSquare },
  { title: "العقود والاتفاقيات", url: "/client-dashboard/contracts", icon: FileText },
  { title: "المالية", url: "/client-dashboard/payments", icon: CreditCard },
];

const systemItems = [
  { title: "الملف الشخصي", url: "/client-dashboard/profile", icon: User },
  { title: "الخصوصية والأمان", url: "/client-dashboard/privacy", icon: Shield },
  { title: "الإعدادات", url: "/client-dashboard/settings", icon: Settings },
];

export function ClientSidebar() {
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
        <Link to="/client-dashboard">
          <img
            src={snadLogo}
            alt="سند"
            className={`${collapsed ? "h-16" : "h-24"} w-auto object-contain transition-all`}
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
                      end={item.url === "/client-dashboard"}
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
