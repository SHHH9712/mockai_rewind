import React from "react";
import { ResizablePanel } from "@/components/ui/resizable";
import { Separator } from "@/components/ui/separator";
import ReactMarkdown from "react-markdown";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { coldarkCold } from "react-syntax-highlighter/dist/esm/styles/prism";
import remarkGfm from "remark-gfm";

export default function ProblemPanel({ markdown }: { markdown: string }) {
  return (
    <ResizablePanel defaultSize={25} className="p-3 flex flex-col">
      <div className="pb-4 pt-2 px-1">
        <h2 className="text-lg font-semibold">Reverse String</h2>
      </div>
      <Separator orientation="horizontal" decorative={true} />
      <ScrollArea className="p-2 text-xs leading-6 overflow-hidden h-full">
        <ReactMarkdown
          remarkPlugins={[remarkGfm]}
          components={{
            code({ node, className, children, ...props }) {
              const match = /language-(\w+)/.exec(className || "");
              return match ? (
                <SyntaxHighlighter style={coldarkCold} language={match[1]}>
                  {String(children).replace(/\n$/, "")}
                </SyntaxHighlighter>
              ) : (
                <code className={className} {...props}>
                  {children}
                </code>
              );
            },
          }}
        >
          {markdown}
        </ReactMarkdown>
      </ScrollArea>
    </ResizablePanel>
  );
}
