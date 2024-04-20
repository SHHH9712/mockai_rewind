import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import { Input } from "./ui/input";
import { Card } from "./ui/card";
import ReactMarkdown from "react-markdown";
import { Button } from "./ui/button";

export default function FeedbackArea({
  feedbacks,
}: {
  feedbacks: { [timestamp: string]: string };
}) {
  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds < 10 ? "0" : ""}${remainingSeconds}`;
  };
  return (
    <div className="flex flex-row overflow-x-scroll">
      {Object.keys(feedbacks).map((timestamp) => (
        <Drawer key={timestamp}>
          <DrawerTrigger>
            <Card
              key={timestamp}
              className="m-4 h-28 w-64 flex flex-col items-center justify-center"
            >
              <h2 className="text-lg font-semibold">
                Feedback for {formatTime(parseInt(timestamp))}
              </h2>
              <ReactMarkdown>
                {feedbacks[timestamp].substring(0, 20) + "..."}
              </ReactMarkdown>
            </Card>
          </DrawerTrigger>
          <DrawerContent>
            <DrawerHeader>
              <DrawerTitle>
                AI Feedback for {formatTime(parseInt(timestamp))}
              </DrawerTitle>
              <DrawerClose />
            </DrawerHeader>
            <div className="p-4">
              <ReactMarkdown>{feedbacks[timestamp]}</ReactMarkdown>
            </div>
            <DrawerFooter className="flex flex-row">
              <Input />
              <Button variant="default">Reply</Button>
            </DrawerFooter>
          </DrawerContent>
        </Drawer>
      ))}
    </div>
  );
}
