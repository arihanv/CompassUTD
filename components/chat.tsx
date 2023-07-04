"use client";
import React from "react";
import { Input } from "./ui/input";
import { Send, Loader2 } from "lucide-react";
import { Badge } from "./ui/badge";
import axios from "axios";
import { Avatar, AvatarImage, AvatarFallback } from "./ui/avatar";
import { atom, useAtom } from "jotai";
import HistorySelect from "./historySelect";

export const conversationIdAtom = atom("Today");

type Message = {
  id: number;
  text: string;
};

export default function Chat() {
  const [messages, setMessages] = React.useState<Message[]>([]);
  const [input, setInput] = React.useState<string>("");
  const [isProcessing, setIsProcessing] = React.useState<boolean>(false);
  const [completedTyping, setCompletedTyping] = React.useState(false);
  const [displayResponse, setDisplayResponse] = React.useState("");
  const [conversationId, setConversationId] = useAtom(conversationIdAtom);

  function sleep(ms: number) {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }

  async function getData(prompt: string) {
    await sleep(1000);
    return prompt;
  }

  const bot = async (input: string) => {
    setIsProcessing(true);
    const data = await getData(input);
    setMessages((prevMessages) => [...prevMessages, { id: 0, text: data }]);
    setIsProcessing(false);
  };

  async function fetchPreviousMessages() {
    const data = await axios
      .get(
        `${process.env.NEXT_PUBLIC_API_ROUTE}/get_messages/${conversationId}`
      )
      .then((res) => {
        return res.data;
      });
    console.log(data);
    return data;
  }

  React.useEffect(() => {
    async function initializeMessages() {
      if (conversationId === "Today") {
        setMessages([
          {
            id: 0,
            text: "Hello, I'm Temoc. How can I help you?",
          },
        ]);
        return;
      }
      const previousMessages = await fetchPreviousMessages();

      const mappedMessages = previousMessages.map(
        (message: any, index: number) => {
          const id = index % 2 === 0 ? 0 : 1;
          return {
            id: id,
            text: message.user_message || message.bot_message,
          };
        }
      );
      setMessages([...mappedMessages]);
    }
    initializeMessages();
  }, [conversationId]);

  React.useEffect(() => {
    setCompletedTyping(false);
    setDisplayResponse("");

    if (messages.length === 0) {
      return;
    }

    let i = 0;
    const words =
      messages[messages.length - 1].id === 0
        ? messages[messages.length - 1].text.split(" ")
        : [];

    const intervalId = setInterval(() => {
      setDisplayResponse(words.slice(0, i).join(" "));
      i++;

      if (i > words.length) {
        clearInterval(intervalId);
        setCompletedTyping(true);
      }
    }, 60);

    return () => clearInterval(intervalId);
  }, [messages]);

  const send = (input: string) => {
    if (isProcessing || input.trim() === "") {
      return;
    }
    setMessages((prevMessages) => [...prevMessages, { id: 1, text: input }]);
    bot(input);
    setInput("");
  };
  return (
    <div className="h-full border-gray-700 w-full rounded-xl border p-1">
      <div className="border border-gray-700 h-full w-full rounded-lg flex flex-col">
        <div className="w-full bg-orange-800 p-2 border-b border-gray-700 rounded-t-md flex justify-between items-center">
          <div className="flex gap-2 items-center font-semibold tracking-tight">
            <Avatar>
              <AvatarImage
                className="object-cover"
                src="https://cometlife.org/wp-content/uploads/2019/10/utdallas_19489995-300x200.jpg"
              />
              <AvatarFallback>TM</AvatarFallback>
            </Avatar>
            CompassUTD
            <HistorySelect />
          </div>
          <Badge
            variant={"secondary"}
            className="bg-green-100 flex gap-1 justify-center items-center text-black pointer-events-none border-green-50"
          >
            <div className="w-2 aspect-square rounded-full bg-green-500 animate-pulse"></div>{" "}
            Online
          </Badge>
        </div>
        <div className="flex-1 p-2 overflow-scroll text-sm">
          {messages.map((message, index) => (
            <div
              key={index}
              className={`flex ${
                message.id === 1 ? "justify-end" : "justify-start"
              } mb-2`}
            >
              <div
                className={`rounded-lg p-2 bg-gray-200 dark:bg-gray-800 max-w-[70%] ${
                  message.id === 0 && index === messages.length - 1
                    ? "ml-2"
                    : message.id === 0
                    ? "ml-2"
                    : "mr-2 mesUser"
                }`}
              >
                {message.id === 0 && index === messages.length - 1 ? (
                  <div className="!text-sm">
                    {displayResponse}
                    {!completedTyping && (
                      <svg
                        viewBox="8 4 8 16"
                        xmlns="http://www.w3.org/2000/svg"
                        className="cursor !filter-invert"
                      >
                        <rect x="10" y="6" width="4" height="12" fill="#fff" />
                      </svg>
                    )}
                  </div>
                ) : (
                  <p className="text-sm">{message.text}</p>
                )}
              </div>
            </div>
          ))}
          {isProcessing && (
            <div className="flex justify-center mb-2">
              <div className="text-sm text-gray-500 animate-spin repeat-infinite">
                <Loader2 />
              </div>
            </div>
          )}
        </div>
        <div className="p-1 flex border-t border-gray-700">
          <Input
            className="rounded-r-none focus-visible:ring-0"
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && send(input)}
            placeholder="Ask here ..."
          />
          <button
            onClick={() => send(input)}
            className="bg-orange-800 text-white px-2 p-1 rounded-md rounded-l-none"
          >
            <Send />
          </button>
        </div>
      </div>
    </div>
  );
}
