import type { Metadata } from "next";
import { PT_Sans, DM_Sans } from "next/font/google";
import "@/styles/globals.css";

const ptSans = PT_Sans({
  subsets: ["latin"],
  weight: ["400", "700"],
  style: ["normal", "italic"],
  variable: "--font-pt-sans",
});

const dmSans = DM_Sans({
  subsets: ["latin"],
  variable: "--font-dm-sans",
});

export const metadata: Metadata = {
  title: "Daffa Haidar — Freelance UI/UX Designer & Frontend Dev",
  description:
    "I design and build digital products that people love to use — fast, clean, and accessible.",
};

// Sets the dark class before first paint to avoid a flash of the wrong theme.
const themeScript = `(function(){try{var t=localStorage.getItem('theme');var d=t==='dark'||(!t&&window.matchMedia('(prefers-color-scheme: dark)').matches);if(d)document.documentElement.classList.add('dark');}catch(e){}})()`;

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth" suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
      </head>
      <body
        className={`${ptSans.variable} ${dmSans.variable} font-body bg-white dark:bg-zinc-950 text-zinc-900 dark:text-zinc-100 antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
