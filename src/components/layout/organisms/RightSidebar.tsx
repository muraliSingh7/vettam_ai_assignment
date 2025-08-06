"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Menu, ChevronRight, Send } from "lucide-react";
import React, { useState } from "react";
import Image from "next/image";

const rightSidebarTabs = ["Thumbnail", "Index", "Search"];

const RightSidebar = () => {
  const [rightSidebarOpen, setRightSidebarOpen] = useState(false);
  const [rightSidebarActiveTab, setRightSidebarActiveTab] =
    useState<(typeof rightSidebarTabs)[number]>("Thumbnail");

  if (!rightSidebarOpen) {
    return (
      <Button
        variant="ghost"
        size="icon"
        title="Open Right Sidebar"
        onClick={() => setRightSidebarOpen(true)}
        className="rounded-full"
      >
        <Menu className="h-4 w-4 text-[#242424]" />
      </Button>
    );
  }

  return (
    <>
      <div className="flex flex-row justify-between items-center p-2 rounded-tl-sm rounded-tr-sm border-b border-[#bbb9bd]">
        {/* Tabs */}
        <div className="flex flex-row items-center gap-2">
          {rightSidebarTabs.map((tab) => (
            <Button
              key={tab}
              onClick={() => setRightSidebarActiveTab(tab)}
              className={`p-1 rounded-none shadow-none text-sm font-medium border-b-2 font-semibold font-['Avenir_Next'] hover:bg-[#f2edf7] transition-colors ${
                rightSidebarActiveTab === tab
                  ? "border-[#694c80] text-[#694c80] bg-transparent"
                  : "border-transparent bg-transparent text-[#4E4E50] hover:text-[#694c80]"
              }`}
            >
              {tab}
            </Button>
          ))}
        </div>
        <Button
          variant="ghost"
          size="icon"
          title="Close Right Sidebar"
          onClick={() => setRightSidebarOpen(false)}
        >
          <ChevronRight className="h-4 w-4 text-[#242424]" />
        </Button>
      </div>
      {/* Content */}
      <div className="flex flex-col flex-1 overflow-auto scrollbar-thin scrollbar-thumb-[#694c80] scrollbar-track-transparent my-4">
        {rightSidebarActiveTab === "Thumbnail" && (
          <div className="flex flex-col gap-4 max-h-96 px-2">
            {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((index) => (
              <Image
                key={index}
                src="/pdf.png"
                alt="thumbnail"
                width={500}
                height={500}
                className="w-full h-full object-contain"
              />
            ))}
          </div>
        )}
        {rightSidebarActiveTab === "Index" && <></>}
        {rightSidebarActiveTab === "Search" && <></>}
      </div>
      {/* AI Input */}
      <div className="bg-gradient-to-r from-[#BBE6F8] to-[#AD73F7] p-0.5 h-10 rounded-md">
        <div className="relative w-full bg-[#FFFFFF] flex items-center h-9 rounded-sm">
          <Input
            type="text"
            placeholder="Ask Vettam"
            className="pr-10 rounded-sm focus-visible:!border-transparent focus-visible:!ring-0 focus-visible:!ring-none focus-visible:!outline-none m-0"
          />
          <Button
            type="submit"
            variant={"ghost"}
            size={"icon"}
            className="absolute right-1 top-1/2 transform -translate-y-1/2  hover:opacity-80"
            title="Send to VettamAI"
          >
            <Send className="h-4 w-4 text-[#57575C]" />
          </Button>
        </div>
      </div>
    </>
  );
};

export default RightSidebar;
