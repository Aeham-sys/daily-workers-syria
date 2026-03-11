"use client";
import Link from "next/link";
import { useState } from "react";

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <nav className="bg-white border-b border-gray-100 sticky top-0 z-50 shadow-sm">
      <div className="max-w-2xl mx-auto px-4 h-16 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2 group">
          <div className="w-9 h-9 bg-brand-600 rounded-xl flex items-center justify-center text-white text-lg font-bold shadow-sm group-hover:bg-brand-700 transition-colors">
            ع
          </div>
          <span className="text-xl font-bold text-gray-900">عمّال</span>
        </Link>

        {/* Desktop links */}
        <div className="hidden sm:flex items-center gap-1">
          <Link
            href="/jobs"
            className="px-4 py-2 rounded-xl text-gray-600 hover:text-brand-700 hover:bg-brand-50 font-medium transition-all text-sm"
          >
            الوظائف
          </Link>
          <Link
            href="/workers"
            className="px-4 py-2 rounded-xl text-gray-600 hover:text-brand-700 hover:bg-brand-50 font-medium transition-all text-sm"
          >
            العمال
          </Link>
          <Link
            href="/register-worker"
            className="px-4 py-2 rounded-xl text-gray-600 hover:text-brand-700 hover:bg-brand-50 font-medium transition-all text-sm"
          >
            انضم كعامل
          </Link>
          <Link
            href="/post-job"
            className="mr-2 bg-brand-600 hover:bg-brand-700 text-white font-bold px-4 py-2 rounded-xl text-sm transition-colors shadow-sm"
          >
            + نشر عمل
          </Link>
        </div>

        {/* Mobile hamburger */}
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className="sm:hidden w-10 h-10 flex flex-col items-center justify-center gap-1.5 rounded-xl hover:bg-gray-100"
          aria-label="القائمة"
        >
          <span
            className={`w-5 h-0.5 bg-gray-700 transition-all ${menuOpen ? "rotate-45 translate-y-2" : ""}`}
          />
          <span
            className={`w-5 h-0.5 bg-gray-700 transition-all ${menuOpen ? "opacity-0" : ""}`}
          />
          <span
            className={`w-5 h-0.5 bg-gray-700 transition-all ${menuOpen ? "-rotate-45 -translate-y-2" : ""}`}
          />
        </button>
      </div>

      {/* Mobile menu */}
      {menuOpen && (
        <div className="sm:hidden border-t border-gray-100 bg-white px-4 py-3 flex flex-col gap-2">
          <Link
            href="/jobs"
            onClick={() => setMenuOpen(false)}
            className="py-3 px-4 rounded-xl text-gray-700 hover:bg-gray-50 font-medium"
          >
            🔍 الوظائف المتاحة
          </Link>
          <Link
            href="/workers"
            onClick={() => setMenuOpen(false)}
            className="py-3 px-4 rounded-xl text-gray-700 hover:bg-gray-50 font-medium"
          >
            👷 العمال
          </Link>
          <Link
            href="/register-worker"
            onClick={() => setMenuOpen(false)}
            className="py-3 px-4 rounded-xl text-gray-700 hover:bg-gray-50 font-medium"
          >
            ✨ انضم كعامل
          </Link>
          <Link
            href="/post-job"
            onClick={() => setMenuOpen(false)}
            className="btn-primary mt-1"
          >
            + نشر عمل جديد
          </Link>
        </div>
      )}
    </nav>
  );
}
