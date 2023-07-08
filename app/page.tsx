"use client";
import React from "react";
import image from "/Users/arihanvaranasi/Dev/Next_Dev/temoc/public/shot.png";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

type Props = {};

export default function IndexPage({}: Props) {
  return (
    <section className="container grid items-center gap-6 pb-8 pt-6 md:py-10">
      <div className="flex flex-col items-center gap-10">
        <div className="flex flex-col gap-5 items-center">
        <div className="font-bold tracking-tight text-8xl">
          <span className="grad-text">UTD </span> <span className="grad-text">College</span> <span className="grad-text">Advisor</span>
        </div>
        <Badge className="w-fit">Public Beta out now</Badge>
        </div>
        <Link className="relative group" href="/chat">
          <div className="absolute z-10 left-0 right-0 top-0 bottom-0 m-auto flex justify-center items-center">
            <Button className="shadow-white text-base text-bold text-black" size={"lg"}>Get Started</Button>
          </div>
          <Image src={image} alt="Picture of the author" className="max-h-[400px] 2xl:max-h-fit object-scale-down group-hover:blur-[0.75px] transition-all ease-in-out" />
        </Link>
        <div className="flex flex-col items-center gap-1">
        <div className="font-medium text-xl">
            Powered By
        </div>
        <div className="font-bold tracking-tight text-6xl">💪 <span className="grad-text">Vertex AI</span> + <span className="grad-text">Langchain</span> 🦜</div>
      </div>
      </div>
    </section>
  );
}
