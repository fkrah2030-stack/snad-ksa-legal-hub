import Layout from "@/components/Layout";
import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

const TermsOfUse = () => {
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
              شروط الاستخدام
            </h1>
            <p className="text-primary-foreground/50 text-sm">آخر تحديث: مارس 2026</p>
          </div>

          {/* Content */}
          <div className="bg-white/5 border border-white/10 rounded-2xl p-6 md:p-10 space-y-8 text-primary-foreground/80 leading-relaxed">
            
            <section>
              <h2 className="text-xl font-bold text-primary-foreground mb-3 font-display">1. مقدمة</h2>
              <p>
                مرحبًا بك في منصة سند للخدمات القانونية ("المنصة"). تُشغَّل هذه المنصة داخل المملكة العربية السعودية وتخضع لأنظمتها المعمول بها. باستخدامك للمنصة، فإنك توافق على الالتزام بشروط الاستخدام هذه. يُرجى قراءتها بعناية قبل استخدام أي من خدماتنا.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-bold text-primary-foreground mb-3 font-display">2. التعريفات</h2>
              <ul className="list-disc list-inside space-y-2 mr-4">
                <li><strong className="text-primary-foreground">"المنصة":</strong> موقع سند الإلكتروني وتطبيقاته.</li>
                <li><strong className="text-primary-foreground">"المستخدم":</strong> كل شخص يستخدم المنصة سواء كان عميلاً أو محاميًا.</li>
                <li><strong className="text-primary-foreground">"الخدمات":</strong> جميع الخدمات القانونية المقدمة عبر المنصة بما في ذلك الاستشارات والتمثيل القانوني.</li>
                <li><strong className="text-primary-foreground">"المحامي":</strong> المحامي المرخص والمسجل في المنصة لتقديم الخدمات القانونية.</li>
              </ul>
            </section>

            <section>
              <h2 className="text-xl font-bold text-primary-foreground mb-3 font-display">3. شروط التسجيل</h2>
              <ul className="list-disc list-inside space-y-2 mr-4">
                <li>يجب أن يكون عمر المستخدم 18 عامًا على الأقل.</li>
                <li>يلتزم المستخدم بتقديم معلومات صحيحة ودقيقة عند التسجيل.</li>
                <li>يتحمل المستخدم مسؤولية الحفاظ على سرية بيانات حسابه.</li>
                <li>يجب على المحامين تقديم رقم رخصة ساري المفعول صادر من وزارة العدل.</li>
                <li>يحق للمنصة رفض أو تعليق أي حساب يخالف هذه الشروط.</li>
              </ul>
            </section>

            <section>
              <h2 className="text-xl font-bold text-primary-foreground mb-3 font-display">4. استخدام الخدمات</h2>
              <ul className="list-disc list-inside space-y-2 mr-4">
                <li>تُستخدم المنصة لأغراض قانونية مشروعة فقط.</li>
                <li>يُحظر استخدام المنصة لأي نشاط مخالف للأنظمة السعودية.</li>
                <li>لا يجوز نسخ أو إعادة إنتاج أي محتوى من المنصة دون إذن كتابي.</li>
                <li>الاستشارات القانونية المقدمة عبر المنصة لا تُغني عن الاستشارة القانونية المباشرة عند الحاجة.</li>
              </ul>
            </section>

            <section>
              <h2 className="text-xl font-bold text-primary-foreground mb-3 font-display">5. الرسوم والمدفوعات</h2>
              <ul className="list-disc list-inside space-y-2 mr-4">
                <li>تُحدد رسوم الخدمات من قبل المحامي ويتم عرضها بشفافية قبل الطلب.</li>
                <li>جميع المدفوعات تتم عبر بوابات الدفع المعتمدة في المنصة.</li>
                <li>لا يحق للمستخدم استرداد الرسوم بعد بدء تقديم الخدمة إلا وفق سياسة الاسترداد.</li>
                <li>تحتفظ المنصة بنسبة عمولة من كل معاملة يتم الاتفاق عليها مسبقًا مع المحامي.</li>
              </ul>
            </section>

            <section>
              <h2 className="text-xl font-bold text-primary-foreground mb-3 font-display">6. المسؤولية القانونية</h2>
              <ul className="list-disc list-inside space-y-2 mr-4">
                <li>المنصة وسيط تقني يربط بين العميل والمحامي، ولا تتحمل مسؤولية المشورة القانونية المقدمة.</li>
                <li>يتحمل المحامي المسؤولية الكاملة عن جودة ودقة الخدمات القانونية المقدمة.</li>
                <li>لا تضمن المنصة نتائج محددة لأي قضية أو استشارة.</li>
                <li>المنصة غير مسؤولة عن أي أضرار ناتجة عن انقطاع الخدمة أو أعطال تقنية.</li>
              </ul>
            </section>

            <section>
              <h2 className="text-xl font-bold text-primary-foreground mb-3 font-display">7. حقوق الملكية الفكرية</h2>
              <p>
                جميع المحتويات والتصاميم والعلامات التجارية والشعارات المعروضة على المنصة هي ملكية حصرية لمنصة سند أو مرخصيها. يُحظر استخدامها أو نسخها أو توزيعها دون إذن كتابي مسبق.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-bold text-primary-foreground mb-3 font-display">8. إنهاء الحساب</h2>
              <ul className="list-disc list-inside space-y-2 mr-4">
                <li>يحق للمستخدم إغلاق حسابه في أي وقت عبر إعدادات الحساب.</li>
                <li>يحق للمنصة تعليق أو إنهاء أي حساب يخالف شروط الاستخدام.</li>
                <li>عند إنهاء الحساب، تظل الالتزامات المالية القائمة سارية.</li>
              </ul>
            </section>

            <section>
              <h2 className="text-xl font-bold text-primary-foreground mb-3 font-display">9. القانون الواجب التطبيق</h2>
              <p>
                تخضع هذه الشروط لأنظمة المملكة العربية السعودية. وفي حال نشوء أي نزاع، يتم حله وديًا أولاً، وفي حال تعذر ذلك يُحال إلى الجهات القضائية المختصة في المملكة العربية السعودية.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-bold text-primary-foreground mb-3 font-display">10. التعديلات</h2>
              <p>
                تحتفظ المنصة بحق تعديل هذه الشروط في أي وقت. سيتم إخطار المستخدمين بالتعديلات الجوهرية عبر البريد الإلكتروني أو من خلال إشعار داخل المنصة. استمرار استخدام المنصة بعد التعديل يُعد قبولاً للشروط المحدثة.
              </p>
            </section>

            <section className="border-t border-white/10 pt-6">
              <h2 className="text-xl font-bold text-primary-foreground mb-3 font-display">التواصل معنا</h2>
              <p>
                لأي استفسارات حول شروط الاستخدام، يمكنك التواصل معنا عبر البريد الإلكتروني: <a href="mailto:support@snadksa.com" className="text-secondary hover:underline">support@snadksa.com</a>
              </p>
            </section>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default TermsOfUse;
