"use client";

import { useForm } from "@tanstack/react-form";
import { zodValidator } from "@tanstack/zod-form-adapter";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useAuthUser } from "@/hooks/useAuth";
import { toast } from "sonner";
import { motion } from "framer-motion";
import { ContributeService } from "@/services/ContributeService";
import { useState } from "react";

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const contributionSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Invalid email address"),
  countryCode: z.string().min(1, "Required"),
  contactNumber: z.string().optional(),
  contributionType: z.string().min(1, "Please select a contribution type"),
  experience: z.string().min(10, "Please describe your experience (min 10 chars)"),
  portfolioLink: z.string().url("Invalid URL").or(z.string().length(0)),
  message: z.string().optional(),
});

export default function ContributionForm() {
  const { user } = useAuthUser();

  const [isSubmitting, setIsSubmitting] = useState(false);

  const form = useForm({
    defaultValues: {
      name: "",
      email: "",
      countryCode: "+880",
      contactNumber: "",
      contributionType: "",
      experience: "",
      portfolioLink: "",
      message: "",
    },
    onSubmit: async ({ value }) => {
      try {
        setIsSubmitting(true);
        const result = await ContributeService.createContribution(value);
        if (result.success) {
          toast.success("Application submitted successfully!");
          form.reset();
        } else {
          toast.error(result.message || "Failed to submit application");
        }
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      } catch (error: any) {
        toast.error(error?.response?.data?.message || "Something went wrong!");
      } finally {
        setIsSubmitting(false);
      }
    },
  });

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5 }}
      className="w-full bg-white dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 rounded-3xl p-8 lg:p-10 shadow-2xl relative overflow-hidden"
    >
        {/* Subtle background element */}
      <div className="absolute top-0 right-0 w-32 h-32 bg-blue-500/5 dark:bg-blue-500/10 rounded-full blur-3xl -mr-16 -mt-16" />

      <div className="relative space-y-8">
        <div>
          <h2 className="text-3xl font-bold tracking-tight text-zinc-900 dark:text-white mb-2">
            Apply to Contribute
          </h2>
          <p className="text-zinc-500 dark:text-zinc-400">
            Share your expertise with the CodeArena community.
          </p>
        </div>

        {!user && (
          <div className="bg-amber-50 dark:bg-amber-950/20 border border-amber-200 dark:border-amber-800/30 p-4 rounded-xl">
            <p className="text-sm text-amber-700 dark:text-amber-400 font-medium">
              Please <a href="/login" className="underline font-bold hover:text-amber-800 dark:hover:text-amber-300">log in</a> to submit the form.
            </p>
          </div>
        )}

        <form
          onSubmit={(e) => {
            e.preventDefault();
            e.stopPropagation();
            form.handleSubmit();
          }}
          className="space-y-6"
        >
          <div className="space-y-4">
            {/* Name */}
            <form.Field name="name">
              {(field) => (
                <div className="space-y-2">
                  <Label htmlFor={field.name} className="dark:text-zinc-300">Name</Label>
                  <Input
                    id={field.name}
                    name={field.name}
                    value={field.state.value}
                    onBlur={field.handleBlur}
                    onChange={(e) => field.handleChange(e.target.value)}
                    placeholder="Your Name"
                    className="h-12 border-zinc-200 dark:border-zinc-800"
                  />
                  {field.state.meta.errors ? (
                    <em className="text-xs text-red-500">{field.state.meta.errors.join(", ")}</em>
                  ) : null}
                </div>
              )}
            </form.Field>

            {/* Email */}
            <form.Field name="email">
              {(field) => (
                <div className="space-y-2">
                  <Label htmlFor={field.name} className="dark:text-zinc-300">Email</Label>
                  <Input
                    id={field.name}
                    name={field.name}
                    type="email"
                    value={field.state.value}
                    onBlur={field.handleBlur}
                    onChange={(e) => field.handleChange(e.target.value)}
                    placeholder="you@example.com"
                    className="h-12 border-zinc-200 dark:border-zinc-800"
                  />
                  {field.state.meta.errors ? (
                    <em className="text-xs text-red-500">{field.state.meta.errors.join(", ")}</em>
                  ) : null}
                </div>
              )}
            </form.Field>

            {/* Contact Info */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <form.Field name="countryCode">
                {(field) => (
                  <div className="space-y-2">
                    <Label className="dark:text-zinc-300">Code</Label>
                    <Select
                      value={field.state.value}
                      onValueChange={(value) => field.handleChange(value)}
                    >
                      <SelectTrigger className="h-12 border-zinc-200 dark:border-zinc-800 w-full dark:bg-zinc-800">
                        <SelectValue placeholder="+91" />
                      </SelectTrigger>
                      <SelectContent className="dark:bg-zinc-900 dark:border-zinc-800">
                        <SelectItem value="+880">Bangladesh (+880)</SelectItem>
                        <SelectItem value="+1">USA (+1)</SelectItem>
                        <SelectItem value="+44">UK (+44)</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                )}
              </form.Field>
              <form.Field name="contactNumber">
                {(field) => (
                  <div className="md:col-span-2 space-y-2">
                    <Label htmlFor={field.name} className="dark:text-zinc-300">Contact Number (Optional)</Label>
                    <Input
                      id={field.name}
                      name={field.name}
                      value={field.state.value}
                      onBlur={field.handleBlur}
                      onChange={(e) => field.handleChange(e.target.value)}
                      placeholder="9876543210"
                      className="h-12 border-zinc-200 dark:border-zinc-800"
                    />
                  </div>
                )}
              </form.Field>
            </div>

            {/* Contribution Type */}
            <form.Field name="contributionType">
              {(field) => (
                <div className="space-y-2">
                  <Label className="dark:text-zinc-300">Contribution Type</Label>
                  <Select
                    value={field.state.value}
                    onValueChange={(value) => field.handleChange(value)}
                  >
                    <SelectTrigger className="h-12 border-zinc-200 dark:border-zinc-800 w-full dark:bg-zinc-800">
                      <SelectValue placeholder="Select Contribution Type" />
                    </SelectTrigger>
                    <SelectContent className="dark:bg-zinc-900 dark:border-zinc-800">
                      <SelectItem value="problem">Add Problems</SelectItem>
                      <SelectItem value="testcases">Create Test Cases</SelectItem>
                      <SelectItem value="sheets">Curate Sheets</SelectItem>
                      <SelectItem value="blogs">Write Blogs</SelectItem>
                      <SelectItem value="roadmaps">Create Roadmaps</SelectItem>
                      <SelectItem value="glossary">Add Glossary Terms</SelectItem>
                      <SelectItem value="other">Other Contributions</SelectItem>
                    </SelectContent>
                  </Select>
                  {field.state.meta.errors ? (
                    <em className="text-xs text-red-500">{field.state.meta.errors.join(", ")}</em>
                  ) : null}
                </div>
              )}
            </form.Field>

            {/* Experience */}
            <form.Field name="experience">
              {(field) => (
                <div className="space-y-2">
                  <Label htmlFor={field.name} className="dark:text-zinc-300">Experience</Label>
                  <Textarea
                    id={field.name}
                    name={field.name}
                    value={field.state.value}
                    onBlur={field.handleBlur}
                    onChange={(e) => field.handleChange(e.target.value)}
                    placeholder="Tell us about your experience or skills"
                    className="min-h-[120px] border-zinc-200 dark:border-zinc-800 resize-none dark:bg-zinc-800"
                  />
                  {field.state.meta.errors ? (
                    <em className="text-xs text-red-500">{field.state.meta.errors.join(", ")}</em>
                  ) : null}
                </div>
              )}
            </form.Field>

            {/* Portfolio Link */}
            <form.Field name="portfolioLink">
              {(field) => (
                <div className="space-y-2">
                  <Label htmlFor={field.name} className="dark:text-zinc-300">Github/Portfolio Link</Label>
                  <Input
                    id={field.name}
                    name={field.name}
                    value={field.state.value}
                    onBlur={field.handleBlur}
                    onChange={(e) => field.handleChange(e.target.value)}
                    placeholder="https://github.com/yourprofile"
                    className="h-12 border-zinc-200 dark:border-zinc-800"
                  />
                  {field.state.meta.errors ? (
                    <em className="text-xs text-red-500">{field.state.meta.errors.join(", ")}</em>
                  ) : null}
                </div>
              )}
            </form.Field>

            {/* Message */}
            <form.Field name="message">
              {(field) => (
                <div className="space-y-2">
                  <Label htmlFor={field.name} className="dark:text-zinc-300">Message (Optional)</Label>
                  <Textarea
                    id={field.name}
                    name={field.name}
                    value={field.state.value}
                    onBlur={field.handleBlur}
                    onChange={(e) => field.handleChange(e.target.value)}
                    placeholder="Anything else you'd like to share?"
                    className="min-h-[100px] border-zinc-200 dark:border-zinc-800 resize-none dark:bg-zinc-800"
                  />
                </div>
              )}
            </form.Field>
          </div>

          <form.Subscribe selector={(state) => [state.canSubmit]}>
            {([canSubmit]) => (
              <Button
                type="submit"
                disabled={!canSubmit || isSubmitting || !user}
                className="w-full h-14 text-lg font-bold bg-linear-to-br from-blue-600 to-indigo-600 text-white rounded-xl shadow-xl hover:shadow-2xl transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed transform active:scale-95 cursor-pointer"
              >
                {isSubmitting ? "Submitting..." : "Submit Application"}
              </Button>
            )}
          </form.Subscribe>
        </form>
      </div>
    </motion.div>
  );
}
