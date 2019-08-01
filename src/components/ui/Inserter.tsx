import * as React from 'react';
import { useState } from 'react';
import styled from '@emotion/styled';
import ComponentPreview from './ComponentPreview';
import ComponentProps from './ComponentProps';
import Divider from './Divider';
import Space from './Space';
import Button from './Button';
import * as Core from '../embercomCore';

const components = ['button', 'radioButtonGroup'];

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
};

const options = {
  button: Core.ButtonOptions,
  radioButtonGroup: Core.RadioButtonGroupOptions,
};

const StickyContainer = styled('div')`
  position: sticky;
  top: 0;
  z-index: 999;
`;

const StickyFooter = styled('div')`
  position: sticky;
  bottom: 0;
  background: var(--white);
  z-index: 999;
`;

export default ({}) => {
  let [component, setComponent] = useState('radioButtonGroup');
  let [componentProps, setComponentProps] = useState(defaults);

  return (
    <>
      <Container>
        <Space />
        <Select value={component} onChange={e => setComponent(e.target.value)}>
          {components.map(c => (
            <option key={c} value={c}>
              {c}
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
          <Button>Insert</Button>
        </Container>
        <Space />
      </StickyFooter>
    </>
  );
};
