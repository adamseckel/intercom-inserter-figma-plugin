import styled from '@emotion/styled';
import { css } from '@emotion/core';
import * as React from 'react';
import { Options } from '../ui/ComponentProps';
import InterfaceIcon from './InterfaceIcon';
import { Row } from 'emotion-box';

import DropdownItem, { Props as Item } from './DropdownItem';

import DropdownGroup, { Props as DropdownGroupProps } from './DropdownGroup';

export interface Props extends DropdownGroupProps {
  isOpen?: boolean;
}

const options: Options = {
  isOpen: {
    label: 'Is open',
    type: 'boolean',
    default: true,
  },
  ...DropdownGroup.options,
};

const IconContainer = styled('div')`
  margin-left: -2px;
  padding-top: 6px;
  padding-right: 6px;
`;

const SelectOpener = styled(Row)`
  border: 1px solid var(--border-shadow-dark);
  border-radius: 4px;
  background: ${props => (props.isOpen ? 'var(--blue-light)' : 'var(--white)')};
  margin-bottom: 4px;

  &:hover {
    border-color: var(--blue);
    fill: var(--blue);
    color: var(--blue);
    span.label {
      color: var(--blue);
    }
  }

  ${props =>
    props.isOpen &&
    css`
      fill: var(--blue-dark);
      span.label {
        color: var(--blue-dark);
      }
    `};
`;

const Select = ({ activeItemIndex = 0, isOpen, items, ...props }: Props) => {
  const selectedItem = items[activeItemIndex];

  return (
    <div>
      <div style={{ display: 'inline-block' }}>
        <SelectOpener
          inline
          justify="space-between"
          align="start"
          isOpen={isOpen}
        >
          <DropdownItem {...selectedItem} isItem={true} />
          <IconContainer>
            <InterfaceIcon icon="small-down-arrow" />
          </IconContainer>
        </SelectOpener>
      </div>
      {isOpen && (
        <DropdownGroup
          activeItemIndex={activeItemIndex}
          items={items}
          {...props}
        />
      )}
    </div>
  );
};

Select.options = options;

export default Select;
