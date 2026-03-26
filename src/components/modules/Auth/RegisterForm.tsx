"use client";
import React, { useState } from "react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import {
  IconBrandGithub,
  IconBrandGoogle,
} from "@tabler/icons-react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { registerAction } from "@/app/(auth)/register/_action";
import { RegisterInput, registerSchema } from "@/validation/auth.validation";
import { useForm } from "@tanstack/react-form";
import Link from "next/link";
import { toast } from "sonner";

export default function RegisterForm() {
  const queryClient = useQueryClient();
  const [serverError, setServerError] = useState<string | null>(null);
  const { mutateAsync, isPending } = useMutation({
    mutationFn: (payload: RegisterInput) => registerAction(payload),
  });

  const form = useForm({
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      password: "",
    },

    onSubmit: async ({ value }) => {
      setServerError(null);
      try {
        const result = await mutateAsync(value);
        if (result && !result.success) {
          setServerError(result.message);
          return;
        }
        toast.success("Account created successfully! Please log in.");
        queryClient.invalidateQueries({ queryKey: ["user"] });
      } catch (error) {
        console.log(error);
        setServerError("An unexpected error occurred. Please try again.");
      }
    },
  });

  return (
    <div className="shadow-input mx-auto w-full max-w-md rounded-none bg-white p-4 md:rounded-2xl md:p-8 dark:bg-black">
      <h2 className="text-xl font-bold text-neutral-800 dark:text-neutral-200">
        Welcome to CodeArena
      </h2>
      <p className="mt-2 max-w-sm text-sm text-neutral-600 dark:text-neutral-300">
        Register to CodeArena to access your dashboard and solve problems.
      </p>

      <form
        className="my-8"
        method="POST"
        action="#"
        noValidate
        onSubmit={(e) => {
          e.preventDefault();
          e.stopPropagation();
          form.handleSubmit();
        }}
      >
        <div className="mb-4 flex flex-col space-y-2 md:flex-row md:space-y-0 md:space-x-2">
          <form.Field
            name="firstName"
            validators={{ onChange: registerSchema.shape.firstName }}
          >
            {(field) => (
              <LabelInputContainer>
                <Label htmlFor="firstname">First name</Label>
                <Input
                  id="firstname"
                  placeholder="Tyler"
                  type="text"
                  value={field.state.value}
                  onBlur={field.handleBlur}
                  onChange={(e) => field.handleChange(e.target.value)}
                />
                {field.state.meta.errors.length > 0 && (
                  <p className="text-xs text-red-500 mt-1">
                    {field.state.meta.errors
                      .map((err) =>
                        typeof err === "string"
                          ? err
                          : (err as { message: string }).message,
                      )
                      .join(", ")}
                  </p>
                )}
              </LabelInputContainer>
            )}
          </form.Field>

          <form.Field
            name="lastName"
            validators={{ onChange: registerSchema.shape.lastName }}
          >
            {(field) => (
              <LabelInputContainer>
                <Label htmlFor="lastname">Last name</Label>
                <Input
                  id="lastname"
                  placeholder="Durden"
                  type="text"
                  value={field.state.value}
                  onBlur={field.handleBlur}
                  onChange={(e) => field.handleChange(e.target.value)}
                />
                {field.state.meta.errors.length > 0 && (
                  <p className="text-xs text-red-500 mt-1">
                    {field.state.meta.errors
                      .map((err) =>
                        typeof err === "string"
                          ? err
                          : (err as { message: string }).message,
                      )
                      .join(", ")}
                  </p>
                )}
              </LabelInputContainer>
            )}
          </form.Field>
        </div>

        <form.Field
          name="email"
          validators={{ onChange: registerSchema.shape.email }}
        >
          {(field) => (
            <LabelInputContainer className="mb-4">
              <Label htmlFor="email">Email Address</Label>
              <Input
                id="email"
                placeholder="projectmayhem@fc.com"
                type="email"
                value={field.state.value}
                onBlur={field.handleBlur}
                onChange={(e) => field.handleChange(e.target.value)}
              />
              {field.state.meta.errors.length > 0 && (
                <p className="text-xs text-red-500 mt-1">
                  {field.state.meta.errors
                    .map((err) =>
                      typeof err === "string"
                        ? err
                        : (err as { message: string }).message,
                    )
                    .join(", ")}
                </p>
              )}
            </LabelInputContainer>
          )}
        </form.Field>

        <form.Field
          name="password"
          validators={{ onChange: registerSchema.shape.password }}
        >
          {(field) => (
            <LabelInputContainer className="mb-4">
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                placeholder="••••••••"
                type="password"
                value={field.state.value}
                onBlur={field.handleBlur}
                onChange={(e) => field.handleChange(e.target.value)}
              />
              {field.state.meta.errors.length > 0 && (
                <p className="text-xs text-red-500 mt-1">
                  {field.state.meta.errors
                    .map((err) =>
                      typeof err === "string"
                        ? err
                        : (err as { message: string }).message,
                    )
                    .join(", ")}
                </p>
              )}
            </LabelInputContainer>
          )}
        </form.Field>

        {serverError && (
          <p className="text-sm text-red-500 mb-4 text-center">{serverError}</p>
        )}

        <button
          className="group/btn relative block h-10 w-full rounded-md bg-linear-to-br from-black to-neutral-600 font-medium text-white shadow-[0px_1px_0px_0px_#ffffff40_inset,0px_-1px_0px_0px_#ffffff40_inset] dark:bg-zinc-800 dark:from-zinc-900 dark:to-zinc-900 dark:shadow-[0px_1px_0px_0px_#27272a_inset,0px_-1px_0px_0px_#27272a_inset] disabled:opacity-50"
          type="submit"
          disabled={isPending}
        >
          {isPending ? "Signing up..." : "Sign up →"}
          <BottomGradient />
        </button>

        <div className="my-8 h-[1px] w-full bg-gradient-to-r from-transparent via-neutral-300 to-transparent dark:via-neutral-700" />

        <div className="flex flex-col space-y-4">
          <button
            className="group/btn shadow-input relative flex h-10 w-full items-center justify-start space-x-2 rounded-md bg-gray-50 px-4 font-medium text-black dark:bg-zinc-900 dark:shadow-[0px_0px_1px_1px_#262626]"
            type="button"
          >
            <IconBrandGithub className="h-4 w-4 text-neutral-800 dark:text-neutral-300" />
            <span className="text-sm text-neutral-700 dark:text-neutral-300">
              GitHub
            </span>
            <BottomGradient />
          </button>
          <button
            className="group/btn shadow-input relative flex h-10 w-full items-center justify-start space-x-2 rounded-md bg-gray-50 px-4 font-medium text-black dark:bg-zinc-900 dark:shadow-[0px_0px_1px_1px_#262626]"
            type="button"
          >
            <IconBrandGoogle className="h-4 w-4 text-neutral-800 dark:text-neutral-300" />
            <span className="text-sm text-neutral-700 dark:text-neutral-300">
              Google
            </span>
            <BottomGradient />
          </button>
        </div>
      </form>
      <div className="flex gap-3">
        <p>Already have an account?</p>
        <Link href="/login">Login</Link>
      </div>
    </div>
  );
}

const BottomGradient = () => {
  return (
    <>
      <span className="absolute inset-x-0 -bottom-px block h-px w-full bg-linear-to-r from-transparent via-cyan-500 to-transparent opacity-0 transition duration-500 group-hover/btn:opacity-100" />
      <span className="absolute inset-x-10 -bottom-px mx-auto block h-px w-1/2 bg-linear-to-r from-transparent via-indigo-500 to-transparent opacity-0 blur-sm transition duration-500 group-hover/btn:opacity-100" />
    </>
  );
};

const LabelInputContainer = ({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) => {
  return (
    <div className={cn("flex w-full flex-col space-y-2", className)}>
      {children}
    </div>
  );
};
