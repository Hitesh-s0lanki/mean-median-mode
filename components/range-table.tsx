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
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { useCallback, useEffect, useState } from "react";

interface RangeTableProps {
  dataRow: number;
  data: number;
  setData: (data: number) => void;
  range: number;
  frequency: number[];
  setFrequency: (freq: number[]) => void;
  calculate: () => void;
}

const RangeTable = ({
  dataRow,
  data,
  setData,
  range,
  frequency,
  setFrequency,
  calculate,
}: RangeTableProps) => {
  const [row, setRows] = useState<number[][]>([]);

  const setRangeProper = (
    start: number,
    dataRow: number,
    range: number
  ): number[][] => {
    let resultRow: number[][] = [];
    for (let i = 0; i < dataRow; i++) {
      resultRow.push([start, start + range]);
      start = start + range;
    }
    return resultRow;
  };

  const onChange = (
    event: React.ChangeEvent<HTMLInputElement>,
    index: number
  ) => {
    if (event.target.value === "") return;

    let newArray = frequency.map((e, i) => {
      if (index === i) {
        return Number.parseInt(event.target.value);
      }
      return e;
    });

    setFrequency(newArray);
  };

  const createDataRowArray = useCallback(() => {
    let start = data;
    setRows(setRangeProper(start, dataRow, range));
  }, [dataRow, range, data]);

  useEffect(() => {
    createDataRowArray();
  }, [createDataRowArray]);

  return (
    <div className="w-full p-5 flex flex-col gap-5">
      <h1 className=" text-muted-foreground text-md">Fill the table below</h1>
      <Table className="border-2">
        <TableCaption>Fill the table completely</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead>Class</TableHead>
            <TableHead>Frequency</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {row.map((e, index) => {
            return (
              <TableRow key={`keypair${index}`}>
                <TableCell>
                  <div className="w-full flex gap-1 items-center justify-center">
                    <Input
                      value={e[0]}
                      type="number"
                      onChange={(e) => {
                        if (e.target.value !== "") {
                          setData(Number.parseFloat(e.target.value));
                        }
                      }}
                      disabled={index !== 0}
                    />
                    <p>-</p>
                    <Input value={e[1]} type="number" disabled step="any" />
                  </div>
                </TableCell>
                <TableCell>
                  <Input
                    type="number"
                    value={frequency[index]}
                    onChange={(e) => onChange(e, index)}
                  />
                </TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
      <Button onClick={calculate}>Calculate</Button>
    </div>
  );
};

export default RangeTable;
