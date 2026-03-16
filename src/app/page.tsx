import { Button } from "@/components/ui/button";
import Image from "next/image";

export default function Home() {
  return (
    <div className="w-screen h-screen flex justify-center items-center flex-col gap-10">
      <Button className="text-xl cursor-pointer bg-green-400 text-black py-5 px-10">Run</Button>
      <p>Welcome to the <span className="text-amber-600 font-bold underline">CodeArena</span></p>
    </div>
  );
}
