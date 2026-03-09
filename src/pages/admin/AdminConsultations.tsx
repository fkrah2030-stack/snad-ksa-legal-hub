import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Search } from "lucide-react";

interface Consultation {
  id: string;
  subject: string;
  status: string;
  price: number;
  created_at: string;
  scheduled_at: string | null;
  profiles: { full_name: string } | null;
  lawyers: { name: string } | null;
}

const statusMap: Record<string, { label: string; variant: "default" | "secondary" | "destructive" | "outline" }> = {
  pending: { label: "معلقة", variant: "secondary" },
  in_progress: { label: "جارية", variant: "default" },
  completed: { label: "مكتملة", variant: "outline" },
  cancelled: { label: "ملغاة", variant: "destructive" },
};

const AdminConsultations = () => {
  const [consultations, setConsultations] = useState<Consultation[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");

  useEffect(() => {
    const fetch = async () => {
      const { data } = await supabase
        .from("consultations")
        .select("*, profiles:client_id(full_name), lawyers:lawyer_id(name)")
        .order("created_at", { ascending: false });
      setConsultations((data as unknown as Consultation[]) || []);
      setLoading(false);
    };
    fetch();
  }, []);

  const filtered = consultations.filter((c) =>
    c.subject?.includes(search) || c.profiles?.full_name?.includes(search) || c.lawyers?.name?.includes(search)
  );

  return (
    <div>
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-foreground">إدارة الاستشارات</h1>
        <p className="text-muted-foreground text-sm mt-1">{consultations.length} استشارة</p>
      </div>

      <Card>
        <CardHeader className="pb-3">
          <div className="relative max-w-sm">
            <Search className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground" size={16} />
            <Input placeholder="بحث..." value={search} onChange={(e) => setSearch(e.target.value)} className="pr-9" />
          </div>
        </CardHeader>
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="text-right">الموضوع</TableHead>
                  <TableHead className="text-right">العميل</TableHead>
                  <TableHead className="text-right">المحامي</TableHead>
                  <TableHead className="text-right">الحالة</TableHead>
                  <TableHead className="text-right">السعر</TableHead>
                  <TableHead className="text-right">التاريخ</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {loading ? (
                  <TableRow>
                    <TableCell colSpan={6} className="text-center py-8 text-muted-foreground">جارٍ التحميل...</TableCell>
                  </TableRow>
                ) : filtered.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={6} className="text-center py-8 text-muted-foreground">لا توجد استشارات</TableCell>
                  </TableRow>
                ) : (
                  filtered.map((c) => (
                    <TableRow key={c.id}>
                      <TableCell className="font-medium">{c.subject || "—"}</TableCell>
                      <TableCell>{c.profiles?.full_name || "—"}</TableCell>
                      <TableCell>{c.lawyers?.name || "—"}</TableCell>
                      <TableCell>
                        <Badge variant={statusMap[c.status]?.variant || "secondary"} className="text-[10px]">
                          {statusMap[c.status]?.label || c.status}
                        </Badge>
                      </TableCell>
                      <TableCell>{c.price} ريال</TableCell>
                      <TableCell className="text-muted-foreground text-xs">
                        {new Date(c.created_at).toLocaleDateString("ar-SA")}
                      </TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default AdminConsultations;
