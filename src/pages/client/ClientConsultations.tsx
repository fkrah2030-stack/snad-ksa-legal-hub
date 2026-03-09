import { useEffect, useState, useCallback } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/hooks/useAuth";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";
import NewConsultationDialog from "@/components/client/NewConsultationDialog";

const statusMap: Record<string, { label: string; variant: "default" | "secondary" | "destructive" | "outline" }> = {
  pending: { label: "قيد الانتظار", variant: "secondary" },
  active: { label: "نشط", variant: "default" },
  completed: { label: "مكتمل", variant: "outline" },
  cancelled: { label: "ملغي", variant: "destructive" },
};

const ClientConsultations = () => {
  const { user } = useAuth();
  const [consultations, setConsultations] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");

  const fetchData = useCallback(async () => {
    if (!user) return;
    setLoading(true);
    const { data } = await supabase
      .from("consultations")
      .select("*")
      .eq("client_id", user.id)
      .order("created_at", { ascending: false });
    setConsultations(data || []);
    setLoading(false);
  }, [user]);

  useEffect(() => { fetchData(); }, [fetchData]);

  const filtered = consultations.filter((c) => c.subject?.includes(search));

  return (
    <div>
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-foreground">استشاراتي</h1>
        <p className="text-muted-foreground text-sm mt-1">
          استشاراتي ({consultations.length} استشارة)
        </p>
      </div>

      <Card>
        <CardHeader className="pb-3">
          <div className="relative max-w-sm">
            <Search className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground" size={16} />
            <Input placeholder="بحث ..." value={search} onChange={(e) => setSearch(e.target.value)} className="pr-9" />
          </div>
        </CardHeader>
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="text-right">#</TableHead>
                  <TableHead className="text-right">الموضوع</TableHead>
                  <TableHead className="text-right">تاريخ الطلب</TableHead>
                  <TableHead className="text-right">المبلغ</TableHead>
                  <TableHead className="text-right">الحالة</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {loading ? (
                  <TableRow>
                    <TableCell colSpan={5} className="text-center py-8 text-muted-foreground">جارٍ التحميل...</TableCell>
                  </TableRow>
                ) : filtered.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={5} className="text-center py-8 text-muted-foreground">لا توجد استشارات</TableCell>
                  </TableRow>
                ) : (
                  filtered.map((c, i) => {
                    const s = statusMap[c.status] || statusMap.pending;
                    return (
                      <TableRow key={c.id}>
                        <TableCell className="font-medium">{i + 1}</TableCell>
                        <TableCell className="text-primary font-medium">{c.subject || "—"}</TableCell>
                        <TableCell className="text-muted-foreground text-xs">
                          {new Date(c.created_at).toLocaleDateString("ar-SA")}
                        </TableCell>
                        <TableCell className="font-medium">{c.price.toLocaleString()} ر.س</TableCell>
                        <TableCell>
                          <Badge variant={s.variant} className="text-[10px]">
                            <span className="w-1.5 h-1.5 rounded-full bg-current ml-1 inline-block" />
                            {s.label}
                          </Badge>
                        </TableCell>
                      </TableRow>
                    );
                  })
                )}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ClientConsultations;
