import { RefreshCcw } from "lucide-react";

function Fallback() {
  return (
    <div className="w-full max-w-lg rounded-xl border border-gray-200 bg-white p-8 shadow-lg">
      <div className="flex items-start gap-4">
        <div className="flex-1">
          <h2 className="text-xl font-semibold text-gray-900">
            Account verification is still in progress
          </h2>

          <p className="mt-3 text-sm leading-6 text-gray-600">
            We've received your verification request, but your account isn't
            ready yet. This usually completes within a few moments.
          </p>

          <div className="mt-6 rounded-lg border border-gray-200 bg-gray-50 p-4">
            <p className="text-sm text-gray-700">
              If you've recently signed up, please wait a minute before trying
              again.
            </p>
          </div>

          <div className="mt-8 flex gap-3">
            <button
              onClick={() => window.location.reload()}
              className="inline-flex items-center gap-2 rounded-md bg-black px-4 py-2 text-sm font-medium text-white transition hover:bg-neutral-800"
            >
              <RefreshCcw size={16} />
              Try Again
            </button>

            <button
              onClick={() => window.history.back()}
              className="rounded-md border border-gray-300 px-4 py-2 text-sm font-medium text-gray-700 transition hover:bg-gray-100"
            >
              Go Back
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Fallback;
