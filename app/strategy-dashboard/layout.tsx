import { getServerSession } from "@/app/_clients/nextAuth";
import { AuthProvider } from "@/app/_providers/AuthProviders";
import AuthNavBar from "@/components/molecules/AuthNavBar";
import type { Metadata } from "next";
import type { PropsWithChildren, ReactNode } from "react";

export const metadata: Metadata = {
  title: "Dashboard",
  description: "Generated by create next app",
};

const items = [
  // { title: "Sample", href: "/sample" },
  // { title: "Taonomy", href: "/taxonomy" },
  // { title: "Contact", href: "/contact" },
];

type Props = PropsWithChildren<{
  children: ReactNode;
}>;

export default async function SiteLayout({ children }: Props) {
  const session = await getServerSession();
  return (
    <AuthProvider>
      <AuthNavBar
        bgColor="bg-slate-50"
        logo={"App"}
        items={items}
        session={session}
      />
      <main className="py-4 px-4 flex-1 overflow-y-auto bg-slate-50">
        {children}
      </main>
    </AuthProvider>
    // {dialog}
  );
}
