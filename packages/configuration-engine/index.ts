import providerMapping, { type Providers, type Resources } from "./provider";

export default function getConfigurationMappings(
  provider: Providers,
  resource: Resources,
) {
  const dependencyMappings = providerMapping[provider][resource];

  if (!dependencyMappings) {
    throw new Error(
      `Unknown resource "${resource}" for provider "${provider}"`,
    );
  }

  return dependencyMappings;
}

export { providerMapping };
