"use client";

import React, { useEffect, useRef, useState } from "react";
import { Slider } from "./ui/slider";
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/ui/resizable";
import { Separator } from "./ui/separator";
import { ScrollArea } from "./ui/scroll-area";
import { Button } from "./ui/button";
import axios from "axios";
import { BeatLoader } from "react-spinners";
import ReactMarkdown from "react-markdown";

import FeedbackArea from "./feedbackArea";
import CodePanel from "./codePanel";
import ProblemPanel from "./problemPanel";
import ConversationPanel from "./conversationPanel";

interface Conversation {
  timestamp: string;
  speaker: string;
  sentence: string;
}

interface Code {
  timestamp: string;
  code: string;
}

interface DashboardProps {
  conversation: Conversation[];
  code: Code[];
  markdown: string;
}

export default function Dashboard({
  conversation,
  code,
  markdown,
}: DashboardProps) {
  const [currentTime, setCurrentTime] = useState(0);
  const [audioUrl, setAudioUrl] = useState("");
  const [isGettingFeedback, setIsGettingFeedback] = useState(false);

  // use current selected content to get feedbacks from API and stores it in key value pair
  const [feedbacks, setFeedbacks] = useState<{ [key: string]: string }>({
    "00": "Overall feedback",
    "01": "Feedback for 1:00",
    "02": "Feedback for 2:00",
    "03": "Feedback for 3:00",
    "04": "Feedback for 4:00",
  });

  const getFeedback = async () => {
    // if feedback already exists, return
    if (feedbacks[currentTime]) {
      return;
    }
    try {
      // using conversation, code, timestamp, and audioUrl to get feedback
      setIsGettingFeedback(true);
      const response = await axios.post("/api/feedback", {
        conversation,
        code,
        timestamp: currentTime,
      });
      setFeedbacks({ ...feedbacks, [currentTime]: response.data.feedback });
      // console.log("Feedback response:", response.data.feedback);
      console.log("Feedbacks:", feedbacks);
      setIsGettingFeedback(false);
    } catch (error) {
      console.error("Error getting feedback:", error);
    }
  };

  const getCurrentContent = (timestamp: number) => {
    const codeItems = code.filter((item) => {
      const itemTimestamp = convertTimestampToSeconds(item.timestamp);
      return itemTimestamp <= timestamp;
    });
    const latestCodeItem = codeItems[codeItems.length - 1];

    return {
      code: latestCodeItem,
    };
  };

  const convertTimestampToSeconds = (timestamp: string) => {
    const timestampParts = timestamp.split(":");
    const minutes = parseInt(timestampParts[0]);
    const seconds = parseInt(timestampParts[1]);
    return minutes * 60 + seconds;
  };

  const currentContent = getCurrentContent(currentTime);

  // useEffect(() => {
  //   const fetchAudio = async () => {
  //     try {
  //       const response = await fetch("/audio", {
  //         method: "GET",
  //         headers: {
  //           "Content-Type": "application/json",
  //           // Add any necessary authentication headers for security
  //           Authorization: "Bearer your-access-token",
  //         },
  //       });

  //       if (response.ok) {
  //         const audioBlob = await response.blob();
  //         const audioUrl = URL.createObjectURL(audioBlob);
  //         setAudioUrl(audioUrl);
  //       } else {
  //         console.error("Error fetching audio:", response.statusText);
  //       }
  //     } catch (error) {
  //       console.error("Error fetching audio:", error);
  //     }
  //   };

  //   fetchAudio();
  // }, []);

  return (
    <div className="h-full">
      <ResizablePanelGroup
        direction="horizontal"
        className="flex flex-row border-b-2"
      >
        <ConversationPanel
          {...{
            conversation,
            currentTime,
            setCurrentTime,
            getFeedback,
            isGettingFeedback,
            convertTimestampToSeconds,
          }}
        />
        <ResizableHandle withHandle />
        <ProblemPanel markdown={markdown} />
        <ResizableHandle withHandle />
        <CodePanel currentContent={currentContent} />
      </ResizablePanelGroup>
      <FeedbackArea feedbacks={feedbacks} />
    </div>
  );
}
