import { ResizablePanel } from "@/components/ui/resizable";
import { Separator } from "@/components/ui/separator";

export default function CodePanel({
  currentContent,
}: {
  currentContent: { code: { code: string } };
}) {
  return (
    <ResizablePanel defaultSize={50} className="flex flex-col">
      <div className="p-4 pt-5">
        <h2 className="text-lg font-semibold">Code</h2>
      </div>
      <Separator orientation="horizontal" decorative={true} />
      <div className="bg-gray-100 flex-1">
        {currentContent.code && (
          <pre className="bg-gray-100 p-2 rounded">
            <code>{currentContent.code.code}</code>
          </pre>
        )}
      </div>
    </ResizablePanel>
  );
}
