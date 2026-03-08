"use client";

import { useFormContext, useWatch } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { FileUpload } from "@/components/ui/FileUpload";
import {
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  accountTypeOptions,
  type RegisterFormValues,
} from "@/lib/schemas";
import {
  identityDocumentUploadProps,
  type AccountTypeOption,
  type CountryOption,
} from "./register-config";

type IdentityVerificationStepProps = {
  isValid: boolean;
  onBack: () => void;
};

export function IdentityVerificationStep({
  isValid,
  onBack,
}: IdentityVerificationStepProps) {
  const { control } = useFormContext<RegisterFormValues>();
  const accountType = useWatch({
    control,
    name: "accountType",
  }) as AccountTypeOption | undefined;
  const selectedCountry = useWatch({
    control,
    name: "country",
  }) as CountryOption | undefined;

  const renderCountrySpecificIdentityFields = () => {
    switch (selectedCountry) {
      case "Ghana":
        return (
          <>
            <FormField
              control={control}
              name="ghCard"
              render={({ field }) => (
                <FormItem className="space-y-2 md:col-span-2">
                  <Label htmlFor="ghCard">Ghana Card Number</Label>
                  <FormControl>
                    <Input
                      id="ghCard"
                      placeholder="GHA-000000000-0"
                      {...field}
                    />
                  </FormControl>
                </FormItem>
              )}
            />
            <div className="space-y-4 pt-4 border-t border-border w-full md:col-span-2">
              <h3 className="font-semibold text-foreground">
                Verification Documents
              </h3>
              <div className="grid md:grid-cols-2 gap-4 pt-2">
                <FileUpload
                  label="Upload Ghana Card (Front)"
                  {...identityDocumentUploadProps}
                />
                <FileUpload
                  label="Upload Ghana Card (Back)"
                  {...identityDocumentUploadProps}
                />
              </div>
            </div>
          </>
        );
      case "Nigeria":
        return (
          <>
            <FormField
              control={control}
              name="nin"
              render={({ field }) => (
                <FormItem className="space-y-2 md:col-span-2">
                  <Label htmlFor="nin">
                    National Identification Number (NIN)
                  </Label>
                  <FormControl>
                    <Input id="nin" placeholder="11-digit NIN" {...field} />
                  </FormControl>
                </FormItem>
              )}
            />
            <div className="space-y-4 pt-4 border-t border-border w-full md:col-span-2">
              <h3 className="font-semibold text-foreground">
                Verification Documents
              </h3>
              <div className="pt-2">
                <FileUpload
                  label="Upload Government ID (National ID / Passport / Driver's License)"
                  {...identityDocumentUploadProps}
                />
              </div>
            </div>
          </>
        );
      case "United States":
        return (
          <>
            <FormField
              control={control}
              name="ssn"
              render={({ field }) => (
                <FormItem className="space-y-2 md:col-span-2">
                  <Label htmlFor="ssn">
                    Social Security Number (SSN - Last 4)
                  </Label>
                  <FormControl>
                    <Input
                      id="ssn"
                      placeholder="***-**-1234"
                      maxLength={4}
                      inputMode="numeric"
                      {...field}
                    />
                  </FormControl>
                </FormItem>
              )}
            />
            <div className="space-y-4 pt-4 border-t border-border w-full md:col-span-2">
              <h3 className="font-semibold text-foreground">
                Verification Documents
              </h3>
              <div className="pt-2">
                <FileUpload
                  label="Upload Government ID (Driver&apos;s License / Passport)"
                  {...identityDocumentUploadProps}
                />
              </div>
            </div>
          </>
        );
      case "United Kingdom":
        return (
          <>
            <FormField
              control={control}
              name="nino"
              render={({ field }) => (
                <FormItem className="space-y-2 md:col-span-2">
                  <Label htmlFor="nino">National Insurance Number</Label>
                  <FormControl>
                    <Input id="nino" placeholder="QQ 12 34 56 A" {...field} />
                  </FormControl>
                </FormItem>
              )}
            />
            <div className="space-y-4 pt-4 border-t border-border w-full md:col-span-2">
              <h3 className="font-semibold text-foreground">
                Verification Documents
              </h3>
              <div className="pt-2">
                <FileUpload
                  label="Upload Government ID (Passport / Driving License)"
                  {...identityDocumentUploadProps}
                />
              </div>
            </div>
          </>
        );
      default:
        return null;
    }
  };

  return (
    <div className="flex flex-col h-full animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="space-y-2 mb-8">
        <h2 className="text-3xl font-bold tracking-tight text-foreground">
          Identity Details
        </h2>
        <p className="text-muted-foreground">
          Please provide your personal information for verification.
        </p>
      </div>

      <div className="flex-1 overflow-y-auto pr-2 pb-4 space-y-6">
        <div className="grid md:grid-cols-2 gap-4">
          <FormField
            control={control}
            name="identityFullName"
            render={({ field }) => (
              <FormItem className="space-y-2 md:col-span-2">
                <Label htmlFor="fullName">Full Legal Name</Label>
                <FormControl>
                  <Input id="fullName" placeholder="John Doe" {...field} />
                </FormControl>
              </FormItem>
            )}
          />
          <FormField
            control={control}
            name="dateOfBirth"
            render={({ field }) => (
              <FormItem className="space-y-2">
                <Label htmlFor="dateOfBirth">Date of Birth</Label>
                <FormControl>
                  <Input id="dateOfBirth" type="date" {...field} />
                </FormControl>
              </FormItem>
            )}
          />
          <FormField
            control={control}
            name="phoneNumber"
            render={({ field }) => (
              <FormItem className="space-y-2">
                <Label htmlFor="phoneNumber">Phone Number</Label>
                <FormControl>
                  <Input
                    id="phoneNumber"
                    type="tel"
                    inputMode="tel"
                    placeholder="(+00) 000 0000"
                    {...field}
                  />
                </FormControl>
              </FormItem>
            )}
          />
          <FormField
            control={control}
            name="email"
            render={({ field }) => (
              <FormItem className="space-y-2 md:col-span-2">
                <Label htmlFor="email">Email Address</Label>
                <FormControl>
                  <Input
                    id="email"
                    type="email"
                    placeholder="name@company.com"
                    {...field}
                  />
                </FormControl>
              </FormItem>
            )}
          />
          <FormField
            control={control}
            name="residentialAddress"
            render={({ field }) => (
              <FormItem className="space-y-2 md:col-span-2">
                <Label htmlFor="residentialAddress">Residential Address</Label>
                <FormControl>
                  <Textarea
                    id="residentialAddress"
                    placeholder="Street, city, region, postal code"
                    className="min-h-[120px]"
                    {...field}
                  />
                </FormControl>
              </FormItem>
            )}
          />

          {renderCountrySpecificIdentityFields()}
        </div>

        <FormField
          control={control}
          name="agreement"
          render={({ field }) => (
            <FormItem className="space-y-2 pt-4 border-t border-border">
              <div className="flex items-start space-x-3">
                <FormControl>
                  <Checkbox
                    id="agreement"
                    checked={field.value}
                    onCheckedChange={(checked) => field.onChange(checked === true)}
                    className="mt-1"
                  />
                </FormControl>
                <Label
                  htmlFor="agreement"
                  className="text-sm font-normal text-muted-foreground leading-snug"
                >
                  {accountType === accountTypeOptions[1]
                    ? "I declare that I am an authorized representative of this business and the information provided is true and accurate. I authorize the verification of this information."
                    : "I declare that the information provided is true and accurate. I authorize the verification of this information with relevant authorities."}
                </Label>
              </div>
              <FormMessage />
            </FormItem>
          )}
        />
      </div>

      <div className="mt-8 pt-6 border-t border-border flex justify-between shrink-0">
        <Button
          variant="outline"
          size="lg"
          onClick={onBack}
          className="h-12 px-8"
          type="button"
        >
          Back
        </Button>
        <Button
          size="lg"
          disabled={!isValid}
          className="h-12 px-8 bg-primary hover:bg-primary/90 text-primary-foreground disabled:opacity-50"
          type="submit"
        >
          Continue
        </Button>
      </div>
    </div>
  );
}
