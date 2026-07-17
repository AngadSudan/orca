function HeroInformation() {
  return (
    <section className="w-full max-w-3xl py-16">
      <div className="inline-flex items-center rounded-full border border-black/10 bg-black px-4 py-2 text-sm font-medium text-white shadow-sm">
        ⚡ Visual Cloud Infrastructure Compiler
      </div>

      <h1 className="mt-8 max-w-lg text-5xl font-extrabold leading-tight tracking-tight text-black md:text-6xl">
        Build Cloud Infrastructure
        <br />
        <span className="text-neutral-500 text-5xl">Just by Drawing It.</span>
      </h1>

      <p className="mt-8 max-w-lg text-md text-wrap leading-8 text-neutral-600">
        Orca transforms architecture diagrams into production-ready cloud
        infrastructure. Design visually, validate automatically, and deploy
        confidently—without writing Terraform or memorizing cloud provider
        internals.
      </p>

      <div className="mt-10 flex flex-wrap gap-4">
        <button className="rounded-xl bg-black px-7 py-3 text-base font-semibold text-white transition-all duration-200 hover:-translate-y-1 hover:bg-neutral-800">
          Get Started
        </button>

        <button className="rounded-xl border border-black px-7 py-3 text-base font-semibold text-black transition-all duration-200 hover:bg-black hover:text-white">
          See How It Works
        </button>
      </div>
    </section>
  );
}

export default HeroInformation;
