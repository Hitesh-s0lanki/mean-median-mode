"use client";

import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { useState } from "react";

const HomePage = () => {
  const [toggle, setToggle] = useState<boolean>(true);
  const [operation, setOperation] = useState<"mean" | "median" | "mode">(
    "mean"
  );

  const router = useRouter();

  const onClick = (operation: "mean" | "median" | "mode") => {
    setOperation(operation);
    setToggle(false);
  };

  return (
    <div className=" bg-amber-100 h-full w-full flex flex-col justify-center items-center gap-5">
      {toggle && (
        <div className="w-full flex justify-center items-center flex-col gap-2">
          <h1 className=" text-muted-foreground text-xl py-5">
            Select the Operation
          </h1>
          <Button
            onClick={() => onClick("mean")}
            className="w-1/2 h-full text-xl p-4 bg-purple-600  font-semibold"
          >
            Mean
          </Button>
          <Button
            onClick={() => onClick("median")}
            className="w-1/2 h-full text-xl p-4 bg-purple-600  font-semibold"
          >
            Median
          </Button>
          <Button
            onClick={() => onClick("mode")}
            className="w-1/2 h-full text-xl p-4 bg-purple-600  font-semibold"
          >
            Mode
          </Button>
          <Button
            onClick={() => router.push("/missing")}
            className="w-1/2 h-full text-md p-4 bg-purple-600  font-semibold"
          >
            Find the Missing
          </Button>
        </div>
      )}
      {!toggle && (
        <div className="flex flex-col gap-5">
          <h1 className=" text-xl text-muted-foreground font-semibold">
            Data Type for {operation}
          </h1>
          <Button
            onClick={() => router.push(`/mean/ungroup`)}
            className="w-full h-full text-lg p-4 mx-1 bg-purple-600  font-semibold"
          >
            UnGroup Data
          </Button>
          <Button
            onClick={() => router.push(`/mean/group`)}
            className="w-full h-full text-lg mx-1 p-4 bg-purple-600  font-semibold"
          >
            Group Data
          </Button>
          <Button
            onClick={() => setToggle(true)}
            className="text-muted-foreground flex items-center justify-center"
            variant="link"
          >
            Back to Menu
          </Button>
        </div>
      )}
    </div>
  );
};

export default HomePage;
