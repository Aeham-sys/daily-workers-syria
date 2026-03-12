import "./globals.css";
import { AuthProvider } from "@/components/AuthProvider";

export const metadata = {
  metadataBase: new URL("https://daily-workers-syria.netlify.app"),
  title: "عمّال | منصة خدمات العمالة اليومية في سوريا",
  description:
    "منصة تربط أصحاب العمل بالعمال الماهرين في خدمات الدهان والنجارة والكهرباء والبناء والأعمال المنزلية في سوريا. ابحث عن فنيين موثوقين في منطقتك.",
  keywords: [
    "عمال سوريا",
    "فنيين سوريا",
    "دهان",
    "نجار",
    "كهربائي",
    "خدمات منزلية سوريا",
    "صيانة منازل",
    "أعمال حرة سوريا",
  ],
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "عمّال | منصة خدمات العمالة اليومية في سوريا",
    description:
      "ابحث عن أفضل العمال الماهرين في منطقتك أو أعلن عن خدماتك كعامل. الحل الأمثل للخدمات المنزلية والمهنية في سوريا.",
    url: "https://daily-workers-syria.netlify.app",
    siteName: "عمّال",
    images: [
      {
        url: "https://daily-workers-syria.netlify.app/og-image.png",
        width: 1200,
        height: 630,
        alt: "عمّال - منصة الخدمات العمالية في سوريا",
      },
    ],
    locale: "ar_SY",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "عمّال | منصة خدمات العمالة اليومية",
    description: "أول منصة سورية لربط العمال الماهرين بأصحاب العمل.",
    images: ["https://daily-workers-syria.netlify.app/og-image.png"],
  },
  icons: {
    icon: "/favicon.ico",
  },
  verification: {
    google: "LBkARNpwx1x3XNtJ0I2cxwwOkdDuq-oeURMw0BjzL44",
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="ar" dir="rtl">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="true"
        />
      </head>
      <body className="font-arabic bg-gray-50 min-h-screen">
        <AuthProvider>{children}</AuthProvider>
      </body>
    </html>
  );
}
