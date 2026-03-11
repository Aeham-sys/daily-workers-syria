"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import JobCard from "@/components/JobCard";
import { db } from "@/lib/firebase";
import { collection, query, orderBy, limit, getDocs, getCountFromServer } from "firebase/firestore";

export default function HomePage() {
  const [latestJobs, setLatestJobs] = useState([]);
  const [stats, setStats] = useState({ workers: 0, jobs: 0 });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      try {
        // Fetch latest jobs
        const jobsRef = collection(db, "jobs");
        const q = query(jobsRef, orderBy("createdAt", "desc"), limit(3));
        const snapshot = await getDocs(q);
        const data = snapshot.docs.map((doc) => {
          const d = doc.data();
          return {
            id: doc.id,
            ...d,
            createdAt: d.createdAt?.toDate
              ? d.createdAt.toDate().toISOString()
              : new Date().toISOString(),
          };
        });
        setLatestJobs(data);

        // Fetch counts
        const workersRef = collection(db, "workers");
        const [workerSnap, jobSnap] = await Promise.all([
          getCountFromServer(workersRef),
          getCountFromServer(jobsRef)
        ]);
        
        setStats({
          workers: workerSnap.data().count,
          jobs: jobSnap.data().count
        });
      } catch (error) {
        console.error("Error fetching data: ", error);
      } finally {
        setLoading(false);
      }
    }
    fetchData();
  }, []);

  return (
    <>
      <Navbar />
      <main>
        {/* Hero Section */}
        <section className="bg-gradient-to-br from-brand-600 to-brand-800 text-white">
          <div className="max-w-2xl mx-auto px-4 py-12 text-center">
            <h1 className="text-4xl font-black mb-3 leading-tight">
              ابحث عن عامل ماهر
              <br />
              <span className="text-brand-200">في منطقتك</span>
            </h1>
            <p className="text-lg text-brand-100 mb-8 leading-relaxed">
              منصة تربط أصحاب العمل بالعمال الماهرين في الدهان والنجارة
              والكهرباء وغيرها
            </p>

            {/* Main CTAs */}
            <div className="flex flex-col gap-3 max-w-sm mx-auto">
              <Link
                href="/post-job"
                className="bg-white text-brand-700 hover:bg-brand-50 font-black py-4 px-6 rounded-2xl text-lg transition-all shadow-lg flex items-center justify-center gap-2"
              >
                🔨 أريد عاملاً - نشر طلب عمل
              </Link>
              <Link
                href="/workers"
                className="bg-brand-700 hover:bg-brand-800 text-white border-2 border-white/20 font-bold py-4 px-6 rounded-2xl text-lg transition-all flex items-center justify-center gap-2"
              >
                👷 أنا عامل أبحث عن عمل
              </Link>
            </div>
          </div>
        </section>

        {/* Stats bar */}
        <section className="bg-white border-b border-gray-100">
          <div className="max-w-2xl mx-auto px-4 py-4 grid grid-cols-3 gap-4 text-center">
            <div>
              <div className="text-2xl font-black text-brand-600">
                {loading ? "..." : stats.workers}
              </div>
              <div className="text-xs text-gray-500">عامل مسجل</div>
            </div>
            <div className="border-x border-gray-100">
              <div className="text-2xl font-black text-brand-600">
                {loading ? "..." : stats.jobs}
              </div>
              <div className="text-xs text-gray-500">إعلان نشط</div>
            </div>
            <div>
              <div className="text-2xl font-black text-brand-600">8</div>
              <div className="text-xs text-gray-500">تخصصات</div>
            </div>
          </div>
        </section>

        {/* Latest jobs */}
        <section className="page-container">
          <div className="flex items-center justify-between mb-4">
            <h2 className="section-title mb-0">🔔 آخر الإعلانات</h2>
            <Link
              href="/jobs"
              className="text-brand-600 font-semibold text-sm hover:underline"
            >
              عرض الكل
            </Link>
          </div>
          <div className="flex flex-col gap-4">
            {loading ? (
              <p className="text-gray-500 text-center py-4">
                جاري تحميل آخر الإعلانات...
              </p>
            ) : latestJobs.length > 0 ? (
              latestJobs.map((job) => <JobCard key={job.id} job={job} />)
            ) : (
              <p className="text-gray-500 text-center py-4">
                لا توجد إعلانات نشطة حالياً.
              </p>
            )}
          </div>
          <div className="mt-6">
            <Link href="/jobs" className="btn-secondary">
              عرض جميع الإعلانات →
            </Link>
          </div>
        </section>

        {/* How it works */}
        <section className="bg-white border-t border-gray-100 mt-8">
          <div className="page-container">
            <h2 className="section-title text-center">كيف يعمل الموقع؟</h2>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mt-2">
              {[
                {
                  step: "01",
                  title: "انشر طلبك",
                  desc: "أضف تفاصيل العمل المطلوب في دقيقة واحدة",
                  emoji: "📝",
                },
                {
                  step: "02",
                  title: "تواصل مع العامل",
                  desc: "التواصل مباشرة عبر الاتصال أو واتساب",
                  emoji: "📞",
                },
                {
                  step: "03",
                  title: "أنجز عملك",
                  desc: "احصل على الخدمة وقيّم العامل",
                  emoji: "✅",
                },
              ].map(({ step, title, desc, emoji }) => (
                <div key={step} className="text-center">
                  <div className="w-16 h-16 rounded-2xl bg-brand-50 flex items-center justify-center text-3xl mx-auto mb-3">
                    {emoji}
                  </div>
                  <h3 className="font-bold text-gray-900 mb-1">{title}</h3>
                  <p className="text-sm text-gray-500 leading-relaxed">
                    {desc}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
