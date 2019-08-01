import * as React from 'react';
import styled from '@emotion/styled';
import Cell from './Cell';
import Label from './Label';

const InputComponent = styled('input')`
  width: 100%;
  height: 24px;
  border-radius: 4px;
  border: 1px solid var(--gray-light);
  padding: 4px;
  transition: opacity 0.1s ease;
  &[disabled] {
    opacity: 0.5;
  }
`;

const SelectComponent = InputComponent.withComponent('select');

const Input = ({
  type,
  value,
  options,
  onChange,
  disabled,
}: {
  type: string;
  value: any;
  options?: string[];
  onChange: any;
  disabled?: boolean;
}) => {
  switch (type) {
    case 'text':
      return (
        <InputComponent
          value={value}
          onChange={e => onChange(e.target.value)}
          disabled={disabled}
        />
      );
    case 'boolean':
      return (
        <InputComponent
          type="checkbox"
          value={value}
          defaultChecked={value}
          onChange={e => onChange(e.target.checked)}
          disabled={disabled}
        />
      );
    case 'select':
      return (
        <SelectComponent
          value={value}
          onChange={e => onChange(e.target.value)}
          disabled={disabled}
        >
          {options.map(option => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
        </SelectComponent>
      );
  }
};

interface Props {
  type: string;
  value: any;
  options: any;
  onChange: any;
  label: string;
  disabled: boolean;
}

export default ({ type, value, options, onChange, label, disabled }: Props) => (
  <tr>
    <Cell>
      <Label disabled={disabled}>{label}:</Label>
    </Cell>

    <Cell>
      <Input
        type={type}
        value={value}
        options={options}
        onChange={onChange}
        disabled={disabled}
      />
    </Cell>
  </tr>
);
