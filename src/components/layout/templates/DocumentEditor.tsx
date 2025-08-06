"use client";

import React from "react";
import { EditorContent } from "@tiptap/react";
import RightSidebar from "@/components/layout/organisms/RightSidebar";
import EditorFooter from "@/components/layout/organisms/EditorFooter";
import Toolbar from "@/components/layout/organisms/Toolbar";
import Header from "@/components/layout/organisms/Header";
import useDocEditor from "@/components/layout/hooks/useDocEditor";
import { ToolbarProvider } from "@/components/toolbar/contexts/toolbar";
import { Ruler } from "@/components/ruler/molecules/Ruler";

const DocumentEditor: React.FC = () => {
  const { editor, editorRef, docStats, goToPage } = useDocEditor();
  if (!editor) {
    return <div>Loading...</div>;
  }

  return (
    <ToolbarProvider editor={editor}>
      <div className="max-h-screen w-full">
        <Header />
        <Toolbar />
        {/* Main content area */}
        <div className="flex max-h-[85dvh] ">
          <Ruler>
            <div className="mx-auto flex flex-col bg-[#f2f2f7] "> 
              <EditorContent ref={editorRef} editor={editor} />
              <div className="sticky bottom-0 flex items-center justify-between text-sm text-gray-600">
                <EditorFooter docStats={docStats} goToPage={goToPage} />
              </div>
            </div>
          </Ruler>
          <div className="flex flex-col bg-[#f8f9fa]">
            <RightSidebar />
          </div> 
        </div>
      </div>
    </ToolbarProvider>
  );
};

export default DocumentEditor;
