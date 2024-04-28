"use client";

import { useRef, useState } from "react";
import { InputMessage } from "./input-message";
import { scrollToBottom, initialMessage } from "@/lib/utils";
import { ChatLine } from "./chat-line";
import { ChatGPTMessage } from "@/types";
import { fetchDataFromTavily } from "@/scripts/tavily.js";
import PrePareDataasync from "@/scripts/pinecone-prepare-docs";
import getResultFromTavily from "./getResults";
import { Toggle } from "@/components/ui/toggle"


export function Chat({toast}:any) {
  let GSearch=false;
  const endpoint = "/api/chat";
  const [input, setInput] = useState("");
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [messages, setMessages] = useState<ChatGPTMessage[]>(initialMessage);
  const [chatHistory, setChatHistory] = useState<[string, string][]>([]);
  const [streamingAIContent, setStreamingAIContent] = useState<string>("");
  const [isLoading, setIsLoading] = useState(false);
  const [isFromPDF, setIsFromPDF] = useState(false);

  const updateMessages = (message: ChatGPTMessage) => {
    setMessages((previousMessages) => [...previousMessages, message]);
    setTimeout(() => scrollToBottom(containerRef), 100);
  };

  const updateChatHistory = (question: string, answer: string) => {
    setChatHistory((previousHistory) => [
      ...previousHistory,
      [question, answer],
    ]);
  };

  const updateStreamingAIContent = (streamingAIContent: string) => {
    setStreamingAIContent(streamingAIContent);
    setTimeout(() => scrollToBottom(containerRef), 100);
  };

  const handleStreamEnd = (
    question: string,
    streamingAIContent: string,
    sourceDocuments: string
  ) => {
    const sources = JSON.parse(sourceDocuments);

    // Add the streamed message as the AI response
    // And clear the streamingAIContent state
    updateMessages({
      role: "assistant",
      content: streamingAIContent,
      sources,
    });
    updateStreamingAIContent("");
    updateChatHistory(question, streamingAIContent);
  };

  // const utilityFunction =()=>{
    
  //   sendQuestion(input);
  // }

  const justFunction = async (input: string) => {
    
    try {
      if(GSearch==true && isFromPDF==true){
      }
      await fetchDataFromTavily(input).then(response=>{
        console.log(response)
      });
      GSearch=true;
      sendQuestion(input);
    } catch (error) {
      console.error("Error occurred while fetching data from Tavily:", error);
    }
  };

  // send message to API /api/chat endpoint
  const sendQuestion = async (question: string) => {
    setIsLoading(true);
    updateMessages({ role: "user", content: question });

    try {
      const response = await fetch(endpoint, {
        method: "POST", 
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          question,
          chatHistory,
        }),
      });

      const reader = response?.body?.getReader();
      let streamingAIContent = "";
      let tokensEnded = false;
      let sourceDocuments = "";

      while (true) {
        const { done, value } = (await reader?.read()) || {};

        if (done) {
          break;
        }

        const text = new TextDecoder().decode(value);
        if (text === "tokens-ended" && !tokensEnded) {
          tokensEnded = true;
        } else if (tokensEnded) {
          sourceDocuments = text;
        } else {
          streamingAIContent = streamingAIContent + text;
          updateStreamingAIContent(streamingAIContent);
        }
      }

      handleStreamEnd(question, streamingAIContent, sourceDocuments);
    } catch (error) {
      console.log("Error occured ", error);
    } finally {
      setIsLoading(false);
    }
  };

  let placeholder = "Type a message to start ...";

  if (messages.length > 2) {
    placeholder = "Type to continue your conversation";
  }

  return (
    <div className="h-full flex flex-col justify-around w-full">
      <div className="p-6 overflow-auto" ref={containerRef}>
        {messages.map(({ content, role, sources }, index) => (
          <ChatLine
            key={index}
            role={role}
            content={content}
            sources={sources}
          />
        ))}
        {streamingAIContent ? (
          <ChatLine role={"assistant"} content={streamingAIContent} />
        ) : (
          <></>
        )}
      </div>

      <div className="">
        <InputMessage
          input={input}
          setInput={setInput}
          sendMessage={justFunction}
          placeholder={placeholder}
          isLoading={isLoading}
        />

<Toggle onClick={()=>{setIsFromPDF((value:boolean)=>!value); console.log(isFromPDF)}}>Use PDF</Toggle>

      </div>
    </div>
  );
}
