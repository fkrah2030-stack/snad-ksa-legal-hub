import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { useAuth } from "@/hooks/useAuth";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { Save, Edit, MapPin, Phone, Mail, Award, Briefcase, Clock } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";

const LawyerProfilePage = () => {
  const { user } = useAuth();
  const [lawyer, setLawyer] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState(false);
  const [saving, setSaving] = useState(false);
  const [form, setForm] = useState({
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
    const fetch = async () => {
      const { data } = await supabase
        .from("lawyers")
        .select("*")
        .eq("user_id", user.id)
        .maybeSingle();
      setLawyer(data);
      if (data) {
        setForm({
          name: data.name,
          specialty: data.specialty,
          city: data.city,
          phone: data.phone || "",
          email: data.email || "",
          bio: data.bio || "",
          license_number: data.license_number || "",
          experience_years: data.experience_years,
          price_per_hour: data.price_per_hour,
        });
      }
      setLoading(false);
    };
    fetch();
  }, [user]);

  const handleSave = async () => {
    if (!lawyer) return;
    setSaving(true);
    const { error } = await supabase
      .from("lawyers")
      .update({
        name: form.name,
        specialty: form.specialty,
        city: form.city,
        phone: form.phone || null,
        email: form.email || null,
        bio: form.bio || null,
        license_number: form.license_number || null,
        experience_years: form.experience_years,
        price_per_hour: form.price_per_hour,
      })
      .eq("id", lawyer.id);
    setSaving(false);
    if (error) {
      toast.error("حدث خطأ أثناء الحفظ");
    } else {
      toast.success("تم تحديث الملف بنجاح");
      setLawyer({ ...lawyer, ...form });
      setEditing(false);
    }
  };

  if (loading) {
    return (
      <div className="space-y-4">
        <Skeleton className="h-8 w-48" />
        <Skeleton className="h-64 w-full" />
      </div>
    );
  }

  if (!lawyer) {
    return (
      <div>
        <h1 className="text-2xl font-bold text-foreground mb-4">الملف الشخصي</h1>
        <Card>
          <CardContent className="p-8 text-center text-muted-foreground">
            لا يوجد ملف محامي مرتبط بحسابك
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-foreground">الملف الشخصي</h1>
          <p className="text-muted-foreground text-sm mt-1">إدارة بيانات ملفك الشخصي</p>
        </div>
        <Button
          onClick={() => editing ? handleSave() : setEditing(true)}
          disabled={saving}
          className="gap-2"
        >
          {editing ? <Save size={16} /> : <Edit size={16} />}
          {editing ? (saving ? "جارٍ الحفظ..." : "حفظ التعديلات") : "تعديل الملف"}
        </Button>
      </div>

      {/* Profile Header */}
      <Card className="mb-6">
        <CardContent className="p-6">
          <div className="flex items-center gap-4">
            <Avatar className="h-20 w-20 border-2 border-secondary">
              <AvatarFallback className="bg-primary text-primary-foreground text-2xl">
                {lawyer.name.charAt(0)}
              </AvatarFallback>
            </Avatar>
            <div className="flex-1">
              {editing ? (
                <div className="grid grid-cols-2 gap-3">
                  <div className="space-y-1">
                    <Label className="text-xs">الاسم</Label>
                    <Input value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} />
                  </div>
                  <div className="space-y-1">
                    <Label className="text-xs">التخصص</Label>
                    <Input value={form.specialty} onChange={(e) => setForm({ ...form, specialty: e.target.value })} />
                  </div>
                </div>
              ) : (
                <>
                  <h2 className="text-xl font-bold text-foreground">{lawyer.name}</h2>
                  <p className="text-primary font-medium">{lawyer.specialty}</p>
                  <div className="flex flex-wrap gap-3 mt-2 text-sm text-muted-foreground">
                    <span className="flex items-center gap-1"><MapPin size={13} />{lawyer.city}</span>
                    <span className="flex items-center gap-1"><Briefcase size={13} />{lawyer.cases_count} قضية</span>
                    <span className="flex items-center gap-1"><Clock size={13} />{lawyer.experience_years} سنة خبرة</span>
                  </div>
                </>
              )}
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Contact Info */}
        <Card>
          <CardHeader>
            <CardTitle className="text-base">معلومات التواصل</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {editing ? (
              <>
                <div className="space-y-2">
                  <Label>المدينة</Label>
                  <Input value={form.city} onChange={(e) => setForm({ ...form, city: e.target.value })} />
                </div>
                <div className="space-y-2">
                  <Label>الجوال</Label>
                  <Input value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} dir="ltr" />
                </div>
                <div className="space-y-2">
                  <Label>البريد الإلكتروني</Label>
                  <Input value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} dir="ltr" type="email" />
                </div>
                <div className="space-y-2">
                  <Label>رقم الرخصة</Label>
                  <Input value={form.license_number} onChange={(e) => setForm({ ...form, license_number: e.target.value })} />
                </div>
              </>
            ) : (
              <div className="space-y-3">
                {[
                  { icon: Phone, label: "الجوال", value: lawyer.phone || "غير محدد" },
                  { icon: Mail, label: "البريد", value: lawyer.email || "غير محدد" },
                  { icon: MapPin, label: "المدينة", value: lawyer.city },
                  { icon: Award, label: "الرخصة", value: lawyer.license_number || "غير محدد" },
                ].map((item) => (
                  <div key={item.label} className="flex items-center gap-3">
                    <div className="w-8 h-8 bg-primary/10 rounded-lg flex items-center justify-center">
                      <item.icon size={14} className="text-primary" />
                    </div>
                    <div>
                      <p className="text-muted-foreground text-xs">{item.label}</p>
                      <p className="text-foreground text-sm">{item.value}</p>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>

        {/* Bio & Pricing */}
        <Card>
          <CardHeader>
            <CardTitle className="text-base">نبذة وتسعير</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {editing ? (
              <>
                <div className="space-y-2">
                  <Label>نبذة شخصية</Label>
                  <Textarea value={form.bio} onChange={(e) => setForm({ ...form, bio: e.target.value })} rows={4} />
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <div className="space-y-2">
                    <Label>سنوات الخبرة</Label>
                    <Input type="number" value={form.experience_years} onChange={(e) => setForm({ ...form, experience_years: parseInt(e.target.value) || 0 })} />
                  </div>
                  <div className="space-y-2">
                    <Label>السعر/ساعة (ريال)</Label>
                    <Input type="number" value={form.price_per_hour} onChange={(e) => setForm({ ...form, price_per_hour: parseInt(e.target.value) || 0 })} />
                  </div>
                </div>
              </>
            ) : (
              <>
                <div>
                  <p className="text-muted-foreground text-xs mb-1">النبذة</p>
                  <p className="text-foreground text-sm leading-relaxed">{lawyer.bio || "لا توجد نبذة"}</p>
                </div>
                <div className="grid grid-cols-2 gap-4 pt-2">
                  <div className="bg-muted/50 rounded-xl p-4 text-center">
                    <p className="text-2xl font-bold text-foreground">{lawyer.experience_years}</p>
                    <p className="text-muted-foreground text-xs">سنوات الخبرة</p>
                  </div>
                  <div className="bg-muted/50 rounded-xl p-4 text-center">
                    <p className="text-2xl font-bold text-foreground">{lawyer.price_per_hour} ريال</p>
                    <p className="text-muted-foreground text-xs">السعر/ساعة</p>
                  </div>
                </div>
              </>
            )}
          </CardContent>
        </Card>
      </div>

      {editing && (
        <div className="flex justify-end gap-3 mt-6">
          <Button variant="outline" onClick={() => { setEditing(false); setForm({ name: lawyer.name, specialty: lawyer.specialty, city: lawyer.city, phone: lawyer.phone || "", email: lawyer.email || "", bio: lawyer.bio || "", license_number: lawyer.license_number || "", experience_years: lawyer.experience_years, price_per_hour: lawyer.price_per_hour }); }}>
            إلغاء
          </Button>
          <Button onClick={handleSave} disabled={saving} className="gap-2">
            <Save size={16} />
            {saving ? "جارٍ الحفظ..." : "حفظ التعديلات"}
          </Button>
        </div>
      )}
    </div>
  );
};

export default LawyerProfilePage;
