import awsResourceGraph from "./aws";

const providerMapping = {
  aws: awsResourceGraph,
} as const;

export default providerMapping;

export type Resources =
  keyof (typeof providerMapping)[keyof typeof providerMapping];

export type Providers = keyof typeof providerMapping;
