import { useEffect, useRef } from "react";

interface VerificationFormProps {
  otp: string;
  isLoading: boolean;
  setOtp: React.Dispatch<React.SetStateAction<string>>;
  onSubmit: (otp: string) => Promise<void>;
  onSuccess: () => Promise<void>;
  onFailure: () => Promise<void>;
}

const OTP_LENGTH = 6;

export default function VerificationForm({
  otp,
  setOtp,
  onSubmit,
  isLoading,
  onSuccess,
  onFailure,
}: VerificationFormProps) {
  const inputs = useRef<(HTMLInputElement | null)[]>([]);

  useEffect(() => {
    inputs.current[0]?.focus();
  }, []);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    if (otp.length !== OTP_LENGTH) return;

    try {
      await onSubmit(otp);
      await onSuccess();
    } catch {
      await onFailure();
    }
  }

  function handleChange(index: number, value: string) {
    const digit = value.replace(/\D/g, "").slice(-1);

    const next = otp.split("");
    next[index] = digit;

    const newOtp = next.join("").trimEnd();

    setOtp(newOtp);

    if (digit && index < OTP_LENGTH - 1) {
      inputs.current[index + 1]?.focus();
    }
  }

  function handleKeyDown(
    e: React.KeyboardEvent<HTMLInputElement>,
    index: number,
  ) {
    if (e.key === "Backspace") {
      if (otp[index]) {
        const next = otp.split("");
        next[index] = "";
        setOtp(next.join(""));
      } else if (index > 0) {
        inputs.current[index - 1]?.focus();
      }
    }

    if (e.key === "ArrowLeft" && index > 0) {
      inputs.current[index - 1]?.focus();
    }

    if (e.key === "ArrowRight" && index < OTP_LENGTH - 1) {
      inputs.current[index + 1]?.focus();
    }
  }

  function handlePaste(e: React.ClipboardEvent<HTMLInputElement>) {
    e.preventDefault();

    const pasted = e.clipboardData
      .getData("text")
      .replace(/\D/g, "")
      .slice(0, OTP_LENGTH);

    setOtp(pasted);

    const last = Math.min(pasted.length, OTP_LENGTH) - 1;
    if (last >= 0) {
      inputs.current[last]?.focus();
    }
  }

  return (
    <div className="w-full max-w-lg rounded-xl border border-gray-200 bg-white p-8 shadow-lg">
      <form onSubmit={handleSubmit}>
        <h2 className="text-xl font-semibold text-gray-900">
          Verify your account
        </h2>

        <p className="mt-3 text-sm leading-6 text-gray-600">
          Enter the verification code sent to your email.
        </p>

        <div className="mt-8 flex justify-center gap-3">
          {Array.from({ length: OTP_LENGTH }).map((_, index) => (
            <input
              key={index}
              ref={(el) => {
                inputs.current[index] = el;
              }}
              value={otp[index] ?? ""}
              onChange={(e) => handleChange(index, e.target.value)}
              onKeyDown={(e) => handleKeyDown(e, index)}
              onPaste={handlePaste}
              inputMode="numeric"
              autoComplete={index === 0 ? "one-time-code" : "off"}
              maxLength={1}
              className="
                h-14
                w-12
                rounded-lg
                border
                border-gray-300
                text-center
                font-mono
                text-xl
                font-medium
                outline-none
                transition-all
                duration-150
                focus:border-black
                focus:ring-2
                focus:ring-black/5
              "
            />
          ))}
        </div>

        <button
          type="submit"
          disabled={otp.length !== OTP_LENGTH && !isLoading}
          className="mt-8 w-full rounded-md bg-black py-2.5 text-sm font-medium text-white transition hover:bg-neutral-800 disabled:cursor-not-allowed disabled:opacity-50"
        >
          Verify Account
        </button>
      </form>
    </div>
  );
}
