"use client";
import { useSession } from "next-auth/react";
import { useLayoutEffect, useState } from "react";

export const LoadingWrapper = ({ children }: { children: React.ReactNode }) => {
  const { data: session } = useSession();
  const [loading, setLoading] = useState(true);

  useLayoutEffect(() => {
    if (session !== null) {
      setLoading(false);
    }
  }, [session]);

  if (loading) {
    return (
      <div className="px-2 py-2">
        <div>Loading...</div>
      </div>
    );
  }

  if (session === null) {
    return (
      <div className="px-2 py-2">
        <div>ログインしてください</div>
        <a className="text-blue-800 underline" href="/login">ログインページ</a>
      </div>
    );
  }

  if (session) {
    return <div>{children}</div>;
  }
};
