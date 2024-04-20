import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Slider } from "@/components/ui/slider";
import { Button } from "@/components/ui/button";
import { BeatLoader } from "react-spinners";
import { ResizablePanel } from "@/components/ui/resizable";
import { Separator } from "@/components/ui/separator";
import { ScrollArea } from "@/components/ui/scroll-area";

export default function ConversationPanel({
  conversation,
  currentTime,
  setCurrentTime,
  getFeedback,
  isGettingFeedback,
  convertTimestampToSeconds,
}: {
  conversation: {
    speaker: string;
    timestamp: string;
    sentence: string;
  }[];
  currentTime: number;
  setCurrentTime: (time: number) => void;
  getFeedback: () => void;
  isGettingFeedback: boolean;
  convertTimestampToSeconds: (timestamp: string) => number;
}) {
  const handleTimeChange = (value: number[]) => {
    setCurrentTime(value[0]);
  };

  const handleConversationClick = (timestamp: string) => {
    const seconds = convertTimestampToSeconds(timestamp);
    setCurrentTime(seconds);
  };
  return (
    <ResizablePanel defaultSize={25} className="h-full flex flex-col">
      <div className="p-4 pt-5">
        <h2 className="text-lg font-semibold">Conversation History</h2>
      </div>
      <div>
        <Separator orientation="horizontal" />
      </div>
      <div className="flex flex-col justify-between overflow-scroll">
        <ScrollArea className="text-xs leading-6 h-full">
          {conversation.map((item, index) => (
            <div
              key={index}
              className={`cursor-pointer p-4 ${
                convertTimestampToSeconds(item.timestamp) <= currentTime
                  ? convertTimestampToSeconds(item.timestamp) === currentTime
                    ? "bg-gray-200 border-l-4 border-blue-500"
                    : "bg-gray-200 border-l-4 border-gray-100"
                  : "bg-white border-l-4 border-white"
              }`}
              onClick={() => handleConversationClick(item.timestamp)}
            >
              {/* add name and timestamp */}
              <div className="flex justify-between">
                <div className="font-semibold">{item.speaker}</div>
                <div className="flex text-xs items-center">
                  {item.timestamp}
                </div>
              </div>
              <p>{item.sentence}</p>
            </div>
          ))}
        </ScrollArea>
        <div className="flex flex-col p-4 gap-3">
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger>
                <Button
                  variant="outline"
                  className="h-8 w-full"
                  onClick={getFeedback}
                  disabled={isGettingFeedback}
                >
                  {isGettingFeedback ? <BeatLoader /> : "Get Feedback"}
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <p>
                  Generate feedback from AI agent given the selected
                  conversation and code history.
                </p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
          <Slider
            value={[currentTime]}
            onValueChange={handleTimeChange}
            max={convertTimestampToSeconds(
              conversation[conversation.length - 1].timestamp
            )}
            step={1}
            orientation="horizontal"
          />
        </div>
      </div>
    </ResizablePanel>
  );
}
