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
import { sumArray } from "@/lib/grouped";
import { median_result } from "@/types/statistics";
import { useCallback, useEffect, useState } from "react";

interface MedianResultTableProps {
  result: median_result;
  dataRow: number;
}

const MedianResultTable = ({ result, dataRow }: MedianResultTableProps) => {
  const [data, setData] = useState<number[][]>([]);

  const structureData = useCallback(() => {
    let temp: number[][] = [];
    for (let i = 0; i < dataRow; i++) {
      temp.push([
        result.class[i][0],
        result.class[i][1],
        result.frequency[i],
        result.x[i],
        result.c_frequency[i],
      ]);
    }
    setData(temp);
  }, [result, dataRow, setData]);

  useEffect(() => {
    structureData();
  }, [structureData]);

  return (
    <div className="flex flex-col gap-5 w-full pb-10">
      <h1 className=" text-muted-foreground text-md">Median Result</h1>
      <Table className="border-2">
        <TableCaption>Output...</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead>Class</TableHead>
            <TableHead>Frequency</TableHead>
            <TableHead>x</TableHead>
            <TableHead>c_frequency</TableHead>
            <TableHead>Marker</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {data.map((e, index) => (
            <TableRow key={`mean -${index}`}>
              <TableCell>
                {e[0]}-{e[1]}
              </TableCell>
              <TableCell>{e[2]}</TableCell>
              <TableCell>{e[3]}</TableCell>
              <TableCell className="text-center">{e[4]}</TableCell>
              <TableCell>{result.marker[index]}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <Table className="border-2">
        <TableCaption>Result...</TableCaption>
        <TableBody>
          <TableRow>
            <TableCell>Frequency Total</TableCell>
            <TableCell>{sumArray(result.frequency)}</TableCell>
          </TableRow>
          <TableRow>
            <TableCell>Median</TableCell>
            <TableCell>{result.median}</TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </div>
  );
};

export default MedianResultTable;
