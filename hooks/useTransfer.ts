"use client";

import { useState, useMemo } from "react";
import { Account, TransferFormData, TransactionRequest } from "@/types";
import { createTransaction } from "@/services/transactions.service";

export function useTransfer(
    accounts: Account[],
    refreshData: () => Promise<void>
) {
    const [currentStep, setCurrentStep] = useState(1);
    const [loading, setLoading] = useState(false);
    const [errorMsg, setErrorMsg] = useState<string | null>(null);

    const [formData, setFormData] = useState<TransferFormData>({
        originAccount: "",
        destinationAccount: "",
        amount: "",
        debit: "",
        credit: "",
        ref: "",
        email: "",
        type: "propias"
    });

    const availableDestinations = useMemo(
        () =>
            accounts.filter(
                a => String(a.account_number) !== formData.originAccount
            ),
        [accounts, formData.originAccount]
    );

    const originAccountData = useMemo(
        () =>
            accounts.find(
                a => String(a.account_number) === formData.originAccount
            ),
        [accounts, formData.originAccount]
    );

    const updateForm = (newData: Partial<TransferFormData>) => {
        setErrorMsg(null);
        setFormData(prev => ({ ...prev, ...newData }));
    };

    const validateStep = () => {
        if (currentStep === 1 && !formData.originAccount)
            return "Seleccione una cuenta de origen.";

        if (currentStep === 2 && !formData.destinationAccount)
            return "Seleccione una cuenta destino.";

        if (currentStep === 3) {
            const val = parseFloat(formData.amount);
            if (!val || val <= 0) return "Ingrese un monto válido.";
            if (originAccountData && val > originAccountData.balance)
                return "Saldo insuficiente.";
        }

        if (currentStep === 4 && (!formData.debit || !formData.ref))
            return "Complete los campos obligatorios.";

        return null;
    };

    const nextStep = async () => {
        const error = validateStep();
        if (error) {
            setErrorMsg(error);
            return;
        }

        if (currentStep < 4) {
            setErrorMsg(null);
            setCurrentStep(prev => prev + 1);
        } else {
            await executeTransfer();
        }
    };

    const prevStep = () => {
        setErrorMsg(null);
        setCurrentStep(prev => Math.max(1, prev - 1));
    };

    const executeTransfer = async () => {
        try {
            setLoading(true);
            setErrorMsg(null);

            const amountValue = parseFloat(formData.amount);

            const originAccount = accounts.find(
                a => String(a.account_number) === formData.originAccount
            );

            const destinationAccount = accounts.find(
                a => String(a.account_number) === formData.destinationAccount
            );

            if (!originAccount) {
                throw new Error("Cuenta origen no existe.");
            }

            if (!destinationAccount) {
                throw new Error("Cuenta destino no existe.");
            }

            if (originAccount.currency !== destinationAccount.currency) {
                throw new Error("Las monedas no coinciden.");
            }

            if (!amountValue || amountValue <= 0) {
                throw new Error("Monto inválido.");
            }

            if (amountValue > originAccount.balance) {
                throw new Error("Saldo insuficiente.");
            }

            originAccount.balance =
                originAccount.balance - amountValue;

            destinationAccount.balance =
                destinationAccount.balance + amountValue;

            const payload: TransactionRequest = {
                origin: formData.originAccount,
                destination: formData.destinationAccount,
                amount: {
                    currency: originAccount.currency,
                    value: amountValue
                }
            };

            await createTransaction(payload);
            await refreshData();

            resetForm();
            alert("Transferencia exitosa");
        } catch (err: any) {
            setErrorMsg(
                err?.message || "Error en la transacción."
            );
        } finally {
            setLoading(false);
        }
    };

    const resetForm = () => {
        setCurrentStep(1);
        setErrorMsg(null);
        setFormData({
            originAccount: "",
            destinationAccount: "",
            amount: "",
            debit: "",
            credit: "",
            ref: "",
            email: "",
            type: "propias"
        });
    };

    return {
        currentStep,
        formData,
        loading,
        errorMsg,
        availableDestinations,
        updateForm,
        nextStep,
        prevStep
    };
}