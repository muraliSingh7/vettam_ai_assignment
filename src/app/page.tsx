"use client";
import React, { useState } from "react";
import AppSiderbar, {
  AppSidebarTrigger,
} from "@/components/layout/templates/AppSiderbar";
import { SidebarProvider } from "@/components/ui/sidebar";
import DocumentEditor from "@/components/layout/templates/DocumentEditor";

export default function EditorPage() {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  return (
    <SidebarProvider open={sidebarOpen} onOpenChange={setSidebarOpen}>
      <main className="flex flex-1 p-4 gap-8 bg-[#FFFFFF] w-full h-dvh">
        {sidebarOpen && <AppSiderbar />}
        {!sidebarOpen && (
          <AppSidebarTrigger isSidebarOpen={sidebarOpen} logoColor="#000000" />
        )}
        <DocumentEditor />
      </main>
    </SidebarProvider>
  );
}
