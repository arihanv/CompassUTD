import Chat from "@/components/chat";

export default function Home() {
  return (
    <div className="flex justify-center h-[calc(100dvh)] items-center">
      <div className="max-w-[500px] w-full md:p-5 md:max-h-[700px] h-full">
        <Chat />
      </div>
    </div>
  );
}
