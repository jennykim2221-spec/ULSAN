import type { Metadata } from 'next';
import type { ReactNode } from 'react';
import './globals.css';
import { Geist } from "next/font/google";
import { cn } from "@/lib/utils";

const geist = Geist({subsets:['latin'],variable:'--font-sans'});

export const metadata: Metadata = {
  title: 'ULSAN — 강을 따라, 울산의 시간을 만나다.',
  description: '강을 따라 이어지는 울산의 기록과 변화, 도시와 바다의 이야기.',
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return <html lang="ko" className={cn("font-sans", geist.variable)}><body>{children}</body></html>;
}
