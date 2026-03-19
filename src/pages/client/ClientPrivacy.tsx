import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Shield, Lock, Eye, Smartphone } from "lucide-react";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";

const ClientPrivacy = () => {
  return (
    <div>
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-foreground">الخصوصية والأمان</h1>
        <p className="text-muted-foreground text-sm mt-1">إدارة إعدادات الأمان والخصوصية لحسابك</p>
      </div>

      <div className="space-y-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-lg">
              <Lock className="h-5 w-5 text-primary" />
              كلمة المرور
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-muted-foreground text-sm">يمكنك تغيير كلمة المرور الخاصة بك لتعزيز أمان حسابك.</p>
            <Button variant="outline" size="sm">تغيير كلمة المرور</Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-lg">
              <Smartphone className="h-5 w-5 text-primary" />
              التحقق بخطوتين
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <Label htmlFor="two-factor" className="text-sm">تفعيل التحقق بخطوتين</Label>
              <Switch id="two-factor" />
            </div>
            <p className="text-muted-foreground text-xs">إضافة طبقة حماية إضافية عند تسجيل الدخول.</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-lg">
              <Eye className="h-5 w-5 text-primary" />
              الخصوصية
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <Label htmlFor="profile-visible" className="text-sm">إظهار الملف الشخصي للمحامين</Label>
              <Switch id="profile-visible" defaultChecked />
            </div>
            <div className="flex items-center justify-between">
              <Label htmlFor="activity-visible" className="text-sm">إظهار نشاطي الأخير</Label>
              <Switch id="activity-visible" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-lg">
              <Shield className="h-5 w-5 text-primary" />
              الجلسات النشطة
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground text-sm">لا توجد جلسات نشطة أخرى حالياً.</p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default ClientPrivacy;
