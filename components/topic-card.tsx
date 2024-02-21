"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useRouter } from "next/navigation";

interface TopicCardProps {
  label: string;
  href: string;
  description?: string;
}

const TopicCard = ({ label, href, description }: TopicCardProps) => {
  const router = useRouter();
  return (
    <Card
      onClick={() => router.push(href)}
      className="bg-amber-100 h-52 flex w-full justify-center items-center cursor-pointer shadow-lg drop-shadow-md"
    >
      <CardHeader className="w-full flex justify-center items-center">
        <CardTitle className="text-2xl text-center w-full flex justify-center items-center">
          {label}
        </CardTitle>
        <CardDescription className=" text-center">
          {description}
        </CardDescription>
      </CardHeader>
    </Card>
  );
};

export default TopicCard;
