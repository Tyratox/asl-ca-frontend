import styled from "@emotion/styled";

const Table = styled.table`
  width: 100%;

  th {
    text-align: left;
  }

  th,
  td {
    padding: 0.25rem 0;

    &:first-of-type {
      width: 2rem;
    }
    &:nth-of-type(3) {
      width: 6rem;
    }
    &:last-of-type {
      width: 6rem;
    }
  }

  button {
    margin: 0;
  }
`;

export default Table;
