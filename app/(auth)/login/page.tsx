"use client";

import { NextAuthProvider } from "@/app/providers";
import { Button } from "@/components/ui/button";
import { signIn, signOut, useSession } from "next-auth/react";


export default async function Home() {
  return (
    <NextAuthProvider>
      <ClientHome />
    </NextAuthProvider>
  );
}

export const LoginButton = () => {
  return (
    <Button style={{ marginRight: 10 }} onClick={() => signIn()}>
      Sign in
    </Button>
  );
};
export const LogoutButton = () => {
    return (
      <Button style={{ marginRight: 10 }} onClick={() => signOut()}>
        Sign Out
      </Button>
    );
  };
export function ClientHome() {
  const { data: session } = useSession();
  const user = session?.user;

  return (
      <div>
        <div>{`${JSON.stringify(user)}`}</div>
        {user ? <div>ログイン状態です</div> : <div>ログインしてください</div>}
        {user ? <LogoutButton /> : <LoginButton />}
      </div>
  );
}
