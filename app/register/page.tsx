"use client";

import { useEffect, useMemo, useRef, useState, type ComponentType } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, useWatch, type Resolver } from "react-hook-form";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Form } from "@/components/ui/form";
import {
  accountTypeOptions,
  step1Schema,
  step2Schema,
  step3Schema,
  step4Schema,
  step5Schema,
  type RegisterFormData,
  type RegisterFormValues,
} from "@/lib/schemas";
import { AccountSetupStep } from "./components/AccountSetupStep";
import { BankingStep } from "./components/BankingStep";
import { BusinessKybStep } from "./components/BusinessKybStep";
import { DirectorsOwnersStep } from "./components/DirectorsOwnersStep";
import { IdentityVerificationStep } from "./components/IdentityVerificationStep";
import { RegisterProgress } from "./components/RegisterProgress";
import {
  registerDefaultValues,
  type AccountTypeOption,
  type RegisterStepProps,
} from "./components/register-config";

type RegisterStepDefinition = {
  Component: ComponentType<RegisterStepProps> | ComponentType<{ isValid: boolean }>;
  schema:
    | typeof step1Schema
    | typeof step2Schema
    | typeof step3Schema
    | typeof step4Schema
    | typeof step5Schema;
  title: string;
};

const baseSteps: readonly RegisterStepDefinition[] = [
  {
    title: "Account Setup",
    schema: step1Schema,
    Component: AccountSetupStep,
  },
  {
    title: "Identity Verification",
    schema: step2Schema,
    Component: IdentityVerificationStep,
  },
];

const businessOnlySteps: readonly RegisterStepDefinition[] = [
  {
    title: "Business Information (KYB)",
    schema: step3Schema,
    Component: BusinessKybStep,
  },
  {
    title: "Directors & Owners",
    schema: step4Schema,
    Component: DirectorsOwnersStep,
  },
];

const sharedFinalSteps: readonly RegisterStepDefinition[] = [
  {
    title: "Banking",
    schema: step5Schema,
    Component: BankingStep,
  },
];

function getActiveSteps(accountType?: AccountTypeOption | string) {
  return accountType === accountTypeOptions[1]
    ? [...baseSteps, ...businessOnlySteps, ...sharedFinalSteps]
    : [...baseSteps, ...sharedFinalSteps];
}

export default function RegisterPage() {
  const [stepIndex, setStepIndex] = useState(0);
  const [submitted, setSubmitted] = useState(false);
  const stepIndexRef = useRef(stepIndex);

  const stepResolver = useMemo<
    Resolver<RegisterFormValues, unknown, RegisterFormData>
  >(
    () => (values, context, options) => {
      const activeStepSet = getActiveSteps(values.accountType);
      const currentStep =
        activeStepSet[stepIndexRef.current] ??
        activeStepSet[activeStepSet.length - 1];

      return zodResolver(currentStep.schema as never)(
        values as never,
        context,
        options as never,
      ) as never;
    },
    [],
  );

  const form = useForm<RegisterFormValues, unknown, RegisterFormData>({
    mode: "onChange",
    resolver: stepResolver,
    defaultValues: registerDefaultValues,
  });

  const accountType = useWatch({
    control: form.control,
    name: "accountType",
  }) as AccountTypeOption | undefined;

  const activeSteps = getActiveSteps(accountType);
  const currentStepIndex = Math.min(stepIndex, activeSteps.length - 1);
  const currentStep = activeSteps[currentStepIndex] ?? activeSteps[0];

  useEffect(() => {
    stepIndexRef.current = currentStepIndex;
  }, [currentStepIndex]);

  useEffect(() => {
    void form.trigger();
  }, [activeSteps.length, currentStepIndex, form]);

  const isFirstStep = currentStepIndex === 0;
  const isLastStep = currentStepIndex === activeSteps.length - 1;

  const handleNext = form.handleSubmit(() => {
    if (isLastStep) {
      setSubmitted(true);
      return;
    }

    setStepIndex(Math.min(currentStepIndex + 1, activeSteps.length - 1));
  });

  const handleBack = () => {
    setSubmitted(false);
    setStepIndex(Math.max(currentStepIndex - 1, 0));
  };

  const CurrentStepComponent = currentStep.Component;

  return (
    <section className="min-h-screen bg-background text-foreground flex flex-col items-center py-6 px-4 sm:px-6 lg:px-8 overflow-hidden">
      <RegisterProgress
        currentStepIndex={currentStepIndex}
        steps={activeSteps}
      />

      <Card className="w-full max-w-5xl rounded-2xl border border-border shadow-2xl overflow-hidden bg-card flex flex-col min-h-0">
        <CardHeader className="space-y-2 border-b border-border/60">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs uppercase tracking-[0.24em] text-muted-foreground">
                Registration
              </p>
              <h2 className="text-2xl font-semibold text-foreground">
                {currentStep.title}
              </h2>
            </div>
            <p className="text-xs text-muted-foreground">
              Step {currentStepIndex + 1} of {activeSteps.length}
            </p>
          </div>
        </CardHeader>
        <div className="flex-1 overflow-y-auto">
          <CardContent className="p-6 sm:p-8 space-y-8">
            <Form {...form}>
              <form onSubmit={handleNext} className="space-y-8">
                <CurrentStepComponent
                  isFirstStep={isFirstStep}
                  isLastStep={isLastStep}
                  isValid={form.formState.isValid}
                  onBack={handleBack}
                  submitted={submitted}
                />
              </form>
            </Form>
          </CardContent>
        </div>
      </Card>
    </section>
  );
}
