import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Plus, Edit, Trash2, Phone, MessageSquare, DollarSign } from "lucide-react";
import { useAuth } from "@/hooks/useAuth";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { Skeleton } from "@/components/ui/skeleton";

interface LawyerService {
  id: string;
  title: string;
  description: string;
  price: number;
  allow_chat: boolean;
  allow_call: boolean;
  is_active: boolean;
  created_at: string;
}

const emptyForm = {
  title: "",
  description: "",
  price: 0,
  allow_chat: true,
  allow_call: false,
  is_active: true,
};

const LawyerServices = () => {
  const { user } = useAuth();
  const [services, setServices] = useState<LawyerService[]>([]);
  const [loading, setLoading] = useState(true);
  const [lawyerId, setLawyerId] = useState<string | null>(null);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [saving, setSaving] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [form, setForm] = useState(emptyForm);

  useEffect(() => {
    if (!user) return;
    const init = async () => {
      const { data: lawyer } = await supabase
        .from("lawyers")
        .select("id")
        .eq("user_id", user.id)
        .maybeSingle();
      if (lawyer) {
        setLawyerId(lawyer.id);
        await fetchServices(lawyer.id);
      }
      setLoading(false);
    };
    init();
  }, [user]);

  const fetchServices = async (lid: string) => {
    const { data } = await supabase
      .from("lawyer_services")
      .select("*")
      .eq("lawyer_id", lid)
      .order("created_at", { ascending: false });
    setServices(data || []);
  };

  const openAdd = () => {
    setEditingId(null);
    setForm(emptyForm);
    setDialogOpen(true);
  };

  const openEdit = (s: LawyerService) => {
    setEditingId(s.id);
    setForm({
      title: s.title,
      description: s.description,
      price: s.price,
      allow_chat: s.allow_chat,
      allow_call: s.allow_call,
      is_active: s.is_active,
    });
    setDialogOpen(true);
  };

  const handleSave = async () => {
    if (!lawyerId || !form.title) {
      toast.error("يرجى إدخال اسم الخدمة");
      return;
    }
    setSaving(true);
    if (editingId) {
      const { error } = await supabase
        .from("lawyer_services")
        .update({ ...form, updated_at: new Date().toISOString() })
        .eq("id", editingId);
      if (error) toast.error("خطأ في التحديث");
      else toast.success("تم تحديث الخدمة");
    } else {
      const { error } = await supabase
        .from("lawyer_services")
        .insert({ ...form, lawyer_id: lawyerId });
      if (error) toast.error("خطأ في الإضافة");
      else toast.success("تم إضافة الخدمة");
    }
    setSaving(false);
    setDialogOpen(false);
    fetchServices(lawyerId);
  };

  const handleDelete = async (id: string) => {
    if (!confirm("هل تريد حذف هذه الخدمة؟")) return;
    await supabase.from("lawyer_services").delete().eq("id", id);
    toast.success("تم حذف الخدمة");
    if (lawyerId) fetchServices(lawyerId);
  };

  const toggleActive = async (id: string, current: boolean) => {
    await supabase.from("lawyer_services").update({ is_active: !current }).eq("id", id);
    toast.success(current ? "تم إيقاف الخدمة" : "تم تفعيل الخدمة");
    if (lawyerId) fetchServices(lawyerId);
  };

  if (loading) {
    return (
      <div className="space-y-4">
        <Skeleton className="h-8 w-48" />
        <div className="grid gap-4">
          {[1, 2, 3].map((i) => <Skeleton key={i} className="h-32 w-full" />)}
        </div>
      </div>
    );
  }

  if (!lawyerId) {
    return (
      <div>
        <h1 className="text-2xl font-bold text-foreground mb-4">خدماتي</h1>
        <Card><CardContent className="p-8 text-center text-muted-foreground">لا يوجد ملف محامي مرتبط بحسابك</CardContent></Card>
      </div>
    );
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-foreground">خدماتي</h1>
          <p className="text-muted-foreground text-sm mt-1">{services.length} خدمة</p>
        </div>
        <Button onClick={openAdd} className="gap-2">
          <Plus size={16} />
          إضافة خدمة
        </Button>
      </div>

      {services.length === 0 ? (
        <Card>
          <CardContent className="p-12 text-center">
            <DollarSign size={40} className="mx-auto text-muted-foreground/30 mb-4" />
            <p className="text-muted-foreground mb-4">لم تضف أي خدمات بعد</p>
            <Button onClick={openAdd} variant="outline" className="gap-2">
              <Plus size={16} />
              أضف خدمتك الأولى
            </Button>
          </CardContent>
        </Card>
      ) : (
        <div className="grid gap-4">
          {services.map((s) => (
            <Card key={s.id} className={!s.is_active ? "opacity-60" : ""}>
              <CardContent className="p-5">
                <div className="flex items-start justify-between gap-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <h3 className="font-bold text-foreground text-lg">{s.title}</h3>
                      <Badge variant={s.is_active ? "default" : "secondary"} className="text-[10px]">
                        {s.is_active ? "نشطة" : "متوقفة"}
                      </Badge>
                    </div>
                    <p className="text-muted-foreground text-sm mb-3">{s.description || "بدون وصف"}</p>
                    <div className="flex items-center gap-4 text-sm">
                      <span className="font-bold text-primary">{s.price} ريال</span>
                      <div className="flex items-center gap-2">
                        {s.allow_chat && (
                          <span className="flex items-center gap-1 text-muted-foreground">
                            <MessageSquare size={13} /> تواصل عبر الموقع
                          </span>
                        )}
                        {s.allow_call && (
                          <span className="flex items-center gap-1 text-muted-foreground">
                            <Phone size={13} /> اتصال هاتفي
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                  <div className="flex gap-1 shrink-0">
                    <Button variant="ghost" size="icon" className="h-8 w-8" onClick={() => openEdit(s)}>
                      <Edit size={14} />
                    </Button>
                    <Button variant="ghost" size="icon" className="h-8 w-8" onClick={() => toggleActive(s.id, s.is_active)}>
                      <Badge variant={s.is_active ? "default" : "outline"} className="text-[9px] cursor-pointer">
                        {s.is_active ? "إيقاف" : "تفعيل"}
                      </Badge>
                    </Button>
                    <Button variant="ghost" size="icon" className="h-8 w-8" onClick={() => handleDelete(s.id)}>
                      <Trash2 size={14} className="text-destructive" />
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      {/* Add/Edit Dialog */}
      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent className="max-w-md" dir="rtl">
          <DialogHeader>
            <DialogTitle>{editingId ? "تعديل الخدمة" : "إضافة خدمة جديدة"}</DialogTitle>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="space-y-2">
              <Label>اسم الخدمة *</Label>
              <Input value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} placeholder="مثال: استشارة قانونية أولية" />
            </div>
            <div className="space-y-2">
              <Label>وصف الخدمة</Label>
              <Textarea value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} placeholder="وصف مختصر للخدمة..." rows={3} />
            </div>
            <div className="space-y-2">
              <Label>السعر (ريال)</Label>
              <Input type="number" value={form.price} onChange={(e) => setForm({ ...form, price: parseInt(e.target.value) || 0 })} min={0} />
            </div>
            <div className="space-y-3 border-t pt-4">
              <Label className="text-sm font-bold">طرق التواصل المسموحة</Label>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <MessageSquare size={16} className="text-primary" />
                  <Label>تواصل عبر الموقع</Label>
                </div>
                <Switch checked={form.allow_chat} onCheckedChange={(v) => setForm({ ...form, allow_chat: v })} />
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Phone size={16} className="text-primary" />
                  <Label>اتصال هاتفي</Label>
                </div>
                <Switch checked={form.allow_call} onCheckedChange={(v) => setForm({ ...form, allow_call: v })} />
              </div>
            </div>
            <Button onClick={handleSave} disabled={saving} className="w-full">
              {saving ? "جارٍ الحفظ..." : editingId ? "تحديث الخدمة" : "إضافة الخدمة"}
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default LawyerServices;
