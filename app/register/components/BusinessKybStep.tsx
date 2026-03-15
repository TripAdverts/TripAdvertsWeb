"use client";

import { useFormContext, useWatch } from "react-hook-form";
import { FileUpload } from "@/components/ui/FileUpload";
import { Button } from "@/components/ui/button";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { type RegisterFormValues } from "@/lib/schemas";
import {
  businessFieldConfigByCountry,
  businessTypeOptionsByCountry,
  identityDocumentUploadProps,
  incorporationStateOptions,
  type CountryOption,
  type RegisterStepProps,
} from "./register-config";
import styles from "../register-theme.module.css";

export function BusinessKybStep({
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

  const selectedBusinessConfig = selectedCountry
    ? businessFieldConfigByCountry[selectedCountry]
    : null;
  const businessTypeOptions = selectedCountry
    ? businessTypeOptionsByCountry[selectedCountry]
    : [];

  const renderCountrySpecificBusinessFields = () => {
    if (!selectedCountry || !selectedBusinessConfig) {
      return null;
    }

    return (
      <>
        {selectedCountry === "United States" ? (
          <FormField
            control={control}
            name="businessRegistration"
            render={({ field }) => (
              <FormItem>
                <FormLabel>
                  {selectedBusinessConfig.registrationLabel}
                </FormLabel>
                <FormControl>
                  <Select
                    onValueChange={field.onChange}
                    value={field.value || undefined}
                  >
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Select state" />
                    </SelectTrigger>
                    <SelectContent className={styles.selectContent}>
                      {incorporationStateOptions.map((state) => (
                        <SelectItem key={state.value} value={state.value}>
                          {state.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </FormControl>
              </FormItem>
            )}
          />
        ) : (
          <FormField
            control={control}
            name="businessRegistration"
            render={({ field }) => (
              <FormItem>
                <FormLabel>
                  {selectedBusinessConfig.registrationLabel}
                </FormLabel>
                <FormControl>
                  <Input
                    placeholder={selectedBusinessConfig.registrationPlaceholder}
                    {...field}
                  />
                </FormControl>
              </FormItem>
            )}
          />
        )}
        <FormField
          control={control}
          name="businessTaxId"
          render={({ field }) => (
            <FormItem>
              <FormLabel>{selectedBusinessConfig.taxIdLabel}</FormLabel>
              <FormControl>
                <Input
                  placeholder={selectedBusinessConfig.taxIdPlaceholder}
                  {...field}
                />
              </FormControl>
            </FormItem>
          )}
        />
        {selectedBusinessConfig.vatLabel ? (
          <FormField
            control={control}
            name="businessVatNumber"
            render={({ field }) => (
              <FormItem className="md:col-span-2">
                <FormLabel>{selectedBusinessConfig.vatLabel}</FormLabel>
                <FormControl>
                  <Input
                    placeholder={selectedBusinessConfig.vatPlaceholder}
                    {...field}
                  />
                </FormControl>
              </FormItem>
            )}
          />
        ) : null}
        <div className="space-y-4 pt-4 border-t border-border w-full md:col-span-2">
          <h3 className="font-semibold text-foreground">Required Documents</h3>
          <div className="grid md:grid-cols-2 gap-4">
            {selectedBusinessConfig.documentLabels.map((label: string) => (
              <FileUpload
                key={label}
                label={label}
                {...identityDocumentUploadProps}
              />
            ))}
          </div>
        </div>
      </>
    );
  };

  return (
    <div className="flex flex-col h-full animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="space-y-2 mb-8">
        <h2 className="text-3xl font-bold tracking-tight text-foreground">
          Business Information (KYB)
        </h2>
        <p className="text-muted-foreground">
          Provide your registration details so we can verify your business based
          on your country of incorporation.
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <FormField
          control={control}
          name="businessName"
          render={({ field }) => (
            <FormItem className="md:col-span-2">
              <FormLabel>Registered business name</FormLabel>
              <FormControl>
                <Input placeholder="Acme Inc." {...field} />
              </FormControl>
            </FormItem>
          )}
        />
        <FormField
          control={control}
          name="businessTradingName"
          render={({ field }) => (
            <FormItem className="md:col-span-2">
              <FormLabel>Trading name / DBA (if different)</FormLabel>
              <FormControl>
                <Input placeholder="Acme Services" {...field} />
              </FormControl>
            </FormItem>
          )}
        />
        <FormField
          control={control}
          name="businessIncorporationDate"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Date of incorporation</FormLabel>
              <FormControl>
                <Input type="date" {...field} />
              </FormControl>
            </FormItem>
          )}
        />
        <FormField
          control={control}
          name="businessType"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Business type</FormLabel>
              <FormControl>
                <Select
                  onValueChange={field.onChange}
                  value={field.value || undefined}
                >
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Select business type" />
                  </SelectTrigger>
                  <SelectContent className={styles.selectContent}>
                    {businessTypeOptions.map((option: string) => (
                      <SelectItem key={option} value={option}>
                        {option}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </FormControl>
            </FormItem>
          )}
        />
        <FormField
          control={control}
          name="businessAddress"
          render={({ field }) => (
            <FormItem className="md:col-span-2">
              <FormLabel>Registered office address</FormLabel>
              <FormControl>
                <Textarea
                  placeholder="123 Corporate Blvd, Suite 100, City, State, ZIP"
                  className="min-h-[120px]"
                  {...field}
                />
              </FormControl>
            </FormItem>
          )}
        />

        <div className="md:col-span-2 space-y-4 pt-4 border-t border-border">
          <h3 className="font-semibold text-foreground">
            Registration Details
          </h3>
          <div className="grid md:grid-cols-2 gap-4">
            {renderCountrySpecificBusinessFields()}
          </div>
        </div>
      </div>

      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between mt-8">
        <div className="text-sm text-muted-foreground">
          {submitted
            ? "Registration details captured. You can still review before final submission."
            : "All fields are editable. Your progress is saved locally."}
        </div>
        <div className="flex items-center gap-2">
          <Button
            type="button"
            variant="ghost"
            onClick={onBack}
            disabled={isFirstStep}
          >
            Back
          </Button>
          <Button type="submit" disabled={!isValid}>
            {isLastStep ? "Complete registration" : "Continue"}
          </Button>
        </div>
      </div>
    </div>
  );
}
