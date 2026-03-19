import Layout from "@/components/Layout";
import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

const PrivacyPolicy = () => {
  return (
    <Layout>
      <div className="min-h-screen bg-gradient-to-b from-blue-950 via-blue-900 to-slate-900 pt-8 pb-16">
        <div className="container mx-auto px-4 max-w-4xl">
          {/* Header */}
          <div className="mb-8">
            <Link to="/" className="inline-flex items-center gap-2 text-secondary hover:text-secondary/80 text-sm mb-6 transition-colors">
              <ArrowRight size={16} />
              العودة للرئيسية
            </Link>
            <h1 className="text-3xl md:text-4xl font-bold text-primary-foreground font-display mb-2">
              سياسة الخصوصية
            </h1>
            <p className="text-primary-foreground/50 text-sm">آخر تحديث: مارس 2026</p>
          </div>

          {/* Content */}
          <div className="bg-white/5 border border-white/10 rounded-2xl p-6 md:p-10 space-y-8 text-primary-foreground/80 leading-relaxed">
            
            <section>
              <h2 className="text-xl font-bold text-primary-foreground mb-3 font-display">1. مقدمة</h2>
              <p>
                تلتزم منصة سند للخدمات القانونية ("المنصة") بحماية خصوصية مستخدميها وفقًا لنظام حماية البيانات الشخصية في المملكة العربية السعودية. توضح هذه السياسة كيفية جمع واستخدام وحماية بياناتك الشخصية عند استخدام خدماتنا.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-bold text-primary-foreground mb-3 font-display">2. البيانات التي نجمعها</h2>
              <h3 className="text-lg font-semibold text-primary-foreground/90 mb-2">بيانات يقدمها المستخدم:</h3>
              <ul className="list-disc list-inside space-y-2 mr-4 mb-4">
                <li>الاسم الكامل وبيانات الاتصال (البريد الإلكتروني، رقم الجوال).</li>
                <li>بيانات الحساب (اسم المستخدم، كلمة المرور المشفرة).</li>
                <li>بيانات المحامي (رقم الرخصة، التخصص، سنوات الخبرة).</li>
                <li>تفاصيل الاستشارات والقضايا المقدمة عبر المنصة.</li>
                <li>بيانات الدفع والفوترة.</li>
              </ul>
              <h3 className="text-lg font-semibold text-primary-foreground/90 mb-2">بيانات تُجمع تلقائيًا:</h3>
              <ul className="list-disc list-inside space-y-2 mr-4">
                <li>عنوان بروتوكول الإنترنت (IP) ونوع المتصفح والجهاز.</li>
                <li>بيانات الاستخدام وسجل التصفح داخل المنصة.</li>
                <li>ملفات تعريف الارتباط (Cookies) والتقنيات المشابهة.</li>
                <li>بيانات الموقع الجغرافي (عند الإذن).</li>
              </ul>
            </section>

            <section>
              <h2 className="text-xl font-bold text-primary-foreground mb-3 font-display">3. كيفية استخدام البيانات</h2>
              <p className="mb-3">نستخدم بياناتك الشخصية للأغراض التالية:</p>
              <ul className="list-disc list-inside space-y-2 mr-4">
                <li>إنشاء وإدارة حسابك على المنصة.</li>
                <li>تقديم الخدمات القانونية والربط بين العملاء والمحامين.</li>
                <li>معالجة المدفوعات والمعاملات المالية.</li>
                <li>التواصل معك بشأن حسابك وخدماتنا.</li>
                <li>تحسين تجربة المستخدم وتطوير خدمات المنصة.</li>
                <li>الامتثال للمتطلبات القانونية والتنظيمية.</li>
                <li>حماية أمن المنصة ومنع الاحتيال.</li>
              </ul>
            </section>

            <section>
              <h2 className="text-xl font-bold text-primary-foreground mb-3 font-display">4. مشاركة البيانات</h2>
              <p className="mb-3">لا نبيع بياناتك الشخصية لأي طرف ثالث. قد نشارك بياناتك في الحالات التالية:</p>
              <ul className="list-disc list-inside space-y-2 mr-4">
                <li><strong className="text-primary-foreground">مع المحامين:</strong> لتمكينهم من تقديم الخدمات القانونية المطلوبة.</li>
                <li><strong className="text-primary-foreground">مزودو الخدمات:</strong> مثل بوابات الدفع وخدمات الاستضافة، وفق اتفاقيات حماية بيانات صارمة.</li>
                <li><strong className="text-primary-foreground">الجهات الحكومية:</strong> عند وجود التزام قانوني أو أمر قضائي.</li>
                <li><strong className="text-primary-foreground">حماية الحقوق:</strong> لحماية حقوق المنصة أو مستخدميها أو سلامتهم.</li>
              </ul>
            </section>

            <section>
              <h2 className="text-xl font-bold text-primary-foreground mb-3 font-display">5. حماية البيانات</h2>
              <p className="mb-3">نتخذ تدابير أمنية صارمة لحماية بياناتك تشمل:</p>
              <ul className="list-disc list-inside space-y-2 mr-4">
                <li>تشفير البيانات أثناء النقل والتخزين باستخدام بروتوكولات TLS/SSL.</li>
                <li>تشفير كلمات المرور باستخدام خوارزميات تشفير متقدمة.</li>
                <li>تقييد الوصول إلى البيانات الشخصية على الموظفين المصرح لهم فقط.</li>
                <li>مراجعات أمنية دورية واختبارات اختراق.</li>
                <li>نسخ احتياطية منتظمة ومشفرة.</li>
              </ul>
            </section>

            <section>
              <h2 className="text-xl font-bold text-primary-foreground mb-3 font-display">6. حقوق المستخدم</h2>
              <p className="mb-3">وفقًا لنظام حماية البيانات الشخصية، يحق لك:</p>
              <ul className="list-disc list-inside space-y-2 mr-4">
                <li>الاطلاع على بياناتك الشخصية المحفوظة لدينا.</li>
                <li>طلب تصحيح أو تحديث بياناتك.</li>
                <li>طلب حذف بياناتك (مع مراعاة الالتزامات القانونية).</li>
                <li>الاعتراض على معالجة بياناتك لأغراض تسويقية.</li>
                <li>طلب نقل بياناتك إلى مزود خدمة آخر.</li>
                <li>سحب موافقتك على معالجة البيانات في أي وقت.</li>
              </ul>
            </section>

            <section>
              <h2 className="text-xl font-bold text-primary-foreground mb-3 font-display">7. ملفات تعريف الارتباط (Cookies)</h2>
              <p className="mb-3">نستخدم ملفات تعريف الارتباط لتحسين تجربتك على المنصة:</p>
              <ul className="list-disc list-inside space-y-2 mr-4">
                <li><strong className="text-primary-foreground">ضرورية:</strong> لتشغيل المنصة بشكل صحيح وتأمين حسابك.</li>
                <li><strong className="text-primary-foreground">تحليلية:</strong> لفهم كيفية استخدام المنصة وتحسين أدائها.</li>
                <li><strong className="text-primary-foreground">وظيفية:</strong> لتذكر تفضيلاتك وإعداداتك.</li>
              </ul>
              <p className="mt-3">يمكنك إدارة تفضيلات ملفات تعريف الارتباط من خلال إعدادات متصفحك.</p>
            </section>

            <section>
              <h2 className="text-xl font-bold text-primary-foreground mb-3 font-display">8. الاحتفاظ بالبيانات</h2>
              <p>
                نحتفظ ببياناتك الشخصية طالما كان حسابك نشطًا أو حسب الحاجة لتقديم الخدمات. بعد إغلاق الحساب، نحتفظ بالبيانات للمدة اللازمة للامتثال للالتزامات القانونية وحل النزاعات، وعادة لا تتجاوز خمس (5) سنوات.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-bold text-primary-foreground mb-3 font-display">9. حماية بيانات الأطفال</h2>
              <p>
                المنصة غير موجهة للأشخاص دون سن 18 عامًا. لا نجمع بيانات شخصية من القاصرين عمدًا. إذا علمنا بجمع بيانات لشخص دون 18 عامًا، سنتخذ خطوات فورية لحذفها.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-bold text-primary-foreground mb-3 font-display">10. التعديلات على السياسة</h2>
              <p>
                قد نُحدّث هذه السياسة من وقت لآخر. سنُخطرك بأي تغييرات جوهرية عبر البريد الإلكتروني أو إشعار داخل المنصة قبل سريان التعديلات. ننصحك بمراجعة هذه السياسة دوريًا.
              </p>
            </section>

            <section className="border-t border-white/10 pt-6">
              <h2 className="text-xl font-bold text-primary-foreground mb-3 font-display">التواصل معنا</h2>
              <p>
                لأي استفسارات حول سياسة الخصوصية أو لممارسة حقوقك، تواصل معنا عبر البريد الإلكتروني: <a href="mailto:privacy@snadksa.com" className="text-secondary hover:underline">privacy@snadksa.com</a>
              </p>
            </section>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default PrivacyPolicy;
