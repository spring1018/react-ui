"use client";
import { Button } from "@/components/ui/button";
import { signIn } from "next-auth/react";

export const LoginButton = () => {
  return (
    <Button style={{ marginRight: 10 }} onClick={() => signIn()}>
      Sign in
    </Button>
  );
};
