import { useEffect, useState } from "react";
import { useNavigate, Outlet, useLocation } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";
import { supabase } from "@/integrations/supabase/client";
import { SidebarProvider } from "@/components/ui/sidebar";
import { LawyerSidebar } from "./LawyerSidebar";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Loader2, Bell, MapPin, Briefcase, Award, Clock, Menu } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";

const LawyerLayout = () => {
  const { user, loading, roles } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const isLawyer = roles.includes("lawyer") || roles.includes("admin");
  const [lawyer, setLawyer] = useState<any>(null);

  useEffect(() => {
    if (!loading && (!user || !isLawyer)) {
      navigate("/login");
    }
  }, [user, loading, isLawyer, navigate]);

  useEffect(() => {
    if (!user) return;
    supabase
      .from("lawyers")
      .select("*")
      .eq("user_id", user.id)
      .maybeSingle()
      .then(({ data }) => setLawyer(data));
  }, [user]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  if (!user || !isLawyer) return null;

  const displayName = lawyer?.name || user.user_metadata?.full_name || "محامي";

  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full font-arabic bg-muted" dir="rtl">
        {/* Desktop Sidebar */}
        <div className="hidden md:block">
          <LawyerSidebar />
        </div>

        <div className="flex-1 flex flex-col min-w-0">
          {/* Top Profile Banner */}
          <header className="bg-primary border-b border-primary-foreground/10 sticky top-0 z-40">
            {/* Upper bar with profile info */}
            <div className="px-4 md:px-6 py-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  {/* Mobile menu */}
                  <Sheet>
                    <SheetTrigger asChild>
                      <Button variant="ghost" size="icon" className="md:hidden text-primary-foreground">
                        <Menu size={20} />
                      </Button>
                    </SheetTrigger>
                    <SheetContent side="right" className="p-0 w-72">
                      <LawyerSidebar />
                    </SheetContent>
                  </Sheet>

                  <Avatar className="h-14 w-14 border-2 border-secondary hidden sm:flex">
                    <AvatarFallback className="bg-secondary/20 text-secondary text-xl font-bold">
                      {displayName.charAt(0)}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <div className="flex items-center gap-2">
                      <h1 className="text-lg md:text-xl font-bold text-primary-foreground">{displayName}</h1>
                      {lawyer?.is_verified && (
                        <span className="bg-secondary/20 text-secondary text-[10px] px-2 py-0.5 rounded-full font-medium">موثق</span>
                      )}
                    </div>
                    {lawyer && (
                      <div className="flex flex-wrap items-center gap-3 mt-1 text-xs text-primary-foreground/50">
                        <span className="flex items-center gap-1"><Award size={11} />{lawyer.specialty}</span>
                        <span className="flex items-center gap-1"><MapPin size={11} />{lawyer.city}</span>
                        {lawyer.license_number && (
                          <span className="hidden sm:flex items-center gap-1">رخصة: {lawyer.license_number}</span>
                        )}
                      </div>
                    )}
                  </div>
                </div>

                {/* Stats & Actions */}
                <div className="flex items-center gap-3 md:gap-6">
                  {lawyer && (
                    <div className="hidden lg:flex items-center gap-6">
                      {[
                        { label: "القضايا", value: lawyer.cases_count },
                        { label: "سنوات الخبرة", value: lawyer.experience_years },
                        { label: "التقييم", value: Number(lawyer.rating).toFixed(1) },
                      ].map((s) => (
                        <div key={s.label} className="text-center">
                          <p className="text-secondary font-bold text-lg">{s.value}</p>
                          <p className="text-primary-foreground/40 text-[10px]">{s.label}</p>
                        </div>
                      ))}
                    </div>
                  )}
                  <div className="flex items-center gap-2">
                    <button className="relative p-2 rounded-lg hover:bg-primary-foreground/10 transition-colors">
                      <Bell size={18} className="text-primary-foreground/60" />
                      <span className="absolute top-1 right-1 w-2 h-2 bg-secondary rounded-full"></span>
                    </button>
                    <Avatar className="h-9 w-9 border border-primary-foreground/20 sm:hidden">
                      <AvatarFallback className="bg-secondary/20 text-secondary text-xs font-bold">
                        {displayName.charAt(0)}
                      </AvatarFallback>
                    </Avatar>
                  </div>
                </div>
              </div>
            </div>
          </header>

          {/* Main Content */}
          <main className="flex-1 p-4 md:p-6">
            <Outlet />
          </main>
        </div>
      </div>
    </SidebarProvider>
  );
};

export default LawyerLayout;
