export type Maybe<T> = T | null;
export type Exact<T extends { [key: string]: unknown }> = {
  [K in keyof T]: T[K];
};
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & {
  [SubKey in K]?: Maybe<T[SubKey]>;
};
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & {
  [SubKey in K]: Maybe<T[SubKey]>;
};
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  /** A date-time string at UTC, such as 2019-12-03T09:54:33Z, compliant with the date-time format. */
  DateTime: any;
};

/** An exception that is raised during authentication */
export type AuthenticationException = {
  __typename?: "AuthenticationException";
  /** A message describing why the exception occured */
  message: Scalars["String"];
};

export type AuthenticationResult = AuthenticationException | Session;

export type Certificate = {
  __typename?: "Certificate";
  /** The date the certificate has been created */
  created_at: Scalars["DateTime"];
  /** The certificate id */
  id: Scalars["ID"];
  /** Has the certificate been revoked? */
  is_revoked: Scalars["Boolean"];
  /** A name given in order to be able to differentiate the certificates */
  name: Scalars["String"];
  /** The date the certificate has last been updated */
  updated_at: Scalars["DateTime"];
};

export type Mutation = {
  __typename?: "Mutation";
  /** Logs a user in and returns a new valid session id */
  authenticate: AuthenticationResult;
  /** Generates a new certificate */
  generateCertificate: NewCertificate;
  /** Logs a user out, deletes the session id */
  logout: Scalars["Boolean"];
  /** Revokes an existing certificate of the logged in user */
  revokeCertificate: RevokeCertificateReponse;
  /** Updates the current user using the provided data */
  updateMe: User;
  /** Updates the current user's password */
  updatePassword: UpdatePasswordResult;
};

export type MutationAuthenticateArgs = {
  password: Scalars["String"];
  username: Scalars["String"];
};

export type MutationGenerateCertificateArgs = {
  name: Scalars["String"];
  password: Scalars["String"];
};

export type MutationRevokeCertificateArgs = {
  id: Scalars["ID"];
};

export type MutationUpdateMeArgs = {
  email: Scalars["String"];
  firstname: Scalars["String"];
  lastname: Scalars["String"];
};

export type MutationUpdatePasswordArgs = {
  newPassword: Scalars["String"];
  oldPassword: Scalars["String"];
};

export type NewCertificate = {
  __typename?: "NewCertificate";
  /** The certificate */
  certificate: Certificate;
  /** The p12 file encoded in Base64 */
  p12: Scalars["String"];
};

/** An exception that is raised during authentication */
export type NotFoundException = {
  __typename?: "NotFoundException";
  /** A message describing why the exception occured */
  message: Scalars["String"];
};

export type Query = {
  __typename?: "Query";
  /** The current certificate revocation list encoded in Base64 */
  crl: Scalars["String"];
  /**The total number of certificates.*/
  getCertCount: Scalars["Int"];
  /**The total number of revoked certificates.*/
  getRevokedCertCount: Scalars["Int"];
  /**Current serial number.*/
  getSerialNumber: Scalars["String"];
  /** Retrieves the current user */
  me: User;
};

export type RevokeCertificateReponse =
  | NotFoundException
  | RevokeCertificateSuccess;

export type RevokeCertificateSuccess = {
  __typename?: "RevokeCertificateSuccess";
  success: Scalars["Boolean"];
};

export type Session = {
  __typename?: "Session";
  /** The session id */
  session_id: Scalars["ID"];
};

export type UpdatePasswordResult = User | WrongPasswordException;

/** The user type contains all information about the user, including the data from the legacy database */
export type User = {
  __typename?: "User";
  certificates: Array<Certificate>;
  /** The user's email from the legacy database */
  email: Scalars["String"];
  /** The user's firstname from the legacy database */
  firstname: Scalars["String"];
  /** The user's lastname from the legacy database */
  lastname: Scalars["String"];
  username: Scalars["String"];
  isAdmin: Scalars["Boolean"];
};

/** An exception that is raised during authentication */
export type WrongPasswordException = {
  __typename?: "WrongPasswordException";
  /** A message describing why the exception occured */
  message: Scalars["String"];
};
