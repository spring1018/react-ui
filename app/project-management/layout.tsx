import { getServerSession } from "@/app/_clients/nextAuth";
import { AuthProvider } from "@/app/_providers/AuthProviders";
import AuthNavBar from "@/components/molecules/AuthNavBar";
import { Toaster } from "@/components/ui/toaster";
import type { Metadata } from "next";
import type { PropsWithChildren, ReactNode } from "react";
import { FaProjectDiagram } from "react-icons/fa";

export const metadata: Metadata = {
  title: "Project Management",
  description: "Generated by create next app",
};

const items = [
  { title: "Project", href: "/project-management/projects" },
  { title: "Task", href: "/task" },
  { title: "Event", href: "/event" },
];

type Props = PropsWithChildren<{
  children: ReactNode;
}>;

export default async function SiteLayout({ children }: Props) {
  const session = await getServerSession();
  return (
    <AuthProvider>
      <div className="flex flex-col h-screen">
        <AuthNavBar
          logoIcon={<FaProjectDiagram />}
          logoText={"プロジェクト管理"}
          items={items}
          session={session}
        />
        {(session?.user && (
          <main className="pr-4 flex-1 overflow-y-auto">{children}</main>
        )) || <div className="p-4">no session</div>}
      </div>
      <Toaster />
    </AuthProvider>
    // {dialog}
  );
}
