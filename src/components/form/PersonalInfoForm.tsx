import React from "react";
import { useTranslation } from "react-i18next";
import { useResumeContext } from "@/contexts/ResumeContext";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import QRCodeLinkForm from "./QRCodeLinkForm";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useEffect } from "react";

// Validation constants
const MAX_LENGTH_NAME = 40;
const MAX_LENGTH_STANDARD = 64;
const MAX_LENGTH_SUMMARY = 280;

// Define the schema with Zod
const personalInfoSchema = z.object({
  name: z.string().max(MAX_LENGTH_NAME, { message: "Name must be less than 40 characters" }).optional(),
  email: z
    .string()
    .max(MAX_LENGTH_STANDARD, { message: "Email must be less than 64 characters" })
    .email({ message: "Invalid email format" })
    .or(z.literal("")),
  phone: z
    .string()
    .regex(/^[+]?[(]?[0-9]{1,4}[)]?[-\s.]?[0-9]{1,4}[-\s.]?[0-9]{1,9}$/, {
      message: "Invalid phone number format",
    })
    .or(z.literal("")),
  jobTitle: z
    .string()
    .max(MAX_LENGTH_STANDARD, { message: "Job title must be less than 64 characters" })
    .or(z.literal("")),
  address: z
    .string()
    .max(MAX_LENGTH_STANDARD, { message: "Address must be less than 64 characters" })
    .or(z.literal("")),
  summary: z
    .string()
    .max(MAX_LENGTH_SUMMARY, { message: "Summary must be less than 280 characters" })
    .or(z.literal("")),
});

// Infer the type from the schema
type PersonalInfoFormValues = z.infer<typeof personalInfoSchema>;

const PersonalInfoForm: React.FC = () => {
  const { t } = useTranslation();
  const { resumeData, updatePersonalInfo } = useResumeContext();
  const { personalInfo } = resumeData;

  // Initialize React Hook Form with Zod resolver
  const {
    register,
    formState: { errors },
    setValue,
    watch,
  } = useForm<PersonalInfoFormValues>({
    resolver: zodResolver(personalInfoSchema),
    defaultValues: personalInfo,
    mode: "onChange",
  });

  // Watch the summary field to display character count
  const summaryValue = watch("summary") || "";

  // Update form values when resumeData changes
  useEffect(() => {
    setValue("name", personalInfo.name || "");
    setValue("email", personalInfo.email || "");
    setValue("phone", personalInfo.phone || "");
    setValue("jobTitle", personalInfo.jobTitle || "");
    setValue("address", personalInfo.address || "");
    setValue("summary", personalInfo.summary || "");
  }, [personalInfo, setValue]);

  // Handle field changes with validation
  const onFieldChange = (name: keyof PersonalInfoFormValues, value: string) => {
    // Enforce max length restrictions
    let validatedValue = value;

    // Apply max length validation
    if (name === "summary" && value.length > MAX_LENGTH_SUMMARY) {
      validatedValue = value.slice(0, MAX_LENGTH_SUMMARY);
    } else if (["name", "email", "jobTitle", "address"].includes(name) && value.length > MAX_LENGTH_STANDARD) {
      validatedValue = value.slice(0, MAX_LENGTH_STANDARD);
    }

    // Specific validation for phone to only allow numbers, +, (), -, and spaces
    if (name === "phone") {
      const phoneRegex = /^[0-9+() -]*$/;
      if (!phoneRegex.test(validatedValue)) {
        return; // Don't update if invalid characters
      }
    }

    // Only update if we have a valid value
    updatePersonalInfo({ [name]: validatedValue });
  };

  // Handle phone input to restrict to numbers, +, (), -, and spaces
  const handlePhoneInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    const phoneRegex = /^[0-9+() -]*$/;

    if (!phoneRegex.test(value)) {
      e.preventDefault();
      return;
    }

    onFieldChange("phone", value);
  };

  // Update the onInputChange function to handle both input and textarea elements
  const onInputChange = (e: React.FormEvent<HTMLInputElement | HTMLTextAreaElement>, maxLength: number) => {
    const element = e.target as HTMLInputElement | HTMLTextAreaElement;
    if (element.value.length > maxLength) {
      element.value = element.value.slice(0, maxLength);
    }
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>{t("form.personalInfo")}</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="name">{t("form.name")}</Label>
            <Input
              id="name"
              maxLength={MAX_LENGTH_STANDARD}
              {...register("name")}
              placeholder={t("form.placeholders.name")}
              onChange={(e) => onFieldChange("name", e.target.value)}
              onInput={(e: React.ChangeEvent<HTMLInputElement>) => onInputChange(e, MAX_LENGTH_NAME)}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="email">{t("form.email")}</Label>
            <Input
              id="email"
              type="email"
              maxLength={MAX_LENGTH_STANDARD}
              {...register("email")}
              placeholder={t("form.placeholders.email")}
              className={errors.email ? "border-red-500" : ""}
              onChange={(e) => onFieldChange("email", e.target.value)}
              onInput={(e: React.ChangeEvent<HTMLInputElement>) => onInputChange(e, MAX_LENGTH_STANDARD)}
            />
            {errors.email && <p className="text-sm text-red-500">{errors.email.message}</p>}
          </div>

          <div className="space-y-2">
            <Label htmlFor="phone">{t("form.phone")}</Label>
            <Input
              id="phone"
              type="tel"
              {...register("phone")}
              placeholder={t("form.placeholders.phone")}
              className={errors.phone ? "border-red-500" : ""}
              onChange={handlePhoneInput}
              inputMode="tel"
              onInput={(e: React.ChangeEvent<HTMLInputElement>) => onInputChange(e, MAX_LENGTH_STANDARD)}
            />
            {errors.phone && <p className="text-sm text-red-500">{errors.phone.message}</p>}
          </div>

          <div className="space-y-2">
            <Label htmlFor="jobTitle">{t("form.jobTitle")}</Label>
            <Input
              id="jobTitle"
              maxLength={MAX_LENGTH_STANDARD}
              {...register("jobTitle")}
              placeholder={t("form.placeholders.jobTitle")}
              className={errors.jobTitle ? "border-red-500" : ""}
              onChange={(e) => onFieldChange("jobTitle", e.target.value)}
              onInput={(e: React.ChangeEvent<HTMLInputElement>) => onInputChange(e, MAX_LENGTH_STANDARD)}
            />
            {errors.jobTitle && <p className="text-sm text-red-500">{errors.jobTitle.message}</p>}
          </div>

          <div className="space-y-2">
            <Label htmlFor="address">{t("form.address")}</Label>
            <Input
              id="address"
              maxLength={MAX_LENGTH_STANDARD}
              {...register("address")}
              placeholder={t("form.placeholders.address")}
              className={errors.address ? "border-red-500" : ""}
              onChange={(e) => onFieldChange("address", e.target.value)}
              onInput={(e: React.ChangeEvent<HTMLInputElement>) => onInputChange(e, MAX_LENGTH_STANDARD)}
            />
            {errors.address && <p className="text-sm text-red-500">{errors.address.message}</p>}
          </div>

          <div className="space-y-2">
            <Label htmlFor="summary">{t("form.summary")}</Label>
            <Textarea
              id="summary"
              maxLength={MAX_LENGTH_SUMMARY}
              {...register("summary")}
              placeholder={t("form.placeholders.summary")}
              rows={4}
              className={errors.summary ? "border-red-500" : ""}
              onChange={(e) => onFieldChange("summary", e.target.value)}
              onInput={(e) => onInputChange(e, MAX_LENGTH_SUMMARY)}
            />
            {errors.summary && <p className="text-sm text-red-500">{errors.summary.message}</p>}
            <p className="text-xs text-gray-500 text-right">
              {summaryValue.length}/{MAX_LENGTH_SUMMARY}
            </p>
          </div>
        </CardContent>
      </Card>

      {/* QR Code Link Form */}
      <QRCodeLinkForm />
    </div>
  );
};

export default PersonalInfoForm;
