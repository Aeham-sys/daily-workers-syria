"use client";
import { useState, useEffect } from "react";
import { useAuth } from "@/components/AuthProvider";
import Link from "next/link";
import { notFound } from "next/navigation";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import RatingStars from "@/components/RatingStars";
import { db } from "@/lib/firebase";
import { doc, getDoc, deleteDoc } from "firebase/firestore";
import { useRouter } from "next/navigation";

export default function WorkerProfilePage({ params }) {
  const router = useRouter();
  const { user } = useAuth();
  const [worker, setWorker] = useState(null);
  const [loading, setLoading] = useState(true);
  const [canDelete, setCanDelete] = useState(false);

  useEffect(() => {
    async function fetchWorker() {
      try {
        const docRef = doc(db, "workers", params.id);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          setWorker({ id: docSnap.id, ...docSnap.data() });
        }
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    }
    fetchWorker();
  }, [params.id]);

  useEffect(() => {
    if (worker && user) {
      const storedId = localStorage.getItem("myWorkerId");
      const isOwner = worker.userId === user.uid || storedId === params.id;
      setCanDelete(isOwner);
    }
  }, [worker, user, params.id]);

  async function handleDeleteProfile() {
    if (!confirm("هل أنت متأكد من رغبتك في حذف ملفك الشخصي نهائياً؟")) return;

    setLoading(true);
    try {
      await deleteDoc(doc(db, "workers", params.id));
      localStorage.removeItem("myWorkerId");
      alert("✅ تم حذف ملفك الشخصي بنجاح.");
      router.push("/workers");
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
          جاري تحميل ملف العامل...
        </main>
        <Footer />
      </>
    );
  }

  if (!worker) {
    return (
      <>
        <Navbar />
        <main className="page-container text-center py-24 text-gray-500 font-medium">
          لم يتم العثور على العامل.
        </main>
        <Footer />
      </>
    );
  }

  const whatsappUrl = `https://wa.me/963${worker.phone?.replace(/^0/, "")}?text=${encodeURIComponent(`مرحباً، رأيت ملفك على منصة عمّال وأود الاستفسار`)}`;

  return (
    <>
      <Navbar />
      <main className="page-container">
        <Link
          href="/workers"
          className="inline-flex items-center gap-2 text-brand-600 font-semibold mb-5 hover:underline"
        >
          ← العودة للعمال
        </Link>

        <div className="card p-5">
          {/* Profile header */}
          <div className="flex items-center gap-4 mb-5">
            <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-brand-400 to-brand-600 flex items-center justify-center text-white text-4xl font-black shrink-0">
              {worker.name[0]}
            </div>
            <div className="flex-1">
              <h1 className="text-xl font-black text-gray-900">
                {worker.name}
              </h1>
              <p className="text-gray-500 text-sm mt-0.5">
                📍 {worker.location}
              </p>
              <div className="mt-2">
                <RatingStars
                  rating={worker.rating}
                  reviewCount={worker.reviewCount}
                />
              </div>
            </div>
            {worker.availableToday ? (
              <span className="badge bg-green-100 text-green-700 text-xs">
                🟢 متاح اليوم
              </span>
            ) : (
              <span className="badge bg-gray-100 text-gray-500 text-xs">
                ⚫ غير متاح
              </span>
            )}
          </div>

          {/* Bio */}
          {worker.bio && (
            <div className="mb-5">
              <h2 className="font-bold text-gray-800 mb-2">نبذة عن العامل</h2>
              <p className="text-gray-600 leading-relaxed text-sm">
                {worker.bio}
              </p>
            </div>
          )}

          {/* Stats */}
          <div className="grid grid-cols-1 gap-3 mb-5">
            <div className="bg-gray-50 rounded-xl p-3 text-center">
              <div className="text-2xl font-black text-brand-600">
                {worker.reviewCount || 0}
              </div>
              <div className="text-xs text-gray-500 mt-1">تقييم</div>
            </div>
          </div>

          {/* Skills */}
          {worker.skills && worker.skills.length > 0 && (
            <div className="mb-6">
              <h2 className="font-bold text-gray-800 mb-2">المهارات</h2>
              <div className="flex flex-wrap gap-2">
                {worker.skills.map((skill) => (
                  <span
                    key={skill}
                    className="badge bg-brand-50 text-brand-700"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* CTAs */}
          <div className="flex flex-col gap-3">
            <a href={`tel:${worker.phone}`} className="btn-primary">
              📞 اتصال مباشر &lrm;({worker.phone})
            </a>
            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-primary !bg-green-500 hover:!bg-green-600"
            >
              💬 تواصل عبر واتساب
            </a>

            {canDelete && (
              <button
                onClick={handleDeleteProfile}
                className="btn-outline !text-red-600 !border-red-200 hover:!bg-red-50 hover:!border-red-300 mt-4"
              >
                🗑️ حذف ملفي الشخصي نهائياً
              </button>
            )}
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
