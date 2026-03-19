import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Plus } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

interface AddLawyerDialogProps {
  onSuccess: () => void;
}

const AddLawyerDialog = ({ onSuccess }: AddLawyerDialogProps) => {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({
    name: "",
    specialty: "",
    city: "",
    phone: "",
    email: "",
    license_number: "",
    experience_years: 0,
    price_per_hour: 0,
    bio: "",
  });

  const handleChange = (field: string, value: string | number) => {
    setForm((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async () => {
    if (!form.name || !form.specialty || !form.city) {
      toast.error("يرجى تعبئة الحقول المطلوبة (الاسم، التخصص، المدينة)");
      return;
    }
    setLoading(true);
    const { error } = await supabase.from("lawyers").insert({
      name: form.name,
      specialty: form.specialty,
      city: form.city,
      phone: form.phone || null,
      email: form.email || null,
      license_number: form.license_number || null,
      experience_years: form.experience_years,
      price_per_hour: form.price_per_hour,
      bio: form.bio || null,
      is_active: true,
      is_verified: false,
    });
    setLoading(false);
    if (error) {
      toast.error("حدث خطأ أثناء إضافة المحامي");
    } else {
      toast.success("تم إضافة المحامي بنجاح");
      setOpen(false);
      setForm({ name: "", specialty: "", city: "", phone: "", email: "", license_number: "", experience_years: 0, price_per_hour: 0, bio: "" });
      onSuccess();
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="bg-primary text-primary-foreground gap-2">
          <Plus size={16} />
          إضافة محامي
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-lg max-h-[85vh] overflow-y-auto" dir="rtl">
        <DialogHeader>
          <DialogTitle>إضافة محامي جديد</DialogTitle>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label>الاسم *</Label>
              <Input value={form.name} onChange={(e) => handleChange("name", e.target.value)} placeholder="اسم المحامي" />
            </div>
            <div className="space-y-2">
              <Label>التخصص *</Label>
              <Input value={form.specialty} onChange={(e) => handleChange("specialty", e.target.value)} placeholder="القانون التجاري" />
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label>المدينة *</Label>
              <Input value={form.city} onChange={(e) => handleChange("city", e.target.value)} placeholder="الرياض" />
            </div>
            <div className="space-y-2">
              <Label>رقم الرخصة</Label>
              <Input value={form.license_number} onChange={(e) => handleChange("license_number", e.target.value)} placeholder="12345/ق" />
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label>الجوال</Label>
              <Input value={form.phone} onChange={(e) => handleChange("phone", e.target.value)} placeholder="+966 50 000 0000" dir="ltr" />
            </div>
            <div className="space-y-2">
              <Label>البريد الإلكتروني</Label>
              <Input value={form.email} onChange={(e) => handleChange("email", e.target.value)} placeholder="email@example.com" dir="ltr" type="email" />
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label>سنوات الخبرة</Label>
              <Input type="number" value={form.experience_years} onChange={(e) => handleChange("experience_years", parseInt(e.target.value) || 0)} min={0} />
            </div>
            <div className="space-y-2">
              <Label>السعر/ساعة (ريال)</Label>
              <Input type="number" value={form.price_per_hour} onChange={(e) => handleChange("price_per_hour", parseInt(e.target.value) || 0)} min={0} />
            </div>
          </div>
          <div className="space-y-2">
            <Label>نبذة</Label>
            <Textarea value={form.bio} onChange={(e) => handleChange("bio", e.target.value)} placeholder="نبذة عن المحامي..." rows={3} />
          </div>
          <Button onClick={handleSubmit} disabled={loading} className="w-full">
            {loading ? "جارٍ الإضافة..." : "إضافة المحامي"}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default AddLawyerDialog;
