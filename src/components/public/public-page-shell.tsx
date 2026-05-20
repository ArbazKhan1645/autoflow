import { AiChatWidget } from "./ai-chat-widget";
import { PublicFooter } from "./public-footer";
import { PublicHeader } from "./public-header";

export function PublicPageShell({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <PublicHeader />
      {children}
      <PublicFooter />
      <AiChatWidget />
    </div>
  );
}
