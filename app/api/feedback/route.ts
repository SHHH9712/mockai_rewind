import { NextApiRequest, NextApiResponse } from "next";
import { NextResponse } from "next/server";
import OpenAI from "openai";

const convertTimestampToSeconds = (timestamp: string) => {
  const timestampParts = timestamp.split(":");
  const minutes = parseInt(timestampParts[0]);
  const seconds = parseInt(timestampParts[1]);
  return minutes * 60 + seconds;
};

//API route to get feedback
export async function POST(request: Request, response: NextApiResponse) {
  // Filter the conversation and code before timestamp
  const { conversation, code, timestamp } = await request.json();
  const filtered_conversation = conversation.filter(
    (item: any) => convertTimestampToSeconds(item.timestamp) <= timestamp
  );
  const filtered_code = code.filter((item: any) => {
    return convertTimestampToSeconds(item.timestamp) <= timestamp;
  });

  // Concatenate the filtered data into a single prompt
  const conversationText = filtered_conversation
    .map((item: any) => {
      return `${item.speaker}-${item.timestamp}: ${item.sentence}`;
    })
    .join("\n");
  const codeText = filtered_code
    .map((item: any) => {
      return `${item.timestamp}: ${item.code}`;
    })
    .join("\n");

  const prompt = `Base on the conversation and code version history in this interview, please give feed back for the interviewee to improve. Refer the interviewee by their name and output in markdown format. \n\nConversation:\n${conversationText}\n\nCode Snippet:\n${codeText}`;

  console.log("Prompt:", prompt);
  // Prepare the request body for the OpenAI API
  // Send request to OpenAI API
  try {
    const openai = new OpenAI();
    const completion = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [
        {
          role: "system",
          content: prompt,
        },
      ],
    });

    console.log("API Response:", completion.choices[0].message.content);

    // Return the ChatGPT API response
    return NextResponse.json({
      message: "Feedback received",
      feedback: completion.choices[0].message.content,
    });
  } catch (error: any) {
    console.error(error);
    return NextResponse.json({
      message: "Error in processing feedback request",
      error: error.message,
    });
  }
}
