"use client";
import { useState, useEffect } from "react";
import { useAuth } from "@/components/AuthProvider";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import WorkerCard from "@/components/WorkerCard";
import { db } from "@/lib/firebase";
import { collection, getDocs, doc, setDoc, getDoc } from "firebase/firestore";
import Link from "next/link";

export default function WorkersPage() {
  const { user } = useAuth();
  const [workers, setWorkers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filterAvailable, setFilterAvailable] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [workerAvailable, setWorkerAvailable] = useState(false);
  const [myWorkerId, setMyWorkerId] = useState(null);

  useEffect(() => {
    async function fetchWorkers() {
      try {
        const workersRef = collection(db, "workers");
        const snapshot = await getDocs(workersRef);
        const workersData = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setWorkers(workersData);
      } catch (error) {
        console.error("Error fetching workers: ", error);
      } finally {
        setLoading(false);
      }
    }

    async function checkMyWorker() {
      // Prioritize Auth-based check
      if (user && workers.length > 0) {
        // Find worker with this userId in the list
        const myWorker = workers.find(w => w.userId === user.uid);
        if (myWorker) {
          setMyWorkerId(myWorker.id);
          setWorkerAvailable(myWorker.availableToday || false);
          return;
        }
      }

      // Fallback to localStorage for old profiles
      const storedId = localStorage.getItem("myWorkerId");
      if (storedId) {
        setMyWorkerId(storedId);
        try {
          const docRef = doc(db, "workers", storedId);
          const docSnap = await getDoc(docRef);
          if (docSnap.exists()) {
            setWorkerAvailable(docSnap.data().availableToday || false);
          }
        } catch (err) {
          console.error("Error checking worker status:", err);
        }
      }
    }

    fetchWorkers();
  }, []);

  useEffect(() => {
    if (!loading) {
      async function runCheck() {
        const storedId = localStorage.getItem("myWorkerId");
        if (user || storedId) {
          // Find worker with this userId in the list
          const myWorker = workers.find(w => w.userId === user?.uid || w.id === storedId);
          if (myWorker) {
            setMyWorkerId(myWorker.id);
            setWorkerAvailable(myWorker.availableToday || false);
          }
        }
      }
      runCheck();
    }
  }, [user, loading, workers]);

  let filtered = workers;

  if (filterAvailable) {
    filtered = filtered.filter((w) => w.availableToday);
  }

  if (searchQuery.trim()) {
    const q = searchQuery.toLowerCase();
    filtered = filtered.filter(
      (w) =>
        w.name.toLowerCase().includes(q) ||
        (w.skills || []).some((s) => s.toLowerCase().includes(q)) ||
        w.location.toLowerCase().includes(q),
    );
  }

  async function handleAvailabilityToggle() {
    if (!myWorkerId) return;

    const next = !workerAvailable;
    setWorkerAvailable(next);

    try {
      await setDoc(
        doc(db, "workers", myWorkerId),
        { availableToday: next },
        { merge: true },
      );

      // Refresh local workers list to show change
      setWorkers((prev) =>
        prev.map((w) =>
          w.id === myWorkerId ? { ...w, availableToday: next } : w,
        ),
      );
    } catch (err) {
      console.error("Error toggling availability:", err);
      setWorkerAvailable(!next); // revert on error
    }
  }

  return (
    <>
      <Navbar />
      {/* Structured Data for SEO */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "ItemList",
            "name": "قائمة العمال الماهرين في سوريا",
            "description": "قائمة بجميع العمال المتاحين لتقديم خدمات الدهان والنجارة والكهرباء.",
            "itemListElement": filtered.slice(0, 10).map((w, index) => ({
              "@type": "ListItem",
              "position": index + 1,
              "item": {
                "@type": "Person",
                "name": w.name,
                "jobTitle": (w.skills || []).join(", "),
                "address": {
                  "@type": "PostalAddress",
                  "addressLocality": w.location,
                  "addressCountry": "SY"
                }
              }
            }))
          })
        }}
      />
      <main className="page-container">
        <h1 className="section-title">👷 العمال المتاحون</h1>

        {/* "I am a worker" section */}
        <div
          className={`card p-4 mb-5 border-2 transition-all ${myWorkerId ? "border-brand-400 bg-brand-50" : "border-gray-100"}`}
        >
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <div>
              <h3 className="font-bold text-gray-900">
                {myWorkerId ? "حالة تواجدك كعامل" : "هل تقدم خدمات للناس؟"}
              </h3>
              <p className="text-sm text-gray-500 mt-0.5 text-center sm:text-right">
                {myWorkerId
                  ? "تحكم في ظهورك للناس اليوم من هذا الزر"
                  : "سجل بياناتك كعامل لكي تظهر للباحثين عن مهاراتك"}
              </p>
            </div>

            {myWorkerId ? (
              <button
                onClick={handleAvailabilityToggle}
                className={`shrink-0 px-6 py-2.5 rounded-xl font-bold text-sm border-2 transition-all shadow-sm ${
                  workerAvailable
                    ? "bg-brand-600 text-white border-brand-600"
                    : "bg-white border-brand-400 text-brand-700 hover:bg-brand-50"
                }`}
              >
                {workerAvailable
                  ? "🟢 أنت متاح حالياً"
                  : "⚫ أنا غير متاح الآن"}
              </button>
            ) : (
              <Link
                href="/register-worker"
                className="btn-primary !py-2.5 !px-6 !text-sm"
              >
                ✨ سجل بياناتك كعامل
              </Link>
            )}
          </div>
        </div>

        {/* Search */}
        <div className="mb-4">
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="ابحث بالاسم أو المهارة أو الموقع..."
            className="input-field"
          />
        </div>

        {/* Filter */}
        <div className="flex items-center gap-3 mb-4">
          <button
            onClick={() => setFilterAvailable(!filterAvailable)}
            className={`flex items-center gap-2 px-4 py-2.5 rounded-xl border-2 text-sm font-semibold transition-all ${
              filterAvailable
                ? "border-green-400 bg-green-50 text-green-700"
                : "border-gray-200 text-gray-600 bg-white hover:border-gray-300"
            }`}
          >
            🟢 متاح اليوم فقط
          </button>
          <span className="text-sm text-gray-400">{workers.length} عامل</span>
        </div>

        {/* Workers list */}
        {loading ? (
          <div className="text-center py-16 text-gray-400">
            <p className="text-lg font-medium">جاري تحديث العمال...</p>
          </div>
        ) : filtered.length > 0 ? (
          <div className="flex flex-col gap-4">
            {filtered.map((worker) => (
              <WorkerCard key={worker.id} worker={worker} />
            ))}
          </div>
        ) : (
          <div className="text-center py-16 text-gray-400">
            <div className="text-5xl mb-4">👷</div>
            <p className="text-lg font-medium">لا يوجد عمال مطابقون</p>
          </div>
        )}
      </main>
      <Footer />
    </>
  );
}
