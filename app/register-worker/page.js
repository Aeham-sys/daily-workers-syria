import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import RegisterWorkerForm from "@/components/RegisterWorkerForm";

export const metadata = {
  title: "انضم كعامل | عمّال",
  description: "سجل مهاراتك في منصة عمّال لتصل إلى أصحاب العمل في منطقتك.",
};

export default function RegisterWorkerPage() {
  return (
    <>
      <Navbar />
      <main className="page-container py-8">
        <div className="max-w-md mx-auto">
          <h1 className="text-2xl font-black text-gray-900 mb-2">
            👷 انضم كعامل
          </h1>
          <p className="text-gray-500 mb-8">
            أدخل بياناتك لكي يتمكن أصحاب العمل من العثور عليك والتواصل معك
            مباشرة.
          </p>

          <div className="card p-6 border-brand-100 bg-white">
            <RegisterWorkerForm />
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
