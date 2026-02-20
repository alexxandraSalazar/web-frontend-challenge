"use client";

import React from "react";
import { TransferFormData } from "@/types/index"; 

interface Step1Props {
    data: TransferFormData;
}

export default function Step1Origin({ data }: Step1Props) {
    return (
        <div className="flex flex-col items-center justify-center w-full animate-in fade-in duration-500 py-4">
            <p className="text-primary font-sans text-center max-w-125">
                {data.originAccount
                    ? "Cuenta de origen seleccionada. Presione 'Continuar' para elegir la cuenta destino."
                    : "Por favor, seleccione una cuenta de origen en el panel superior para comenzar su transferencia."
                }
            </p>
        </div>
    );
}