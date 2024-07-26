"use client";
import { MultiSelect } from "@/components/molecules/MultiSelect";
import { useState } from "react";

export default function MultiSelectPage() {
  const options = [
    { label: "Option 1", value: "option1" },
    { label: "Option 2", value: "option2" },
    { label: "Option 3", value: "option3" },
    { label: "Option 4", value: "option4" },
    { label: "Option 5", value: "option5" },
  ];

  const [selected, setSelected] = useState<string[]>([]);

  return (
    <div className="p-4">
      <MultiSelect
        options={options}
        selected={selected}
        onChange={setSelected}
      />
    </div>
  );
}
