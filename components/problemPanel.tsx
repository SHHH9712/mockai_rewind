import React from "react";
import { ResizablePanel } from "@/components/ui/resizable";
import { Separator } from "@/components/ui/separator";
import ReactMarkdown from "react-markdown";
import { ScrollArea } from "@/components/ui/scroll-area";

export default function ProblemPanel({ markdown }: { markdown: string }) {
  return (
    <ResizablePanel defaultSize={25} className="p-3 flex flex-col">
      <div className="pb-4 pt-2 px-1">
        <h2 className="text-lg font-semibold">Reverse String</h2>
      </div>
      <Separator orientation="horizontal" decorative={true} />
      <ScrollArea className="p-2 text-xs leading-6 overflow-hidden h-full">
        <ReactMarkdown>{markdown}</ReactMarkdown>
      </ScrollArea>
    </ResizablePanel>
  );
}
