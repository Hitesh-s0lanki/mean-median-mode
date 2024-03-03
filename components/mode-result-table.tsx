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
import { mode_result } from "@/types/statistics";
import { useCallback, useEffect, useState } from "react";

interface ModeResultTableProps {
  result: mode_result;
  dataRow: number;
}

const ModeResultTable = ({ result, dataRow }: ModeResultTableProps) => {
  const [data, setData] = useState<number[][]>([]);

  const structureData = useCallback(() => {
    let temp: number[][] = [];
    for (let i = 0; i < dataRow; i++) {
      temp.push([
        result.class[i][0],
        result.class[i][1],
        result.frequency[i],
        result.x[i],
      ]);
    }
    setData(temp);
  }, [result, dataRow, setData]);

  useEffect(() => {
    structureData();
  }, [structureData]);

  return (
    <div className="flex flex-col gap-5 w-full pb-10">
      <h1 className=" text-muted-foreground text-md">Mode Result</h1>
      <Table className="border-2">
        <TableCaption>Mode : {result.mode}</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead>Class</TableHead>
            <TableHead>Frequency</TableHead>
            <TableHead>x</TableHead>
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
              <TableCell>{result.marker[index]}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default ModeResultTable;
