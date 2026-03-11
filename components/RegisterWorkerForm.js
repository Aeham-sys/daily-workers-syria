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

export default function RegisterWorkerForm() {
  const router = useRouter();
  const { user } = useAuth();
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({
    name: "",
    phone: "",
    skills: [],
    location: "",
    bio: "",
  });

  function handleChange(e) {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  }

  function handleSkillToggle(skill) {
    setForm((prev) => {
      const skills = prev.skills.includes(skill)
        ? prev.skills.filter((s) => s !== skill)
        : [...prev.skills, skill];
      return { ...prev, skills };
    });
  }

  async function handleSubmit(e) {
    e.preventDefault();
    if (
      !form.name ||
      !form.phone ||
      form.skills.length === 0 ||
      !form.location
    ) {
      alert("يرجى ملء جميع الحقول المطلوبة واختيار مهارة واحدة على الأقل");
      return;
    }
    setLoading(true);
    try {
      const docRef = await addDoc(collection(db, "workers"), {
        ...form,
        userId: user?.uid || null,
        rating: 5,
        reviewCount: 0,
        availableToday: true,
        createdAt: serverTimestamp(),
      });

      // Save ID to localStorage to allow this user to manage their profile
      localStorage.setItem("myWorkerId", docRef.id);

      alert("✅ تم إنشاء ملفك الشخصي بنجاح! أنت الآن متاح للعمل.");
      router.push("/workers");
      router.refresh();
    } catch (error) {
      console.error("Error adding worker: ", error);
      alert("❌ حدث خطأ أثناء إنشاء الملف الشخصي.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-6">
      {/* Name */}
      <div>
        <label className="label" htmlFor="name">
          الاسم الكامل *
        </label>
        <input
          id="name"
          name="name"
          value={form.name}
          onChange={handleChange}
          placeholder="مثال: أحمد محمد"
          className="input-field"
          required
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

      {/* Skills selection */}
      <div>
        <label className="label">المهارات / التخصصات *</label>
        <p className="text-xs text-gray-500 mb-3">
          (يمكنك اختيار أكثر من مهارة)
        </p>
        <div className="grid grid-cols-2 gap-2">
          {categories.map((cat) => (
            <button
              key={cat}
              type="button"
              onClick={() => handleSkillToggle(cat)}
              className={`py-3 px-4 rounded-xl border-2 text-sm font-semibold transition-all ${
                form.skills.includes(cat)
                  ? "border-brand-500 bg-brand-50 text-brand-700"
                  : "border-gray-200 text-gray-600 hover:border-gray-300"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Location */}
      <div>
        <label className="label" htmlFor="location">
          الموقع / المدينة *
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

      {/* Bio */}
      <div>
        <label className="label" htmlFor="bio">
          صف مهاراتك وخبراتك (مهم جداً للتوظيف) *
        </label>
        <textarea
          id="bio"
          name="bio"
          value={form.bio}
          onChange={handleChange}
          placeholder="اكتب هنا بالتفصيل ماذا تستطيع أن تفعل..."
          rows={4}
          className="input-field resize-none"
          required
        />
      </div>

      <button
        type="submit"
        disabled={loading}
        className="btn-primary text-lg py-4 mt-2"
      >
        {loading ? (
          <span className="flex items-center gap-2 justify-center">
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
            جاري التسجيل...
          </span>
        ) : (
          "✨ إنشاء ملفي كعامل"
        )}
      </button>
    </form>
  );
}
