"use client";

import { useEffect } from "react";
import {
  useFieldArray,
  useFormContext,
  useFormState,
  useWatch,
} from "react-hook-form";
import { Plus, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ownerRoleOptions, type RegisterFormValues } from "@/lib/schemas";
import { createOwnerEntry, type RegisterStepProps } from "./register-config";
import styles from "../register-theme.module.css";

export function DirectorsOwnersStep({
  isFirstStep,
  isLastStep,
  isValid,
  onBack,
  submitted,
}: RegisterStepProps) {
  const { control, setValue } = useFormContext<RegisterFormValues>();
  const owners = useFieldArray({
    control,
    name: "owners",
  });
  const watchedOwners = useWatch({
    control,
    name: "owners",
    defaultValue: [],
  });
  const { errors } = useFormState({
    control,
    name: "owners",
  });

  const selectedSignatoryCount = watchedOwners.filter(
    (owner) => owner?.isAuthorizedSignatory,
  ).length;

  useEffect(() => {
    if (!watchedOwners.length || selectedSignatoryCount === 1) {
      return;
    }

    const fallbackSelectedIndex = watchedOwners.findIndex(
      (owner) => owner?.isAuthorizedSignatory,
    );

    setValue(
      "owners",
      watchedOwners.map((owner, index) => ({
        ...owner,
        isAuthorizedSignatory:
          index === (fallbackSelectedIndex >= 0 ? fallbackSelectedIndex : 0),
      })),
      {
        shouldDirty: fallbackSelectedIndex >= 0,
        shouldValidate: true,
      },
    );
  }, [selectedSignatoryCount, setValue, watchedOwners]);

  const totalOwnership = watchedOwners.reduce(
    (sum, owner) => sum + (Number(owner?.ownershipPercent) || 0),
    0,
  );
  const selectedSignatoryId =
    owners.fields[
      watchedOwners.findIndex((owner) => owner?.isAuthorizedSignatory)
    ]?.id ?? "";
  const ownersErrorMessage =
    !Array.isArray(errors.owners) && typeof errors.owners?.message === "string"
      ? errors.owners.message
      : undefined;

  const handleAuthorizedSignatoryChange = (selectedOwnerId: string) => {
    setValue(
      "owners",
      watchedOwners.map((owner, index) => ({
        ...owner,
        isAuthorizedSignatory: owners.fields[index]?.id === selectedOwnerId,
      })),
      {
        shouldDirty: true,
        shouldValidate: true,
      },
    );
  };

  return (
    <div className="flex flex-col h-full animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="space-y-2 mb-8">
        <h2 className="text-3xl font-bold tracking-tight text-foreground">
          Directors &amp; Owners
        </h2>
        <p className="text-muted-foreground">
          Add all directors and beneficial owners, including anyone holding 25%
          or more of the business.
        </p>
      </div>

      <div className="flex-1 overflow-y-auto pr-2 pb-4 space-y-6">
        {totalOwnership > 100 ? (
          <div className="rounded-lg border border-destructive/20 bg-destructive/10 p-3 text-sm font-medium text-destructive">
            Total ownership percentage cannot exceed 100%. Current total:{" "}
            {totalOwnership}%
          </div>
        ) : null}

        {owners.fields.map((owner, index) => (
          <div
            key={owner.id}
            className="relative space-y-4 rounded-xl border border-border bg-muted/20 p-5"
          >
            <div className="mb-2 flex items-center justify-between">
              <div>
                <p className="font-semibold text-foreground">
                  Person {index + 1}
                </p>
                <p className="text-xs text-muted-foreground">
                  Director or beneficial owner details.
                </p>
              </div>
              {owners.fields.length > 1 ? (
                <Button
                  type="button"
                  variant="ghost"
                  size="icon-sm"
                  className="text-red-500 hover:bg-red-50 hover:text-red-700"
                  onClick={() => owners.remove(index)}
                >
                  <Trash2 className="size-4" />
                  <span className="sr-only">Remove person {index + 1}</span>
                </Button>
              ) : null}
            </div>

            <div className="grid gap-4 md:grid-cols-2">
              <FormField
                control={control}
                name={`owners.${index}.fullName`}
                render={({ field }) => (
                  <FormItem className="space-y-2 md:col-span-2">
                    <FormLabel>Full Name</FormLabel>
                    <FormControl>
                      <Input placeholder="Jane Smith" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={control}
                name={`owners.${index}.nationality`}
                render={({ field }) => (
                  <FormItem className="space-y-2">
                    <FormLabel>Nationality</FormLabel>
                    <FormControl>
                      <Input placeholder="e.g. Ghanaian" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={control}
                name={`owners.${index}.dateOfBirth`}
                render={({ field }) => (
                  <FormItem className="space-y-2">
                    <FormLabel>Date of Birth</FormLabel>
                    <FormControl>
                      <Input type="date" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={control}
                name={`owners.${index}.role`}
                render={({ field }) => (
                  <FormItem className="space-y-2">
                    <FormLabel>Role</FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      value={field.value || undefined}
                    >
                      <FormControl>
                        <SelectTrigger className="w-full">
                          <SelectValue placeholder="Select role" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent className={styles.selectContent}>
                        {ownerRoleOptions.map((role) => (
                          <SelectItem key={role} value={role}>
                            {role}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={control}
                name={`owners.${index}.ownershipPercent`}
                render={({ field }) => (
                  <FormItem className="space-y-2">
                    <FormLabel>Ownership Percentage (%)</FormLabel>
                    <FormControl>
                      <Input
                        type="number"
                        min="0"
                        max="100"
                        step="0.01"
                        inputMode="decimal"
                        placeholder="0 - 100"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </div>
        ))}

        <Button
          type="button"
          variant="outline"
          className="w-full border-2 border-dashed py-6 text-muted-foreground hover:border-primary/50 hover:text-primary"
          onClick={() => owners.append(createOwnerEntry())}
        >
          <Plus className="size-4" />
          Add Another Person
        </Button>

        <div className="space-y-4 border-t border-border pt-6">
          <Label className="text-base text-foreground">
            Who is the primary Authorized Signatory?
          </Label>
          <RadioGroup
            value={selectedSignatoryId}
            onValueChange={handleAuthorizedSignatoryChange}
            className="space-y-2"
          >
            {owners.fields.map((owner, index) => (
              <Label
                key={owner.id}
                htmlFor={`auth-${owner.id}`}
                className="flex cursor-pointer items-center gap-3 rounded-lg border border-border bg-card p-3"
              >
                <RadioGroupItem value={owner.id} id={`auth-${owner.id}`} />
                <div className="flex-1">
                  <p className="font-medium text-foreground">
                    {watchedOwners[index]?.fullName?.trim() ||
                      `Person ${index + 1}`}
                  </p>
                  <p className="text-sm font-normal text-muted-foreground">
                    {watchedOwners[index]?.role?.trim() || "Role not selected"}
                  </p>
                </div>
              </Label>
            ))}
          </RadioGroup>
          {ownersErrorMessage &&
          ownersErrorMessage !==
            "Total ownership percentage cannot exceed 100%." ? (
            <p className="text-sm text-destructive">{ownersErrorMessage}</p>
          ) : null}
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
