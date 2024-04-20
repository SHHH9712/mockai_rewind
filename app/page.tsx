"use client";

import Dashboard from "@/components/dashboard";
import Image from "next/image";

export default function Home() {
  const conversation = [
    {
      timestamp: "00:00",
      speaker: "Interviewer",
      sentence:
        "Welcome to our interview. Can you please tell us a bit about yourself?",
    },
    {
      timestamp: "00:20",
      speaker: "Sarah",
      sentence:
        "Thank you for having me. I'm Sarah Johnson, a recent graduate with a degree in Computer Science. I'm passionate about web development and creating user-friendly applications.",
    },
    {
      timestamp: "00:45",
      speaker: "Interviewer",
      sentence:
        "Great. Can you share a project you worked on during your studies that you're particularly proud of?",
    },
    {
      timestamp: "01:05",
      speaker: "Sarah",
      sentence:
        "In my final year, I developed a web application for a local non-profit organization. It streamlined their volunteer management process and improved communication between volunteers and staff.",
    },
    {
      timestamp: "01:35",
      speaker: "Interviewer",
      sentence:
        "That sounds impressive. Let's move on to a simple coding challenge. Can you write a function that takes a string and returns the reverse of that string?",
    },
    {
      timestamp: "01:50",
      speaker: "Sarah",
      sentence:
        "Of course! I'll start by initializing an empty string to store the reversed string.",
    },
    {
      timestamp: "02:05",
      speaker: "Sarah",
      sentence:
        "Then, I'll iterate through the input string from the end to the beginning, appending each character to the new string.",
    },
    {
      timestamp: "02:20",
      speaker: "Sarah",
      sentence: "Finally, I'll return the reversed string.",
    },
    {
      timestamp: "02:35",
      speaker: "Interviewer",
      sentence:
        "Excellent. Please go ahead and code the solution, explaining your thought process as you go.",
    },
    {
      timestamp: "02:50",
      speaker: "Sarah",
      sentence:
        "Alright, I'll start coding and walk you through my approach. Let me know if you have any questions.",
    },
  ];
  const code = [
    { timestamp: "00:00", code: "// Code to be added" },
    {
      timestamp: "01:50",
      code: "function reverseString(str) {\n let reversed = '';\n \n // Code to be added\n \n return reversed;\n}",
    },
    {
      timestamp: "02:05",
      code: "function reverseString(str) {\n let reversed = '';\n \n for (let i = str.length - 1; i >= 0; i--) {\n reversed += str[i];\n }\n \n return reversed;\n}",
    },
    {
      timestamp: "02:20",
      code: "function reverseString(str) {\n let reversed = '';\n \n for (let i = str.length - 1; i >= 0; i--) {\n reversed += str[i];\n }\n \n return reversed;\n}",
    },
  ];
  const markdown = `
  Write a function that takes a string as input and returns the reverse of that string.
  
  ## Example
  
  \`\`\`javascript
  reverseString("hello") // returns "olleh"
  \`\`\`
  
  The function should do the following:
  
  1. Take a string as input
  2. Initialize an empty string to store the reversed string
  3. Iterate through the input string from the end to the beginning
  4. Append each character to the new string
  5. Return the reversed string
  
  ## Code Template
  
  \`\`\`javascript
  function reverseString(str) {
    let reversed = '';
    
    // Your code here
    
    return reversed;
  }
  \`\`\`
  
  Implement the \`reverseString\` function to solve the coding challenge. Feel free to walk through your thought process as you code the solution.
  `;

  return (
    <Dashboard conversation={conversation} code={code} markdown={markdown} />
  );
}
