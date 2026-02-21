"use client";
import React, { useContext } from "react";
import { BankContext } from "@/context/BankProvider";
import Button from "@/components/ui/Button";

export default function ServerGuard({ children }: { children: React.ReactNode }) {
    const context = useContext(BankContext);

    if (!context) return null;

    if (context.isLoading && !context.user) {
        return (
            <div className="flex items-center justify-center min-h-screen">
                <p className="animate-pulse text-grayContent font-sans">Cargando sistema...</p>
            </div>
        );
    }

    if (context.error || !context.user) {
        return (
            <div className="flex flex-col items-center justify-center min-h-screen bg-white p-6 text-center animate-in fade-in duration-500">
                <div className="w-20 h-20 bg-greenPastel text-greenPrimary rounded-full flex items-center justify-center mb-6 text-4xl font-bold">!</div>

                <h1 className="text-h1 font-bold text-primary font-poppins mb-2">
                    Servidor no disponible
                </h1>

                <p className="text-grayContent font-sans mb-8 max-w-100">
                    No se pudo establecer conexión con la API. Asegúrate de ejecutar el servidor Mock en el puerto 5566.
                </p>

                <div className="w-full max-w-50 flex justify-center">
                    <Button
                        label="Reintentar"
                        variant="primary"
                        onClick={() => context.refreshData()}
                    />
                </div>
            </div>
        );
    }

    return <>{children}</>;
}