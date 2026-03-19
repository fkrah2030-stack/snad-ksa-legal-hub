import { Scale, Landmark, Briefcase, Users, Gavel, Building2, LucideIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
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
    <section id="services" className="py-24 bg-background geo-pattern">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-black text-foreground mb-3 font-display section-title-accent">
            خدماتنا القانونية
          </h2>
          <p className="text-muted-foreground max-w-xl mx-auto mt-6">
            مجموعة متنوعة من الخدمات القانونية المتخصصة لتلبية جميع احتياجاتك القانونية
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-7">
          {isLoading
            ? Array.from({ length: 6 }).map((_, i) => (
                <div key={i} className="bg-card border border-border rounded-3xl p-9 text-center">
                  <Skeleton className="w-18 h-18 rounded-2xl mx-auto mb-6" />
                  <Skeleton className="h-5 w-32 mx-auto mb-3" />
                  <Skeleton className="h-4 w-48 mx-auto mb-6" />
                  <Skeleton className="h-11 w-32 mx-auto" />
                </div>
              ))
            : services?.map((service, index) => {
                const Icon = iconMap[service.icon] || Scale;
                return (
                  <div
                    key={service.id}
                    className="bg-card border border-border rounded-3xl p-9 hover:shadow-2xl hover:shadow-navy/6 transition-all duration-500 group hover:-translate-y-2 text-center animate-fade-in"
                    style={{ animationDelay: `${0.1 + index * 0.1}s` }}
                  >
                    <div className="bg-gold/8 w-18 h-18 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:bg-gold/15 group-hover:scale-110 transition-all duration-500" style={{ width: '4.5rem', height: '4.5rem' }}>
                      <Icon size={30} className="text-gold" />
                    </div>
                    <h3 className="text-foreground font-bold text-lg mb-3 font-display">{service.title}</h3>
                    <p className="text-muted-foreground text-sm mb-6 leading-relaxed">{service.description}</p>
                    <Link to="/instant-consultation">
                      <Button variant="outline" className="border-border hover:border-gold/30 text-primary hover:bg-gold/5 hover:text-gold-dark rounded-xl text-sm font-medium transition-all duration-300">
                        طلب استشارة
                      </Button>
                    </Link>
                  </div>
                );
              })}
        </div>

        <div className="text-center mt-14">
          <Link to="/login">
            <Button className="bg-gold hover:bg-gold-dark text-secondary-foreground font-bold rounded-xl px-10 py-5 shadow-lg shadow-gold/15 hover:shadow-gold/25 transition-all duration-300 hover:-translate-y-0.5">
              عرض جميع الخدمات
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default LegalServices;
