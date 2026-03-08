"use client";

import { useFieldArray, useFormContext } from "react-hook-form";
import { Button } from "@/components/ui/button";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { type RegisterFormValues } from "@/lib/schemas";
import { type RegisterStepProps } from "./register-config";

export function DirectorsOwnersStep({
  isFirstStep,
  isLastStep,
  isValid,
  onBack,
  submitted,
}: RegisterStepProps) {
  const { control } = useFormContext<RegisterFormValues>();
  const owners = useFieldArray({
    control,
    name: "owners",
  });

  return (
    <div className="space-y-6">
      {owners.fields.map((owner, index) => (
        <div key={owner.id} className="rounded-xl border border-border/70 p-4">
          <div className="mb-4 flex items-center justify-between">
            <div>
              <p className="text-sm font-semibold text-foreground">
                Beneficial owner {index + 1}
              </p>
              <p className="text-xs text-muted-foreground">
                Provide director or ownership details.
              </p>
            </div>
            {owners.fields.length > 1 && (
              <Button
                type="button"
                variant="ghost"
                className="text-xs"
                onClick={() => owners.remove(index)}
              >
                Remove
              </Button>
            )}
          </div>
          <div className="grid gap-4 md:grid-cols-2">
            <FormField
              control={control}
              name={`owners.${index}.fullName`}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Full name</FormLabel>
                  <FormControl>
                    <Input placeholder="Director name" {...field} />
                  </FormControl>
                </FormItem>
              )}
            />
            <FormField
              control={control}
              name={`owners.${index}.role`}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Role / title</FormLabel>
                  <FormControl>
                    <Input placeholder="Managing director" {...field} />
                  </FormControl>
                </FormItem>
              )}
            />
            <FormField
              control={control}
              name={`owners.${index}.ownershipPercent`}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Ownership percentage</FormLabel>
                  <FormControl>
                    <Input placeholder="e.g. 35%" {...field} />
                  </FormControl>
                </FormItem>
              )}
            />
            <FormField
              control={control}
              name={`owners.${index}.idNumber`}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Director ID number</FormLabel>
                  <FormControl>
                    <Input placeholder="ID number" {...field} />
                  </FormControl>
                </FormItem>
              )}
            />
          </div>
        </div>
      ))}

      <Button
        type="button"
        variant="secondary"
        onClick={() =>
          owners.append({
            fullName: "",
            role: "",
            ownershipPercent: "",
            idNumber: "",
          })
        }
      >
        Add another owner
      </Button>

      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
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
