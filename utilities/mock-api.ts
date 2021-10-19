import { Certificate, User } from "./types";

export type API_User = User & { password: string };

const USERS: API_User[] = [
  {
    username: "lb",
    password: "D15Licz6",
    firstname: "Lukas",
    lastname: "Bruegger",
    email: "lb@imovies.ch",
    isAdministrator: true,
  },
  {
    username: "ps",
    password: "KramBamBuli",
    firstname: "Patrick",
    lastname: "Schaller",
    email: "ps@imovies.ch",
    isAdministrator: false,
  },
  {
    username: "ms",
    password: "MidbSvlJ",
    firstname: "Michael",
    lastname: "Schlaepfer",
    email: "ms@imovies.ch",
    isAdministrator: false,
  },
  {
    username: "a3",
    password: "Astrid",
    firstname: "Andres Alan",
    lastname: "Anderson",
    email: "and@imovies.ch",
    isAdministrator: false,
  },
];

const CERTIFICATES: Certificate[] = [];
let NEXT_CERTIFICATE_ID = 1;

export const findUserByUsername = (username: string) => {
  return USERS.find((u) => u.username === username);
};

export const authenticate = (username: string, password: string) => {
  const user = USERS.find(
    (u) => u.username === username && u.password === password
  );

  return user ? user : null;
};

export const generateToken = (user: API_User) => {
  return user.username + ":" + user.password;
};

export const getUserByToken = (token: string) => {
  const [username, password] = token.split(":");
  return authenticate(username, password);
};

export const generateNewCertificate = (
  user: User,
  name: string
): Certificate => {
  const cert: Certificate = {
    id: NEXT_CERTIFICATE_ID,
    name,
    createdAt: Date.now(),
    blob: `binary data: ${user.firstname} ${user.lastname} ${user.email}`,
    username: user.username,
    revoked: false,
  };

  CERTIFICATES.push(cert);
  NEXT_CERTIFICATE_ID++;

  return cert;
};

export const getCertificatesByUser = (user: User) =>
  CERTIFICATES.filter((c) => c.username === user.username);

export const revokeCertificate = (id: number) => {
  const cert = CERTIFICATES.find((c) => c.id === id);

  if (cert) {
    cert.revoked = true;
    return true;
  } else {
    return false;
  }
};

export const getRevokedCertificates = () =>
  CERTIFICATES.filter((c) => c.revoked);

export const getNumberOfIssuedCertificates = () => CERTIFICATES.length;
export const getNumberOfRevokesCertificates = () =>
  CERTIFICATES.filter((c) => c.revoked).length;

export const getCurrentSerialNumber = () => NEXT_CERTIFICATE_ID;
