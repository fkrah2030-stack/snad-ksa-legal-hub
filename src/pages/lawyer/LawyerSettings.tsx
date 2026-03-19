import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Settings, Bell, Shield, Clock } from "lucide-react";

const LawyerSettings = () => {
  return (
    <div>
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-foreground">الإعدادات</h1>
        <p className="text-muted-foreground text-sm mt-1">إعدادات حسابك وتفضيلاتك</p>
      </div>

      <div className="grid gap-6">
        {/* Availability */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-lg">
              <Clock size={18} className="text-primary" />
              التوفر والمواعيد
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <Label>متاح لاستقبال استشارات جديدة</Label>
              <Switch defaultChecked />
            </div>
            <div className="flex items-center justify-between">
              <Label>متاح لاستقبال قضايا جديدة</Label>
              <Switch defaultChecked />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>بداية ساعات العمل</Label>
                <Input type="time" defaultValue="09:00" dir="ltr" />
              </div>
              <div className="space-y-2">
                <Label>نهاية ساعات العمل</Label>
                <Input type="time" defaultValue="17:00" dir="ltr" />
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Notifications */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-lg">
              <Bell size={18} className="text-primary" />
              الإشعارات
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {[
              { label: "إشعار عند طلب استشارة جديدة", default: true },
              { label: "إشعار عند طلب قضية جديدة", default: true },
              { label: "إشعار عند إضافة تقييم جديد", default: true },
              { label: "إشعار بالبريد الإلكتروني", default: false },
            ].map((item) => (
              <div key={item.label} className="flex items-center justify-between">
                <Label>{item.label}</Label>
                <Switch defaultChecked={item.default} />
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Security */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-lg">
              <Shield size={18} className="text-primary" />
              الأمان
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>كلمة المرور الحالية</Label>
                <Input type="password" placeholder="••••••••" dir="ltr" />
              </div>
              <div className="space-y-2">
                <Label>كلمة المرور الجديدة</Label>
                <Input type="password" placeholder="••••••••" dir="ltr" />
              </div>
            </div>
            <div className="flex items-center justify-between">
              <Label>تفعيل التحقق بخطوتين</Label>
              <Switch />
            </div>
          </CardContent>
        </Card>

        <div className="flex justify-end">
          <Button className="px-8">حفظ الإعدادات</Button>
        </div>
      </div>
    </div>
  );
};

export default LawyerSettings;
