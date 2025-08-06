import React from "react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu";
import { Info, MessageSquareText, MoreVertical, SquarePen } from "lucide-react";

const Header = () => {
  return (
    <div className="p-3 flex items-center justify-between">
      <div className="flex items-center gap-4">
        <h1 className="justify-start text-[#242424] text-base font-medium font-['Avenir_Next'] leading-normal">
          Olga Tellis v. Bombay Municipal Corporation (1985).docx
        </h1>
        <Info className="size-5 text-[#242424]" />
        <div className="text-[#57575C] text-sm font-medium font-['Avenir_Next'] flex gap-2">
          <svg
            width="23"
            height="18"
            viewBox="0 0 23 18"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="w-6 h-4"
          >
            <path
              d="M14.5 0.75C12.9678 0.751176 11.4662 1.17857 10.163 1.98437C8.85984 2.79017 7.80654 3.94262 7.1209 5.31281C6.30524 5.19385 5.47381 5.24424 4.67848 5.46082C3.88316 5.67741 3.14098 6.05555 2.49826 6.57166C1.85554 7.08777 1.32606 7.73077 0.942843 8.46057C0.559625 9.19036 0.330892 9.99129 0.270911 10.8134C0.21093 11.6355 0.320988 12.4612 0.59422 13.2388C0.867452 14.0165 1.298 14.7296 1.859 15.3335C2.42 15.9375 3.09943 16.4193 3.8549 16.749C4.61037 17.0788 5.42567 17.2493 6.24997 17.25H14.5C16.688 17.25 18.7864 16.3808 20.3336 14.8336C21.8808 13.2865 22.75 11.188 22.75 9C22.75 6.81196 21.8808 4.71354 20.3336 3.16637C18.7864 1.61919 16.688 0.75 14.5 0.75ZM14.5 15.75H6.24997C5.05649 15.75 3.9119 15.2759 3.06799 14.432C2.22407 13.5881 1.74997 12.4435 1.74997 11.25C1.74997 10.0565 2.22407 8.91193 3.06799 8.06802C3.9119 7.22411 5.05649 6.75 6.24997 6.75C6.35309 6.75 6.45622 6.75 6.5584 6.76031C6.3533 7.48918 6.24951 8.24282 6.24997 9C6.24997 9.19891 6.32898 9.38968 6.46964 9.53033C6.61029 9.67098 6.80105 9.75 6.99997 9.75C7.19888 9.75 7.38964 9.67098 7.5303 9.53033C7.67095 9.38968 7.74997 9.19891 7.74997 9C7.74997 7.66498 8.14585 6.35993 8.88755 5.2499C9.62924 4.13987 10.6835 3.2747 11.9169 2.76381C13.1503 2.25292 14.5075 2.11925 15.8168 2.3797C17.1262 2.64015 18.3289 3.28302 19.2729 4.22703C20.2169 5.17103 20.8598 6.37377 21.1203 7.68314C21.3807 8.99251 21.247 10.3497 20.7362 11.5831C20.2253 12.8165 19.3601 13.8707 18.2501 14.6124C17.14 15.3541 15.835 15.75 14.5 15.75ZM18.0306 6.96937C18.1003 7.03903 18.1556 7.12175 18.1934 7.21279C18.2311 7.30384 18.2506 7.40144 18.2506 7.5C18.2506 7.59856 18.2311 7.69616 18.1934 7.78721C18.1556 7.87825 18.1003 7.96097 18.0306 8.03063L13.5306 12.5306C13.4609 12.6004 13.3782 12.6557 13.2872 12.6934C13.1961 12.7312 13.0985 12.7506 13 12.7506C12.9014 12.7506 12.8038 12.7312 12.7128 12.6934C12.6217 12.6557 12.539 12.6004 12.4693 12.5306L10.2193 10.2806C10.0786 10.1399 9.99955 9.94902 9.99955 9.75C9.99955 9.55098 10.0786 9.36011 10.2193 9.21937C10.3601 9.07864 10.5509 8.99958 10.75 8.99958C10.949 8.99958 11.1399 9.07864 11.2806 9.21937L13 10.9397L16.9693 6.96937C17.039 6.89964 17.1217 6.84432 17.2128 6.80658C17.3038 6.76884 17.4014 6.74941 17.5 6.74941C17.5985 6.74941 17.6961 6.76884 17.7872 6.80658C17.8782 6.84432 17.9609 6.89964 18.0306 6.96937Z"
              fill="#908F91"
            />
          </svg>
          Saved
        </div>
      </div>
      <div className="flex items-center gap-0.5">
        <Button
          variant="ghost"
          title="Add a comment"
          size="icon"
          className="rounded-full group/addComment"
        >
          <MessageSquareText className="w-4 h-4 text-[#242424] group-hover/addComment:!text-[#694c80]" />
        </Button>
        <Button
          variant="ghost"
          title="Edit"
          size="icon"
          className="rounded-full group/edit"
        >
          <SquarePen className="w-4 h-4 text-[#242424] group-hover/edit:!text-[#694c80]" />
        </Button>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              variant="ghost"
              size="icon"
              title="Document Options"
              className="rounded-full group/pageOptions"
            >
              <MoreVertical className="w-4 h-4 text-[#242424] group-hover/pageOptions:!text-[#694c80]" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            {["Download", "Print", "Share"].map((option) => (
              <DropdownMenuItem key={option}>{option}</DropdownMenuItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </div>
  );
};

export default Header;
