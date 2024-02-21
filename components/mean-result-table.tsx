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
import { mean_result } from "@/types/statistics";
import { useCallback, useEffect, useState } from "react";

interface MeanResultTableProps {
  result: mean_result;
  dataRow: number;
}

const MeanResultTable = ({ result, dataRow }: MeanResultTableProps) => {
  const [data, setData] = useState<number[][]>([]);

  const structureData = useCallback(() => {
    let temp: number[][] = [];
    for (let i = 0; i < dataRow; i++) {
      temp.push([
        result.class[i][0],
        result.class[i][1],
        result.frequency[i],
        result.x[i],
        result.x_f[i],
        result.x_x_f[i],
        result.x_mean_x[i],
        result.f_x_mean_x[i],
      ]);
    }
    setData(temp);
  }, [result, dataRow, setData]);

  useEffect(() => {
    structureData();
  }, [structureData]);

  return (
    <div className="flex flex-col gap-5 w-full">
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
            <TableHead>
              x_mean - x<sub>i</sub>
            </TableHead>
            <TableHead>
              f(x_mean - x<sub>i</sub>)
            </TableHead>
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
            <TableCell>
              x<sub>i</sub>f<sub>i</sub> Total
            </TableCell>
            <TableCell>{sumArray(result.x_f)}</TableCell>
          </TableRow>
          <TableRow>
            <TableCell>
              f<sub>i</sub>x<sub>i</sub>
              <sup>2</sup> Total
            </TableCell>
            <TableCell>{sumArray(result.x_x_f)}</TableCell>
          </TableRow>
          <TableRow>
            <TableCell>
              f(x_mean - x<sub>i</sub>) Total
            </TableCell>
            <TableCell>{sumArray(result.f_x_mean_x)}</TableCell>
          </TableRow>
          <TableRow>
            <TableCell>Mean</TableCell>
            <TableCell>{result.mean}</TableCell>
          </TableRow>
          <TableRow>
            <TableCell>Mean Deviation</TableCell>
            <TableCell>{result.mean_deviation}</TableCell>
          </TableRow>
          <TableRow>
            <TableCell>Standard Deviation</TableCell>
            <TableCell>{result.standard_deviation}</TableCell>
          </TableRow>
          <TableRow>
            <TableCell>Coeff Standard Deviation</TableCell>
            <TableCell>{result.coeff_standard_deviation}</TableCell>
          </TableRow>
          <TableRow>
            <TableCell>Coeff Mean Deviation</TableCell>
            <TableCell>{result.coeff_mean_deviation}</TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </div>
  );
};

export default MeanResultTable;
