import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ChevronUp, ChevronDown } from "lucide-react";
import React, { useCallback } from "react";
import { useToolbar } from "@/components/toolbar/contexts/toolbar";
import { DocStats } from "@/components/layout/hooks/useDocEditor";

interface EditorFooterProps {
  docStats: DocStats;
  goToPage: (pageNumber: number) => void;
}

const EditorFooter: React.FC<EditorFooterProps> = ({ docStats, goToPage }) => {
  const { totalCharacters, totalPages, currentPage } = docStats;
  const { pageToolbar } = useToolbar();

  const handlePageInputChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const value = Number(e.target.value);
      if (!isNaN(value)) {
        goToPage(Math.min(Math.max(1, value)));
      }
    },
    [goToPage]
  );

  return (
    <>
      {totalCharacters > 0 && pageToolbar.characterCountVisible && (
        <div className="px-3 py-1 bg-[#f2edf7] rounded-lg gap-3 selg-stretch inline-flex justify-center items-center self-stretch">
          <span className="text-[#242424] text-sm font-medium font-['Avenir_Next']">
            {totalCharacters}{" "}
          </span>
          <span className="text-[#4E4E50] text-sm font-medium font-['Avenir_Next']">
            characters
          </span>
        </div>
      )}
      {totalPages > 0 && (
        <div className="px-3 py-1 bg-[#f2edf7] rounded-lg inline-flex justify-center items-center text-sm  font-['Avenir_Next'] gap-3">
          <span className="text-[#4E4E50] font-normal">Page </span>
          <div className="flex justify-start items-center gap-1">
            <Button
              variant="ghost"
              size="icon"
              className="p-1"
              title="Next Page"
              disabled={currentPage === totalPages}
              onClick={() => goToPage(Math.min(totalPages, currentPage + 1))}
            >
              <ChevronUp className="h-3 w-3 text-[#242424]" />
            </Button>
            <Label htmlFor="page-number" className="sr-only">
              Page Number
            </Label>
            <Input
              id="page-number"
              value={currentPage}
              min={1}
              onChange={handlePageInputChange}
              type="number"
              className="no-spinner w-6 px-1.5 py-0.5 bg-[#FFFFFF] rounded-sm border-[#FFFFFF] text-[#242424] font-medium"
            />
            <Button
              variant="ghost"
              size="icon"
              className="p-1"
              title="Previous Page"
              disabled={currentPage === 1}
              onClick={() => goToPage(Math.max(1, currentPage - 1))}
            >
              <ChevronDown className="h-3 w-3 text-[#242424]" />
            </Button>
          </div>
          <span className="text-[#4E4E50] font-normal">of {totalPages}</span>
        </div>
      )}
    </>
  );
};

export default EditorFooter;
