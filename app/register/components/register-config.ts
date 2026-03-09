"use client";

import type { DefaultValues } from "react-hook-form";
import {
  accountTypeOptions,
  countryOptions,
  type RegisterFormValues,
} from "@/lib/schemas";

export const identityDocumentUploadProps = {
  accept: "image/png,image/jpeg,application/pdf",
  maxSizeInMb: 5,
} as const;

export type AccountTypeOption = (typeof accountTypeOptions)[number];
export type CountryOption = (typeof countryOptions)[number];

export type RegisterStepProps = {
  isFirstStep: boolean;
  isLastStep: boolean;
  isValid: boolean;
  onBack: () => void;
  submitted: boolean;
};

export type BusinessFieldConfig = {
  documentLabels: readonly string[];
  registrationLabel: string;
  registrationPlaceholder?: string;
  taxIdLabel: string;
  taxIdPlaceholder: string;
  vatLabel?: string;
  vatPlaceholder?: string;
};

export const incorporationStateOptions = [
  { label: "Delaware", value: "DE" },
  { label: "California", value: "CA" },
  { label: "New York", value: "NY" },
  { label: "Texas", value: "TX" },
  { label: "Florida", value: "FL" },
] as const;

export const businessTypeOptionsByCountry = {
  Ghana: ["LLC", "Sole Proprietorship", "Partnership", "Public Company"],
  Nigeria: ["LLC", "Sole Proprietorship", "Partnership", "Public Company"],
  "United States": ["LLC", "C-Corp", "S-Corp", "Sole Prop"],
  "United Kingdom": ["Ltd", "PLC", "LLP", "Sole Trader"],
} as const satisfies Record<CountryOption, readonly string[]>;

export const businessFieldConfigByCountry: Record<
  CountryOption,
  BusinessFieldConfig
> = {
  Ghana: {
    registrationLabel: "Business Registration Number",
    registrationPlaceholder: "CS0000000000",
    taxIdLabel: "Tax Identification Number (TIN)",
    taxIdPlaceholder: "P0000000000",
    vatLabel: "VAT Registration Number (Optional)",
    vatPlaceholder: "V0000000000",
    documentLabels: [
      "Upload Certificate of Incorporation",
      "Upload TIN Certificate",
    ],
  },
  Nigeria: {
    registrationLabel: "CAC Registration Number",
    registrationPlaceholder: "RC123456",
    taxIdLabel: "TIN",
    taxIdPlaceholder: "00000000-0000",
    vatLabel: "VAT Number (If applicable)",
    vatPlaceholder: "VAT number",
    documentLabels: [
      "Upload CAC Certificate",
      "Upload TIN Confirmation Document",
    ],
  },
  "United States": {
    registrationLabel: "State of Incorporation",
    taxIdLabel: "Employer Identification Number (EIN)",
    taxIdPlaceholder: "12-3456789",
    documentLabels: [
      "Upload Certificate of Formation",
      "Upload EIN Confirmation Letter",
    ],
  },
  "United Kingdom": {
    registrationLabel: "Company Number (Companies House)",
    registrationPlaceholder: "01234567",
    taxIdLabel: "Unique Taxpayer Reference (UTR)",
    taxIdPlaceholder: "12345 67890",
    vatLabel: "VAT Number (If applicable)",
    vatPlaceholder: "GB 123 4567 89",
    documentLabels: [
      "Upload Certificate of Incorporation",
      "Upload UTR Confirmation Document",
    ],
  },
};

export function createOwnerEntry(isAuthorizedSignatory = false) {
  return {
    fullName: "",
    nationality: "",
    dateOfBirth: "",
    role: "",
    ownershipPercent: "",
    isAuthorizedSignatory,
  } satisfies RegisterFormValues["owners"][number];
}

export const registerDefaultValues: DefaultValues<RegisterFormValues> = {
  country: undefined,
  accountType: undefined,
  identityFullName: "",
  dateOfBirth: "",
  phoneNumber: "",
  email: "",
  residentialAddress: "",
  agreement: false,
  ghCard: "",
  nin: "",
  ssn: "",
  nino: "",
  businessName: "",
  businessTradingName: "",
  businessIncorporationDate: "",
  businessType: "",
  businessRegistration: "",
  businessAddress: "",
  businessTaxId: "",
  businessVatNumber: "",
  owners: [createOwnerEntry(true)],
};
