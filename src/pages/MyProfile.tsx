import { useState, useEffect } from "react";
import { Star, MapPin, Briefcase, Phone, Mail, Clock, Edit, Award, TrendingUp, Users, CheckCircle, XCircle, AlertCircle, Save, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Progress } from "@/components/ui/progress";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import Layout from "@/components/Layout";
import { useAuth } from "@/hooks/useAuth";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { Skeleton } from "@/components/ui/skeleton";

const statusConfig = {
  active: { label: "جارية", icon: AlertCircle, className: "bg-secondary/10 text-secondary border-secondary/20" },
  won: { label: "مكسوبة", icon: CheckCircle, className: "bg-green-500/10 text-green-400 border-green-500/20" },
  lost: { label: "خاسرة", icon: XCircle, className: "bg-destructive/10 text-destructive border-destructive/20" },
};

const MyProfile = () => {
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState("overview");
  const [lawyer, setLawyer] = useState<any>(null);
  const [profile, setProfile] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [editOpen, setEditOpen] = useState(false);
  const [saving, setSaving] = useState(false);
  const [editForm, setEditForm] = useState({
    name: "",
    specialty: "",
    city: "",
    phone: "",
    email: "",
    bio: "",
    license_number: "",
    experience_years: 0,
    price_per_hour: 0,
  });

  useEffect(() => {
    if (!user) return;
    const fetchData = async () => {
      setLoading(true);
      // Fetch lawyer profile linked to user
      const { data: lawyerData } = await supabase
        .from("lawyers")
        .select("*")
        .eq("user_id", user.id)
        .maybeSingle();

      // Fetch user profile
      const { data: profileData } = await supabase
        .from("profiles")
        .select("*")
        .eq("id", user.id)
        .maybeSingle();

      setLawyer(lawyerData);
      setProfile(profileData);
      if (lawyerData) {
        setEditForm({
          name: lawyerData.name,
          specialty: lawyerData.specialty,
          city: lawyerData.city,
          phone: lawyerData.phone || "",
          email: lawyerData.email || "",
          bio: lawyerData.bio || "",
          license_number: lawyerData.license_number || "",
          experience_years: lawyerData.experience_years,
          price_per_hour: lawyerData.price_per_hour,
        });
      }
      setLoading(false);
    };
    fetchData();
  }, [user]);

  const handleSave = async () => {
    if (!lawyer) return;
    setSaving(true);
    const { error } = await supabase
      .from("lawyers")
      .update({
        name: editForm.name,
        specialty: editForm.specialty,
        city: editForm.city,
        phone: editForm.phone || null,
        email: editForm.email || null,
        bio: editForm.bio || null,
        license_number: editForm.license_number || null,
        experience_years: editForm.experience_years,
        price_per_hour: editForm.price_per_hour,
      })
      .eq("id", lawyer.id);
    setSaving(false);
    if (error) {
      toast.error("حدث خطأ أثناء الحفظ");
    } else {
      toast.success("تم تحديث الملف بنجاح");
      setLawyer({ ...lawyer, ...editForm });
      setEditOpen(false);
    }
  };

  if (loading) {
    return (
      <Layout>
        <div className="bg-gradient-to-b from-primary to-primary/90 py-10">
          <div className="container mx-auto px-4 flex gap-6 items-center">
            <Skeleton className="w-28 h-28 rounded-full" />
            <div className="space-y-3 flex-1">
              <Skeleton className="h-8 w-48" />
              <Skeleton className="h-4 w-32" />
              <Skeleton className="h-4 w-64" />
            </div>
          </div>
        </div>
      </Layout>
    );
  }

  // If user is not a lawyer, show basic profile
  if (!lawyer) {
    const displayName = profile?.full_name || user?.user_metadata?.full_name || "مستخدم";
    return (
      <Layout>
        <div className="bg-gradient-to-b from-primary to-primary/90 py-10">
          <div className="container mx-auto px-4">
            <div className="flex flex-col sm:flex-row items-center sm:items-start gap-6">
              <div className="w-28 h-28 rounded-full bg-secondary/20 border-2 border-secondary flex items-center justify-center shrink-0">
                <span className="text-4xl font-bold text-secondary">{displayName.charAt(0)}</span>
              </div>
              <div className="text-center sm:text-right flex-1">
                <h1 className="text-2xl md:text-3xl font-black text-primary-foreground mb-1">{displayName}</h1>
                <p className="text-primary-foreground/60">{user?.email}</p>
              </div>
            </div>
          </div>
        </div>
        <div className="bg-primary/95 min-h-[40vh] py-8">
          <div className="container mx-auto px-4">
            <div className="bg-primary-foreground/5 border border-primary-foreground/10 rounded-2xl p-8 text-center">
              <p className="text-primary-foreground/60">ملفك الشخصي كمستخدم. لا يوجد ملف محامي مرتبط بحسابك.</p>
            </div>
          </div>
        </div>
      </Layout>
    );
  }

  const winRate = lawyer.cases_count > 0 ? Math.round((lawyer.cases_count * 0.86) / 1) : 0;

  return (
    <Layout>
      {/* Hero Banner */}
      <div className="bg-gradient-to-b from-primary to-primary/90 py-10">
        <div className="container mx-auto px-4">
          <div className="flex flex-col sm:flex-row items-center sm:items-start gap-6">
            <div className="w-28 h-28 rounded-full bg-secondary/20 border-2 border-secondary flex items-center justify-center shrink-0">
              <span className="text-4xl font-bold text-secondary">{lawyer.name.charAt(0)}</span>
            </div>
            <div className="text-center sm:text-right flex-1">
              <h1 className="text-2xl md:text-3xl font-black text-primary-foreground mb-1">{lawyer.name}</h1>
              <p className="text-secondary font-semibold mb-3">{lawyer.specialty}</p>
              <div className="flex flex-wrap items-center justify-center sm:justify-start gap-4 text-sm text-primary-foreground/60 mb-3">
                <span className="flex items-center gap-1"><MapPin size={14} />{lawyer.city}</span>
                <span className="flex items-center gap-1"><Briefcase size={14} />{lawyer.cases_count} قضية</span>
                <span className="flex items-center gap-1"><Clock size={14} />{lawyer.experience_years} سنة خبرة</span>
                {lawyer.license_number && <span className="flex items-center gap-1"><Award size={14} />رخصة: {lawyer.license_number}</span>}
              </div>
              <div className="flex items-center justify-center sm:justify-start gap-1">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} size={16} className={i < Math.floor(lawyer.rating) ? "text-secondary fill-secondary" : "text-primary-foreground/20"} />
                ))}
                <span className="text-secondary text-sm mr-2 font-bold">{Number(lawyer.rating).toFixed(1)}</span>
                <span className="text-primary-foreground/40 text-sm">({lawyer.reviews_count} تقييم)</span>
              </div>
            </div>
            <Button onClick={() => setEditOpen(true)} className="bg-secondary/10 border border-secondary/30 text-secondary hover:bg-secondary/20 gap-2">
              <Edit size={16} />
              تعديل الملف
            </Button>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="bg-primary/95 min-h-[60vh] py-8">
        <div className="container mx-auto px-4">
          <Tabs value={activeTab} onValueChange={setActiveTab} dir="rtl">
            <TabsList className="bg-primary-foreground/5 border border-primary-foreground/10 w-full sm:w-auto mb-8">
              <TabsTrigger value="overview" className="data-[state=active]:bg-secondary data-[state=active]:text-secondary-foreground text-primary-foreground/60">نظرة عامة</TabsTrigger>
              <TabsTrigger value="reviews" className="data-[state=active]:bg-secondary data-[state=active]:text-secondary-foreground text-primary-foreground/60">التقييمات</TabsTrigger>
            </TabsList>

            <TabsContent value="overview" className="space-y-6">
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {[
                  { label: "إجمالي القضايا", value: lawyer.cases_count, icon: Briefcase },
                  { label: "التقييمات", value: lawyer.reviews_count, icon: Star },
                  { label: "التقييم", value: Number(lawyer.rating).toFixed(1), icon: TrendingUp },
                  { label: "سنوات الخبرة", value: lawyer.experience_years, icon: Clock },
                ].map((stat) => (
                  <div key={stat.label} className="bg-primary-foreground/5 border border-primary-foreground/10 rounded-2xl p-5 text-center">
                    <stat.icon size={24} className="text-secondary mx-auto mb-2" />
                    <p className="text-2xl font-black text-primary-foreground">{stat.value}</p>
                    <p className="text-primary-foreground/50 text-sm">{stat.label}</p>
                  </div>
                ))}
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div className="bg-primary-foreground/5 border border-primary-foreground/10 rounded-2xl p-8">
                  <h3 className="text-lg font-bold text-primary-foreground mb-4">نبذة شخصية</h3>
                  <p className="text-primary-foreground/70 leading-relaxed">{lawyer.bio || "لا توجد نبذة"}</p>
                </div>
                <div className="bg-primary-foreground/5 border border-primary-foreground/10 rounded-2xl p-8">
                  <h3 className="text-lg font-bold text-primary-foreground mb-4">معلومات التواصل</h3>
                  <div className="space-y-4">
                    {[
                      { icon: Phone, label: "الجوال", value: lawyer.phone || "غير محدد" },
                      { icon: Mail, label: "البريد", value: lawyer.email || "غير محدد" },
                      { icon: MapPin, label: "المدينة", value: lawyer.city },
                    ].map((item) => (
                      <div key={item.label} className="flex items-center gap-3">
                        <div className="w-8 h-8 bg-secondary/10 rounded-lg flex items-center justify-center">
                          <item.icon size={14} className="text-secondary" />
                        </div>
                        <div>
                          <p className="text-primary-foreground/40 text-xs">{item.label}</p>
                          <p className="text-primary-foreground text-sm">{item.value}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="reviews">
              <div className="bg-primary-foreground/5 border border-primary-foreground/10 rounded-2xl p-8 text-center">
                <p className="text-primary-foreground/50">لا توجد تقييمات حالياً</p>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </div>

      {/* Edit Dialog */}
      <Dialog open={editOpen} onOpenChange={setEditOpen}>
        <DialogContent className="max-w-lg max-h-[85vh] overflow-y-auto" dir="rtl">
          <DialogHeader>
            <DialogTitle>تعديل الملف الشخصي</DialogTitle>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>الاسم</Label>
                <Input value={editForm.name} onChange={(e) => setEditForm({ ...editForm, name: e.target.value })} />
              </div>
              <div className="space-y-2">
                <Label>التخصص</Label>
                <Input value={editForm.specialty} onChange={(e) => setEditForm({ ...editForm, specialty: e.target.value })} />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>المدينة</Label>
                <Input value={editForm.city} onChange={(e) => setEditForm({ ...editForm, city: e.target.value })} />
              </div>
              <div className="space-y-2">
                <Label>رقم الرخصة</Label>
                <Input value={editForm.license_number} onChange={(e) => setEditForm({ ...editForm, license_number: e.target.value })} />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>الجوال</Label>
                <Input value={editForm.phone} onChange={(e) => setEditForm({ ...editForm, phone: e.target.value })} dir="ltr" />
              </div>
              <div className="space-y-2">
                <Label>البريد</Label>
                <Input value={editForm.email} onChange={(e) => setEditForm({ ...editForm, email: e.target.value })} dir="ltr" type="email" />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>سنوات الخبرة</Label>
                <Input type="number" value={editForm.experience_years} onChange={(e) => setEditForm({ ...editForm, experience_years: parseInt(e.target.value) || 0 })} />
              </div>
              <div className="space-y-2">
                <Label>السعر/ساعة</Label>
                <Input type="number" value={editForm.price_per_hour} onChange={(e) => setEditForm({ ...editForm, price_per_hour: parseInt(e.target.value) || 0 })} />
              </div>
            </div>
            <div className="space-y-2">
              <Label>نبذة شخصية</Label>
              <Textarea value={editForm.bio} onChange={(e) => setEditForm({ ...editForm, bio: e.target.value })} rows={3} />
            </div>
            <Button onClick={handleSave} disabled={saving} className="w-full gap-2">
              <Save size={16} />
              {saving ? "جارٍ الحفظ..." : "حفظ التعديلات"}
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </Layout>
  );
};

export default MyProfile;
