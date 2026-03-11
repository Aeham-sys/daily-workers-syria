import "./globals.css";
import { AuthProvider } from "@/components/AuthProvider";

export const metadata = {
  title: "عمّال | منصة خدمات العمالة اليومية في سوريا",
  description:
    "منصة تربط أصحاب العمل بالعمال الماهرين في خدمات الدهان والنجارة والكهرباء والبناء والأعمال المنزلية في سوريا.",
  openGraph: {
    title: "عمّال | منصة خدمات العمالة اليومية في سوريا",
    description: "ابحث عن أفضل العمال الماهرين في منطقتك أو أعلن عن خدماتك كعامل.",
    url: "https://daily-workers-syria.netlify.app",
    siteName: "عمّال",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "عمّال - منصة الخدمات العمالية",
      },
    ],
    locale: "ar_SY",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "عمّال | منصة خدمات العمالة اليومية",
    description: "منصة تربط أصحاب العمل بالعمال الماهرين في سوريا.",
    images: ["/og-image.png"],
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
