export interface JwtPayload {
  id: string;
}

export enum UserType {
  ADMIN = "ADMIN",
  MEMBER = "MEMBER",
}

export enum BillingPlan {
  BASIC = "BASIC",
  PRO = "PRO",
  ENTERPRISE = "ENTERPRISE",
}

export enum ListingStatus {
  LISTED = "LISTED",
  UNLISTED = "UNLISTED",
}

export enum Status {
  DEPLOYED = "DEPLOYED",
  ERROR = "ERROR",
  IN_PROGRESS = "IN_PROGRESS",
  PENDING = "PENDING",
}

export enum OnBoardingStatus {
  PENDING = "PENDING",
  COMPLETED = "COMPLETED",
}

export enum PaymentStatus {
  CREATED = "CREATED",
  ATTEMPTED = "ATTEMPTED",
  PAID = "PAID",
  FAILED = "FAILED",
  REFUNDED = "REFUNDED",
}

export enum VerificationStatus {
  UN_VERIFIED = "UN_VERIFIED",
  VERIFIED = "VERIFIED",
}

export interface Admin {
  id: string;
  name: string;
  username: string;
  email: string;
  password: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface User {
  id: string;
  name: string;
  username: string;
  email: string;
  password: string;
  description?: string | null;
  accessToken?: string;
  refreshToken?: string;
  profileBanner: string;
  verification: VerificationStatus;
  onBoarding: OnBoardingStatus;
  organizations: Organization[];
  orgMembers: OrgMembers[];
  lastLoggedIn?: Date | null;
  createdAt: Date;
  updatedAt: Date;
}
export type RegisterDTO = Pick<
  User,
  "name" | "username" | "email" | "password"
>;
export type LoginDTO = Pick<User, "username" | "email" | "password">;

export interface Organization {
  id: string;
  name: string;
  orgPlan: BillingPlan;
  creatorId: string;
  creator: User;
  startedAt: Date;
  planExpiration?: Date | null;
  orgMembers: OrgMembers[];
  providers: Providers[];
  infraBoards: InfraBoard[];
  purchases: Purchases[];
  createdAt: Date;
  updatedAt: Date;
}

export interface OrgMembers {
  id: string;
  userId: string;
  orgId: string;
  role: UserType;
  user: User;
  organization: Organization;
  createdAt: Date;
  updatedAt: Date;
}

export interface Providers {
  id: string;
  cloudProvider: string;
  accesskeyId: string;
  accessSecret: string;
  orgId: string;
  organization: Organization;
  createdAt: Date;
  updatedAt: Date;
}

export interface InfraBoard {
  id: string;
  boardName: string;
  boardDescription: string;
  boardObjective: string;
  orgId: string;
  provider: string;
  organization: Organization;
  pricing: number;
  currency: string;
  listing: ListingStatus;
  purchases: Purchases[];
  infraNodes: InfraNode[];
  infraLinks: InfraLink[];
  deployments: Deployment[];
  createdAt: Date;
  updatedAt: Date;
}

export interface InfraNode {
  id: string;
  nodename: string;
  description: string;
  docs: string;
  config: Record<string, unknown>;
  boardId: string;
  board: InfraBoard;
  sourceLinks: InfraLink[];
  targetLinks: InfraLink[];
  infraLinks: InfraLink[];
  createdAt: Date;
  updatedAt: Date;
}

export interface InfraLink {
  id: string;
  sourceId: string;
  targetId: string;
  source: InfraNode;
  target: InfraNode;
  type: string;
  boardId: string;
  board: InfraBoard;
  infraNode?: InfraNode | null;
  infraNodeId?: string | null;
  createdAt: Date;
  updatedAt: Date;
}

export interface Deployment {
  id: string;
  boardId: string;
  output: string;
  state: Status;
  board: InfraBoard;
  createdAt: Date;
  updatedAt: Date;
}

export interface Purchases {
  id: string;
  buyerId: string;
  razorpayOrderId?: string | null;
  razorpayPaymentId?: string | null;
  razorpaySignature?: string | null;
  failureReason?: string | null;
  paymentStatus: PaymentStatus;
  buyer: Organization;
  boardId: string;
  board: InfraBoard;
  createdAt: Date;
  updatedAt: Date;
}
