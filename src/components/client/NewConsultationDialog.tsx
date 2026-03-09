import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/hooks/useAuth";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Plus, Loader2 } from "lucide-react";
import { toast } from "sonner";

interface Lawyer {
  id: string;
  name: string;
  specialty: string;
  price_per_hour: number;
}

interface NewConsultationDialogProps {
  onCreated?: () => void;
}

const NewConsultationDialog = ({ onCreated }: NewConsultationDialogProps) => {
  const { user } = useAuth();
  const [open, setOpen] = useState(false);
  const [lawyers, setLawyers] = useState<Lawyer[]>([]);
  const [loading, setLoading] = useState(false);

  const [subject, setSubject] = useState("");
  const [lawyerId, setLawyerId] = useState("");
  const [notes, setNotes] = useState("");
  const [scheduledAt, setScheduledAt] = useState("");

  useEffect(() => {
    if (!open) return;
    supabase
      .from("lawyers")
      .select("id, name, specialty, price_per_hour")
      .eq("is_active", true)
      .then(({ data }) => setLawyers(data || []));
  }, [open]);

  const selectedLawyer = lawyers.find((l) => l.id === lawyerId);

  const handleSubmit = async () => {
    if (!user || !subject.trim() || !lawyerId) {
      toast.error("يرجى تعبئة جميع الحقول المطلوبة");
      return;
    }

    setLoading(true);
    const { error } = await supabase.from("consultations").insert({
      client_id: user.id,
      lawyer_id: lawyerId,
      subject: subject.trim(),
      notes: notes.trim() || null,
      price: selectedLawyer?.price_per_hour || 0,
      scheduled_at: scheduledAt || null,
    });

    setLoading(false);

    if (error) {
      toast.error("حدث خطأ أثناء إنشاء الاستشارة");
      console.error(error);
      return;
    }

    toast.success("تم إنشاء الاستشارة بنجاح");
    setOpen(false);
    setSubject("");
    setLawyerId("");
    setNotes("");
    setScheduledAt("");
    onCreated?.();
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="gap-2">
          <Plus size={16} />
          طلب استشارة جديدة
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-md" dir="rtl">
        <DialogHeader>
          <DialogTitle className="text-right">طلب استشارة جديدة</DialogTitle>
        </DialogHeader>
        <div className="space-y-4 mt-2">
          <div className="space-y-2">
            <Label>موضوع الاستشارة *</Label>
            <Input
              placeholder="مثال: استشارة عقارية"
              value={subject}
              onChange={(e) => setSubject(e.target.value)}
            />
          </div>

          <div className="space-y-2">
            <Label>اختر المحامي *</Label>
            <Select value={lawyerId} onValueChange={setLawyerId}>
              <SelectTrigger>
                <SelectValue placeholder="اختر محامي" />
              </SelectTrigger>
              <SelectContent>
                {lawyers.map((l) => (
                  <SelectItem key={l.id} value={l.id}>
                    {l.name} — {l.specialty} ({l.price_per_hour} ر.س/ساعة)
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {selectedLawyer && (
            <div className="bg-muted rounded-lg p-3 text-sm">
              <span className="text-muted-foreground">تكلفة الاستشارة: </span>
              <span className="font-bold text-foreground">{selectedLawyer.price_per_hour} ر.س</span>
            </div>
          )}

          <div className="space-y-2">
            <Label>موعد مفضل (اختياري)</Label>
            <Input
              type="datetime-local"
              value={scheduledAt}
              onChange={(e) => setScheduledAt(e.target.value)}
            />
          </div>

          <div className="space-y-2">
            <Label>ملاحظات إضافية (اختياري)</Label>
            <Textarea
              placeholder="أضف تفاصيل إضافية..."
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              rows={3}
            />
          </div>

          <Button onClick={handleSubmit} disabled={loading} className="w-full">
            {loading ? <Loader2 className="animate-spin" size={16} /> : "إرسال الطلب"}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default NewConsultationDialog;
