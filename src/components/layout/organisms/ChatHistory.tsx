import { Button } from "@/components/ui/button";
import {
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { Skeleton } from "@/components/ui/skeleton";
import {
  Collapsible,
  CollapsibleTrigger,
  CollapsibleContent,
} from "@/components/ui/collapsible";
import {
  History,
  ChevronDown,
  MoreVertical,
  Trash2,
  Share,
  Archive,
  Edit,
} from "lucide-react";
import { useState, useEffect, useCallback } from "react";
import Link from "next/link";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@radix-ui/react-dropdown-menu";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";

type ChatItem = {
  id: string;
  title: string;
  timestamp: string;
};

type ChatHistoryMap = {
  [date: string]: ChatItem[];
};

// Mock API function for fetching chat history
const fetchChatHistory = async (): Promise<ChatHistoryMap> => {
  await new Promise((resolve) => setTimeout(resolve, 1000));

  const today = new Date();
  const yesterday = new Date(today);
  yesterday.setDate(yesterday.getDate() - 1);

  const twoDaysAgo = new Date(today);
  twoDaysAgo.setDate(twoDaysAgo.getDate() - 2);

  const threeDaysAgo = new Date(today);
  threeDaysAgo.setDate(threeDaysAgo.getDate() - 3);

  return {
    [today.toDateString()]: [
      {
        id: "1",
        title: "How to implement React hooks in TypeScript",
        timestamp: "10:30 AM",
      },
      { id: "2", title: "Best practices for API design", timestamp: "2:15 PM" },
      {
        id: "3",
        title: "Understanding machine learning basics",
        timestamp: "4:45 PM",
      },
      {
        id: "4",
        title: "Database optimization techniques",
        timestamp: "6:20 PM",
      },
    ],
    [yesterday.toDateString()]: [
      {
        id: "5",
        title: "Creating responsive web layouts",
        timestamp: "9:00 AM",
      },
      {
        id: "6",
        title: "JavaScript async/await patterns",
        timestamp: "11:30 AM",
      },
      { id: "7", title: "Docker containerization guide", timestamp: "3:15 PM" },
    ],
    [twoDaysAgo.toDateString()]: [
      {
        id: "8",
        title: "Python data analysis with pandas",
        timestamp: "10:00 AM",
      },
      {
        id: "9",
        title: "CSS Grid vs Flexbox comparison",
        timestamp: "1:45 PM",
      },
    ],
    [threeDaysAgo.toDateString()]: [
      { id: "10", title: "Setting up CI/CD pipelines", timestamp: "11:15 AM" },
      { id: "11", title: "GraphQL vs REST API design", timestamp: "4:30 PM" },
      { id: "12", title: "MongoDB aggregation queries", timestamp: "7:00 PM" },
    ],
  };
};

const ChatHistory = () => {
  const [historyData, setHistoryData] = useState<ChatHistoryMap>({});
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [hasLoaded, setHasLoaded] = useState<boolean>(false);
  const [openMenuChatId, setOpenMenuChatId] = useState<string | null>(null);
  const pathName = usePathname();
  const params = pathName?.split("/");
  const activeChatId = params?.[2];
  const loadChatHistory = useCallback(async () => {
    if (hasLoaded) return; // Only load once

    setLoading(true);
    setError(null);
    try {
      const data = await fetchChatHistory();
      setHistoryData(data);
      setHasLoaded(true);
    } catch (err: unknown) {
      console.error("Failed to load chat history:", err);
      setError("Failed to load chat history");
    } finally {
      setLoading(false);
    }
  }, [hasLoaded]);

  const formatDateLabel = (dateString: string) => {
    const date = new Date(dateString);
    const today = new Date();
    const yesterday = new Date(today);
    yesterday.setDate(yesterday.getDate() - 1);

    if (date.toDateString() === today.toDateString()) return "Today";
    if (date.toDateString() === yesterday.toDateString()) return "Yesterday";

    return date.toLocaleDateString("en-US", {
      weekday: "long",
      month: "short",
      day: "numeric",
    });
  };

  const handleChatOptions = (e: Event, chatId: string) => {
    e.stopPropagation();
    setOpenMenuChatId((prev) => (prev === chatId ? null : chatId));
    console.log("Chat options for:", chatId);
    // TODO: show menu (delete, rename, etc.)
  };

  useEffect(() => {
    if (!hasLoaded) {
      loadChatHistory();
    }
  }, [hasLoaded, loadChatHistory]);

  if (loading && !hasLoaded) {
    return (
      <SidebarGroup className="py-2">
        <SidebarGroupLabel className="flex items-center justify-center gap-2 text-[#FFFFFF] mb-1 text-base">
          <History className="w-5 h-5" />
          <span className="font-medium">Chat History</span>
        </SidebarGroupLabel>
        <SidebarGroupContent className="space-y-3">
          {[1, 2, 3, 4, 5].map((i) => (
            <Skeleton key={i} className="h-7 w-full bg-[#694c80] rounded" />
          ))}
        </SidebarGroupContent>
      </SidebarGroup>
    );
  }

  if (error) {
    return (
      <SidebarGroup className="mt-6">
        <SidebarGroupLabel className="flex items-center justify-center gap-2 text-[#FFFFFF] mb-1">
          <History className="w-5 h-5" />
          <span className="font-medium">Chat History</span>
        </SidebarGroupLabel>
        <SidebarGroupContent>
          <div className="px-2 py-4 text-center">
            <p className="text-red-400 text-sm mb-3">{error}</p>
            <Button
              variant="outline"
              size="sm"
              onClick={loadChatHistory}
              className="text-slate-300 border-slate-600 hover:bg-[#694c80] hover:text-white"
            >
              Retry
            </Button>
          </div>
        </SidebarGroupContent>
      </SidebarGroup>
    );
  }

  return (
    <div className="p-2">
      {/* Chat History Title/Label */}
      <div className="flex items-center justify-center gap-2 text-[#FFFFFF] mb-1">
        <History className="w-4 h-4" />
        <span className="font-medium text-xs">Chat History</span>
      </div>

      {/* Scrollable container for all date groups */}
      {Object.entries(historyData).map(([dateString, chats]) => (
        <Collapsible
          key={dateString}
          defaultOpen={dateString === new Date().toDateString()}
        >
          <SidebarGroup className="p-0">
            <SidebarGroupLabel asChild className="p-0">
              <CollapsibleTrigger className="group/collapsible w-full flex items-center justify-between !text-[#FFFFFF] text-xs font-medium font-['Avenir_Next'] hover:p-2 hover:!text-white hover:bg-[#694c80] rounded-lg transition-colors">
                <span>{formatDateLabel(dateString)}</span>
                <ChevronDown className="w-4 h-4 transition-transform group-data-[state=open]/collapsible:rotate-180" />
              </CollapsibleTrigger>
            </SidebarGroupLabel>
            <CollapsibleContent>
              <SidebarGroupContent>
                <SidebarMenu className="p-0">
                  {chats.map((chat) => (
                    <SidebarMenuItem key={chat.id}>
                      <Link
                        href={`/chat/${chat.id}`}
                        className={cn(
                          "px-0 py-1 group h-auto text-[#AAB8CA]transition-colors cursor-pointer",
                          (chat.id === activeChatId ||
                            chat.id === openMenuChatId) &&
                            "bg-[#694c80] text-white px-2",
                          chat.id !== activeChatId &&
                            chat.id !== openMenuChatId &&
                            "hover:bg-[#694c80] hover:px-2 hover:text-[#FFFFFF]"
                        )}
                        prefetch={false}
                      >
                        <div className="flex items-center justify-between w-full group gap-2">
                          <p className="text-xs font-normal truncate whitespace-nowrap overflow-hidden flex-grow">
                            {chat.title}
                          </p>
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <Button
                                variant="ghost"
                                size="icon"
                                title="Chat options"
                                className={cn(
                                  "p-0.5 rounded-lg transition-opacity",
                                  (chat.id === activeChatId ||
                                    chat.id === openMenuChatId) &&
                                    "opacity-100",
                                  chat.id !== activeChatId &&
                                    chat.id !== openMenuChatId &&
                                    "opacity-0 hover:opacity-100"
                                )}
                              >
                                {" "}
                                <MoreVertical className="w-4 h-4" />
                              </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent
                              className="bg-[#694c80] rounded-lg p-2"
                              side="right"
                              align="start"
                            >
                              <DropdownMenuItem
                                onSelect={(e) => {
                                  handleChatOptions(e, chat.id);
                                }}
                                className="flex items-center p-2 rounded-lg"
                              >
                                <Share className="w-4 h-4 mr-2" />
                                Share
                              </DropdownMenuItem>
                              <DropdownMenuItem
                                onSelect={(e) => {
                                  handleChatOptions(e, chat.id);
                                }}
                                className="flex items-center p-2 rounded-lg"
                              >
                                <Edit className="w-4 h-4 mr-2" />
                                Rename
                              </DropdownMenuItem>

                              <DropdownMenuItem
                                onSelect={(e) => {
                                  handleChatOptions(e, chat.id);
                                }}
                                className="flex items-center p-2 rounded-lg"
                              >
                                <Archive className="w-4 h-4 mr-2" />
                                Archive
                              </DropdownMenuItem>
                              <DropdownMenuItem
                                onSelect={(e) => {
                                  handleChatOptions(e, chat.id);
                                }}
                                className="flex items-center p-2 rounded-lg"
                              >
                                <Trash2 className="w-4 h-4 mr-2" />
                                Delete
                              </DropdownMenuItem>
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </div>
                      </Link>
                    </SidebarMenuItem>
                  ))}
                </SidebarMenu>
              </SidebarGroupContent>
            </CollapsibleContent>
          </SidebarGroup>
        </Collapsible>
      ))}
      {/* View more button */}
      {!loading && !error && Object.keys(historyData).length > 0 && (
        <Button
          variant="ghost"
          size="sm"
          className="w-full text-[#AAB8CA]hover:text-white hover:bg-[#694c80] text-sm h-8"
        >
          View more
        </Button>
      )}
    </div>
  );
};

export default ChatHistory;
