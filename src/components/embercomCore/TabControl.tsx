import * as React from 'react';
import { Row } from 'emotion-box';
import Tab, { Props as TabProps } from './Tab';
import { Options } from '../ui/ComponentProps';

const defaultTabs = [
  {
    label: 'Conversations',
    attribute: '',
  },
  {
    label: 'People',
    attribute: '',
  },
];

export const options: Options = {
  activeTabIndex: {
    label: 'Active tab index',
    type: 'select',
    options: ({ tabs }: Props) => tabs.map((_, i) => i),
    default: 0,
  },
  tabs: {
    label: 'Tabs',
    type: 'components',
    newComponent: {
      label: 'Conversations',
      attribute: '',
    },
    options: () => ({
      label: Tab.options['label'],
      attribute: Tab.options['attribute'],
    }),
    default: defaultTabs,
  },
};

export interface Props {
  tabs: TabProps[];
  activeTabIndex?: number;
}

const TabControl = ({ tabs = defaultTabs, activeTabIndex = 0 }: Props) => (
  <Row justify="start">
    {tabs.map((tab, i) => (
      <Tab
        key={i}
        label={tab.label}
        attribute={tab.attribute}
        isActive={activeTabIndex == i}
      />
    ))}
  </Row>
);

TabControl.options = options;

export default TabControl;
