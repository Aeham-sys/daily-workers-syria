# عمّال - منصة خدمات العمالة اليومية

منصة ويب تربط بين أصحاب العمل والعمال الماهرين في خدمات الدهان والنجارة والكهرباء والبناء والأعمال المنزلية.

## ✨ الميزات (سوريا 🇸🇾)

- **نشر طلبات عمل** بخطوات بسيطة وسريعة (متوافق مع دمشق، حلب، حمص، اللاذقية، إلخ).
- **هوية آمنة (Anonymous Auth):** حفظ خصوصية المستخدم وتثبيت هويته تقنياً دون طلب بيانات شخصية.
- **تصفح الإعلانات** مع إمكانية البحث والفلترة حسب التخصص والمدينة.
- **تصفح العمال المتاحين** والتواصل المباشر معهم.
- **زر "أنا متاح اليوم"** ليظهر العامل في القائمة (حفظ الملكية تقنياً).
- **التواصل المباشر** عبر الاتصال (أرقام 09XXXXXXXX) أو واتساب.
- **تصميم Mobile First** بدعم كامل للغة العربية RTL.

## 🛠️ التقنيات المستخدمة

- **Next.js 14** (App Router)
- **React 18**
- **Tailwind CSS 3**
- **Firebase Authentication** (الدخول المجهول لضمان الأمان)
- **Firestore Database** (قاعدة برمجية آمنة)

## 🚀 تشغيل المشروع محلياً

```bash
# 1. تثبيت المكتبات
npm install

# 2. تشغيل خادم التطوير
npm run dev
```

افتح المتصفح على: [http://localhost:3000](http://localhost:3000)

## 🔥 ربط Firebase (لاحقاً)

1. أنشئ مشروع Firebase على [console.firebase.google.com](https://console.firebase.google.com)
2. فعّل **Firestore Database**
3. أنشئ تطبيق ويب واحصل على بيانات الاتصال
4. أنشئ ملف `.env.local` في جذر المشروع وأضف:

```env
NEXT_PUBLIC_FIREBASE_API_KEY=your_api_key
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your_project.firebaseapp.com
NEXT_PUBLIC_FIREBASE_PROJECT_ID=your_project_id
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your_project.appspot.com
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
NEXT_PUBLIC_FIREBASE_APP_ID=your_app_id
```

## 🌐 النشر على Vercel

1. ارفع المشروع على GitHub
2. اذهب إلى [vercel.com](https://vercel.com) وسجل الدخول
3. اضغط **"New Project"** واختر المستودع
4. أضف متغيرات البيئة (Environment Variables) الخاصة بـ Firebase
5. اضغط **"Deploy"**

سيتم بناء المشروع ونشره تلقائياً!

## 📁 هيكل المشروع

```
├── app/
│   ├── layout.js          # التخطيط الرئيسي (RTL + Arabic font)
│   ├── page.js            # الصفحة الرئيسية
│   ├── globals.css        # الأنماط العامة
│   ├── jobs/
│   │   ├── page.js        # قائمة الإعلانات
│   │   └── [id]/page.js   # تفاصيل الإعلان
│   ├── post-job/
│   │   └── page.js        # نشر طلب عمل
│   └── workers/
│       ├── page.js        # قائمة العمال
│       └── [id]/page.js   # ملف العامل
├── components/
│   ├── Navbar.js
│   ├── Footer.js
│   ├── JobCard.js
│   ├── WorkerCard.js
│   ├── PostJobForm.js
│   └── RatingStars.js
├── lib/
│   ├── firebase.js        # إعدادات Firebase
│   └── dummyData.js       # بيانات تجريبية
└── README.md
```

## 📊 قاعدة البيانات (Firestore)

### Collection: `jobs`

| الحقل       | النوع     | الوصف         |
| ----------- | --------- | ------------- |
| title       | string    | عنوان العمل   |
| description | string    | وصف العمل     |
| location    | string    | الموقع        |
| wage        | string    | الأجر المتوقع |
| phone       | string    | رقم الهاتف    |
| category    | string    | نوع العمل     |
| createdAt   | timestamp | تاريخ النشر   |

### Collection: `workers`

| الحقل          | النوع   | الوصف      |
| -------------- | ------- | ---------- |
| name           | string  | اسم العامل |
| phone          | string  | رقم الهاتف |
| skills         | array   | المهارات   |
| rating         | number  | التقييم    |
| location       | string  | الموقع     |
| availableToday | boolean | متاح اليوم |
| bio            | string  | نبذة       |
