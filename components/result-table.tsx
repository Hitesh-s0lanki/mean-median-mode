"use client";

import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

const ResultTable = ({
  data,
  result,
  isRange,
  label = "Result of this table",
}: {
  data: number[];
  result: number[][];
  isRange: boolean;
  label?: string;
}) => {
  return (
    <div className="flex flex-col gap-5">
      <h1 className=" text-muted-foreground text-md">Output...</h1>
      <Table className=" border-2">
        <TableCaption>{`the mean is ${data[0]} and Standard Deviation : ${data[5]}`}</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead>Class</TableHead>
            <TableHead>Frequency</TableHead>
            <TableHead>x</TableHead>
            <TableHead>
              x<sub>i</sub>f<sub>i</sub>
            </TableHead>
            <TableHead>
              f<sub>i</sub>x<sub>i</sub>
              <sup>2</sup>
            </TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {result.map((e) => (
            <TableRow>
              <TableCell>
                {e[0]}-{e[1]}
              </TableCell>
              <TableCell>{e[2]}</TableCell>
              <TableCell>{e[3]}</TableCell>
              <TableCell>{e[4]}</TableCell>
              <TableCell>{e[5]}</TableCell>
            </TableRow>
          ))}
          {data.length !== 0 && (
            <TableRow>
              <TableCell>Total</TableCell>
              <TableCell>{data[3]}</TableCell>
              <TableCell>{data[2]}</TableCell>
              <TableCell>{data[4]}</TableCell>
              <TableCell>{data[1]}</TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  );
};

export default ResultTable;
