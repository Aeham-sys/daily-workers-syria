import Link from "next/link";
import { timeAgo } from "@/lib/dummyData";

const categoryColors = {
  دهان: "bg-blue-100 text-blue-700",
  نجارة: "bg-amber-100 text-amber-700",
  كهرباء: "bg-yellow-100 text-yellow-700",
  سباكة: "bg-cyan-100 text-cyan-700",
  بناء: "bg-orange-100 text-orange-700",
  تنظيف: "bg-green-100 text-green-700",
  ميكانيك: "bg-gray-100 text-gray-700",
};

export default function JobCard({ job }) {
  const categoryColor =
    categoryColors[job.category] || "bg-gray-100 text-gray-700";

  return (
    <div className="card p-4">
      <div className="flex items-start justify-between gap-3 mb-3">
        <div className="flex-1 min-w-0">
          <span className={`badge ${categoryColor} mb-2`}>{job.category}</span>
          <h3 className="text-lg font-bold text-gray-900 leading-snug">
            {job.title}
          </h3>
        </div>
        <div className="text-left shrink-0">
          <div className="text-brand-700 font-bold text-lg">{job.wage}</div>
        </div>
      </div>

      <div className="flex items-center gap-4 text-sm text-gray-500 mb-4">
        <span className="flex items-center gap-1">
          <span>📍</span>
          <span>{job.location}</span>
        </span>
        <span className="flex items-center gap-1">
          <span>🕐</span>
          <span>{timeAgo(job.createdAt)}</span>
        </span>
      </div>

      <p className="text-gray-600 text-sm leading-relaxed line-clamp-2 mb-4">
        {job.description}
      </p>

      <Link href={`/jobs/${job.id}`} className="btn-primary text-base py-3">
        عرض التفاصيل
      </Link>
    </div>
  );
}
