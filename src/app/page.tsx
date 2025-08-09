"use client";
import React, { useState } from "react";
import AppSiderbar, {
  AppSidebarTrigger,
} from "@/components/layout/templates/AppSiderbar";
import { SidebarProvider } from "@/components/ui/sidebar";
import DocumentEditor from "@/components/layout/templates/DocumentEditor";

export default function EditorPage() {
  return (
    <SidebarProvider >
      <AppSiderbar />
      <main className="flex flex-1 p-4 bg-[#FFFFFF] w-full h-dvh">
        <DocumentEditor />
      </main>
    </SidebarProvider>
  );
}
