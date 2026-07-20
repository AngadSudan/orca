"use client";

import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { Building2 } from "lucide-react";
import { useUserStore } from "@/store/useUser";
import { api } from "@/lib/api";
import { OnBoardingStatus } from "@/lib/type";
import OrganizationForm from "./OrganizationForm";

export default function Onboarding() {
  const { info, setData, hasHydrated } = useUserStore();

  const [orgName, setOrgName] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (hasHydrated && info?.name && !orgName) {
      setOrgName(`${info.name}'s Organization`);
    }
  }, [hasHydrated, info, orgName]);

  async function submitOrganization(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    if (!orgName.trim()) {
      toast.error("Please enter an organization name.");
      return;
    }

    setLoading(true);

    try {
      await api.post("/api/v1/auth/complete-onboarding", {
        name: orgName,
      });

      //@ts-ignore
      setData({ ...info, onBoarding: OnBoardingStatus.COMPLETED });
      toast.success("Organization created!");
    } catch (error) {
      console.error(error);
      toast.error("Failed to create organization.");
    } finally {
      setLoading(false);
    }
  }

  if (!hasHydrated) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-gray-50 px-6">
        <div className="w-full max-w-lg rounded-xl border border-gray-200 bg-white p-8 shadow-lg">
          <div className="animate-pulse">
            <div className="h-6 w-48 rounded bg-gray-200" />
            <div className="mt-4 h-4 w-72 rounded bg-gray-200" />
            <div className="mt-8 h-12 rounded-lg bg-gray-200" />
            <div className="mt-6 h-10 rounded-md bg-gray-200" />
          </div>
        </div>
      </main>
    );
  }

  return (
    <main className="flex min-h-screen items-center justify-center bg-gray-50 px-6">
      <div className="w-full max-w-lg rounded-xl border border-gray-200 bg-white p-8 shadow-lg">
        <div className="flex h-12 w-12 items-center justify-center rounded-lg border border-gray-200 bg-gray-50">
          <Building2 className="h-6 w-6 text-gray-700" />
        </div>

        <h1 className="mt-6 text-2xl font-semibold tracking-tight text-gray-900">
          Create your organization
        </h1>

        <p className="mt-3 text-sm leading-6 text-gray-600">
          Every workspace starts with an organization. You can always rename it
          later or invite teammates after setup.
        </p>

        <OrganizationForm
          value={orgName}
          loading={loading}
          onChange={setOrgName}
          onSubmit={submitOrganization}
        />
      </div>
    </main>
  );
}
