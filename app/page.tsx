"use client";

import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

const HomePage = () => {
  const router = useRouter();

  return (
    <div className=" bg-amber-100 h-full w-full flex flex-col justify-center items-center gap-5">
      <div className="w-full flex justify-center items-center flex-col gap-2">
        <h1 className=" text-muted-foreground text-xl py-5 px-10">
          Select the Data for Mean,Median,Mode
        </h1>
        <Button
          size="lg"
          onClick={() => router.push(`/mean/group`)}
          className=" text-lg mx-1 p-4 bg-purple-600  font-semibold"
        >
          Group Data
        </Button>
        <Button
          size="lg"
          onClick={() => router.push(`/mean/ungroup`)}
          className="text-lg p-4 mx-1 bg-purple-600  font-semibold"
        >
          UnGroup Data
        </Button>
        <Button
          onClick={() => router.push("/missing")}
          className="h-full text-md p-4 bg-purple-600  font-semibold"
        >
          Find the Missing Frequency
        </Button>
      </div>
    </div>
  );
};

export default HomePage;
