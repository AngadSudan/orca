import React from "react";

function MotionDiagram() {
  return (
    <div className="w-full max-w-3xl py-16">
      <div className="h-[55svh] bg-gray-200"></div>
      <div className="mt-2 flex flex-wrap gap-6 border-t border-neutral-200 pt-8 text-sm text-neutral-600">
        <div className="flex items-center gap-2">
          <span className="h-2 w-2 rounded-full bg-black"></span>
          Visual Infrastructure Design
        </div>

        <div className="flex items-center gap-2">
          <span className="h-2 w-2 rounded-full bg-black"></span>
          Automatic Validation
        </div>

        <div className="flex items-center gap-2">
          <span className="h-2 w-2 rounded-full bg-black"></span>
          Terraform Generation
        </div>

        <div className="flex items-center gap-2">
          <span className="h-2 w-2 rounded-full bg-black"></span>
          One-Click Deployment
        </div>
      </div>
    </div>
  );
}

export default MotionDiagram;
