import Button, {
  Options as ButtonOptions,
  Props as ButtonProps,
  ButtonType,
} from './Button';
import * as React from 'react';
import styled from '@emotion/styled';
import { css } from '@emotion/core';
import { Row } from 'emotion-box';

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

export const Options = {
  activeButtonIndex: {
    label: 'Active button index',
    type: 'select',
    options: props => (props.buttons || defaultButtons).map((_, i) => i),
    default: 0,
  },
  isDisabled: {
    label: 'Disabled',
    type: 'boolean',
    default: false,
  },
  fullWidth: {
    label: 'Full width',
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
    options: () => ({
      icon: ButtonOptions['icon'],
      label: ButtonOptions['label'],
    }),
    default: defaultButtons,
  },
};

export interface Props {
  buttons: ButtonProps[];
  isDisabled?: boolean;
}

interface RadioButtonProps extends ButtonProps {
  active?: boolean;
  fullWidth?: boolean;
  hasIcon?: boolean;
}

const active = (active: RadioButtonProps['active']) =>
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
  flex-grow: ${props => (props.fullWidth ? 1 : 0)};
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

  ${props => active(props.active)}
`;

export default ({
  buttons = defaultButtons,
  isDisabled,
  hasIcon = true,
  fullWidth = false,
  activeButtonIndex = 0,
}) => (
  <Row>
    {buttons.map((button, i) => (
      <RadioButton
        key={i}
        label={button.label}
        icon={button.icon}
        hasIcon={hasIcon}
        buttonType={ButtonType['Secondary']}
        isDisabled={isDisabled}
        active={activeButtonIndex == i}
        fullWidth={fullWidth}
      />
    ))}
  </Row>
);