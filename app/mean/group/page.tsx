"use client";

import RangeTable from "@/components/range-table";
import ResultTable from "@/components/result-table";
import SimpleTable from "@/components/simple-table";
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
import { getMeanGroup, getMeanGroupRange } from "@/lib/grouped";
import { zodResolver } from "@hookform/resolvers/zod";
import { useCallback, useState } from "react";
import { useForm } from "react-hook-form";
import * as z from "zod";

const formSchema = z.object({
  dataCount: z.string().min(1, { message: "Row is required" }),
  ranged: z.boolean(),
  range: z.string(),
});

const valuesData = ["Mean", "x_mean", "f_mean", "xf_mean"];

const GroupMean = () => {
  const [data, setData] = useState<number[]>([]);
  const [result, setResult] = useState<number[][]>([]);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      dataCount: "",
      ranged: false,
      range: "0",
    },
  });

  const [dataRow, setDataRow] = useState<number[][]>([]);
  const [range, setRange] = useState(0);

  const onSubmit = (values: z.infer<typeof formSchema>) => {
    setRange(0);
    setDataRow([]);
    if (!values.ranged) {
      let temp: number[][] = [];
      for (let i = 0; i < Number.parseInt(values.dataCount); i++) {
        temp.push([0, 0]);
      }
      setDataRow(temp);
    } else {
      let temp: number[][] = [];
      setRange(Number.parseInt(values.range));
      let start = 0;
      for (let i = 0; i < Number.parseInt(values.dataCount); i++) {
        temp.push([start, start + Number.parseInt(values.range), 0]);
        start += Number.parseInt(values.range);
      }
      setDataRow(temp);
    }
  };

  const onChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    row: number,
    col: number
  ) => {
    if (e && range !== 0) {
      setDataRow((data) => {
        let change = false;
        let start = 0;
        return data.map((val, i) => {
          if (i === row) {
            val[col] = Number.parseInt(e.target.value);
            if (col === 0) {
              val[1] = Number.parseInt(e.target.value) + range;
              start = val[1];
              change = true;
            }
          } else if (change) {
            val[0] = start;
            val[1] = val[0] + range;
            start += range;
          }
          return val;
        });
      });
    }
  };

  const calculate = () => {
    const ans = getMeanGroupRange(dataRow);
    setData(ans);
    setResult(() => {
      return dataRow.map((e) => {
        return [
          ...e,
          (e[0] + e[1]) / 2,
          ((e[0] + e[1]) / 2) * e[2],
          Math.pow((e[0] + e[1]) / 2, 2) * e[2],
          (e[0] + e[1]) / 2 - ans[0],
        ];
      });
    });
  };

  return (
    <div className="h-full w-full flex flex-col p-5 gap-5 overflow-auto">
      <h1 className="text-xl text-muted-foreground">
        Find the Mean,Median, Mode
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
                <FormDescription>Count of Data Row.</FormDescription>
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
      {dataRow.length !== 0 && range === 0 && (
        <SimpleTable
          dataRow={dataRow}
          onChange={onChange}
          calculate={calculate}
          label="Fill Completely"
        />
      )}
      {dataRow.length !== 0 && range !== 0 && (
        <RangeTable
          dataRow={dataRow}
          onChange={onChange}
          calculate={calculate}
          label="Fill Completely"
        />
      )}
      {result.length !== 0 && (
        <ResultTable data={data} result={result} isRange={range === 0} />
      )}
    </div>
  );
};

export default GroupMean;
