"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/components/AuthProvider";
import { db } from "@/lib/firebase";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";

const categories = [
  "دهان",
  "نجارة",
  "كهرباء",
  "زراعة",
  "بناء",
  "تنظيف",
  "ميكانيك",
  "أعمال منزلية",
];

export default function PostJobForm() {
  const router = useRouter();
  const { user } = useAuth();
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({
    title: "",
    category: "",
    description: "",
    location: "",
    wage: "",
    phone: "",
  });

  function handleChange(e) {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  }

  async function handleSubmit(e) {
    e.preventDefault();
    if (!form.title || !form.category || !form.location || !form.phone) {
      alert("يرجى ملء جميع الحقول المطلوبة");
      return;
    }
    setLoading(true);
    try {
      const docRef = await addDoc(collection(db, "jobs"), {
        ...form,
        userId: user?.uid || null,
        createdAt: serverTimestamp(),
      });

      // Save ID to localStorage to allow this user to delete it later
      const myJobs = JSON.parse(localStorage.getItem("myJobs") || "[]");
      myJobs.push(docRef.id);
      localStorage.setItem("myJobs", JSON.stringify(myJobs));

      alert("✅ تم نشر الإعلان بنجاح!");
      router.push("/jobs");
      router.refresh();
    } catch (error) {
      console.error("Error adding document: ", error);
      alert("❌ حدث خطأ أثناء نشر الإعلان.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-5">
      {/* Category picker */}
      <div>
        <label className="label">نوع العمل *</label>
        <div className="grid grid-cols-2 gap-2">
          {categories.map((cat) => (
            <button
              key={cat}
              type="button"
              onClick={() => setForm((p) => ({ ...p, category: cat }))}
              className={`py-3 px-4 rounded-xl border-2 text-sm font-semibold transition-all ${
                form.category === cat
                  ? "border-brand-500 bg-brand-50 text-brand-700"
                  : "border-gray-200 text-gray-600 hover:border-gray-300"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Title */}
      <div>
        <label className="label" htmlFor="title">
          عنوان العمل *
        </label>
        <input
          id="title"
          name="title"
          value={form.title}
          onChange={handleChange}
          placeholder="مثال: مطلوب دهان لشقة في دمشق"
          className="input-field"
          required
        />
      </div>

      {/* Description */}
      <div>
        <label className="label" htmlFor="description">
          وصف العمل
        </label>
        <textarea
          id="description"
          name="description"
          value={form.description}
          onChange={handleChange}
          placeholder="اكتب تفاصيل العمل المطلوب..."
          rows={4}
          className="input-field resize-none"
        />
      </div>

      {/* Location */}
      <div>
        <label className="label" htmlFor="location">
          الموقع *
        </label>
        <input
          id="location"
          name="location"
          value={form.location}
          onChange={handleChange}
          placeholder="مثال: دمشق - المزة"
          className="input-field"
          required
        />
      </div>

      {/* Wage */}
      <div>
        <label className="label" htmlFor="wage">
          الأجر المتوقع
        </label>
        <input
          id="wage"
          name="wage"
          value={form.wage}
          onChange={handleChange}
          placeholder="مثال: 50,000 ل.س"
          className="input-field"
        />
      </div>

      {/* Phone */}
      <div>
        <label className="label" htmlFor="phone">
          رقم الهاتف للتواصل *
        </label>
        <input
          id="phone"
          name="phone"
          value={form.phone}
          onChange={handleChange}
          type="tel"
          placeholder="09XXXXXXXX"
          className="input-field"
          dir="ltr"
          required
        />
      </div>

      <button
        type="submit"
        disabled={loading}
        className="btn-primary text-lg py-4 mt-2"
      >
        {loading ? (
          <span className="flex items-center gap-2">
            <svg
              className="animate-spin h-5 w-5"
              viewBox="0 0 24 24"
              fill="none"
            >
              <circle
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="4"
                className="opacity-25"
              />
              <path
                fill="currentColor"
                d="M4 12a8 8 0 018-8v8z"
                className="opacity-75"
              />
            </svg>
            جاري النشر...
          </span>
        ) : (
          "🚀 نشر الإعلان"
        )}
      </button>
    </form>
  );
}
