"use client";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

export const LoginButton = ({ variant = "default" }) => {
  const router = useRouter();
  return (
    <Button variant={variant} onClick={() => router.push("/login")}>
      Sign in
    </Button>
  );
};
