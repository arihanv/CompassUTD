import Image from "next/image";
import Chat from "@/components/chat";

export default function Home() {
  return (
    <div className="flex justify-center h-[100vh] items-center">
      <div className="max-w-[500px] w-full p-5 md:max-h-[700px] h-full">
        <Chat/>
      </div>
    </div>
  );
}
