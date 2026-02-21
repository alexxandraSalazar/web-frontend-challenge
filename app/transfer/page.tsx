"use client";

import React, { useContext } from "react";
import { BankContext } from "@/context/BankProvider";
import { useTransfer } from "@/hooks/useTransfer";
import StepperComponent from "@/components/ui/StepperComponent";
import Step2Destination from "@/components/steps/Step2Destination";
import Step3Amount from "@/components/steps/Step3Amount";
import Step4Additional from "@/components/steps/Step4Additional";
import { SelectInputBig } from "@/components/ui/SelectInputBig";
import Button from "@/components/ui/Button";

const STEPS = [
  { id: 1, label: "Cuenta origen" },
  { id: 2, label: "Cuenta destino" },
  { id: 3, label: "Monto a transferir" },
  { id: 4, label: "Datos adicionales" },
];

export default function HomePage() {
  const context = useContext(BankContext);
  if (!context) return null;

  const {
    currentStep, formData, loading, errorMsg,
    availableDestinations, updateForm, nextStep, prevStep
  // eslint-disable-next-line react-hooks/rules-of-hooks
  } = useTransfer(context.accounts, context.refreshData);

  return (
    <main className="min-h-screen p-8 bg-white font-lato">
      <h2 className="text-[32px] mb-6 text-black font-bold font-poppins">Transferir</h2>

      <div className="mx-1 h-[140px] bg-white border border-[#DFE1DF] rounded-t-[4px] flex items-center justify-center">
        <StepperComponent currentStep={currentStep} steps={STEPS} />
      </div>

      <div className="mx-1 h-[140px] bg-[#F9FAF9] border-x border-b border-[#DFE1DF] flex items-center justify-center gap-8 px-12">
        <SelectInputBig
          label="Tipo de transacción"
          variant="simple"
          value={formData.type}
          options={[{ id: "propias", label: "Cuentas Propias" }]}
          onChange={(val) => updateForm({ type: val })} 
        />
        <SelectInputBig
          label="Cuenta origen"
          variant="account"
          placeholder="Seleccione cuenta"
          value={formData.originAccount}
          options={context.accounts}
          onChange={(val) => updateForm({ originAccount: val })}
        />
      </div>

      <div className="mx-1 bg-white border-x border-b border-[#DFE1DF] p-10 min-h-[400px] flex flex-col justify-between">
        <div className="flex flex-col items-center">
          {errorMsg && <p className="text-red-500 mb-4 font-bold">{errorMsg}</p>}
          
          <div className="w-full flex justify-center pt-4">
            {currentStep === 1 && <p className="text-grayContent">Confirme su selección para continuar.</p>}
            {currentStep === 2 && <Step2Destination data={formData} update={updateForm} accounts={availableDestinations} />}
            {currentStep === 3 && <Step3Amount data={formData} update={updateForm} />}
            {currentStep === 4 && <Step4Additional data={formData} update={updateForm} />}
          </div>
        </div>

        <div className="flex justify-center gap-4 mt-12">
          <Button label="Atrás" variant="outline" onClick={prevStep} disabled={currentStep === 1 || loading} />
          <Button 
            label={loading ? "Enviando..." : currentStep === 4 ? "Finalizar" : "Continuar"} 
            variant="primary" onClick={nextStep} disabled={loading} 
          />
        </div>
      </div>
    </main>
  );
}