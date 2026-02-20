"use client";

import React from "react";
import { SelectInputBig } from "@/components/ui/SelectInputBig";
import { Account } from "@/types";
import { TransferFormData } from "@/types/index"; 

interface Step2Props {
    data: TransferFormData;
    update: (newData: Partial<TransferFormData>) => void;
    accounts: Account[];
}

export default function Step2Destination({ data, update, accounts }: Step2Props) {
    return (
        <div className="flex gap-8 justify-center w-full animate-in fade-in duration-500">
            <SelectInputBig
                label="Cuenta a acreditar"
                variant="account"
                placeholder="Seleccione cuenta destino"
                value={data.destinationAccount}
                options={accounts}
                onChange={(val: string) => update({ destinationAccount: val })}
            />
        </div>
    );
}