import TopicCard from "@/components/topic-card";

const HomePage = () => {
  return (
    <div className="h-full w-full  p-2 flex flex-col gap-2">
      <h1 className="w-full text-2xl font-semibold flex justify-center items-center">
        Statistics
      </h1>
      <div className="grid grid-cols-2 p-2 gap-4">
        <TopicCard
          label={"Mean, Median ,Mode"}
          description="UnGroup Data"
          href="/mean/ungroup"
        />
        <TopicCard
          label={"Mean, Median ,Mode"}
          description="Group Data"
          href="/mean/group"
        />
        <TopicCard
          label={"Find the Missing Frequency"}
          href=""
          description={"Provide the mean or median or mode"}
        />
        <TopicCard
          label={"Find the moment, skewness, kurtosis"}
          href="/moment"
          description={"For Group Data"}
        />
        <TopicCard
          label={"Find the moment, skewness, kurtosis"}
          href="/moment/ungroup"
          description={"For UnGroup Data"}
        />
      </div>
    </div>
  );
};

export default HomePage;

// "use client";

// import { Button } from "@/components/ui/button";
// import { useRouter } from "next/navigation";

// const HomePage = () => {
//   const router = useRouter();

//   return (
//     <div className=" bg-amber-100 h-full w-full flex flex-col justify-center items-center gap-5">
//       <div className="w-full flex justify-center items-center flex-col gap-2">
//         <h1 className=" text-muted-foreground text-xl py-5 px-10">
//           Select the Data for Mean,Median,Mode
//         </h1>
//         <Button
//           size="lg"
//           onClick={() => router.push(`/mean/group`)}
//           className=" text-lg mx-1 p-4 bg-purple-600  font-semibold"
//         >
//           Group Data
//         </Button>
//         <Button
//           size="lg"
//           onClick={() => router.push(`/mean/ungroup`)}
//           className="text-lg p-4 mx-1 bg-purple-600  font-semibold"
//         >
//           UnGroup Data
//         </Button>
//         <Button
//           onClick={() => router.push("/missing")}
//           className="h-full text-md p-4 bg-purple-600  font-semibold"
//         >
//           Find the Missing Frequency
//         </Button>
//       </div>
//     </div>
//   );
// };

// export default HomePage;
