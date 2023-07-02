"use client"
import Image from "next/image";
import Chat from "@/components/chat";
import axios from "axios";

import { useEffect } from "react";

export default function Home() {
  useEffect(() => {
    axios.post("/api/id", {
      id: "123"
    }).then((res) => {
      console.log(res.data);
    });
  }, []);
  return (
    <div className="flex justify-center h-[100vh] items-center">
      <div className="max-w-[500px] w-full p-5 md:max-h-[700px] h-full">
        <Chat/>
      </div>
    </div>
  );
}
