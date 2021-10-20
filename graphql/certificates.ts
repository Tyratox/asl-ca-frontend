export const GENERATE_CERTIFICATE = /* GraphQL */ `
  mutation GenerateCertificate($name: String!) {
    generateCertificate(name: $name) {
      id
      name
      is_revoked
    }
  }
`;

export const REVOKE_CERTIFICATE = /* GraphQL */ `
  mutation RevokeCertificate($id: ID!) {
    revokeCertificate(id: $id) {
      ... on NotFoundException {
        message
      }

      ... on RevokeCertificateSuccess {
        success
      }
    }
  }
`;
