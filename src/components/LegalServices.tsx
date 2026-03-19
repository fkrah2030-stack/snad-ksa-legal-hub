import { Scale, Landmark, Briefcase, Users, Gavel, Building2, LucideIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link, useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Skeleton } from "@/components/ui/skeleton";

const iconMap: Record<string, LucideIcon> = {
  Scale,
  Landmark,
  Briefcase,
  Users,
  Gavel,
  Building2,
};

const LegalServices = () => {
  const { data: services, isLoading } = useQuery({
    queryKey: ["published-services"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("services")
        .select("*")
        .eq("is_published", true)
        .order("sort_order", { ascending: true });
      if (error) throw error;
      return data;
    },
  });

  return (
    <section id="services" className="py-20 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center mb-14">
          <h2 className="text-3xl md:text-4xl font-black text-foreground mt-2 mb-4">
            خدماتنا القانونية
          </h2>
          <p className="text-muted-foreground max-w-xl mx-auto">
            مجموعة متنوعة من الخدمات القانونية المتخصصة لتلبية جميع احتياجاتك القانونية
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {isLoading
            ? Array.from({ length: 6 }).map((_, i) => (
                <div key={i} className="bg-card border border-border rounded-2xl p-8 text-center">
                  <Skeleton className="w-16 h-16 rounded-2xl mx-auto mb-5" />
                  <Skeleton className="h-5 w-32 mx-auto mb-2" />
                  <Skeleton className="h-4 w-48 mx-auto mb-5" />
                  <Skeleton className="h-10 w-28 mx-auto" />
                </div>
              ))
            : services?.map((service) => {
                const Icon = iconMap[service.icon] || Scale;
                return (
                  <div
                    key={service.id}
                    className="bg-card border border-border rounded-2xl p-8 hover:shadow-lg transition-all duration-300 group hover:-translate-y-1 text-center"
                  >
                    <div className="bg-primary/10 w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-5 group-hover:bg-primary/15 transition-colors">
                      <Icon size={28} className="text-primary" />
                    </div>
                    <h3 className="text-foreground font-bold text-lg mb-2">{service.title}</h3>
                    <p className="text-muted-foreground text-sm mb-5">{service.description}</p>
                    <Link to="/instant-consultation">
                      <Button variant="outline" className="border-border text-primary hover:bg-primary hover:text-primary-foreground rounded-xl text-sm font-medium transition-colors">
                        طلب استشارة
                      </Button>
                    </Link>
                  </div>
                );
              })}
        </div>

        <div className="text-center mt-10">
          <Link to="/login">
            <Button className="bg-secondary hover:bg-secondary/90 text-secondary-foreground font-bold rounded-xl px-8">
              عرض جميع الخدمات
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default LegalServices;
