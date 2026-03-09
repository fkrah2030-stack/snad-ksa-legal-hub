import { Card, CardContent } from "@/components/ui/card";
import { useAuth } from "@/hooks/useAuth";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";

const ClientProfile = () => {
  const { user } = useAuth();

  return (
    <div>
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-foreground">الملف الشخصي</h1>
        <p className="text-muted-foreground text-sm mt-1">إدارة بيانات حسابك</p>
      </div>

      <Card>
        <CardContent className="p-6">
          <div className="flex items-center gap-4 mb-6">
            <Avatar className="h-16 w-16 border-2 border-secondary">
              <AvatarFallback className="bg-primary text-primary-foreground text-xl">
                {user?.user_metadata?.full_name?.charAt(0) || "U"}
              </AvatarFallback>
            </Avatar>
            <div>
              <h2 className="text-lg font-bold text-foreground">{user?.user_metadata?.full_name || "مستفيد"}</h2>
              <p className="text-muted-foreground text-sm">{user?.email}</p>
              <p className="text-muted-foreground text-sm">{user?.user_metadata?.phone || ""}</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ClientProfile;
