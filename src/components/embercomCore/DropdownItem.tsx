import styled from '@emotion/styled';
import * as React from 'react';

import { css } from '@emotion/core';
import { Row, Column } from 'emotion-box';
import InterfaceIcon from './InterfaceIcon';
import { Options } from '../ui/ComponentProps';

const reqSvgs = require.context(
  '../../core/svgs/interface-icons/standard',
  true,
  /\.svg$/,
);

const icons = reqSvgs
  .keys()
  .map(path => path.replace('.svg', '').replace('./', ''));

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
  isItem?: boolean;
}

const Item = styled(Row)<ItemProps>`
  padding: 6px 12px;
  color: var(--black);
  opacity: ${props => (props.isDisabled ? 0.5 : 1)};
  white-space: nowrap;
  ${props => isActive(props.isActive)};
  ${props => !props.isDisabled && !props.isItem && hover()}
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

const ItemIconContainer = styled(Row)`
  margin-right: 10px;
`;

export interface Props {
  label: string;
  isActive?: boolean;
  description?: string;
  count?: number;
  isDisabled?: boolean;
  icon?: string;
  hasIcon?: boolean;
  isItem?: boolean;
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
  hasIcon: {
    label: 'Has icon',
    type: 'boolean',
    default: false,
  },
  icon: {
    label: 'Icon name',
    type: 'select',
    options: (props: Props) => icons,
    disabledWhen: ({ hasIcon }: Props) => !hasIcon,
    default: 'ab-test',
  },
};

const DropdownItem = ({
  label,
  isActive,
  description,
  count,
  isDisabled,
  icon = 'ab-test',
  hasIcon = false,
  isItem = false,
}: Props) => (
  <Item
    justify="start"
    align="start"
    inline
    isActive={isActive}
    isDisabled={isDisabled}
    isItem={isItem}
  >
    {hasIcon && (
      <ItemIconContainer inline align="start" justify="start">
        <InterfaceIcon icon={icon} />
      </ItemIconContainer>
    )}
    <Column justify="start" align="start">
      <Row justify="start">
        <Label className="label"> {label}</Label>
        {count && <Count>{count}</Count>}
        <Row grow />
        {isActive && (
          <IconContainer>
            <InterfaceIcon icon="check" />
          </IconContainer>
        )}
      </Row>
      {description && <Description> {description}</Description>}
    </Column>
  </Item>
);

DropdownItem.options = options;

export default DropdownItem;
