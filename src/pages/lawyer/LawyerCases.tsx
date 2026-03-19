import { useState, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Inbox, Clock, CheckCircle2, XCircle, Eye, Phone, MessageSquare, User } from "lucide-react";
import { useAuth } from "@/hooks/useAuth";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { Skeleton } from "@/components/ui/skeleton";

interface CaseRequest {
  id: string;
  title: string;
  description: string;
  status: string;
  contact_method: string;
  client_name: string;
  client_phone: string | null;
  budget: number;
  notes: string | null;
  created_at: string;
  service_id: string | null;
}

const statusConfig: Record<string, { label: string; variant: "default" | "secondary" | "destructive" | "outline"; icon: any }> = {
  pending: { label: "جديد", variant: "secondary", icon: Clock },
  accepted: { label: "مقبول", variant: "default", icon: CheckCircle2 },
  rejected: { label: "مرفوض", variant: "destructive", icon: XCircle },
  in_progress: { label: "قيد التنفيذ", variant: "default", icon: Clock },
  completed: { label: "مكتمل", variant: "outline", icon: CheckCircle2 },
};

const LawyerCases = () => {
  const { user } = useAuth();
  const [cases, setCases] = useState<CaseRequest[]>([]);
  const [loading, setLoading] = useState(true);
  const [lawyerId, setLawyerId] = useState<string | null>(null);
  const [selectedCase, setSelectedCase] = useState<CaseRequest | null>(null);
  const [detailOpen, setDetailOpen] = useState(false);
  const [tab, setTab] = useState("all");

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
        await fetchCases(lawyer.id);
      }
      setLoading(false);
    };
    init();
  }, [user]);

  const fetchCases = async (lid: string) => {
    const { data } = await supabase
      .from("case_requests")
      .select("*")
      .eq("lawyer_id", lid)
      .order("created_at", { ascending: false });
    setCases(data || []);
  };

  const updateStatus = async (id: string, status: string) => {
    const { error } = await supabase
      .from("case_requests")
      .update({ status, updated_at: new Date().toISOString() })
      .eq("id", id);
    if (error) {
      toast.error("حدث خطأ");
    } else {
      toast.success(`تم تحديث الحالة إلى: ${statusConfig[status]?.label || status}`);
      if (lawyerId) fetchCases(lawyerId);
      if (selectedCase?.id === id) {
        setSelectedCase({ ...selectedCase, status });
      }
    }
  };

  const addNote = async (id: string, notes: string) => {
    await supabase.from("case_requests").update({ notes, updated_at: new Date().toISOString() }).eq("id", id);
    toast.success("تم حفظ الملاحظات");
    if (lawyerId) fetchCases(lawyerId);
  };

  const filteredCases = tab === "all" ? cases : cases.filter((c) => c.status === tab);

  const counts = {
    all: cases.length,
    pending: cases.filter((c) => c.status === "pending").length,
    accepted: cases.filter((c) => c.status === "accepted").length,
    in_progress: cases.filter((c) => c.status === "in_progress").length,
    completed: cases.filter((c) => c.status === "completed").length,
  };

  if (loading) {
    return (
      <div className="space-y-4">
        <Skeleton className="h-8 w-48" />
        <Skeleton className="h-12 w-full" />
        {[1, 2, 3].map((i) => <Skeleton key={i} className="h-24 w-full" />)}
      </div>
    );
  }

  if (!lawyerId) {
    return (
      <div>
        <h1 className="text-2xl font-bold text-foreground mb-4">القضايا</h1>
        <Card><CardContent className="p-8 text-center text-muted-foreground">لا يوجد ملف محامي مرتبط بحسابك</CardContent></Card>
      </div>
    );
  }

  return (
    <div>
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-foreground">إدارة القضايا</h1>
        <p className="text-muted-foreground text-sm mt-1">استقبال وإدارة طلبات القضايا من العملاء</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-6">
        {[
          { label: "جديدة", count: counts.pending, color: "text-secondary" },
          { label: "مقبولة", count: counts.accepted, color: "text-primary" },
          { label: "قيد التنفيذ", count: counts.in_progress, color: "text-primary" },
          { label: "مكتملة", count: counts.completed, color: "text-muted-foreground" },
        ].map((s) => (
          <Card key={s.label}>
            <CardContent className="p-4 text-center">
              <p className={`text-2xl font-bold ${s.color}`}>{s.count}</p>
              <p className="text-muted-foreground text-xs">{s.label}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      <Tabs value={tab} onValueChange={setTab} dir="rtl">
        <TabsList className="mb-4 w-full sm:w-auto">
          <TabsTrigger value="all">الكل ({counts.all})</TabsTrigger>
          <TabsTrigger value="pending">جديدة ({counts.pending})</TabsTrigger>
          <TabsTrigger value="accepted">مقبولة ({counts.accepted})</TabsTrigger>
          <TabsTrigger value="in_progress">قيد التنفيذ ({counts.in_progress})</TabsTrigger>
          <TabsTrigger value="completed">مكتملة ({counts.completed})</TabsTrigger>
        </TabsList>

        <TabsContent value={tab}>
          {filteredCases.length === 0 ? (
            <Card>
              <CardContent className="p-12 text-center">
                <Inbox size={40} className="mx-auto text-muted-foreground/30 mb-4" />
                <p className="text-muted-foreground">لا توجد قضايا {tab !== "all" ? `بحالة "${statusConfig[tab]?.label}"` : ""}</p>
              </CardContent>
            </Card>
          ) : (
            <div className="space-y-3">
              {filteredCases.map((c) => {
                const st = statusConfig[c.status] || statusConfig.pending;
                const StIcon = st.icon;
                return (
                  <Card key={c.id} className="hover:shadow-sm transition-shadow">
                    <CardContent className="p-4">
                      <div className="flex items-start justify-between gap-4">
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-1">
                            <h3 className="font-bold text-foreground">{c.title}</h3>
                            <Badge variant={st.variant} className="text-[10px] gap-1">
                              <StIcon size={10} />
                              {st.label}
                            </Badge>
                          </div>
                          <p className="text-muted-foreground text-sm mb-2 line-clamp-2">{c.description}</p>
                          <div className="flex flex-wrap items-center gap-3 text-xs text-muted-foreground">
                            <span className="flex items-center gap-1"><User size={12} />{c.client_name}</span>
                            {c.contact_method === "call" && <span className="flex items-center gap-1"><Phone size={12} />{c.client_phone}</span>}
                            {c.contact_method === "chat" && <span className="flex items-center gap-1"><MessageSquare size={12} />تواصل عبر الموقع</span>}
                            {c.budget > 0 && <span className="font-medium text-primary">{c.budget} ريال</span>}
                            <span>{new Date(c.created_at).toLocaleDateString("ar-SA")}</span>
                          </div>
                        </div>
                        <div className="flex gap-1 shrink-0">
                          <Button
                            variant="ghost"
                            size="icon"
                            className="h-8 w-8"
                            onClick={() => { setSelectedCase(c); setDetailOpen(true); }}
                          >
                            <Eye size={14} />
                          </Button>
                          {c.status === "pending" && (
                            <>
                              <Button size="sm" className="h-8 text-xs" onClick={() => updateStatus(c.id, "accepted")}>
                                قبول
                              </Button>
                              <Button size="sm" variant="outline" className="h-8 text-xs text-destructive" onClick={() => updateStatus(c.id, "rejected")}>
                                رفض
                              </Button>
                            </>
                          )}
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          )}
        </TabsContent>
      </Tabs>

      {/* Case Detail Dialog */}
      <Dialog open={detailOpen} onOpenChange={setDetailOpen}>
        <DialogContent className="max-w-lg max-h-[85vh] overflow-y-auto" dir="rtl">
          {selectedCase && (
            <>
              <DialogHeader>
                <DialogTitle>{selectedCase.title}</DialogTitle>
              </DialogHeader>
              <div className="space-y-4 py-4">
                <div>
                  <p className="text-xs text-muted-foreground mb-1">الوصف</p>
                  <p className="text-foreground text-sm">{selectedCase.description || "بدون وصف"}</p>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-xs text-muted-foreground mb-1">العميل</p>
                    <p className="text-foreground text-sm">{selectedCase.client_name}</p>
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground mb-1">طريقة التواصل</p>
                    <p className="text-foreground text-sm flex items-center gap-1">
                      {selectedCase.contact_method === "call" ? <><Phone size={13} /> {selectedCase.client_phone}</> : <><MessageSquare size={13} /> عبر الموقع</>}
                    </p>
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground mb-1">الميزانية</p>
                    <p className="text-foreground text-sm">{selectedCase.budget > 0 ? `${selectedCase.budget} ريال` : "غير محدد"}</p>
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground mb-1">التاريخ</p>
                    <p className="text-foreground text-sm">{new Date(selectedCase.created_at).toLocaleDateString("ar-SA")}</p>
                  </div>
                </div>

                <div>
                  <p className="text-xs text-muted-foreground mb-2">تحديث الحالة</p>
                  <Select value={selectedCase.status} onValueChange={(v) => updateStatus(selectedCase.id, v)}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="pending">جديد</SelectItem>
                      <SelectItem value="accepted">مقبول</SelectItem>
                      <SelectItem value="in_progress">قيد التنفيذ</SelectItem>
                      <SelectItem value="completed">مكتمل</SelectItem>
                      <SelectItem value="rejected">مرفوض</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <p className="text-xs text-muted-foreground mb-2">ملاحظات المحامي</p>
                  <Textarea
                    defaultValue={selectedCase.notes || ""}
                    placeholder="أضف ملاحظاتك..."
                    rows={3}
                    onBlur={(e) => addNote(selectedCase.id, e.target.value)}
                  />
                </div>
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default LawyerCases;
