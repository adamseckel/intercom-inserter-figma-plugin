import styled from '@emotion/styled';
import { css } from '@emotion/core';
import * as React from 'react';
import { Options } from '../ui/ComponentProps';
import InterfaceIcon from './InterfaceIcon';
import { Row } from 'emotion-box';

import DropdownItem from './DropdownItem';

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

// could be cleaned up by passing props to the opener
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

const InlineBlock = styled('div')`
  display: inline-block;
`;

const Select = ({ activeItemIndex = 0, isOpen, items, ...props }: Props) => (
  <>
    <InlineBlock>
      <SelectOpener
        inline
        justify="space-between"
        align="start"
        isOpen={isOpen}
      >
        <DropdownItem {...items[activeItemIndex]} isItem={true} />
        <IconContainer>
          <InterfaceIcon icon="small-down-arrow" />
        </IconContainer>
      </SelectOpener>
    </InlineBlock>

    <InlineBlock>
      {isOpen && (
        <DropdownGroup
          activeItemIndex={activeItemIndex}
          items={items}
          {...props}
        />
      )}
    </InlineBlock>
  </>
);

Select.options = options;

export default Select;
