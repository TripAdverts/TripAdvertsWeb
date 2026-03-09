"use client";

import { useFormContext, useWatch } from "react-hook-form";
import { Button } from "@/components/ui/button";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  accountTypeOptions,
  type RegisterFormValues,
} from "@/lib/schemas";
import {
  bankingFieldConfigByCountry,
  type AccountTypeOption,
  type CountryOption,
  type RegisterStepProps,
} from "./register-config";

export function BankingStep({
  isFirstStep,
  isLastStep,
  isValid,
  onBack,
  submitted,
}: RegisterStepProps) {
  const { control } = useFormContext<RegisterFormValues>();
  const selectedCountry = useWatch({
    control,
    name: "country",
  }) as CountryOption | undefined;
  const accountType = useWatch({
    control,
    name: "accountType",
  }) as AccountTypeOption | undefined;

  const selectedBankingConfig = selectedCountry
    ? bankingFieldConfigByCountry[selectedCountry]
    : null;
  const extraField = selectedBankingConfig?.extraField;
  const nameEntity =
    accountType === accountTypeOptions[1] ? "business" : "individual";

  return (
    <div className="flex flex-col h-full animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="space-y-2 mb-8">
        <h2 className="text-3xl font-bold tracking-tight text-foreground">
          Banking &amp; Payment Info
        </h2>
        <p className="text-muted-foreground">
          Link your primary bank account for payouts and billing.
        </p>
      </div>

      <div className="flex-1 overflow-y-auto pr-2 pb-4 space-y-6">
        <div className="grid gap-4 md:grid-cols-2">
          <FormField
            control={control}
            name="bankName"
            render={({ field }) => (
              (() => {
                const { value, ...fieldProps } = field;

                return (
                  <FormItem className="space-y-2 md:col-span-2">
                    <FormLabel>Bank Name</FormLabel>
                    <FormControl>
                      <Input
                        placeholder={
                          selectedBankingConfig?.bankNamePlaceholder ??
                          "e.g. Chase, Monzo, GTBank"
                        }
                        {...fieldProps}
                        value={typeof value === "string" ? value : ""}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                );
              })()
            )}
          />

          <FormField
            control={control}
            name="bankAccountName"
            render={({ field }) => (
              (() => {
                const { value, ...fieldProps } = field;

                return (
                  <FormItem className="space-y-2 md:col-span-2">
                    <FormLabel>
                      {selectedBankingConfig?.accountNameLabel ??
                        "Account Holder Name"}
                    </FormLabel>
                    <FormControl>
                      <Input
                        placeholder={
                          selectedBankingConfig?.accountNamePlaceholder ??
                          "Legal account holder name"
                        }
                        {...fieldProps}
                        value={typeof value === "string" ? value : ""}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                );
              })()
            )}
          />

          {extraField?.name === "bankRoutingNumber" ? (
            <FormField
              control={control}
              name="bankRoutingNumber"
              render={({ field }) => (
                (() => {
                  const { value, ...fieldProps } = field;

                  return (
                    <FormItem className="space-y-2">
                      <FormLabel>{extraField.label}</FormLabel>
                      <FormControl>
                        <Input
                          inputMode="numeric"
                          maxLength={9}
                          placeholder={extraField.placeholder}
                          {...fieldProps}
                          value={typeof value === "string" ? value : ""}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  );
                })()
              )}
            />
          ) : null}

          {extraField?.name === "bankSortCode" ? (
            <FormField
              control={control}
              name="bankSortCode"
              render={({ field }) => (
                (() => {
                  const { value, ...fieldProps } = field;

                  return (
                    <FormItem className="space-y-2">
                      <FormLabel>{extraField.label}</FormLabel>
                      <FormControl>
                        <Input
                          placeholder={extraField.placeholder}
                          {...fieldProps}
                          value={typeof value === "string" ? value : ""}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  );
                })()
              )}
            />
          ) : null}

          <FormField
            control={control}
            name="bankAccountNumber"
            render={({ field }) => (
              (() => {
                const { value, ...fieldProps } = field;

                return (
                  <FormItem
                    className={`space-y-2 ${
                      extraField ? "" : "md:col-span-2"
                    }`}
                  >
                    <FormLabel>Account Number</FormLabel>
                    <FormControl>
                      <Input
                        type="password"
                        placeholder={
                          selectedBankingConfig?.accountNumberPlaceholder ??
                          "Account number"
                        }
                        {...fieldProps}
                        value={typeof value === "string" ? value : ""}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                );
              })()
            )}
          />
        </div>

        <div className="rounded-xl border border-primary/20 bg-primary/5 p-4">
          <p className="text-sm text-primary">
            <strong>Note:</strong> The bank account name must match your legal{" "}
            {nameEntity} name provided earlier. Payments to third-party accounts
            are not permitted.
          </p>
        </div>
      </div>

      <div className="mt-8 flex justify-between border-t border-border pt-6 shrink-0">
        <Button
          type="button"
          variant="outline"
          size="lg"
          onClick={onBack}
          disabled={isFirstStep}
          className="h-12 px-8"
        >
          Back
        </Button>
        <div className="flex items-center gap-4">
          <div className="hidden text-sm text-muted-foreground md:block">
            {submitted
              ? "Registration details captured. You can still review before final submission."
              : "All fields are editable. Your progress is saved locally."}
          </div>
          <Button
            type="submit"
            size="lg"
            disabled={!isValid}
            className="h-12 px-8 bg-primary text-primary-foreground hover:bg-primary/90"
          >
            {isLastStep ? "Complete registration" : "Continue"}
          </Button>
        </div>
      </div>
    </div>
  );
}
