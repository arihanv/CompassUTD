import React from "react";
import { conversationIdAtom } from "./chat";
import { useAtom } from "jotai";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export default function HistorySelect() {
  const [conversationId, setConversationId] = useAtom(conversationIdAtom);
  const handleSelect = (value: string) => {
    setConversationId(value);
  };
  return (
    <Select onValueChange={(e) => setConversationId(e)}>
      <SelectTrigger className="w-fit">
        <SelectValue placeholder="Today" />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="Today">Today</SelectItem>
        <SelectItem value="XyDV6qbV1X1XGma_">XyDV6qbV1X1XGma_</SelectItem>
        <SelectItem value="A1ObHOP6B2QELwtk">A1ObHOP6B2QELwtk</SelectItem>
      </SelectContent>
    </Select>
  );
}
