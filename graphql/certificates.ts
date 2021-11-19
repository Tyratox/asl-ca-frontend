export const GENERATE_CERTIFICATE = /* GraphQL */ `
  mutation GenerateCertificate($name: String!, $password: String!) {
    generateCertificate(name: $name, password: $password) {
      certificate {
        id
        name
        is_revoked
      }
      p12
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

export const ADMIN_INTERFACE_DATA = /* GraphQL */ `
  query {
    getSerialNumber
    getCertCount
    getRevokedCertCount
  }
`;
