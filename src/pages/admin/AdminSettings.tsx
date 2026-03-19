import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Settings, Globe, Bell, Shield } from "lucide-react";

const AdminSettings = () => {
  return (
    <div>
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-foreground">الإعدادات</h1>
        <p className="text-muted-foreground text-sm mt-1">إعدادات النظام والمنصة</p>
      </div>

      <div className="grid gap-6">
        {/* General Settings */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-lg">
              <Globe size={18} className="text-primary" />
              إعدادات عامة
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>اسم المنصة</Label>
                <Input defaultValue="سند للخدمات القانونية" />
              </div>
              <div className="space-y-2">
                <Label>البريد الإلكتروني للتواصل</Label>
                <Input defaultValue="info@snadksa.com" dir="ltr" />
              </div>
              <div className="space-y-2">
                <Label>رقم الهاتف</Label>
                <Input defaultValue="+966 50 000 0000" dir="ltr" />
              </div>
              <div className="space-y-2">
                <Label>العنوان</Label>
                <Input defaultValue="الرياض، المملكة العربية السعودية" />
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
              { label: "إشعار عند تسجيل محامي جديد", default: true },
              { label: "إشعار عند طلب استشارة جديدة", default: true },
              { label: "إشعار عند تسجيل مستخدم جديد", default: false },
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
            {[
              { label: "تفعيل التحقق بخطوتين", default: false },
              { label: "طلب موافقة المسؤول للتسجيلات الجديدة", default: false },
            ].map((item) => (
              <div key={item.label} className="flex items-center justify-between">
                <Label>{item.label}</Label>
                <Switch defaultChecked={item.default} />
              </div>
            ))}
          </CardContent>
        </Card>

        <div className="flex justify-end">
          <Button className="px-8">حفظ الإعدادات</Button>
        </div>
      </div>
    </div>
  );
};

export default AdminSettings;
