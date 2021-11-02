export const AUTHENTICATE = /* GraphQL */ `
  mutation Authenticate($username: String!, $password: String!) {
    authenticate(username: $username, password: $password) {
      ... on Session {
        session_id
      }
      ... on AuthenticationException {
        message
      }
    }
  }
`;

export const LOGOUT = /* GraphQL */ `
  mutation Logout {
    logout
  }
`;

export const GET_CURRENT_USER = /* GraphQL */ `
  query {
    me {
      username
      firstname
      lastname
      email
      certificates {
        id
        name
        certificateFile
        is_revoked
        created_at
        updated_at
      }
    }
  }
`;

export const UPDATE_ME = /* GraphQL */ `
  mutation UpdateMe($firstname: String!, $lastname: String!, $email: String!) {
    updateMe(firstname: $firstname, lastname: $lastname, email: $email) {
      username
      firstname
      lastname
      email
      certificates {
        id
        name
        is_revoked
        created_at
        updated_at
      }
    }
  }
`;

export const UPDATE_PASSWORD = /* GraphQL */ `
  mutation UpdatePassword($oldPassword: String!, $newPassword: String!) {
    updatePassword(oldPassword: $oldPassword, newPassword: $newPassword) {
      ... on WrongPasswordException {
        message
      }
      ... on User {
        username
      }
    }
  }
`;
