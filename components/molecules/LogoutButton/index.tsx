"use client";
import { Button } from "@/components/ui/button";
import { signOut } from "next-auth/react";

export const LogoutButton = () => {
  return (
    <Button style={{ marginRight: 10 }} onClick={() => signOut()}>
      Sign Out
    </Button>
  );
};
