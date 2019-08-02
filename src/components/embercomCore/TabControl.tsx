import * as React from 'react';
import { Row } from 'emotion-box';
import Tab, { Props as TabProps, Options as TabOptions } from './Tab';

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

export const Options = {
  activeTabIndex: {
    label: 'Active tab index',
    type: 'select',
    options: props => (props.tabs || defaultTabs).map((_, i) => i),
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
      label: TabOptions['label'],
      attribute: TabOptions['attribute'],
    }),
    default: defaultTabs,
  },
};

export interface Props {
  tabs: TabProps[];
  activeTabIndex?: number;
}

export default ({ tabs = defaultTabs, activeTabIndex = 0 }: Props) => (
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
