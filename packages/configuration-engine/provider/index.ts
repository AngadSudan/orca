import { resources } from "./aws";

const providerMapping = {
  aws: resources,
} as const;

export default providerMapping;

export type Resources =
  keyof (typeof providerMapping)[keyof typeof providerMapping];

export type Providers = keyof typeof providerMapping;
