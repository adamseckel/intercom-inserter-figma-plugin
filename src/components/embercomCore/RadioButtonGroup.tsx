import Button, { Props as ButtonProps, ButtonType } from './Button';
import * as React from 'react';
import styled from '@emotion/styled';
import { css } from '@emotion/core';
import { Row } from 'emotion-box';
import { Options } from '../ui/ComponentProps';

const defaultButtons = [
  {
    label: 'Conversations',
    icon: 'conversation',
    hasIcon: true,
  },
  {
    label: 'People',
    icon: 'multiple-people',
    hasIcon: true,
  },
];

export const options: Options = {
  activeButtonIndex: {
    label: 'Active button index',
    type: 'select',
    options: ({ buttons }: Props) => buttons.map((_, i) => i),
    default: 0,
  },
  isDisabled: {
    label: 'Disabled',
    type: 'boolean',
    default: false,
  },
  hasIcon: {
    label: 'Has icon',
    type: 'boolean',
    default: true,
  },
  buttons: {
    label: 'Buttons',
    type: 'components',
    newComponent: {
      label: 'Conversations',
      icon: 'conversation',
      hasIcon: true,
    },
    options: (props: Props) => ({
      icon: Button.options['icon'],
      label: Button.options['label'],
    }),
    default: defaultButtons,
  },
};

export interface Props {
  buttons: ButtonProps[];
  isDisabled?: boolean;
  activeButtonIndex?: number;
  hasIcon?: boolean;
}

interface RadioButtonProps extends ButtonProps {
  isActive?: boolean;
  hasIcon?: boolean;
}

const active = (active: RadioButtonProps['isActive']) =>
  active &&
  css`
    z-index: 3;
    background-color: var(--blue-light);
    &:hover {
      border-color: var(--blue-dark);
      fill: var(--blue-dark);
      color: var(--blue-dark);
    }
  `;

const RadioButton = styled(Button)<RadioButtonProps>`
  z-index: 2;
  border-radius: 0;

  &:not(:first-of-type) {
    margin-left: -1px;
  }
  &:first-of-type {
    border-radius: 4px 0 0 4px;
  }
  &:last-of-type {
    border-radius: 0 4px 4px 0;
  }

  &:hover {
    z-index: 3;
  }

  ${props => active(props.isActive)}
`;

const RadioButtonGroup = ({
  buttons = defaultButtons,
  isDisabled,
  hasIcon = true,
  activeButtonIndex = 0,
}: Props) => (
  <Row justify="start">
    {buttons.map((button, i) => (
      <RadioButton
        key={i}
        label={button.label}
        icon={button.icon}
        hasIcon={hasIcon}
        buttonType={ButtonType['Secondary']}
        isDisabled={isDisabled}
        isActive={activeButtonIndex == i}
      />
    ))}
  </Row>
);

RadioButtonGroup.options = options;

export default RadioButtonGroup;
