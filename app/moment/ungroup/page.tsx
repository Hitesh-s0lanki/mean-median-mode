"use client";

import MomentUngroupResultTable from "@/components/moment-ungroup-result-table";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { calculateMomentUngroup } from "@/lib/mean";
import { moment_ungroup } from "@/types/statistics";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { BeatLoader } from "react-spinners";
import * as z from "zod";

const formSchema = z.object({
  text: z.string().min(1, { message: "Minimun 1 value is required" }),
  difference: z.string(),
});

const MomentUngroup = () => {
  const [data, setData] = useState<number[] | null>([]);
  const [loading, setIsLoading] = useState(false);
  const [difference, setDifference] = useState(0);
  const [result, setResult] = useState<moment_ungroup | null>(null);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      text: "",
      difference: "0",
    },
  });

  const onSubmit = (values: z.infer<typeof formSchema>) => {
    setIsLoading(true);

    if (values.difference) {
      setDifference(Number.parseFloat(values.difference));
    }

    setData(values.text.split(",").map((e) => Number.parseFloat(e)));

    setResult(
      calculateMomentUngroup(
        values.text.split(",").map((e) => Number.parseFloat(e)),
        values.text.split(",").map((e) => Number.parseFloat(e)),
        difference
      )
    );

    setIsLoading(false);
  };

  return (
    <div className="h-full w-full flex flex-col p-5 text-black gap-10 overflow-auto ">
      <h1 className="w-full text-center text-2xl font-bold text-muted-foreground p-1">
        UnGrouped Data
      </h1>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="w-full flex flex-col gap-5"
        >
          <FormField
            control={form.control}
            name="text"
            render={({ field }) => (
              <FormItem className="h-full flex flex-col">
                <FormLabel>Put Values</FormLabel>
                <FormControl>
                  <Textarea
                    placeholder="1,2,3,4,5"
                    className="w-full h-full resize-none"
                    {...field}
                  />
                </FormControl>
                <FormDescription>Enter valid data.</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="difference"
            render={({ field }) => (
              <FormItem className="w-1/2">
                <FormLabel>Calculate the Moment About</FormLabel>
                <FormControl>
                  <Input
                    type="number"
                    placeholder="Enter the number"
                    {...field}
                  />
                </FormControl>
                <FormDescription>
                  If the moment is about mean set it to -1
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button type="submit" className="w-full ">
            Calculate
          </Button>
        </form>
      </Form>
      {loading && (
        <div className="h-full w-full flex justify-center items-center">
          <BeatLoader className="h-4 w-4" />
        </div>
      )}
      {result && data && (
        <MomentUngroupResultTable
          arr={data}
          result={result}
          dataRow={data.length}
        />
      )}
    </div>
  );
};

export default MomentUngroup;
