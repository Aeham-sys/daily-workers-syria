// Dummy data for Jobs - replace with Firebase Firestore calls later
export const dummyJobs = [
  {
    id: "1",
    title: "دهان شقة سكنية",
    description:
      "مطلوب دهان محترف لدهان شقة مكونة من 3 غرف، العمل لمدة أسبوع تقريباً. يجب توفير معدات الدهان.",
    location: "دمشق - حي المزة",
    wage: "200,000 ل.س",
    phone: "09XXXXXXXX",
    category: "دهان",
    createdAt: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(),
  },
  {
    id: "2",
    title: "تركيب أبواب خشبية",
    description:
      "مطلوب نجار ماهر لتركيب 4 أبواب خشبية في فيلا. الخشب متوفر، العمل يوم واحد.",
    location: "حلب - حي الفرقان",
    wage: "150,000 ل.س",
    phone: "09XXXXXXXX",
    category: "نجارة",
    createdAt: new Date(Date.now() - 5 * 60 * 60 * 1000).toISOString(),
  },
  {
    id: "3",
    title: "تمديد كهرباء مكتب",
    description:
      "مطلوب كهربائي لتمديد كهرباء وتركيب إضاءة في مكتب تجاري، مساحة 200 متر.",
    location: "حمص - حي الوعر",
    wage: "300,000 ل.س",
    phone: "09XXXXXXXX",
    category: "كهرباء",
    createdAt: new Date(Date.now() - 8 * 60 * 60 * 1000).toISOString(),
  },
  {
    id: "4",
    title: "تنسيق حديقة منزلية",
    description:
      "مطلب عامل زراعة لتقليم الأشجار وتنسيق الحديقة المنزلية في دمشق.",
    location: "دمشق - المزة",
    wage: "150,000 ل.س",
    phone: "09XXXXXXXX",
    category: "زراعة",
    createdAt: new Date(Date.now() - 1 * 60 * 60 * 1000).toISOString(),
  },
  {
    id: "5",
    title: "أعمال بلاط وسيراميك",
    description:
      "مطلوب بناء لتركيب سيراميك في دورة مياه وصالة، السيراميك جاهز.",
    location: "اللاذقية - الكورنيش",
    wage: "180,000 ل.س",
    phone: "09XXXXXXXX",
    category: "بناء",
    createdAt: new Date(Date.now() - 14 * 60 * 60 * 1000).toISOString(),
  },
  {
    id: "6",
    title: "تنظيف مبنى تجاري",
    description: "مطلوب فريق تنظيف لمبنى من 3 طوابق، العمل يومين كاملين.",
    location: "طرطوس - وسط المدينة",
    wage: "250,000 ل.س",
    phone: "09XXXXXXXX",
    category: "تنظيف",
    createdAt: new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString(),
  },
];

// Dummy data for Workers - replace with Firebase Firestore calls later
export const dummyWorkers = [
  {
    id: "w1",
    name: "أحمد محمد السالم",
    phone: "09XXXXXXXX",
    skills: ["دهان", "ديكور"],
    rating: 4.8,
    reviewCount: 23,
    location: "دمشق",
    availableToday: true,
    bio: "دهان محترف بخبرة 10 سنوات في الدهان الداخلي والخارجي والديكورات.",
    yearsOfExperience: 10,
  },
  {
    id: "w2",
    name: "سالم عبدالله القحطاني",
    phone: "09XXXXXXXX",
    skills: ["نجارة", "أثاث"],
    rating: 4.6,
    reviewCount: 17,
    location: "حلب",
    availableToday: true,
    bio: "نجار متخصص في تركيب الأبواب والخزائن وأعمال الأثاث.",
    yearsOfExperience: 8,
  },
  {
    id: "w3",
    name: "محمد عبدالرحمن العتيبي",
    phone: "09XXXXXXXX",
    skills: ["كهرباء", "تمديدات"],
    rating: 4.9,
    reviewCount: 41,
    location: "حمص",
    availableToday: false,
    bio: "كهربائي معتمد متخصص في التمديدات الكهربائية للمنازل والمشاريع.",
    yearsOfExperience: 15,
  },
  {
    id: "w4",
    name: "خالد إبراهيم الشهري",
    phone: "0504444444",
    skills: ["زراعة", "تنسيق حدائق"],
    rating: 4.5,
    reviewCount: 29,
    location: "دمشق",
    availableToday: true,
    bio: "عامل زراعة محترف متخصص في تقليم الأشجار وزراعة الشتلات وتنسيق الحدائق.",
    yearsOfExperience: 12,
  },
  {
    id: "w5",
    name: "فيصل ناصر الدوسري",
    phone: "09XXXXXXXX",
    skills: ["بناء", "سيراميك", "باطون"],
    rating: 4.7,
    reviewCount: 35,
    location: "اللاذقية",
    availableToday: true,
    bio: "بنّاء ماهر متخصص في أعمال الباطون والسيراميك والتشطيبات.",
    yearsOfExperience: 18,
  },
];

// Category metadata
export const categories = [
  { id: "all", label: "الكل", emoji: "🔧" },
  { id: "دهان", label: "دهان", emoji: "🎨" },
  { id: "نجارة", label: "نجارة", emoji: "🪚" },
  { id: "كهرباء", label: "كهرباء", emoji: "⚡" },
  { id: "زراعة", label: "زراعة", emoji: "🌿" },
  { id: "بناء", label: "بناء", emoji: "🏗️" },
  { id: "تنظيف", label: "تنظيف", emoji: "🧹" },
  { id: "ميكانيك", label: "ميكانيك", emoji: "🔩" },
];

// Helper: format time ago in Arabic
export function timeAgo(isoString) {
  const now = new Date();
  const past = new Date(isoString);
  const diffMs = now - past;
  const diffMins = Math.floor(diffMs / 60000);
  if (diffMins < 60) return `منذ ${diffMins} دقيقة`;
  const diffHours = Math.floor(diffMins / 60);
  if (diffHours < 24) return `منذ ${diffHours} ساعة`;
  const diffDays = Math.floor(diffHours / 24);
  return `منذ ${diffDays} يوم`;
}
