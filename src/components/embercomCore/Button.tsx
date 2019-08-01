import * as React from 'react';
import styled from '@emotion/styled';
import { css } from '@emotion/core';
import { Row } from 'emotion-box';
import InterfaceIcon from './InterfaceIcon';

export enum ButtonType {
  Primary = 'primary',
  Secondary = 'secondary',
  PrimaryDestructive = 'primary-destructive',
  SecondaryDestructive = 'secondary-destructive',
  PrimaryLive = 'primary-live',
  SecondaryLive = 'secondary-live',
  PrimaryOnBlue = 'primary-on-blue',
  SecondaryOnBlue = 'secondary-on-blue',
}

const reqSvgs = require.context(
  '../../core/svgs/interface-icons/standard',
  true,
  /\.svg$/,
);

const icons = reqSvgs
  .keys()
  .map(path => path.replace('.svg', '').replace('./', ''));

export interface Props {
  label: string;
  buttonType?: ButtonType;
  isDisabled?: boolean;
  isSubtle?: boolean;
  hasIcon?: boolean;
  icon?: any;
  active?: boolean;
  className?: string;
}

export const Options = {
  label: { label: 'Label', type: 'text', default: 'Save' },
  buttonType: {
    label: 'Type',
    type: 'select',
    options: () => Object.values(ButtonType),
    default: 'primary',
  },
  hasIcon: {
    label: 'Has icon',
    type: 'boolean',
    default: false,
  },
  icon: {
    label: 'Icon name',
    type: 'select',
    options: () => icons,
    disabledWhen: ({ hasIcon }) => !hasIcon,
    default: 'ab-test',
  },
  isDisabled: { label: 'Disabled', type: 'boolean' },
  isSubtle: {
    label: 'Subtle',
    type: 'boolean',
    disabledWhen: ({ buttonType }) => buttonType.includes('primary'),
    default: false,
  },
};

const buttonTypeMap = {
  primary: css`
    background-color: var(--blue);
    color: var(--white);
    fill: var(--white);
    &:hover,
    &.active {
      background-color: var(--blue-dark);
    }
  `,
  secondary: css`
    background-color: var(--white);
    color: var(--black);
    fill: var(--black);
    &:hover,
    &.active {
      border-color: var(--blue);
      color: var(--blue);
      fill: var(--blue);
    }
  `,
  'primary-destructive': css`
    background-color: var(--red);
    color: var(--white);
    fill: var(--white);
    &:hover,
    &.active {
      background-color: var(--red-dark);
    }
  `,
  'secondary-destructive': css`
    background-color: var(--white);
    color: var(--red);
    fill: var(--red);
    &:hover,
    &.active {
      border-color: var(--red);
      color: var(--red);
    }
  `,
  'primary-live': css`
    background-color: var(--green);
    color: var(--white);
    fill: var(--white);
    &:hover,
    &.active {
      background-color: var(--green-dark);
    }
  `,
  'secondary-live': css`
    background-color: var(--white);
    color: var(--green);
    fill: var(--green);
    &:hover,
    &.active {
      border-color: var(--green);
    }
  `,
  'primary-on-blue': css`
    background-color: var(--white);
    color: var(--blue);
    fill: var(--blue);
    &:hover,
    &.active {
      color: var(--blue-dark);
      fill: var(--blue-dark);
      border-color: var(--blue-dark);
    }
  `,
  'secondary-on-blue': css`
    background-color: var(--blue);
    color: var(--white);
    fill: var(--white);
    border-color: rgba(255, 255, 255, 0.6);

    &:hover,
    &.active {
      border-color: var(--white);
    }
  `,
};

const type = (buttonType: Props['buttonType']) => buttonTypeMap[buttonType];
const disabled = (isDisabled: Props['isDisabled']) => css`
  opacity: ${isDisabled ? 0.5 : 1};
`;

const RowButton = Row.withComponent('button');

const Button = styled(RowButton)<Omit<Props, 'label'>>`
  font-size: 14px;
  line-height: 18px;
  font-weight: 500;
  text-decoration: none;
  border: 1px solid;
  border-color: rgba(0, 0, 0, 0.2);
  border-radius: 4px;
  padding: 5px 12px 7px;
  display: inline-block;
  cursor: pointer;
  transition: box-shadow linear 40ms;
  outline: 0;
  &:active {
    outline: 0;
  }

  ${props => type(props.buttonType || ButtonType['Primary'])}
  ${props => disabled(props.isDisabled)}
  ${props =>
    props.isSubtle &&
    css`
      border-color: transparent;
    `}
`;

export default ({
  label = 'Save',
  icon = 'ab-test',
  className,
  ...props
}: Props) => (
  <Button
    inline
    justify="start"
    align="center"
    className={`${className} ${props.active && 'active'}`}
    {...props}
  >
    {props.hasIcon && <InterfaceIcon icon={icon} />} <span>{label}</span>
  </Button>
);
