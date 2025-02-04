import type { Metadata } from "next";
import { Urbanist } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { cn } from "@/util/cn";
import LocoScroll from "@/components/LocoScroll";
import { PrismicPreview } from "@prismicio/next";
import { repositoryName } from "@/prismicio";
import { Analytics } from "@vercel/analytics/react";
import PHProvider from "@/components/PHProvider";

const urbanist = Urbanist({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Jay Ganatra",
  description:
    "Portfolio Website of Jay Ganatra. Software Engineer, Web Developer, and Designer.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <LocoScroll>
      <html lang="en" className="bg-slate-900 text-slate-100">
        <body className={cn(urbanist.className, "relative min-h-screen")}>
          <Analytics />
          <PHProvider>
            <Header />
            {children}
            <Footer />
            <PrismicPreview repositoryName={repositoryName} />
            <div className="absolute inset-0 -z-50 max-h-screen background-gradient"></div>
            <div className="absolute pointer-events-none inset-0 -z-40 h-full bg-[url('/noisetexture.jpg')] opacity-20 mix-blend-soft-light"></div>
          </PHProvider>
        </body>
      </html>
    </LocoScroll>
  );
}
