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

const SimpleTable = ({
  dataRow,
  onChange,
  calculate,
  label,
}: {
  dataRow: number[][];
  onChange: (
    e: React.ChangeEvent<HTMLInputElement>,
    row: number,
    col: number
  ) => void;
  calculate: () => void;
  label: string;
}) => {
  return (
    <div className="flex flex-col gap-5">
      <h1 className=" text-muted-foreground text-md">Fill the table below</h1>
      <Table className=" border-2">
        <TableCaption>{label}</TableCaption>
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
  );
};

export default SimpleTable;
