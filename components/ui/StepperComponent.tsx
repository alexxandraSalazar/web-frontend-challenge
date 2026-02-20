"use client";

import StepCheckIconComponent from "@/components/icons/StepCheckIconComponent";
import StepIconComponent from "@/components/icons/StepIconComponent";

interface Step {
    id: number;
    label: string;
}

interface StepperComponentProps {
    currentStep: number;
    steps: Step[];
}

export const StepperComponent = ({
    currentStep,
    steps,
}: StepperComponentProps) => {
    const progress = currentStep / (steps.length - 1);
    const normalizedProgress = Math.min(Math.max(progress, 0), 1);

    return (
        <section className="relative w-164.75 h-17.75 flex flex-col">
            <div className="absolute top-4 left-[12.5%] right-[12.5%] h-0.5 z-0">
                <div className="absolute w-full h-full bg-grayContent opacity-30" />
                <div
                    className="absolute h-full bg-greenLight transition-all duration-500 ease-in-out"
                    style={{
                        width: `${normalizedProgress * 100}%`,
                    }}
                />
            </div>

            <div className="relative z-10 flex justify-between w-full">
                {steps.map((step) => {
                    const isCompleted = step.id <= currentStep;

                    return (
                        <div key={step.id} className="flex flex-col items-center flex-1">
                            <div className="bg-white rounded-full p-1">
                                {isCompleted ? (
                                    <StepCheckIconComponent width={32} height={32} />
                                ) : (
                                    <StepIconComponent width={32} height={32} />
                                )}
                            </div>

                            <div className="mt-4 text-center">
                                <p className="text-caption text-grayContent">
                                    Paso {step.id}
                                </p>
                                <p
                                    className={`text-input mt-1  whitespace-nowrap leading-none ${isCompleted
                                            ? "text-primary font-semibold"
                                            : "text-grayContent"
                                        }`}
                                >
                                    {step.label}
                                </p>
                            </div>
                        </div>
                    );
                })}
            </div>
        </section>
    );
};

export default StepperComponent;