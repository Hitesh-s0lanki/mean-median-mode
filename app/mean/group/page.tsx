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
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { getMeanGroup } from "@/lib/grouped";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
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

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      dataCount: "",
      ranged: false,
      range: "0",
    },
  });

  const [dataRow, setDataRow] = useState<number[][]>([]);

  const onSubmit = (values: z.infer<typeof formSchema>) => {
    setDataRow([]);
    console.log(values.dataCount);
    if (!values.ranged) {
      let temp: number[][] = [];
      for (let i = 0; i < Number.parseInt(values.dataCount); i++) {
        temp.push([0, 0]);
      }
      setDataRow(temp);
    }
  };

  const onChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    row: number,
    col: number
  ) => {
    if (e) {
      setDataRow((data) => {
        return data.map((val, i) => {
          if (i === row) {
            val[col] = Number.parseInt(e.target.value);
          }
          return val;
        });
      });
    }
  };

  const calculate = () => {
    const ans = getMeanGroup(dataRow);
    setData([ans.mean, ans.x_sum, ans.f_sum, ans.xf_sum]);
  };

  return (
    <div className="h-full w-full flex flex-col p-5 gap-5 overflow-auto">
      <h1 className="text-xl text-muted-foreground">Find the Mean</h1>
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
      {dataRow && dataRow.length !== 0 && (
        <div className="flex flex-col gap-5">
          <h1 className=" text-muted-foreground text-md">
            Fill the table below
          </h1>
          <Table className=" border-2">
            <TableHeader>
              <TableRow>
                <TableHead>Class</TableHead>
                <TableHead>Frequency</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {dataRow.map((e, index) => (
                <TableRow key={`keypair${index}`}>
                  <TableCell>
                    <Input
                      value={e[0]}
                      type="number"
                      onChange={(e) => onChange(e, index, 0)}
                    />
                  </TableCell>
                  <TableCell>
                    <Input
                      type="number"
                      value={e[1]}
                      onChange={(e) => onChange(e, index, 1)}
                    />
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
          <Button onClick={calculate}>Calculate</Button>
        </div>
      )}
      {data.length !== 0 && (
        <div className="w-full p-5">
          <Table>
            <TableBody>
              {valuesData.map((e, index) => (
                <TableRow key={e}>
                  <TableCell>{e}</TableCell>
                  <TableCell>
                    {data.length - 1 >= index && data[index]}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      )}
    </div>
  );
};

export default GroupMean;
