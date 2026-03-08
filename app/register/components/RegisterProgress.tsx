"use client";

import { Check } from "lucide-react";

type RegisterProgressProps = {
  currentStepIndex: number;
  steps: readonly {
    title: string;
  }[];
};

export function RegisterProgress({
  currentStepIndex,
  steps,
}: RegisterProgressProps) {
  return (
    <div className="w-full max-w-5xl mb-6 shrink-0">
      <div className="flex items-center justify-between relative">
        <div className="absolute left-0 top-1/2 -translate-y-1/2 w-full h-0.5 bg-border -z-10" />
        {steps.map((step, index) => {
          const isActive = index === currentStepIndex;
          const isCompleted = index < currentStepIndex;

          return (
            <div
              key={step.title}
              className="flex flex-col items-center relative z-10"
            >
              <div
                className={`w-8 h-8 rounded-full flex items-center justify-center font-semibold text-sm transition-colors duration-300 ${
                  isActive
                    ? "bg-primary text-primary-foreground shadow-lg shadow-primary/20"
                    : isCompleted
                      ? "bg-foreground text-background"
                      : "bg-muted text-muted-foreground border border-border"
                }`}
              >
                {isCompleted ? <Check className="w-4 h-4" /> : index + 1}
              </div>
              <span
                className={`mt-2 text-xs font-medium ${
                  isActive ? "text-foreground" : "text-muted-foreground"
                }`}
              >
                {step.title}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
}
