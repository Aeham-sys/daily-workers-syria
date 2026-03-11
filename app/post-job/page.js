import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import PostJobForm from "@/components/PostJobForm";

export default function PostJobPage() {
  return (
    <>
      <Navbar />
      <main className="page-container">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="w-16 h-16 bg-brand-50 rounded-2xl flex items-center justify-center text-3xl mx-auto mb-4">
            📝
          </div>
          <h1 className="text-2xl font-black text-gray-900">نشر طلب عمل</h1>
          <p className="text-gray-500 mt-2 text-sm">
            أضف تفاصيل العمل المطلوب وسيصلك العمال المناسبون
          </p>
        </div>

        <div className="card p-5">
          <PostJobForm />
        </div>
      </main>
      <Footer />
    </>
  );
}
