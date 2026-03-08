import { z } from "zod";

const countryOptions = [
  "Ghana",
  "Nigeria",
  "United Kingdom",
  "United States",
] as const;

const accountTypeOptions = ["Individual", "Registered Business"] as const;

const countrySchema = z
  .string()
  .min(1, "Select a country")
  .pipe(
    z.enum(countryOptions, {
      error: "Select a country",
    }),
  );

const accountTypeSchema = z
  .string()
  .min(1, "Select an account type")
  .pipe(
    z.enum(accountTypeOptions, {
      error: "Select an account type",
    }),
  );

const agreementSchema = z.boolean().refine((value) => value, {
  message: "You must confirm the declaration",
});

const step1Schema = z.object({
  country: countrySchema,
  accountType: accountTypeSchema,
});

const step2Schema = z
  .object({
    country: countrySchema,
    identityFullName: z.string().min(1, "Full name is required"),
    dateOfBirth: z.string().min(1, "Date of birth is required"),
    phoneNumber: z
      .string()
      .min(1, "Phone number is required")
      .regex(/^[+]?[0-9()\-\s]{7,20}$/, "Enter a valid phone number"),
    email: z
      .string()
      .min(1, "Email address is required")
      .email("Enter a valid email address"),
    residentialAddress: z
      .string()
      .min(1, "Residential address is required"),
    agreement: agreementSchema,
    ghCard: z.string().optional(),
    nin: z.string().optional(),
    ssn: z.string().optional(),
    nino: z.string().optional(),
  })
  .superRefine((values, ctx) => {
    const ghCard = values.ghCard?.trim() ?? "";
    const nin = values.nin?.trim() ?? "";
    const ssn = values.ssn?.trim() ?? "";
    const nino = values.nino?.trim() ?? "";

    switch (values.country) {
      case "Ghana":
        if (!ghCard) {
          ctx.addIssue({
            code: z.ZodIssueCode.custom,
            path: ["ghCard"],
            message: "Ghana Card number is required",
          });
        }
        break;
      case "Nigeria":
        if (!nin) {
          ctx.addIssue({
            code: z.ZodIssueCode.custom,
            path: ["nin"],
            message: "NIN is required",
          });
        }
        break;
      case "United States":
        if (!/^\d{4}$/.test(ssn)) {
          ctx.addIssue({
            code: z.ZodIssueCode.custom,
            path: ["ssn"],
            message: "Enter the last 4 digits of SSN",
          });
        }
        break;
      case "United Kingdom":
        if (!nino) {
          ctx.addIssue({
            code: z.ZodIssueCode.custom,
            path: ["nino"],
            message: "National Insurance Number is required",
          });
        }
        break;
      default:
        break;
    }
  });

const step3Schema = z.object({
  businessName: z.string().min(1, "Business name is required"),
  businessTradingName: z.string().optional(),
  businessIncorporationDate: z
    .string()
    .min(1, "Date of incorporation is required"),
  businessType: z.string().min(1, "Business type is required"),
  businessRegistration: z.string().min(1, "Registration number is required"),
  businessAddress: z.string().min(1, "Address is required"),
  businessTaxId: z.string().min(1, "Tax ID is required"),
  businessVatNumber: z.string().optional(),
});

const ownerSchema = z.object({
  fullName: z.string().min(1, "Name is required"),
  role: z.string().min(1, "Role is required"),
  ownershipPercent: z.string().min(1, "Ownership percentage is required"),
  idNumber: z.string().min(1, "ID number is required"),
});

const step4Schema = z.object({
  owners: z.array(ownerSchema).min(1, "Add at least one owner"),
});

const registerSchema = step1Schema
  .merge(step2Schema)
  .merge(step3Schema)
  .merge(step4Schema);

const stepSchemas = [step1Schema, step2Schema, step3Schema, step4Schema];

type Owner = z.infer<typeof ownerSchema>;
type RegisterFormValues = z.input<typeof registerSchema>;
type RegisterFormData = z.output<typeof registerSchema>;

export {
  accountTypeOptions,
  countryOptions,
  registerSchema,
  stepSchemas,
  step1Schema,
  step2Schema,
  step3Schema,
  step4Schema,
};
export type { Owner, RegisterFormData, RegisterFormValues };
