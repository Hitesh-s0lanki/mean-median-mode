"use client";

import MomentResultTable from "@/components/moment-result-table";
import RangeTable from "@/components/range-table";
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
import { Switch } from "@/components/ui/switch";
import { calculateMoment } from "@/lib/grouped";
import { moment_group } from "@/types/statistics";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useForm } from "react-hook-form";
import * as z from "zod";

const formSchema = z.object({
  dataCount: z.string().min(1, { message: "Row is required" }),
  ranged: z.boolean(),
  range: z.string(),
  difference: z.string(),
});

const MomentPage = () => {
  const [data, setData] = useState<number>(0);
  const [frequency, setFrequency] = useState<number[]>([]);
  const [result, setResult] = useState<moment_group | null>(null);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      dataCount: "",
      ranged: false,
      range: "0",
      difference: "0",
    },
  });

  const [dataRow, setDataRow] = useState<number>(0);
  const [range, setRange] = useState(0);
  const [difference, setDifference] = useState(0);

  const onSubmit = (values: z.infer<typeof formSchema>) => {
    if (values.difference) {
      setDifference(Number.parseInt(values.difference));
    }
    if (values.ranged) {
      let temp: number[] = [];
      for (let i = 0; i < Number.parseInt(values.dataCount); i++) {
        temp.push(0);
      }
      setFrequency(temp);
      setDataRow(Number.parseInt(values.dataCount));
      setRange(Number.parseInt(values.range));
    }
  };

  const calculate = () => {
    setResult(calculateMoment(dataRow, data, range, frequency, difference));
  };

  return (
    <div className="h-full w-full flex flex-col p-5 gap-5 pb-20">
      <h1 className="text-xl text-muted-foreground">
        Find the Moment, skewness, kurtosis
      </h1>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="flex flex-col gap-4"
        >
          <FormField
            control={form.control}
            name="dataCount"
            render={({ field }) => (
              <FormItem className="w-1/2">
                <FormLabel>Data Row</FormLabel>
                <FormControl>
                  <Input
                    type="number"
                    placeholder="Enter the number"
                    {...field}
                  />
                </FormControl>
                <FormDescription>Number of Data Row.</FormDescription>
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
          <FormField
            control={form.control}
            name="ranged"
            render={({ field }) => (
              <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                <div className="space-y-0.5">
                  <FormLabel className="text-base">Range Data or Not</FormLabel>
                  <FormDescription>Range mean 10-20.</FormDescription>
                </div>
                <FormControl>
                  <Switch
                    checked={field.value}
                    onCheckedChange={field.onChange}
                  />
                </FormControl>
              </FormItem>
            )}
          />
          {form.getValues("ranged") && (
            <FormField
              control={form.control}
              name="range"
              render={({ field }) => (
                <FormItem className="w-full grid grid-cols-2 gap-1 px-3 items-center justify-center">
                  <FormLabel>Range difference(h)</FormLabel>
                  <FormControl>
                    <Input type="number" placeholder="" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          )}
          <Button type="submit">Submit</Button>
        </form>
      </Form>

      {dataRow !== 0 && range !== 0 && (
        <RangeTable
          frequency={frequency}
          setFrequency={setFrequency}
          dataRow={dataRow}
          range={range}
          setData={setData}
          data={data}
          calculate={calculate}
        />
      )}

      {result && <MomentResultTable result={result} dataRow={dataRow} />}
    </div>
  );
};

export default MomentPage;
