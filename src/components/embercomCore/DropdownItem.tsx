import styled from '@emotion/styled';
import * as React from 'react';

import { css } from '@emotion/core';
import { Row } from 'emotion-box';
import InterfaceIcon from './InterfaceIcon';
import { Options } from '../ui/ComponentProps';

const isActive = (isActive: boolean) =>
  isActive &&
  css`
    color: var(--blue);
    fill: var(--blue);
  `;

const hover = () => css`
  &:hover {
    background-color: var(--blue);
    color: var(--white);
    fill: var(--white);

    span {
      fill: var(--white);
      color: var(--white);
    }
  }
`;

interface ItemProps extends Pick<Props, 'isActive' | 'isDisabled'> {
  children?: any;
}

const Item = styled('div')<ItemProps>`
  padding: 6px 12px;
  color: var(--black);
  opacity: ${props => (props.isDisabled ? 0.5 : 1)};
  ${props => isActive(props.isActive)};
  ${props => !props.isDisabled && hover()}
`;

const Label = styled('span')`
  font-size: 14px;
  font-weight: 500;
`;

const Count = styled('span')`
  font-size: 14px;
  color: var(--gray);
  margin-left: 5px;
`;

const Description = styled('span')`
  color: var(--gray);
  font-size: 13px;
  font-weight: 400;
`;

const IconContainer = styled('div')`
  margin-left: 10px;
`;

export interface Props {
  label: string;
  isActive?: boolean;
  description?: string;
  count?: number;
  isDisabled?: boolean;
}

export const options: Options = {
  isActive: {
    label: 'Active',
    type: 'boolean',
    default: false,
  },
  label: {
    label: 'Label',
    type: 'text',
    default: 'People',
  },
  description: {
    label: 'Description',
    type: 'text',
    default: undefined,
  },
  count: {
    label: 'Count',
    type: 'text',
    default: undefined,
  },
  isDisabled: {
    label: 'Disabled',
    type: 'boolean',
    default: false,
  },
};

const DropdownItem = ({
  label,
  isActive,
  description,
  count,
  isDisabled,
}: Props) => (
  <Item isActive={isActive} isDisabled={isDisabled}>
    <Row justify="start">
      <Label> {label}</Label>
      {count && <Count>{count}</Count>}
      {isActive && (
        <IconContainer>
          <InterfaceIcon icon="check" />
        </IconContainer>
      )}
    </Row>
    {description && <Description> {description}</Description>}
  </Item>
);

DropdownItem.options = options;

export default DropdownItem;
