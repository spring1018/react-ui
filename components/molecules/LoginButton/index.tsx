"use client";
import { Button } from "@/components/ui/button";
import { signIn } from "next-auth/react";

export const LoginButton = ({ variant = "default" }) => {
  return (
    <Button variant={variant} onClick={() => signIn()}>
      Sign in
    </Button>
  );
};
