"use client";
import { Button } from "@/components/ui/button";
import { signOut } from "next-auth/react";

export const LogoutButton = ({ variant = "default" }) => {
  return (
    <Button variant={variant} onClick={() => signOut()}>
      Sign Out
    </Button>
  );
};
