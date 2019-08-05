import styled from '@emotion/styled';
import * as React from 'react';
import { Options } from '../ui/ComponentProps';

import { css } from '@emotion/core';
import { Row } from 'emotion-box';

const isActive = (isActive: boolean) =>
  isActive &&
  css`
    border-bottom-color: var(--blue);

    span {
      color: var(--blue);
    }
  `;

const StyledTab = styled(Row)`
  height: 36px;
  border-bottom: 2px solid transparent;
  color: var(--black);
  margin: 0 10px;
  &:first-of-type {
    margin-left: 0;
  }
  &:last-of-type {
    margin-right: 0;
  }

  ${props => isActive(props.isActive)}
  &:hover {
    color: var(--blue);
  }
`;

const Label = styled('span')`
  font-size: 14px;
  font-weight: 500;
`;

const Attribute = styled('span')`
  font-size: 13px;
  color: var(--gray);
  margin-left: 3px;
`;

export interface Props {
  label: string;
  attribute?: string;
  isActive?: boolean;
}

export const options: Options = {
  isActive: {
    label: 'Active',
    type: 'boolean',
    default: false,
  },
  attribute: {
    label: 'Attribute',
    type: 'text',
    default: '0',
  },
  label: {
    label: 'Label',
    type: 'text',
    default: 'People',
  },
};

const Tab = ({ label, attribute, isActive }: Props) => (
  <StyledTab inline isActive={isActive}>
    <Label> {label}</Label>
    {attribute && <Attribute> ({attribute})</Attribute>}
  </StyledTab>
);

Tab.options = options;

export default Tab;
