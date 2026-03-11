import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-white border-t border-gray-100 mt-12">
      <div className="max-w-2xl mx-auto px-4 py-8">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2">
            <div className="w-8 h-8 bg-brand-600 rounded-lg flex items-center justify-center text-white font-bold text-sm">
              ع
            </div>
            <span className="text-lg font-bold text-gray-800">عمّال</span>
          </Link>

          {/* Links */}
          <div className="flex items-center gap-6 text-sm text-gray-500">
            <Link
              href="/jobs"
              className="hover:text-brand-600 transition-colors"
            >
              الوظائف
            </Link>
            <Link
              href="/workers"
              className="hover:text-brand-600 transition-colors"
            >
              العمال
            </Link>
            <Link
              href="/post-job"
              className="hover:text-brand-600 transition-colors"
            >
              نشر عمل
            </Link>
          </div>
        </div>

        <div className="mt-6 pt-6 border-t border-gray-100 text-center text-sm text-gray-400 flex flex-col gap-1">
          <p>جميع الحقوق محفوظة © 2026 عمّال - منصة خدمات العمالة اليومية</p>
          <p>
            تم تطوير وتصميم هذا الموقع من قبل{" "}
            <a
              href="https://myportfolio.syria-cloud.info/index.html"
              target="_blank"
              rel="noopener noreferrer"
              className="font-semibold text-brand-600 hover:underline"
            >
              أيهم المزيد
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
}
