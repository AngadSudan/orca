import { ArrowRight } from "lucide-react";

interface OrganizationFormProps {
  value: string;
  loading: boolean;
  onChange: (value: string) => void;
  onSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
}

function OrganizationForm({
  value,
  loading,
  onChange,
  onSubmit,
}: OrganizationFormProps) {
  return (
    <form onSubmit={onSubmit} className="mt-8">
      <div>
        <label
          htmlFor="organization"
          className="mb-2 block text-sm font-medium text-gray-700"
        >
          Organization name
        </label>

        <input
          id="organization"
          type="text"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder="Acme Inc."
          autoComplete="organization"
          className="w-full rounded-lg border border-gray-300 bg-white px-4 py-3 text-sm text-gray-900 outline-none transition-all duration-200 placeholder:text-gray-400 focus:border-black"
        />

        <p className="mt-2 text-sm text-gray-500">
          This is the workspace name your team will see.
        </p>
      </div>

      <button
        type="submit"
        disabled={loading || !value.trim()}
        className="mt-8 inline-flex w-full items-center justify-center gap-2 rounded-md bg-black px-4 py-2.5 text-sm font-medium text-white transition hover:bg-neutral-800 disabled:cursor-not-allowed disabled:opacity-50"
      >
        {loading ? (
          "Creating workspace..."
        ) : (
          <>
            Continue
            <ArrowRight size={16} />
          </>
        )}
      </button>
    </form>
  );
}

export default OrganizationForm;
