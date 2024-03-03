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
import { moment_ungroup } from "@/types/statistics";
import { useCallback, useEffect, useState } from "react";

interface MomentUngroupResultTableProps {
  arr: number[];
  result: moment_ungroup;
  dataRow: number;
}

const MomentUngroupResultTable = ({
  arr,
  result,
  dataRow,
}: MomentUngroupResultTableProps) => {
  const [data, setData] = useState<number[][]>([]);

  const structureData = useCallback(() => {
    let temp: number[][] = [];
    for (let i = 0; i < dataRow; i++) {
      temp.push([
        arr[i],
        result.x_a[i],
        result.x_a_2[i],
        result.x_a_3[i],
        result.x_a_4[i],
      ]);
    }
    setData(temp);
  }, [result, dataRow, setData]);

  useEffect(() => {
    structureData();
  }, [structureData]);

  return (
    <div className="flex flex-col gap-5 w-full mt-10 pb-10">
      <h1 className=" text-muted-foreground text-md">Mean Result</h1>
      <Table className="border-2">
        <TableCaption>Output...</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead>X</TableHead>
            <TableHead>X - A</TableHead>
            <TableHead>{"(X - A)^2"}</TableHead>
            <TableHead>{"(X - A)^3"}</TableHead>
            <TableHead>{"(X - A)^4"}</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {data.map((e, index) => (
            <TableRow key={`mean -${index}`}>
              <TableCell>{e[0]}</TableCell>
              <TableCell>{e[1]}</TableCell>
              <TableCell>{e[2]}</TableCell>
              <TableCell>{e[3]}</TableCell>
              <TableCell>{e[4]}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <Table className="border-2">
        <TableCaption>Result...</TableCaption>
        <TableBody>
          <TableRow>
            <TableCell>X Total</TableCell>
            <TableCell>{sumArray(arr)}</TableCell>
          </TableRow>
          <TableRow>
            <TableCell>X - A Total</TableCell>
            <TableCell>{sumArray(result.x_a)}</TableCell>
          </TableRow>
          <TableRow>
            <TableCell>{"(X - A)^2 "} Total</TableCell>
            <TableCell>{sumArray(result.x_a_2)}</TableCell>
          </TableRow>
          <TableRow>
            <TableCell>{"(X - A)^3 "} Total</TableCell>
            <TableCell>{sumArray(result.x_a_3)}</TableCell>
          </TableRow>
          <TableRow>
            <TableCell>{"(X - A)^4 "} Total</TableCell>
            <TableCell>{sumArray(result.x_a_4)}</TableCell>
          </TableRow>
          <TableRow>
            <TableCell className=" font-semibold">Mean</TableCell>
            <TableCell>{result.mean_result}</TableCell>
          </TableRow>
          <TableRow>
            <TableCell className=" font-semibold">Median</TableCell>
            <TableCell>{result.median_result}</TableCell>
          </TableRow>
          <TableRow>
            <TableCell className=" font-semibold">Mode</TableCell>
            <TableCell>{result.mode_result}</TableCell>
          </TableRow>
          <TableRow>
            <TableCell className=" font-semibold">Standard Deviation</TableCell>
            <TableCell>{result.standard_deviation}</TableCell>
          </TableRow>
          <TableRow>
            <TableCell className=" font-semibold">First Moment</TableCell>
            <TableCell>{result.first_moment}</TableCell>
          </TableRow>
          <TableRow>
            <TableCell className=" font-semibold">Second Moment</TableCell>
            <TableCell>{result.second_moment}</TableCell>
          </TableRow>
          <TableRow>
            <TableCell className=" font-semibold">Third Moment</TableCell>
            <TableCell>{result.third_moment}</TableCell>
          </TableRow>
          <TableRow>
            <TableCell className=" font-semibold">Fourth Moment</TableCell>
            <TableCell>{result.fourt_moment}</TableCell>
          </TableRow>
          <TableRow>
            <TableCell className=" font-semibold">
              Skewness Using Mode
            </TableCell>
            <TableCell>{result.skewness_using_mode}</TableCell>
          </TableRow>
          <TableRow>
            <TableCell className=" font-semibold">
              Skewness Using Median
            </TableCell>
            <TableCell>{result.skewness_using_mode}</TableCell>
          </TableRow>
          <TableRow>
            <TableCell className=" font-semibold">Kurtosis Beta</TableCell>
            <TableCell>{result.kurtosis_beta}</TableCell>
          </TableRow>
          <TableRow>
            <TableCell className=" font-semibold">Kurtosis Alpha</TableCell>
            <TableCell>{result.kurtosis_alpha}</TableCell>
          </TableRow>
          <TableRow>
            <TableCell className=" font-semibold">Kurtosis Result</TableCell>
            <TableCell>{result.kurtosis_result}</TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </div>
  );
};

export default MomentUngroupResultTable;
