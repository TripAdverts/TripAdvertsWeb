"use client";

import {
  Building2,
  CreditCard,
  ShieldCheck,
  User,
  Users,
} from "lucide-react";
import { useFormContext } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { type RegisterFormValues } from "@/lib/schemas";
import {
  bankingFieldConfigByCountry,
  businessFieldConfigByCountry,
  type AccountTypeOption,
  type CountryOption,
  type RegisterStepId,
  type RegisterStepProps,
} from "./register-config";

type SummarySectionProps = {
  children: React.ReactNode;
  icon: React.ComponentType<{ className?: string }>;
  onEdit?: (stepId: RegisterStepId) => void;
  stepId: RegisterStepId;
  title: string;
};

function SummarySection({
  children,
  icon: Icon,
  onEdit,
  stepId,
  title,
}: SummarySectionProps) {
  return (
    <section className="overflow-hidden rounded-xl border border-border bg-card">
      <div className="flex items-center gap-3 border-b border-border bg-muted/30 p-4">
        <Icon className="size-5 text-primary" />
        <h3 className="flex-1 font-semibold text-foreground">{title}</h3>
        {onEdit ? (
          <Button
            type="button"
            variant="ghost"
            size="sm"
            className="h-8 text-xs font-semibold text-primary hover:bg-primary/10 hover:text-primary"
            onClick={() => onEdit(stepId)}
          >
            Edit
          </Button>
        ) : null}
      </div>
      <div className="grid gap-x-6 gap-y-4 p-4 sm:grid-cols-2">{children}</div>
    </section>
  );
}

function DataPoint({
  label,
  value,
}: {
  label: string;
  value: React.ReactNode;
}) {
  return (
    <div className="flex flex-col">
      <span className="mb-1 text-xs font-medium text-muted-foreground">
        {label}
      </span>
      <span className="text-sm font-semibold text-foreground">
        {value || (
          <span className="italic text-muted-foreground/60">Not provided</span>
        )}
      </span>
    </div>
  );
}

function maskAccountNumber(accountNumber?: string) {
  const value = accountNumber?.trim() ?? "";

  return value ? `**${value.slice(-4)}` : "";
}

function asString(value: unknown) {
  return typeof value === "string" ? value : "";
}

export function ReviewStep({
  isFirstStep,
  isLastStep,
  isValid,
  onBack,
  onEditStep,
  submitted,
}: RegisterStepProps) {
  const { getValues } = useFormContext<RegisterFormValues>();
  const values = getValues();
  const accountType = values.accountType as AccountTypeOption | undefined;
  const selectedCountry = values.country as CountryOption | undefined;
  const businessConfig = selectedCountry
    ? businessFieldConfigByCountry[selectedCountry]
    : null;
  const bankingConfig = selectedCountry
    ? bankingFieldConfigByCountry[selectedCountry]
    : null;
  const idLabelByCountry: Partial<Record<CountryOption, string>> = {
    Ghana: "Ghana Card Number",
    Nigeria: "National Identification Number",
    "United Kingdom": "National Insurance Number",
    "United States": "SSN (Last 4)",
  };
  const idValueByCountry: Partial<Record<CountryOption, string>> = {
    Ghana: values.ghCard,
    Nigeria: values.nin,
    "United Kingdom": values.nino,
    "United States": values.ssn,
  };

  return (
    <div className="flex flex-col h-full animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="space-y-2 mb-8">
        <h2 className="text-3xl font-bold tracking-tight text-foreground">
          Review &amp; Submit
        </h2>
        <p className="text-muted-foreground">
          Confirm your registration details before final submission.
        </p>
      </div>

      <div className="flex-1 overflow-y-auto pr-2 pb-4 space-y-6">
        {submitted ? (
          <div className="rounded-xl border border-emerald-500/20 bg-emerald-500/10 p-4 text-sm text-emerald-700">
            Registration data has been prepared for submission. You can still
            edit any section before wiring this flow to the final backend
            action.
          </div>
        ) : null}

        <SummarySection
          icon={ShieldCheck}
          onEdit={onEditStep}
          stepId="account-setup"
          title="Account Setup"
        >
          <DataPoint label="Account Type" value={values.accountType} />
          <DataPoint label="Country" value={values.country} />
        </SummarySection>

        <SummarySection
          icon={User}
          onEdit={onEditStep}
          stepId="identity-verification"
          title="Identity Details"
        >
          <DataPoint label="Full Legal Name" value={values.identityFullName} />
          <DataPoint label="Date of Birth" value={values.dateOfBirth} />
          <DataPoint label="Email Address" value={values.email} />
          <DataPoint label="Phone Number" value={values.phoneNumber} />
          <DataPoint
            label="Residential Address"
            value={values.residentialAddress}
          />
          {selectedCountry ? (
            <DataPoint
              label={idLabelByCountry[selectedCountry] ?? "ID Number"}
              value={idValueByCountry[selectedCountry]}
            />
          ) : null}
        </SummarySection>

        {accountType === "Registered Business" ? (
          <SummarySection
            icon={Building2}
            onEdit={onEditStep}
            stepId="business-kyb"
            title="Business Information"
          >
            <DataPoint label="Business Name" value={values.businessName} />
            <DataPoint
              label="Trading Name / DBA"
              value={values.businessTradingName}
            />
            <DataPoint
              label="Date of Incorporation"
              value={values.businessIncorporationDate}
            />
            <DataPoint label="Business Type" value={values.businessType} />
            <DataPoint
              label={businessConfig?.registrationLabel ?? "Registration Number"}
              value={values.businessRegistration}
            />
            <DataPoint
              label={businessConfig?.taxIdLabel ?? "Tax ID"}
              value={values.businessTaxId}
            />
            <DataPoint
              label={businessConfig?.vatLabel ?? "VAT Number"}
              value={values.businessVatNumber}
            />
            <DataPoint
              label="Registered Office Address"
              value={values.businessAddress}
            />
          </SummarySection>
        ) : null}

        {accountType === "Registered Business" ? (
          <SummarySection
            icon={Users}
            onEdit={onEditStep}
            stepId="directors-owners"
            title={`Directors & Owners (${values.owners.length})`}
          >
            {values.owners.map((owner, index) => (
              <div
                key={`${owner.fullName}-${index}`}
                className="space-y-2 border-b border-border pb-3 last:border-b-0 last:pb-0 sm:col-span-2"
              >
                <div className="flex items-center justify-between">
                  <p className="text-sm font-semibold text-foreground">
                    {owner.fullName || `Person ${index + 1}`}
                  </p>
                  {owner.isAuthorizedSignatory ? (
                    <span className="rounded-full bg-primary/15 px-2 py-0.5 text-xs font-medium text-primary">
                      Authorized Signatory
                    </span>
                  ) : null}
                </div>
                <div className="grid gap-4 sm:grid-cols-2">
                  <DataPoint label="Nationality" value={owner.nationality} />
                  <DataPoint
                    label="Date of Birth"
                    value={owner.dateOfBirth}
                  />
                  <DataPoint label="Role" value={owner.role} />
                  <DataPoint
                    label="Ownership"
                    value={
                      owner.ownershipPercent
                        ? `${owner.ownershipPercent}%`
                        : ""
                    }
                  />
                </div>
              </div>
            ))}
          </SummarySection>
        ) : null}

        <SummarySection
          icon={CreditCard}
          onEdit={onEditStep}
          stepId="banking"
          title="Banking Information"
        >
          <DataPoint label="Bank Name" value={asString(values.bankName)} />
          <DataPoint
            label={bankingConfig?.accountNameLabel ?? "Account Holder Name"}
            value={asString(values.bankAccountName)}
          />
          <DataPoint
            label="Account Number"
            value={maskAccountNumber(asString(values.bankAccountNumber))}
          />
          {selectedCountry === "United States" ? (
            <DataPoint
              label="Routing Number"
              value={asString(values.bankRoutingNumber)}
            />
          ) : null}
          {selectedCountry === "United Kingdom" ? (
            <DataPoint label="Sort Code" value={asString(values.bankSortCode)} />
          ) : null}
        </SummarySection>
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
        <Button
          type="submit"
          size="lg"
          disabled={!isValid}
          className="h-12 px-8 bg-primary text-primary-foreground hover:bg-primary/90"
        >
          {isLastStep ? "Submit Registration" : "Continue"}
        </Button>
      </div>
    </div>
  );
}
