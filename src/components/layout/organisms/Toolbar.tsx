import React, { useState } from "react";
import { EditorTab } from "@/components/layout/atoms/TabEditor";
import { TextToolbar } from "@/components/toolbar/templates/TextToolbar";
import PageToolbar from "@/components/toolbar/templates/PageToolbar";

export type ActiveEditorTab = "text" | "page";

const Toolbar= () => {
  const [activeTab, setActiveTab] = useState<ActiveEditorTab>("text");
  return (
    <>
      {/* Tabs */}
      <div className="flex items-center gap-2">
        <EditorTab
          label="Text"
          isActive={activeTab === "text"}
          onClick={() => setActiveTab("text")}
        />
        <EditorTab
          label="Page"
          isActive={activeTab === "page"}
          onClick={() => setActiveTab("page")}
        />
      </div>

      {/* Toolbars */}
      <div className="flex">
        {activeTab === "text" && <TextToolbar />}
        {activeTab === "page" && <PageToolbar />}
      </div>
    </>
  );
};

export default Toolbar;
