import { Button } from "@/components/ui/button";
import Image from "next/image";

export default function Home() {
  return (
    <div className="w-screen h-screen flex justify-center items-center">
      <Button className="text-xl cursor-pointer bg-green-400 text-black py-5 px-10">Run</Button>
    </div>
  );
}
