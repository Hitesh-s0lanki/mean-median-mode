"use client";

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
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableRow,
} from "@/components/ui/table";
import { Textarea } from "@/components/ui/textarea";
import {
  GeometricMean,
  HarmonicMean,
  getLargest,
  getMean,
  getMedian,
  getMode,
  getSamllest,
} from "@/lib/mean";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { BeatLoader } from "react-spinners";
import * as z from "zod";

const tableRow = [
  "Mean",
  "Median",
  "Mode",
  "Largest",
  "Smallest",
  "Geometric Mean",
  "Harmonic Mean",
];

const formSchema = z.object({
  text: z.string().min(1, { message: "Minimun 1 value is required" }),
});

const MeanUnGrouped = () => {
  const [data, setData] = useState<number[] | null>([]);
  const [loading, setIsLoading] = useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      text: "",
    },
  });

  const onSubmit = (values: z.infer<typeof formSchema>) => {
    setData(null);
    setIsLoading(true);
    let arr = values.text.split(",").map((e) => Number.parseFloat(e));
    setData([
      getMean(arr),
      getMedian(arr),
      getMode(arr),
      getLargest(arr),
      getSamllest(arr),
      GeometricMean(arr),
      HarmonicMean(arr),
    ]);
    setTimeout(() => {
      setIsLoading(false);
    }, 5000);
  };

  return (
    <div className="h-full w-full flex flex-col p-5 text-black gap-5 overflow-auto ">
      <h1 className="w-full text-center text-2xl font-bold text-muted-foreground p-1">
        UnGrouped Data
      </h1>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="w-full h-1/3 flex flex-col gap-5"
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
          <Button type="submit" className="w-full">
            Get Mean
          </Button>
        </form>
      </Form>
      {loading && (
        <div className="h-full w-full flex justify-center items-center">
          <BeatLoader className="h-4 w-4" />
        </div>
      )}
      {data && !loading && data.length !== 0 && (
        <Table className="border-2">
          <TableCaption>Info About Data</TableCaption>
          <TableBody>
            {tableRow.map((e, index) => (
              <TableRow className="border-2" key={e}>
                <TableCell className="border-2">{e}</TableCell>
                <TableCell className="border-2">
                  {data.length - 1 >= index &&
                    e === "Mode" &&
                    data[index] == -1 &&
                    "All have the same occurence"}
                  {data.length - 1 >= index && data[index]}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      )}
    </div>
  );
};

export default MeanUnGrouped;
