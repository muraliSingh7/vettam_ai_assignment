import React, { useState } from "react";
import {
  Sidebar,
  SidebarContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarGroup,
  SidebarGroupLabel,
  SidebarGroupContent,
  SidebarFooter,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  FileText,
  Globe,
  Languages,
  PenTool,
  Edit3,
  Bookmark,
  Settings,
  BellIcon,
  CircleQuestionMark,
} from "lucide-react";
import ChatHistory from "@/components/layout/organisms/ChatHistory";
import { Separator } from "@radix-ui/react-separator";
import { cn } from "@/lib/utils";

const features = [
  { icon: FileText, label: "Workspace" },
  { icon: Globe, label: "Research" },
  { icon: Languages, label: "Translate" },
  { icon: PenTool, label: "Write" },
];

const tools = [
  { icon: Edit3, label: "Editor" },
  { icon: Bookmark, label: "Bookmarks" },
];

interface AppSidebarTriggerProps {
  isSidebarOpen: boolean;
  logoColor?: string;
}
export const AppSidebarTrigger: React.FC<AppSidebarTriggerProps> = ({
  isSidebarOpen,
  logoColor="#FFFFFF",

}) => {
  return (
    <div className={cn("flex items-center gap-2", isSidebarOpen && "justify-between")}>
      <div className="flex items-center gap-2">
        <div className="w-8 h-8 rounded-full flex items-center justify-center">
          <svg
            width="17"
            height="17"
            viewBox="0 0 17 17"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M14.1954 1.27823C13.9851 1.04881 13.6587 0.95028 13.3496 1.02418L10.0926 1.80422C10.0457 1.81533 10.0043 1.84141 9.97455 1.87764L9.97051 1.88295C9.88175 1.99114 9.92411 2.15295 10.0578 2.20463C10.5732 2.40411 11.1224 2.49829 11.6338 2.72916C15.7447 4.58339 15.8975 10.2258 13.4474 13.4541C13.3244 13.6164 13.0571 13.5309 13.0551 13.3305C13.0369 11.5912 12.705 9.94275 11.8507 8.3701C10.2615 5.44603 6.29942 2.41618 2.822 4.42497C-0.788064 6.51008 0.376456 11.3483 2.50527 14.0598C3.20732 14.9539 5.28721 16.8892 6.45476 16.9955C7.67728 17.1071 8.8877 15.12 9.1666 14.1439C9.2604 13.8159 9.49089 13.1793 9.01933 13.1711C8.95225 13.1701 8.88972 13.2049 8.84937 13.2556C6.82596 15.7948 3.32937 12.2568 2.64246 10.1891C2.22436 8.93086 2.12853 6.9752 3.47462 6.20047C6.19049 4.63701 8.51902 8.71013 9.41322 10.6074C10.2524 12.3867 10.8072 14.2883 11.3025 16.1802L11.2833 16.1855C11.2954 16.215 11.306 16.2454 11.3141 16.2763C11.3267 16.2985 11.3368 16.3222 11.3469 16.3459C11.3933 16.3681 11.4351 16.3946 11.4734 16.4251C11.4966 16.4265 11.5203 16.428 11.542 16.4299C14.3109 16.6762 15.8884 12.9127 16.2738 10.789C16.8321 7.71178 16.4356 3.72269 14.1959 1.2792L14.1954 1.27823Z"
              fill={logoColor}
            />
          </svg>
        </div>
        <span className="text-lg font-medium font-['Avenir_Next']" style={{color: logoColor}}>
          Vettam.AI
        </span>
      </div>
      <SidebarTrigger className="text-[#AAB8CA]hover:text-slate-800" />
    </div>
  );
};
const AppSiderbar = () => {
  const [activeFeatureIndex, setActiveFeatureIndex] = useState<number | null>(
    null
  );
  const [activeToolsIndex, setActiveToolsIndex] = useState<number | null>(null);

  return (
    <Sidebar className="rounded-lg m-4 bg-[#352442] px-1 py-4 h-[calc(100svh-2rem)]">
      <SidebarHeader className="bg-[#352442] space-y-1.5">
        <AppSidebarTrigger isSidebarOpen={true} logoColor="#FFFFFF"/>
        <Button className="cursor-pointer w-full px-3 py-1.5 bg-[#e07a53] hover:bg-[#e07a53] rounded-lg text-black font-medium text-sm font-medium font-['Avenir_Next']">
          New Chat
        </Button>
      </SidebarHeader>

      <SidebarContent className="p-2 bg-[#352442] scrollbar-thin scrollbar-thumb-[#694c80] scrollbar-track-transparent">
        <SidebarGroup className="p-2 space-y-1.5 bg-[#694c80] rounded-lg">
          <SidebarGroupLabel className="w-max h-max px-1.5 py-0.5 bg-[#4f3861] rounded-sm text-[#FFFFFF] text-xs font-medium font-['Avenir_Next']">
            Features
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu className="gap-1.5">
              {features.map((feature, index) => (
                <SidebarMenuItem key={index}>
                  <SidebarMenuButton
                    onClick={() => setActiveFeatureIndex(index)}
                    className={`text-[#FFFFFF]  text-xs font-medium font-['Avenir_Next'] flex items-center gap-3 p-2 rounded-lg transition-colors ${
                      index === activeFeatureIndex
                        ? "bg-[#FFFFFF] text-slate-800"
                        : "text-[#FFFFFF] cursor-pointer hover:text-slate-800 hover:bg-[#FFFFFF]"
                    }`}
                  >
                    <feature.icon className="w-3 h-3" />
                    <span>{feature.label}</span>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        <SidebarGroup className="p-2 space-y-1.5 bg-[#694c80] rounded-lg">
          <SidebarGroupLabel className="w-max h-max px-1.5 py-0.5 bg-[#4f3861] rounded-sm text-[#FFFFFF] text-xs font-medium font-['Avenir_Next']">
            Tools
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu className="gap-1.5">
              {tools.map((tool, index) => (
                <SidebarMenuItem key={index}>
                  <SidebarMenuButton
                    onClick={() => setActiveToolsIndex(index)}
                    className={`text-[#FFFFFF] text-xs font-medium font-['Avenir_Next'] flex items-center gap-3 p-2 rounded-lg transition-colors ${
                      activeToolsIndex === index
                        ? "bg-[#FFFFFF] text-slate-800"
                        : "text-[#FFFFFF] cursor-pointer hover:text-slate-800 hover:bg-[#FFFFFF]"
                    }`}
                  >
                    <tool.icon className="w-3 h-3" />
                    <span>{tool.label}</span>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        <ChatHistory />
      </SidebarContent>

      <SidebarFooter className="bg-[#352442] pt-2">
        <div className="p-2 bg-[#694c80] rounded-lg">
          <div className="flex items-center justify-between gap-2 pb-2">
            <div className="flex items-center gap-2">
              {[1, 2, 3].map((i) => (
                <Avatar key={i} className="w-4 h-4">
                  <AvatarImage
                    src="/notificationUser.png"
                    alt="Notification User"
                  />
                  <AvatarFallback className="bg-orange-500 text-white text-xs">
                    U{i}
                  </AvatarFallback>
                </Avatar>
              ))}
            </div>

            <Button
              variant="ghost"
              size="icon"
              title="Notifications"
              className="relative self-center group/notifications"
            >
              <BellIcon className="w-5 h-5 fill-white text-white group-hover/notifications:text-[#352442] group-hover/notifications:fill-[#352442] transition-colors" />
              <span className="absolute top-0.25 right-1 bg-rose-700 text-white text-[10px] font-semibold p-0.5 rounded-full leading-none">
                12
              </span>
            </Button>
          </div>
          <Separator className="h-0.25 bg-[#9f8caf]" />
          <div className="flex items-center justify-between pt-2">
            <div className="flex items-center gap-2">
              <div className="relative">
                <Avatar className="w-6 h-6">
                  <AvatarImage src="/user.png" alt="Michael Smith" />
                  <AvatarFallback className="bg-orange-500 text-white text-sm">
                    MS
                  </AvatarFallback>
                </Avatar>
                <div className="size-1.5 right-1.5 bottom-1.5 absolute origin-bottom-right rotate-180 bg-[#1c7f46] rounded-full" />
              </div>
              <span className="font-medium text-[#FFFFFF] text-sm font-normal font-['Avenir_Next']">
                Michael Smith
              </span>
            </div>
            <div className="flex items-center gap-1">
              <Button
                variant="ghost"
                size="icon"
                title="Settings"
                className="group/settings rounded-full"
              >
                <Settings className="w-4 h-4 text-white group-hover/settings:text-[#352442] transition-colors" />
              </Button>
              <Button
                variant="ghost"
                size="icon"
                title="Help"
                className="group/help rounded-full"
              >
                <CircleQuestionMark className="w-4 h-4 text-white group-hover/help:text-[#352442] transition-colors" />
              </Button>
            </div>
          </div>
        </div>
      </SidebarFooter>
    </Sidebar>
  );
};

export default AppSiderbar;
