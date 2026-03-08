"use client";

import { Building2, User } from "lucide-react";
import { useFormContext } from "react-hook-form";
import { FormControl, FormField, FormItem } from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  accountTypeOptions,
  countryOptions,
  type RegisterFormValues,
} from "@/lib/schemas";

type AccountSetupStepProps = {
  isValid: boolean;
};

export function AccountSetupStep({ isValid }: AccountSetupStepProps) {
  const { control } = useFormContext<RegisterFormValues>();

  return (
    <div className="flex flex-col h-full animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="text-center space-y-2 mb-8">
        <h2 className="text-3xl font-bold tracking-tight text-foreground">
          Let&apos;s get started
        </h2>
        <p className="text-muted-foreground">
          First, tell us where you&apos;re located and how you want to use the
          platform.
        </p>
      </div>

      <div className="flex-1 overflow-y-auto pr-2 pb-4 space-y-6">
        <FormField
          control={control}
          name="country"
          render={({ field }) => (
            <FormItem className="space-y-3">
              <Label htmlFor="country" className="text-base text-foreground">
                Country of Registration
              </Label>
              <FormControl>
                <Select
                  onValueChange={field.onChange}
                  value={field.value || undefined}
                >
                  <SelectTrigger
                    id="country"
                    className="w-full text-base h-12 bg-background border-border"
                  >
                    <SelectValue placeholder="Select your country" />
                  </SelectTrigger>
                  <SelectContent>
                    {countryOptions.map((country) => (
                      <SelectItem
                        key={country}
                        value={country}
                        className="text-base cursor-pointer"
                      >
                        {country}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </FormControl>
              <p className="text-sm text-muted-foreground">
                Requirements will adapt based on the selected region.
              </p>
            </FormItem>
          )}
        />

        <FormField
          control={control}
          name="accountType"
          render={({ field }) => {
            const selectedType = field.value;

            return (
              <FormItem className="space-y-4">
                <Label className="text-base text-foreground">
                  Account Type
                </Label>
                <FormControl>
                  <RadioGroup
                    value={selectedType || ""}
                    onValueChange={field.onChange}
                    className="grid grid-cols-1 md:grid-cols-2 gap-4"
                  >
                    <Label
                      htmlFor="type-individual"
                      className={`[&:has([data-state=checked])]:border-primary [&:has([data-state=checked])]:bg-primary/5 cursor-pointer rounded-xl border-2 border-border bg-card p-4 hover:border-primary/50 transition-all ${
                        selectedType === accountTypeOptions[0]
                          ? "shadow-md shadow-primary/10"
                          : ""
                      }`}
                    >
                      <RadioGroupItem
                        value={accountTypeOptions[0]}
                        id="type-individual"
                        className="sr-only"
                      />
                      <div className="flex flex-col space-y-3">
                        <div className="p-3 bg-primary/10 w-fit rounded-lg">
                          <User className="w-6 h-6 text-primary" />
                        </div>
                        <div className="space-y-1">
                          <div className="font-semibold text-foreground text-lg">
                            Individual
                          </div>
                          <p className="text-sm font-normal text-muted-foreground leading-snug">
                            I am registering as an individual content creator or
                            sole advertiser.
                          </p>
                        </div>
                      </div>
                    </Label>

                    <Label
                      htmlFor="type-business"
                      className={`[&:has([data-state=checked])]:border-primary [&:has([data-state=checked])]:bg-primary/5 cursor-pointer rounded-xl border-2 border-border bg-card p-4 hover:border-primary/50 transition-all ${
                        selectedType === accountTypeOptions[1]
                          ? "shadow-md shadow-primary/10"
                          : ""
                      }`}
                    >
                      <RadioGroupItem
                        value={accountTypeOptions[1]}
                        id="type-business"
                        className="sr-only"
                      />
                      <div className="flex flex-col space-y-3">
                        <div className="p-3 bg-primary/10 w-fit rounded-lg">
                          <Building2 className="w-6 h-6 text-primary" />
                        </div>
                        <div className="space-y-1">
                          <div className="font-semibold text-foreground text-lg">
                            Registered Business
                          </div>
                          <p className="text-sm font-normal text-muted-foreground leading-snug">
                            I am registering an incorporated entity or officially
                            registered business.
                          </p>
                        </div>
                      </div>
                    </Label>
                  </RadioGroup>
                </FormControl>
              </FormItem>
            );
          }}
        />
      </div>

      <div className="mt-8 pt-6 border-t border-border flex justify-end shrink-0">
        <Button
          type="submit"
          size="lg"
          disabled={!isValid}
          className="w-full sm:w-auto h-12 px-8 text-base transition-all bg-primary hover:bg-primary/90 text-primary-foreground disabled:opacity-50"
        >
          Continue
        </Button>
      </div>
    </div>
  );
}
