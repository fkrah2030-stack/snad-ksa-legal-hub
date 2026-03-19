import { useState } from "react";
import { MessageSquare, Phone, Star, MapPin, Clock, User, CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Skeleton } from "@/components/ui/skeleton";
import Layout from "@/components/Layout";
import { cn } from "@/lib/utils";

const consultationMethods = [
  {
    id: "chat",
    title: "محادثة نصية",
    description: "استشارة سريعة عبر الرسائل النصية",
    price: 200,
    duration: "30 دقيقة",
    icon: MessageSquare,
  },
  {
    id: "call",
    title: "مكالمة صوتية",
    description: "استشارة مباشرة عبر الهاتف",
    price: 300,
    duration: "30 دقيقة",
    icon: Phone,
  },
];

const InstantConsultation = () => {
  const [selectedMethod, setSelectedMethod] = useState<string | null>(null);

  const { data: lawyers, isLoading } = useQuery({
    queryKey: ["available-lawyers"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("lawyers")
        .select("*")
        .eq("is_active", true)
        .order("rating", { ascending: false })
        .limit(10);
      if (error) throw error;
      return data;
    },
  });

  return (
    <Layout>
      <section className="py-16 bg-muted/30 min-h-[80vh]">
        <div className="container mx-auto px-4">
          {/* Header */}
          <div className="text-center mb-12">
            <h1 className="text-3xl md:text-4xl font-black text-foreground mb-3">
              استشارة فورية
            </h1>
            <p className="text-muted-foreground max-w-lg mx-auto">
              احصل على استشارة قانونية فورية من محامين متخصصين
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-5xl mx-auto">
            {/* Right: Choose method */}
            <div className="bg-card border border-border rounded-2xl p-6 md:p-8 order-2 lg:order-1">
              <h2 className="text-xl font-bold text-foreground mb-6 text-center">اختر طريقة الاستشارة</h2>
              <div className="space-y-4">
                {consultationMethods.map((method) => {
                  const Icon = method.icon;
                  const isSelected = selectedMethod === method.id;
                  return (
                    <button
                      key={method.id}
                      onClick={() => setSelectedMethod(method.id)}
                      className={cn(
                        "w-full flex items-center gap-4 p-5 rounded-xl border-2 transition-all text-right",
                        isSelected
                          ? "border-primary bg-primary/5 shadow-sm"
                          : "border-border hover:border-primary/30 hover:bg-muted/50"
                      )}
                    >
                      <div className={cn(
                        "w-12 h-12 rounded-xl flex items-center justify-center shrink-0",
                        isSelected ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground"
                      )}>
                        <Icon size={22} />
                      </div>
                      <div className="flex-1">
                        <h3 className="font-bold text-foreground">{method.title}</h3>
                        <p className="text-muted-foreground text-xs mt-0.5">{method.description}</p>
                      </div>
                      <div className="text-left shrink-0">
                        <p className="text-primary font-bold text-lg">{method.price} ريال</p>
                        <p className="text-muted-foreground text-xs">{method.duration}</p>
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Left: Available lawyers */}
            <div className="bg-card border border-border rounded-2xl p-6 md:p-8 order-1 lg:order-2">
              <h2 className="text-xl font-bold text-foreground mb-6 text-center">المحامون المتاحون الآن</h2>
              <div className="space-y-3 max-h-[500px] overflow-y-auto">
                {isLoading ? (
                  Array.from({ length: 3 }).map((_, i) => (
                    <div key={i} className="flex items-center gap-3 p-4 border border-border rounded-xl">
                      <Skeleton className="w-12 h-12 rounded-full" />
                      <div className="flex-1 space-y-2">
                        <Skeleton className="h-4 w-32" />
                        <Skeleton className="h-3 w-24" />
                      </div>
                    </div>
                  ))
                ) : lawyers?.length === 0 ? (
                  <div className="text-center py-8 text-muted-foreground text-sm">
                    لا يوجد محامون متاحون حالياً
                  </div>
                ) : (
                  lawyers?.map((lawyer) => (
                    <div
                      key={lawyer.id}
                      className="flex items-center gap-4 p-4 border border-border rounded-xl hover:border-primary/30 hover:bg-muted/30 transition-all"
                    >
                      {/* Avatar */}
                      <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
                        <User size={20} className="text-primary" />
                      </div>

                      {/* Info */}
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2">
                          <h3 className="font-bold text-foreground text-sm truncate">{lawyer.name}</h3>
                          {lawyer.is_verified && <CheckCircle2 size={14} className="text-secondary shrink-0" />}
                        </div>
                        <p className="text-muted-foreground text-xs">{lawyer.specialty}</p>
                        <div className="flex items-center gap-3 mt-1 text-xs text-muted-foreground">
                          <span className="flex items-center gap-0.5">
                            <Star size={10} className="text-secondary fill-secondary" />
                            {Number(lawyer.rating).toFixed(1)}
                          </span>
                          <span className="text-primary/70 font-medium">{lawyer.price_per_hour} ريال/ساعة</span>
                        </div>
                        <div className="flex items-center gap-1 mt-1">
                          <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
                          <span className="text-green-600 text-[10px] font-medium">متاح الآن</span>
                          <span className="text-muted-foreground text-[10px] mr-2">الرد خلال: دقائق</span>
                        </div>
                      </div>

                      {/* Action */}
                      <Button
                        size="sm"
                        disabled={!selectedMethod}
                        className="bg-primary hover:bg-primary/90 text-primary-foreground text-xs rounded-lg shrink-0"
                      >
                        بدء الاستشارة
                      </Button>
                    </div>
                  ))
                )}
              </div>

              {!selectedMethod && (
                <p className="text-center text-muted-foreground text-xs mt-4 bg-muted/50 rounded-lg py-2">
                  اختر طريقة الاستشارة أولاً للمتابعة
                </p>
              )}
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default InstantConsultation;
