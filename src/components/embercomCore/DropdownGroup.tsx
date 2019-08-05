import styled from '@emotion/styled';
import * as React from 'react';
import { Options } from '../ui/ComponentProps';
import DropdownItem, {
  Props as Item,
  options as ItemOptions,
} from './DropdownItem';

export interface Props {
  items: Item[];
  activeItemIndex?: number;
}

const defaultItems = [
  {
    label: 'Text',
  },
  {
    label: 'Number',
  },
];

const options: Options = {
  activeItemIndex: {
    label: 'Active item index',
    type: 'select',
    options: (props: Props) => (props.items || defaultItems).map((_, i) => i),
    default: 0,
  },
  items: {
    label: 'Items',
    type: 'components',
    newComponent: {
      label: 'Date',
    },
    options: (props: Props) => {
      const options = { ...ItemOptions };
      delete options['isActive'];

      return options;
    },
    default: defaultItems,
  },
};

const Group = styled('div')`
  padding: 9px 0;
  border-radius: 4px;
  background-color: var(--white);
  box-shadow: 0 4px 14px 0 rgba(0, 0, 0, 0.2), 0 0 0 1px rgba(0, 0, 0, 0.05);
`;

const DropdownGroup = ({
  activeItemIndex = 0,
  items = defaultItems,
}: Props) => (
  <Group>
    {items.map((item, i) => (
      <DropdownItem
        key={i}
        {...item}
        isActive={activeItemIndex.toString() === i.toString()}
      />
    ))}
  </Group>
);

DropdownGroup.options = options;

export default DropdownGroup;
