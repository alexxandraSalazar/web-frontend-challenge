"use client";

import React from "react";
import { FloatingInput } from "@/components/ui/FloatingInput";
import { TransferFormData } from "@/types/index";

interface Step3Props {
  data: TransferFormData;
  update: (newData: Partial<TransferFormData>) => void;
}

export default function Step3Amount({ data, update }: Step3Props) {
  return (
    <div className="w-107 animate-in fade-in duration-500">
      <FloatingInput
        label="Monto a transferir"
        type="number"
        value={data.amount || ""}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) => update({ amount: e.target.value })}
      />
    </div>
  );
}