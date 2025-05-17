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
      className="bg-gradient-to-br from-white to-blue-50 rounded-2xl shadow-md
                 transform transition-transform duration-300 hover:-translate-y-2 flex justify-center items-center ">
      <CardHeader className="w-full flex justify-center items-center flex-col p-8">
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
