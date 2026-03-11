"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import { notFound, useRouter } from "next/navigation";
import { useAuth } from "@/components/AuthProvider";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { timeAgo } from "@/lib/dummyData";
import { db } from "@/lib/firebase";
import { doc, getDoc, deleteDoc } from "firebase/firestore";

export default function JobDetailPage({ params }) {
  const router = useRouter();
  const { user } = useAuth();
  const [job, setJob] = useState(null);
  const [loading, setLoading] = useState(true);
  const [canDelete, setCanDelete] = useState(false);

  useEffect(() => {
    async function fetchJob() {
      try {
        const docRef = doc(db, "jobs", params.id);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          const d = docSnap.data();
          setJob({
            id: docSnap.id,
            ...d,
            createdAt: d.createdAt?.toDate
              ? d.createdAt.toDate().toISOString()
              : new Date().toISOString(),
          });
        }
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    }
    fetchJob();
  }, [params.id]);

  useEffect(() => {
    if (job && user) {
      // Check if current user is owner (Auth UID or old localStorage)
      const myJobs = JSON.parse(localStorage.getItem("myJobs") || "[]");
      const isOwner = job.userId === user.uid || myJobs.includes(params.id);
      setCanDelete(isOwner);
    }
  }, [job, user, params.id]);

  async function handleDelete() {
    if (!confirm("هل أنت متأكد من رغبتك في حذف هذا الإعلان نهائياً؟")) return;

    setLoading(true);
    try {
      await deleteDoc(doc(db, "jobs", params.id));
      alert("✅ تم حذف الإعلان بنجاح.");

      // Remove from localStorage
      const myJobs = JSON.parse(localStorage.getItem("myJobs") || "[]");
      const updatedJobs = myJobs.filter((id) => id !== params.id);
      localStorage.setItem("myJobs", JSON.stringify(updatedJobs));

      router.push("/jobs");
      router.refresh();
    } catch (err) {
      console.error(err);
      alert("❌ حدث خطأ أثناء الحذف.");
      setLoading(false);
    }
  }

  if (loading) {
    return (
      <>
        <Navbar />
        <main className="page-container text-center py-24 text-gray-500 font-medium">
          جاري تحميل تفاصيل العمل...
        </main>
        <Footer />
      </>
    );
  }

  if (!job) {
    return (
      <>
        <Navbar />
        <main className="page-container text-center py-24 text-gray-500 font-medium">
          لم يتم العثور على الإعلان.
        </main>
        <Footer />
      </>
    );
  }

  const whatsappUrl = `https://wa.me/963${job.phone?.replace(/^0/, "")}?text=${encodeURIComponent(`مرحباً، رأيت إعلانك "${job.title}" على منصة عمّال وأود الاستفسار`)}`;

  return (
    <>
      <Navbar />
      <main className="page-container">
        {/* Back button */}
        <Link
          href="/jobs"
          className="inline-flex items-center gap-2 text-brand-600 font-semibold mb-5 hover:underline"
        >
          ← العودة للإعلانات
        </Link>

        <div className="card p-5">
          {/* Category badge & title */}
          <span className="badge bg-brand-50 text-brand-700 mb-3">
            {job.category}
          </span>
          <h1 className="text-2xl font-black text-gray-900 mb-4 leading-tight">
            {job.title}
          </h1>

          {/* Meta */}
          <div className="grid grid-cols-2 gap-3 mb-5">
            <div className="bg-gray-50 rounded-xl p-3">
              <div className="text-xs text-gray-400 mb-1">الموقع</div>
              <div className="font-semibold text-gray-800 text-sm">
                📍 {job.location}
              </div>
            </div>
            <div className="bg-gray-50 rounded-xl p-3">
              <div className="text-xs text-gray-400 mb-1">الأجر المتوقع</div>
              <div className="font-bold text-brand-700 text-sm">
                💰 {job.wage || "غير محدد"}
              </div>
            </div>
            <div className="bg-gray-50 rounded-xl p-3 col-span-2">
              <div className="text-xs text-gray-400 mb-1">تاريخ النشر</div>
              <div className="font-medium text-gray-700 text-sm">
                🕐 {timeAgo(job.createdAt)}
              </div>
            </div>
          </div>

          {/* Description */}
          <div className="mb-6">
            <h2 className="font-bold text-gray-800 mb-2">تفاصيل العمل</h2>
            <p className="text-gray-600 leading-relaxed whitespace-pre-wrap">
              {job.description}
            </p>
          </div>

          {/* CTAs */}
          <div className="flex flex-col gap-3">
            <a href={`tel:${job.phone}`} className="btn-primary">
              📞 اتصال مباشر &lrm;({job.phone})
            </a>
            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-primary !bg-green-500 hover:!bg-green-600"
            >
              💬 تواصل عبر واتساب
            </a>
            <Link href="/jobs" className="btn-outline">
              ← العودة لقائمة الإعلانات
            </Link>

            {canDelete && (
              <button
                onClick={handleDelete}
                className="btn-outline !text-red-600 !border-red-200 hover:!bg-red-50 hover:!border-red-300 mt-4"
              >
                🗑️ حذف هذا الإعلان
              </button>
            )}
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
