import Link from "next/link";
import RatingStars from "@/components/RatingStars";
import { useState, useEffect } from "react";

export default function WorkerCard({ worker }) {
  const [canDelete, setCanDelete] = useState(false);

  useEffect(() => {
    const myId = localStorage.getItem("myWorkerId");
    if (myId === worker.id) {
      setCanDelete(true);
    }
  }, [worker.id]);

  const whatsappUrl = `https://wa.me/963${worker.phone.replace(/^0/, "")}`;

  return (
    <div className="card p-4">
      {/* Header */}
      <div className="flex items-center gap-3 mb-3">
        {/* Avatar */}
        <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-brand-400 to-brand-600 flex items-center justify-center text-white text-2xl font-bold shrink-0">
          {worker.name[0]}
        </div>
        <div className="flex-1 min-w-0">
          <h3 className="font-bold text-gray-900 text-base leading-tight">
            {worker.name}
          </h3>
          <p className="text-sm text-gray-500 mt-0.5">📍 {worker.location}</p>
        </div>
        {/* Availability badge */}
        {worker.availableToday ? (
          <span className="badge bg-green-100 text-green-700 text-xs animate-pulse">
            🟢 متاح اليوم
          </span>
        ) : (
          <span className="badge bg-gray-100 text-gray-500 text-xs">
            ⚫ غير متاح
          </span>
        )}
      </div>

      {/* Rating */}
      <div className="mb-3">
        <RatingStars rating={worker.rating} reviewCount={worker.reviewCount} />
      </div>

      {/* Skills */}
      <div className="flex flex-wrap gap-2 mb-4">
        {worker.skills.map((skill) => (
          <span
            key={skill}
            className="badge bg-brand-50 text-brand-700 text-sm"
          >
            {skill}
          </span>
        ))}
      </div>

      {/* Actions */}
      <div className="grid grid-cols-2 gap-2">
        <a href={`tel:${worker.phone}`} className="btn-secondary text-sm py-3">
          📞 اتصال
        </a>
        <a
          href={whatsappUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="btn-primary text-sm py-3 bg-green-500 hover:bg-green-600"
        >
          💬 واتساب
        </a>
      </div>

      {canDelete && (
        <div className="mt-4 pt-4 border-t border-gray-100 flex justify-center">
          <Link
            href={`/workers/${worker.id}`}
            className="text-xs text-red-500 hover:text-red-700 font-medium flex items-center gap-1"
          >
            🗑️ إدارة أو حذف ملفي الشخصي
          </Link>
        </div>
      )}
    </div>
  );
}
