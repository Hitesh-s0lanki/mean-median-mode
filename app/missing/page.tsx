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
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { getMissingFrequencyUsingMedianRange } from "@/lib/grouped";

const formSchema = z.object({
  dataCount: z.string().min(1, { message: "Row is required" }),
  ranged: z.boolean(),
  range: z.string(),
});

const MissingFrequency = () => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      dataCount: "",
      ranged: false,
      range: "0",
    },
  });
  const [medianMode, setMedianMode] = useState({
    median: -1,
    mode: -1,
  });
  const [range, setRange] = useState(0);
  const [dataRow, setDataRow] = useState<number[][]>([]);
  const [result, showResult] = useState(false);

  const onChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    row: number,
    col: number
  ) => {
    if (e) {
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

  const onSubmit = (values: z.infer<typeof formSchema>) => {
    setDataRow([]);
    if (!values.ranged) {
      let temp: number[][] = [];
      for (let i = 0; i < Number.parseInt(values.dataCount); i++) {
        temp.push([0, 0]);
      }
      setDataRow(temp);
    } else {
      console.log("Hello");
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

  const calculate = () => {
    const ans = getMissingFrequencyUsingMedianRange(
      dataRow,
      medianMode.median,
      range
    );
    setDataRow((dataRow) => {
      let c_freq = 0;
      return dataRow.map((e) => {
        if (e[2] === -1) {
          e[2] = Math.abs(ans);
        }
        c_freq += e[2];
        e.push(c_freq);
        return e;
      });
    });
    showResult(true);
  };

  return (
    <div className="h-full w-full flex flex-col p-5 gap-5 overflow-auto">
      <h1 className="text-xl text-muted-foreground">
        Find the Missing Frequency
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
      {dataRow && range === 0 && dataRow.length !== 0 && (
        <div className="flex flex-col gap-5">
          <h1 className=" text-muted-foreground text-md">
            Fill the table below
          </h1>
          <Table className=" border-2">
            <TableCaption>Place missing frequency -1</TableCaption>
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
          <Button>Calculate</Button>
        </div>
      )}
      {dataRow && range !== 0 && dataRow.length !== 0 && (
        <div className="flex flex-col gap-5">
          <h1 className=" text-muted-foreground text-md">
            Fill the table below
          </h1>
          <Table className=" border-2">
            <TableCaption>Place missing frequency -1</TableCaption>
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
                    <div className="w-full flex gap-1 items-center justify-center">
                      <Input
                        value={e[0]}
                        type="number"
                        onChange={(e) => onChange(e, index, 0)}
                      />
                      <p>-</p>
                      <Input value={e[1]} type="number" disabled />
                    </div>
                  </TableCell>
                  <TableCell>
                    <Input
                      type="number"
                      value={e[2]}
                      onChange={(e) => onChange(e, index, 2)}
                    />
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
          <div className="w-full flex flex-col gap-2">
            <div className=" w-2/3 grid grid-cols-2 gap-2 items-center text-center">
              <p className=" text-md text-muted-foreground ">Median : </p>
              <Input
                type="number"
                value={medianMode.median || 0}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                  setMedianMode({
                    ...medianMode,
                    median: Number.parseFloat(e.target.value),
                  })
                }
                placeholder="Enter the Median value"
                className="w-full"
              />
            </div>
            <div className=" w-2/3 grid grid-cols-2 gap-2 items-center text-center">
              <p className=" text-md text-muted-foreground ">Mode : </p>
              <Input
                type="number"
                value={medianMode.mode || 0}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                  setMedianMode({
                    ...medianMode,
                    mode: Number.parseFloat(e.target.value),
                  })
                }
                placeholder="Enter the Mode value"
                className="w-full"
              />
            </div>
            <p className=" text-sm text-muted-foreground w-full text-center p-2">
              note : Median Or Mode Should be provided...
            </p>
          </div>
          <Button onClick={calculate}>Calculate</Button>
        </div>
      )}
      {result && (
        <div>
          <h1 className=" text-muted-foreground te">Output...</h1>
          <Table>
            <TableCaption>the complete table</TableCaption>
            <TableHeader>
              <TableHead>class marks</TableHead>
              <TableHead>frequency</TableHead>
              <TableHead>c frequency</TableHead>
              <TableHead></TableHead>
            </TableHeader>
            {dataRow.length !== 0 &&
              //   dataRow[0].length === 4 &&
              dataRow.map((e, index) => (
                <TableRow key={`hello${index}`}>
                  <TableCell>{`${e[0]} - ${e[1]}`}</TableCell>
                  <TableCell>{e[2]}</TableCell>
                  <TableCell>{e[3]}</TableCell>
                </TableRow>
              ))}
          </Table>
        </div>
      )}
    </div>
  );
};

export default MissingFrequency;
