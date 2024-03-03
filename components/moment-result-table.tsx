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
import { moment_group } from "@/types/statistics";
import { useCallback, useEffect, useState } from "react";

interface MomentResultTableProps {
  result: moment_group;
  dataRow: number;
}

const MomentResultTable = ({ result, dataRow }: MomentResultTableProps) => {
  const [data, setData] = useState<number[][]>([]);

  const structureData = useCallback(() => {
    let temp: number[][] = [];
    for (let i = 0; i < dataRow; i++) {
      temp.push([
        result.mean_result.class[i][0],
        result.mean_result.class[i][1],
        result.mean_result.frequency[i],
        result.mean_result.x[i],
        result.mean_result.x_f[i],
        result.mean_result.x_x_f[i],
        result.f_x_a[i],
        result.f_x_a_2[i],
        result.f_x_a_3[i],
        result.f_x_a_4[i],
      ]);
    }
    setData(temp);
  }, [result, dataRow, setData]);

  useEffect(() => {
    structureData();
  }, [structureData]);

  return (
    <div className="flex flex-col gap-5 w-full pb-10">
      <h1 className=" text-muted-foreground text-md">Mean Result</h1>
      <Table className="border-2">
        <TableCaption>Output...</TableCaption>
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
            <TableHead>{"f(x - a)"}</TableHead>
            <TableHead>{"f(x - a)^2"}</TableHead>
            <TableHead>{"f(x - a)^3"}</TableHead>
            <TableHead>{"f(x - a)^4"}</TableHead>
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
              <TableCell>{e[4]}</TableCell>
              <TableCell>{e[5]}</TableCell>
              <TableCell>{e[6]}</TableCell>
              <TableCell>{e[7]}</TableCell>
              <TableCell>{e[8]}</TableCell>
              <TableCell>{e[9]}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <Table className="border-2">
        <TableCaption>Result...</TableCaption>
        <TableBody>
          <TableRow>
            <TableCell>Frequency Total</TableCell>
            <TableCell>{sumArray(result.mean_result.frequency)}</TableCell>
          </TableRow>
          <TableRow>
            <TableCell>
              x<sub>i</sub>f<sub>i</sub> Total
            </TableCell>
            <TableCell>{sumArray(result.mean_result.x_f)}</TableCell>
          </TableRow>
          <TableRow>
            <TableCell>
              f<sub>i</sub>x<sub>i</sub>
              <sup>2</sup> Total
            </TableCell>
            <TableCell>{sumArray(result.mean_result.x_x_f)}</TableCell>
          </TableRow>
          <TableRow>
            <TableCell>
              f(x_mean - x<sub>i</sub>) Total
            </TableCell>
            <TableCell>{sumArray(result.mean_result.f_x_mean_x)}</TableCell>
          </TableRow>
          <TableRow>
            <TableCell className=" font-semibold">Mean</TableCell>
            <TableCell>{result.mean_result.mean}</TableCell>
          </TableRow>
          <TableRow>
            <TableCell className=" font-semibold">Median</TableCell>
            <TableCell>{result.median_result.median}</TableCell>
          </TableRow>
          <TableRow>
            <TableCell className=" font-semibold">Mode</TableCell>
            <TableCell>{result.mode_result.mode}</TableCell>
          </TableRow>
          <TableRow>
            <TableCell className=" font-semibold">Standard Deviation</TableCell>
            <TableCell>{result.mean_result.standard_deviation}</TableCell>
          </TableRow>
          <TableRow>
            <TableCell>{"f(x-a)"} Total</TableCell>
            <TableCell>{sumArray(result.f_x_a)}</TableCell>
          </TableRow>
          <TableRow>
            <TableCell className=" font-semibold">First Moment</TableCell>
            <TableCell>{result.first_moment}</TableCell>
          </TableRow>
          <TableRow>
            <TableCell>{"f(x-a)^2"} Total</TableCell>
            <TableCell>{sumArray(result.f_x_a_2)}</TableCell>
          </TableRow>
          <TableRow>
            <TableCell className=" font-semibold">Second Moment</TableCell>
            <TableCell>{result.second_moment}</TableCell>
          </TableRow>
          <TableRow>
            <TableCell>{"f(x-a)^3"} Total</TableCell>
            <TableCell>{sumArray(result.f_x_a_3)}</TableCell>
          </TableRow>
          <TableRow>
            <TableCell className=" font-semibold">Third Moment</TableCell>
            <TableCell>{result.third_moment}</TableCell>
          </TableRow>
          <TableRow>
            <TableCell>{"f(x-a)^4"} Total</TableCell>
            <TableCell>{sumArray(result.f_x_a_4)}</TableCell>
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

export default MomentResultTable;
