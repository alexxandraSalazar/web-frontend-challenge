"use client";

import React from "react";
import { FloatingInput } from "@/components/ui/FloatingInput";
import { TransferFormData } from "@/types/index";

interface Step4Props {
    data: TransferFormData;
    update: (newData: Partial<TransferFormData>) => void;
}

export default function Step4Additional({ data, update }: Step4Props) {
    return (
        <div className="flex flex-col gap-8 w-full max-w-222 animate-in fade-in duration-500">
            <div className="grid grid-cols-2 gap-8">
                <FloatingInput
                    label="Concepto de débito"
                    value={data.debit || ""}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => update({ debit: e.target.value })}
                />
                <FloatingInput
                    label="Concepto de crédito"
                    value={data.credit || ""}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => update({ credit: e.target.value })}
                />
            </div>
            <div className="grid grid-cols-2 gap-8">
                <FloatingInput
                    label="Referencia"
                    value={data.ref || ""}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => update({ ref: e.target.value })}
                />
                <FloatingInput
                    label="Enviar confirmación a:"
                    value={data.email || ""}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => update({ email: e.target.value })}
                />
            </div>
        </div>
    );
}