import React, { useEffect } from "react";
import { conversationIdAtom, dateAtom } from "./chat";
import { useAtom } from "jotai";
import { useReadLocalStorage } from "usehooks-ts";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

type Conversation = {
  date: string;
  token: string;
};

export default function HistorySelect() {
  const [conversationId, setConversationId] = useAtom(conversationIdAtom);
  const [date, setDate] = useAtom(dateAtom);
  const conversations = useReadLocalStorage("Convos") as [];

  const handleSelect = (value: string) => {
    setConversationId(value);
    console.log(conversations);
  };

  useEffect(() => {
    setConversationId(conversationId);
    console.log("hello");
    console.log(conversationId, date)
  }, [date]);
  return (
    <Select value={conversationId} onValueChange={(e) => handleSelect(e)}>
      <SelectTrigger className="w-fit">
        <SelectValue placeholder={date} />
      </SelectTrigger>
      <SelectContent>
        {/* <SelectItem value="Today">Today</SelectItem>
        <SelectItem value="XyDV6qbV1X1XGma_">XyDV6qbV1X1XGma_</SelectItem>
        <SelectItem value="A1ObHOP6B2QELwtk">A1ObHOP6B2QELwtk</SelectItem>
        <SelectItem value="kQt_hwVyiIDR_-Y6">kQt_hwVyiIDR_-Y6</SelectItem> */}
        {conversations.map((convo: Conversation, key: number) => (
          <SelectItem key={key} value={convo.token}>
              {convo.date}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}
