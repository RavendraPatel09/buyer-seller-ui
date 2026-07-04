import { MainLayout } from "../../layouts/MainLayout";
import { ChatSidebar } from "../../components/messages/ChatSidebar";
import { ChatWindow } from "../../components/messages/ChatWindow";
import { SocketProvider, useSocket } from "../../lib/socket/SocketContext";
import { cn } from "../../design-system/utils/cn";

function MessagesLayout() {
  const { activeConversationId } = useSocket();

  return (
    <MainLayout>
      {/* Absolute positioning to stretch to bounds under header */}
      <div className="fixed inset-x-0 bottom-0 top-16 flex overflow-hidden">
        <div className={cn(
          "w-full md:w-80 h-full shrink-0", 
          activeConversationId ? "hidden md:block" : "block"
        )}>
          <ChatSidebar />
        </div>
        <div className={cn(
          "flex-1 h-full min-w-0",
          !activeConversationId ? "hidden md:flex" : "flex"
        )}>
          <ChatWindow />
        </div>
      </div>
    </MainLayout>
  );
}

export function Messages() {
  return (
    <SocketProvider>
      <MessagesLayout />
    </SocketProvider>
  );
}
