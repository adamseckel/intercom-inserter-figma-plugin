import * as React from 'react';
import styled from '@emotion/styled';
import { Row } from 'emotion-box';

const Button = Row.withComponent('button');

export const BasicButton = styled(Button)`
  height: 32px;
  padding: 4px;
  border-radius: 6px;
  background: var(--white);
  color: var(--black);
  &:hover {
    background: var(--gray-lightest);
  }
  &:active,
  &:focus {
    outline: 0;
  }
`;

export const IconButton = styled(BasicButton)`
  font-weight: 200;
  font-size: 24px;
  width: 32px;
  border: 0;
  line-height: 0px;
`;

export default styled(BasicButton)`
  width: 100%;
  font-size: 12px;
  height: 32px;
  border: 1px solid var(--gray);

  &:hover {
    background: var(--gray-lightest);
  }
  &:active,
  &:focus {
    outline: 0;
  }
`;
