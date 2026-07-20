"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { FormEvent, useLayoutEffect, useMemo, useRef, useState } from "react";
import axios from "axios";
import gsap from "gsap";
import {
  ArrowRight,
  Eye,
  EyeOff,
  Loader2,
  LockKeyhole,
  Mail,
  User,
} from "lucide-react";
import { ApiResponse, AuthUser, LoginResponse, api } from "@/lib/api";
import { useUserStore } from "@/store/useUser";

type AuthMode = "login" | "signup";

type AuthFormProps = {
  mode: AuthMode;
};

type FormState = {
  name: string;
  username: string;
  email: string;
  password: string;
};

const initialForm: FormState = {
  name: "",
  username: "",
  email: "",
  password: "",
};

const authCopy = {
  login: {
    eyebrow: "Welcome back",
    title: "Log in to Orca",
    description:
      "Continue designing cloud infrastructure, validating cost, and deploying diagrams from your workspace.",
    submit: "Log in",
    alternatePrompt: "New to Orca?",
    alternateAction: "Create an account",
    alternateHref: "/signup",
  },
  signup: {
    eyebrow: "Start building",
    title: "Create your Orca account",
    description:
      "Set up your workspace for visual infrastructure design and Terraform-backed deployment workflows.",
    submit: "Create account",
    alternatePrompt: "Already have an account?",
    alternateAction: "Log in",
    alternateHref: "/login",
  },
};

function getErrorMessage(error: unknown) {
  if (axios.isAxiosError<ApiResponse<unknown>>(error)) {
    return (
      error.response?.data?.message ??
      error.message ??
      "Unable to complete this request."
    );
  }

  if (error instanceof Error) return error.message;
  return "Unable to complete this request.";
}

export default function AuthForm({ mode }: AuthFormProps) {
  const router = useRouter();
  const shellRef = useRef<HTMLDivElement>(null);
  const [form, setForm] = useState<FormState>(initialForm);
  const [showPassword, setShowPassword] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [message, setMessage] = useState("");
  const copy = authCopy[mode];
  const { setData, hasHydrated, info } = useUserStore();

  const fields = useMemo(
    () =>
      mode === "signup"
        ? (["name", "username", "email", "password"] as const)
        : (["username", "email", "password"] as const),
    [mode],
  );

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".auth-reveal",
        { opacity: 0, y: 24 },
        {
          opacity: 1,
          y: 0,
          duration: 0.7,
          ease: "power3.out",
          stagger: 0.08,
        },
      );

      gsap.to(".auth-node", {
        y: -10,
        duration: 1.8,
        ease: "sine.inOut",
        repeat: -1,
        yoyo: true,
        stagger: 0.16,
      });
    }, shellRef);

    return () => ctx.revert();
  }, [mode]);

  const updateField = (key: keyof FormState, value: string) => {
    setForm((current) => ({ ...current, [key]: value }));
  };

  const persistSession = (data: LoginResponse) => {
    while (!hasHydrated);

    setData(data.user as any);
    console.log(data.user.verification);
    if (data.user.verification === "UN_VERIFIED")
      router.push("/verify-account");
    else if (data.user.onBoarding === "PENDING") router.push("/onboarding");
    else router.push("/dashboard");
  };

  const submit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsSubmitting(true);
    setMessage("");

    try {
      if (mode === "signup") {
        const response = await api.post<ApiResponse<AuthUser>>(
          "/api/v1/auth/register",
          {
            name: form.name.trim(),
            username: form.username.trim(),
            email: form.email.trim(),
            password: form.password,
          },
        );

        if (response.data.statusCode >= 400) {
          throw new Error(response.data.message);
        }

        router.push("/login");
        return;
      }

      const response = await api.post<ApiResponse<LoginResponse>>(
        "/api/v1/auth/login",
        {
          username: form.username.trim(),
          email: form.email.trim(),
          password: form.password,
        },
      );

      if (response.data.statusCode >= 400 || !response.data.data) {
        throw new Error(response.data.message);
      }

      persistSession(response.data.data);
    } catch (error) {
      setMessage(getErrorMessage(error));
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <main
      ref={shellRef}
      className="min-h-[calc(100vh-96px)] bg-white px-5 py-8 text-black sm:px-8 lg:px-16"
    >
      <section className="mx-auto grid min-h-[calc(100vh-160px)] w-full max-w-7xl items-center gap-10 lg:grid-cols-[1.05fr_0.95fr]">
        <div className="auth-reveal max-w-2xl">
          <div className="inline-flex rounded-full border border-black/10 bg-black px-4 py-2 text-sm font-medium text-white shadow-sm">
            {copy.eyebrow}
          </div>

          <h1 className="mt-7 max-w-xl text-5xl font-extrabold leading-tight text-black md:text-6xl">
            {copy.title}
          </h1>

          <p className="mt-6 max-w-xl text-base leading-8 text-neutral-600 md:text-lg">
            {copy.description}
          </p>

          <div className="mt-10 grid max-w-xl gap-3 sm:grid-cols-3">
            {["Diagram", "Validate", "Deploy"].map((step, index) => (
              <div
                key={step}
                className="auth-reveal rounded-lg border border-neutral-200 bg-neutral-50 p-4"
              >
                <p className="text-sm font-semibold text-neutral-500">
                  0{index + 1}
                </p>
                <p className="mt-2 text-lg font-bold text-black">{step}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="auth-reveal relative">
          <div className="absolute -left-4 top-10 hidden h-16 w-16 rounded-full border border-black bg-white shadow-xl lg:block auth-node" />
          <div className="absolute -right-3 bottom-16 hidden h-20 w-20 rounded-full bg-black shadow-xl lg:block auth-node" />

          <div className="relative overflow-hidden rounded-lg border border-neutral-200 bg-white p-6 shadow-2xl shadow-black/10 sm:p-8">
            <div className="absolute right-0 top-0 h-28 w-28 border-b border-l border-neutral-200 bg-neutral-50" />

            <div className="relative">
              <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-black text-white">
                <LockKeyhole size={22} />
              </div>

              <div className="mt-7">
                <h2 className="text-3xl font-bold text-black">{copy.submit}</h2>
                <p className="mt-2 text-sm leading-6 text-neutral-500">
                  {copy.alternatePrompt}{" "}
                  <Link
                    href={copy.alternateHref}
                    className="font-semibold text-black underline underline-offset-4"
                  >
                    {copy.alternateAction}
                  </Link>
                </p>
              </div>

              <form onSubmit={submit} className="mt-8 space-y-4">
                {fields.map((field) => {
                  const isPassword = field === "password";
                  const Icon =
                    field === "email"
                      ? Mail
                      : field === "password"
                        ? LockKeyhole
                        : User;

                  return (
                    <label key={field} className="block">
                      <span className="mb-2 block text-sm font-semibold capitalize text-neutral-700">
                        {field}
                      </span>
                      <span className="flex items-center gap-3 rounded-lg border border-neutral-200 bg-neutral-50 px-4 py-3 transition focus-within:border-black focus-within:bg-white">
                        <Icon size={18} className="text-neutral-500" />
                        <input
                          value={form[field]}
                          onChange={(event) =>
                            updateField(field, event.target.value)
                          }
                          type={
                            isPassword
                              ? showPassword
                                ? "text"
                                : "password"
                              : field === "email"
                                ? "email"
                                : "text"
                          }
                          required
                          autoComplete={
                            field === "password"
                              ? mode === "signup"
                                ? "new-password"
                                : "current-password"
                              : field
                          }
                          placeholder={
                            field === "email"
                              ? "you@company.com"
                              : field === "password"
                                ? "Enter your password"
                                : `Enter your ${field}`
                          }
                          className="min-w-0 flex-1 bg-transparent text-base text-black outline-none placeholder:text-neutral-400"
                        />
                        {isPassword ? (
                          <button
                            type="button"
                            aria-label={
                              showPassword ? "Hide password" : "Show password"
                            }
                            onClick={() =>
                              setShowPassword((current) => !current)
                            }
                            className="rounded-md p-1 text-neutral-500 transition hover:bg-neutral-200 hover:text-black"
                          >
                            {showPassword ? (
                              <EyeOff size={18} />
                            ) : (
                              <Eye size={18} />
                            )}
                          </button>
                        ) : null}
                      </span>
                    </label>
                  );
                })}

                {message ? (
                  <p className="rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm font-medium text-red-700">
                    {message}
                  </p>
                ) : null}

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="group flex w-full items-center justify-center gap-2 rounded-xl bg-black px-6 py-4 text-base font-semibold text-white transition hover:-translate-y-0.5 hover:bg-neutral-800 disabled:cursor-not-allowed disabled:opacity-70"
                >
                  {isSubmitting ? (
                    <Loader2 size={19} className="animate-spin" />
                  ) : (
                    <>
                      {copy.submit}
                      <ArrowRight
                        size={19}
                        className="transition group-hover:translate-x-1"
                      />
                    </>
                  )}
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
