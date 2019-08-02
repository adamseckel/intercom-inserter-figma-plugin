import * as React from 'react';
import { useState } from 'react';
import styled from '@emotion/styled';
import ComponentPreview from './ComponentPreview';
import ComponentProps from './ComponentProps';
import Divider from './Divider';
import Space from './Space';
import Button from './Button';
import * as Core from '../embercomCore';

const components = ['button', 'radioButtonGroup', 'tabControl'];
const componentsLabelMap = {
  button: 'Button',
  radioButtonGroup: 'Radio Button group',
  tabControl: 'Tab Control',
  tab: 'Tab',
};

const Select = styled('select')`
  width: 100%;
  height: 32px;
  font-size: 12px;
  background: transparent;
  padding: 4px;
  text-transform: capitalize;
`;

const Container = styled('div')`
  padding: 0 12px;
`;

const makeDefaults = options =>
  Object.keys(options).reduce((defaults, prop) => {
    return {
      ...defaults,
      [prop]: options[prop].default,
    };
  }, {});

const defaults = {
  button: makeDefaults(Core.ButtonOptions),
  radioButtonGroup: makeDefaults(Core.RadioButtonGroupOptions),
  tabControl: makeDefaults(Core.TabControlOptions),
  tab: makeDefaults(Core.TabOptions),
};

const options = {
  button: Core.ButtonOptions,
  radioButtonGroup: Core.RadioButtonGroupOptions,
  tabControl: Core.TabControlOptions,
  tab: Core.TabOptions,
};

const StickyContainer = styled('div')`
  position: sticky;
  top: 0;
  z-index: 999;
`;

const StickyFooter = styled('div')`
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  background: var(--white);
  z-index: 999;
`;

const insertComponent = (component, props) => {
  return parent.postMessage(
    { pluginMessage: { type: 'create-component', component, props } },
    '*',
  );
};

export default ({}) => {
  let [component, setComponent] = useState('button');
  let [componentProps, setComponentProps] = useState(defaults);

  return (
    <>
      <Container>
        <Space />
        <Select value={component} onChange={e => setComponent(e.target.value)}>
          {components.map(c => (
            <option key={c} value={c}>
              {componentsLabelMap[c]}
            </option>
          ))}
        </Select>
        <Space />
      </Container>

      <Divider />

      <StickyContainer>
        <ComponentPreview
          component={component}
          componentProps={componentProps[component]}
        />
        <Divider />
      </StickyContainer>

      <Space />

      <ComponentProps
        setComponentProps={value => {
          return setComponentProps({
            ...componentProps,
            [component]: { ...componentProps[component], ...value },
          });
        }}
        componentProps={componentProps[component]}
        availableProps={options[component]}
      />

      <StickyFooter>
        <Divider />
        <Space />
        <Container>
          <Button
            onClick={() =>
              insertComponent(component, componentProps[component])
            }
          >
            Insert
          </Button>
        </Container>
        <Space />
      </StickyFooter>
    </>
  );
};
