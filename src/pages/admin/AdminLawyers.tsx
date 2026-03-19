import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Search, CheckCircle2, XCircle, Trash2 } from "lucide-react";
import { toast } from "sonner";
import AddLawyerDialog from "@/components/admin/AddLawyerDialog";

interface Lawyer {
  id: string;
  name: string;
  specialty: string;
  city: string;
  phone: string | null;
  email: string | null;
  license_number: string | null;
  experience_years: number;
  price_per_hour: number;
  is_verified: boolean;
  is_active: boolean;
  created_at: string;
}

const AdminLawyers = () => {
  const [lawyers, setLawyers] = useState<Lawyer[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");

  const fetchLawyers = async () => {
    const { data, error } = await supabase
      .from("lawyers")
      .select("*")
      .order("created_at", { ascending: false });
    if (error) {
      toast.error("خطأ في تحميل البيانات");
    } else {
      setLawyers(data || []);
    }
    setLoading(false);
  };

  useEffect(() => { fetchLawyers(); }, []);

  const toggleVerified = async (id: string, current: boolean) => {
    await supabase.from("lawyers").update({ is_verified: !current }).eq("id", id);
    toast.success(current ? "تم إلغاء التوثيق" : "تم التوثيق");
    fetchLawyers();
  };

  const toggleActive = async (id: string, current: boolean) => {
    await supabase.from("lawyers").update({ is_active: !current }).eq("id", id);
    toast.success(current ? "تم تعطيل المحامي" : "تم تفعيل المحامي");
    fetchLawyers();
  };

  const deleteLawyer = async (id: string) => {
    if (!confirm("هل أنت متأكد من حذف هذا المحامي؟")) return;
    await supabase.from("lawyers").delete().eq("id", id);
    toast.success("تم حذف المحامي");
    fetchLawyers();
  };

  const filtered = lawyers.filter((l) =>
    l.name.includes(search) || l.specialty.includes(search) || l.city.includes(search)
  );

  return (
    <div>
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6">
        <div>
          <h1 className="text-2xl font-bold text-foreground">إدارة المحامين</h1>
          <p className="text-muted-foreground text-sm mt-1">{lawyers.length} محامي مسجل</p>
        </div>
        <AddLawyerDialog onSuccess={fetchLawyers} />
      </div>

      <Card>
        <CardHeader className="pb-3">
          <div className="relative max-w-sm">
            <Search className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground" size={16} />
            <Input
              placeholder="بحث بالاسم أو التخصص أو المدينة..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="pr-9"
            />
          </div>
        </CardHeader>
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="text-right">الاسم</TableHead>
                  <TableHead className="text-right">التخصص</TableHead>
                  <TableHead className="text-right">المدينة</TableHead>
                  <TableHead className="text-right">الخبرة</TableHead>
                  <TableHead className="text-right">السعر/ساعة</TableHead>
                  <TableHead className="text-right">الحالة</TableHead>
                  <TableHead className="text-right">إجراءات</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {loading ? (
                  <TableRow>
                    <TableCell colSpan={7} className="text-center py-8 text-muted-foreground">جارٍ التحميل...</TableCell>
                  </TableRow>
                ) : filtered.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={7} className="text-center py-8 text-muted-foreground">لا يوجد محامين</TableCell>
                  </TableRow>
                ) : (
                  filtered.map((lawyer) => (
                    <TableRow key={lawyer.id}>
                      <TableCell className="font-medium">{lawyer.name}</TableCell>
                      <TableCell>{lawyer.specialty}</TableCell>
                      <TableCell>{lawyer.city}</TableCell>
                      <TableCell>{lawyer.experience_years} سنة</TableCell>
                      <TableCell>{lawyer.price_per_hour} ريال</TableCell>
                      <TableCell>
                        <div className="flex gap-1.5">
                          <Badge variant={lawyer.is_active ? "default" : "secondary"} className="text-[10px]">
                            {lawyer.is_active ? "نشط" : "معطل"}
                          </Badge>
                          {lawyer.is_verified && (
                            <Badge className="bg-green-100 text-green-700 text-[10px]">موثق</Badge>
                          )}
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex gap-1">
                          <Button
                            variant="ghost"
                            size="icon"
                            className="h-8 w-8"
                            onClick={() => toggleVerified(lawyer.id, lawyer.is_verified)}
                            title={lawyer.is_verified ? "إلغاء التوثيق" : "توثيق"}
                          >
                            <CheckCircle2 size={14} className={lawyer.is_verified ? "text-green-600" : "text-muted-foreground"} />
                          </Button>
                          <Button
                            variant="ghost"
                            size="icon"
                            className="h-8 w-8"
                            onClick={() => toggleActive(lawyer.id, lawyer.is_active)}
                            title={lawyer.is_active ? "تعطيل" : "تفعيل"}
                          >
                            <XCircle size={14} className={lawyer.is_active ? "text-muted-foreground" : "text-destructive"} />
                          </Button>
                          <Button variant="ghost" size="icon" className="h-8 w-8" onClick={() => deleteLawyer(lawyer.id)}>
                            <Trash2 size={14} className="text-destructive" />
                          </Button>
                        </div>
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

export default AdminLawyers;
