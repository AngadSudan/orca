"use client";

import { api } from "@/lib/api";
import { useUserStore } from "@/store/useUser";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import Fallback from "./Fallback";
import bg from "@/../public/bg-vector.jpg";
import VerificationForm from "./VerificationForm";
import Loading from "../general/Loading";
import { VerificationStatus } from "@/lib/type";
function VerifyAccount() {
  const router = useRouter();
  const [currState, setcurrState] = useState<
    "LOADING" | "FALLBACK" | "PENDING"
  >("LOADING");
  const [otp, setOtp] = useState("");
  const { info, setData, hasHydrated } = useUserStore();

  async function submitVerification(otp: string) {
    try {
      if (!hasHydrated) return;
      if (info === null) return;

      const verificationStatus = await api.post("/api/v1/auth/verify-user", {
        email: info.email,
        otp: otp,
      });

      if (verificationStatus.status > 200) {
        verificationSuccess();
      } else {
        verificationFailed();
      }
    } catch (error) {
      console.log(error);
      setcurrState("FALLBACK");
    }
  }
  async function verificationSuccess() {
    toast.success("Verification Successful");
    router.push("/onboarding");
    //@ts-ignore
    setData({ ...info, verification: VerificationStatus.VERIFIED });
  }
  async function verificationFailed() {
    toast.error("please wait some time before verification");
    setcurrState("FALLBACK");
  }

  useEffect(() => {
    async function triggerVerification() {
      try {
        if (!hasHydrated) return;
        if (info === null) return;

        const verificationStatus = await api.post(
          "/api/v1/auth/request-verification",
          {
            email: info.email,
          },
        );

        if (verificationStatus.status > 200) {
          toast.success("Verification Successful");
          setcurrState("PENDING");
        } else {
          toast.error("please wait some time before verification");
          setcurrState("FALLBACK");
        }
      } catch (error) {
        console.log(error);
        setcurrState("FALLBACK");
      }
    }

    triggerVerification();
  }, [info, hasHydrated]);
  return (
    <div
      className="h-screen w-full flex justify-center items-center"
      style={{
        backgroundImage: `url(${bg.src})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      }}
    >
      {currState === "FALLBACK" && <Fallback />}
      {currState === "PENDING" && (
        <VerificationForm
          otp={otp}
          //@ts-ignore
          isLoading={currState === "LOADING"}
          setOtp={setOtp}
          onSubmit={async (otp: string) => await submitVerification(otp)}
          onSuccess={verificationSuccess}
          onFailure={verificationFailed}
        />
      )}

      {currState === "LOADING" && <Loading />}
    </div>
  );
}

export default VerifyAccount;
