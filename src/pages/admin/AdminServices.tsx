import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Plus, Eye, EyeOff, Trash2, ArrowUp, ArrowDown } from "lucide-react";
import { toast } from "sonner";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";

interface Service {
  id: string;
  title: string;
  description: string;
  icon: string;
  is_published: boolean;
  sort_order: number;
  created_at: string;
}

const AdminServices = () => {
  const [services, setServices] = useState<Service[]>([]);
  const [loading, setLoading] = useState(true);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [newTitle, setNewTitle] = useState("");
  const [newDesc, setNewDesc] = useState("");
  const [newIcon, setNewIcon] = useState("Scale");

  const fetchServices = async () => {
    const { data } = await supabase.from("services").select("*").order("sort_order", { ascending: true });
    setServices(data || []);
    setLoading(false);
  };

  useEffect(() => { fetchServices(); }, []);

  const addService = async () => {
    if (!newTitle.trim()) { toast.error("أدخل عنوان الخدمة"); return; }
    const maxOrder = services.length > 0 ? Math.max(...services.map(s => s.sort_order)) : 0;
    const { error } = await supabase.from("services").insert({
      title: newTitle,
      description: newDesc,
      icon: newIcon,
      sort_order: maxOrder + 1,
      is_published: false,
    });
    if (error) toast.error("خطأ في الإضافة");
    else { toast.success("تمت الإضافة"); setDialogOpen(false); setNewTitle(""); setNewDesc(""); fetchServices(); }
  };

  const togglePublish = async (id: string, current: boolean) => {
    await supabase.from("services").update({ is_published: !current }).eq("id", id);
    toast.success(current ? "تم سحب النشر" : "تم النشر");
    fetchServices();
  };

  const deleteService = async (id: string) => {
    if (!confirm("هل أنت متأكد؟")) return;
    await supabase.from("services").delete().eq("id", id);
    toast.success("تم الحذف");
    fetchServices();
  };

  const moveOrder = async (id: string, direction: "up" | "down") => {
    const idx = services.findIndex(s => s.id === id);
    if ((direction === "up" && idx === 0) || (direction === "down" && idx === services.length - 1)) return;
    const swapIdx = direction === "up" ? idx - 1 : idx + 1;
    const a = services[idx];
    const b = services[swapIdx];
    await Promise.all([
      supabase.from("services").update({ sort_order: b.sort_order }).eq("id", a.id),
      supabase.from("services").update({ sort_order: a.sort_order }).eq("id", b.id),
    ]);
    fetchServices();
  };

  const iconOptions = ["Scale", "Landmark", "Briefcase", "Users", "Building2", "Gavel", "Shield", "FileText"];

  return (
    <div>
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6">
        <div>
          <h1 className="text-2xl font-bold text-foreground">إدارة الخدمات</h1>
          <p className="text-muted-foreground text-sm mt-1">{services.length} خدمة</p>
        </div>
        <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
          <DialogTrigger asChild>
            <Button className="bg-primary text-primary-foreground gap-2">
              <Plus size={16} /> إضافة خدمة
            </Button>
          </DialogTrigger>
          <DialogContent dir="rtl">
            <DialogHeader>
              <DialogTitle>إضافة خدمة جديدة</DialogTitle>
            </DialogHeader>
            <div className="space-y-4 mt-4">
              <div>
                <label className="text-sm font-medium mb-1 block">العنوان</label>
                <Input value={newTitle} onChange={(e) => setNewTitle(e.target.value)} placeholder="عنوان الخدمة" />
              </div>
              <div>
                <label className="text-sm font-medium mb-1 block">الوصف</label>
                <Textarea value={newDesc} onChange={(e) => setNewDesc(e.target.value)} placeholder="وصف الخدمة" />
              </div>
              <div>
                <label className="text-sm font-medium mb-1 block">الأيقونة</label>
                <div className="flex flex-wrap gap-2">
                  {iconOptions.map((icon) => (
                    <button
                      key={icon}
                      onClick={() => setNewIcon(icon)}
                      className={`px-3 py-1.5 rounded-lg text-xs border transition-colors ${
                        newIcon === icon ? "bg-primary text-primary-foreground border-primary" : "border-border hover:bg-muted"
                      }`}
                    >
                      {icon}
                    </button>
                  ))}
                </div>
              </div>
              <Button onClick={addService} className="w-full">إضافة</Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      <Card>
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="text-right">الترتيب</TableHead>
                  <TableHead className="text-right">العنوان</TableHead>
                  <TableHead className="text-right">الوصف</TableHead>
                  <TableHead className="text-right">الحالة</TableHead>
                  <TableHead className="text-right">إجراءات</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {loading ? (
                  <TableRow>
                    <TableCell colSpan={5} className="text-center py-8 text-muted-foreground">جارٍ التحميل...</TableCell>
                  </TableRow>
                ) : services.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={5} className="text-center py-8 text-muted-foreground">لا توجد خدمات</TableCell>
                  </TableRow>
                ) : (
                  services.map((service, idx) => (
                    <TableRow key={service.id}>
                      <TableCell>
                        <div className="flex gap-1">
                          <Button variant="ghost" size="icon" className="h-7 w-7" onClick={() => moveOrder(service.id, "up")} disabled={idx === 0}>
                            <ArrowUp size={12} />
                          </Button>
                          <Button variant="ghost" size="icon" className="h-7 w-7" onClick={() => moveOrder(service.id, "down")} disabled={idx === services.length - 1}>
                            <ArrowDown size={12} />
                          </Button>
                        </div>
                      </TableCell>
                      <TableCell className="font-medium">{service.title}</TableCell>
                      <TableCell className="text-muted-foreground text-xs max-w-[200px] truncate">{service.description}</TableCell>
                      <TableCell>
                        <Badge variant={service.is_published ? "default" : "secondary"} className="text-[10px]">
                          {service.is_published ? "منشور" : "مسودة"}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <div className="flex gap-1">
                          <Button variant="ghost" size="icon" className="h-8 w-8" onClick={() => togglePublish(service.id, service.is_published)}>
                            {service.is_published ? <EyeOff size={14} /> : <Eye size={14} />}
                          </Button>
                          <Button variant="ghost" size="icon" className="h-8 w-8" onClick={() => deleteService(service.id)}>
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

export default AdminServices;
