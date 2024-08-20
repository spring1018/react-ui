"use client";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useState } from "react";

export default function Page() {
  const [tab, setTab] = useState("account");

  return (
    <div>
      <Tabs value={tab} onValueChange={setTab}>
        <TabsList>
          <TabsTrigger value="account">Account</TabsTrigger>
          <TabsTrigger value="password">Password</TabsTrigger>
        </TabsList>
        <TabsContent value="account">account</TabsContent>
        <TabsContent value="password">password</TabsContent>
      </Tabs>
      state: {tab}
    </div>
  );
}
