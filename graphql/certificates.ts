export const GENERATE_CERTIFICATE = /* GraphQL */ `
  mutation GenerateCertificate($name: String!) {
    generateCertificate(name: $name) {
      certificate {
        id
        name
        certificateFile
        is_revoked
      }
      privateKey
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

export const CERTIFICATE_REVOCATION_LIST = /* GraphQL */ `
  query {
    crl
  }
`;
