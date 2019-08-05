import * as React from 'react';
import styled from '@emotion/styled';
import PropertyControl from './PropertyControl';
import ComponentControl from './ComponentControl';

export type Option = {
  label: string;
  type: 'select' | 'boolean' | 'components' | 'text';
  default: any;
  options?: (options: any[] | { [key: string]: any }) => any[] | {};
  disabledWhen?: (properties: { [key: string]: any }) => boolean;
  newComponent?: any;
};

export type Options = { [key: string]: Option };

interface Props {
  componentProps: { [key: string]: any };
  availableProps: { [key: string]: Option };
  setComponentProps: any;
}

const Table = styled('table')`
  width: 100%;
  border-spacing: 8px;
`;

const Container = styled(Table)`
  padding: 0 12px;
  margin-bottom: 60px;
`;

interface TableRowProps {
  type: string;
  value: any;
  options: any[] | { [key: string]: string };
  onChange: any;
  label: string;
  disabled: boolean;
  availablePropsForKey: Option;
}

const TableRow = ({
  type,
  value,
  options,
  onChange,
  label,
  disabled,
  availablePropsForKey,
}: TableRowProps) => {
  switch (type) {
    case 'components':
      return (
        <ComponentControl
          type={type}
          label={label}
          value={value}
          options={options}
          onChange={onChange}
          availablePropsForKey={availablePropsForKey}
        />
      );

    default:
      return (
        <PropertyControl
          type={type}
          label={label}
          value={value}
          options={options}
          onChange={onChange}
          disabled={disabled}
        />
      );
  }
};

export default ({
  componentProps,
  availableProps,
  setComponentProps,
}: Props) => {
  return (
    <Container>
      <col width="50%" />
      <col width="50%" />
      <tbody>
        {Object.keys(availableProps).map(prop => {
          const disabled =
            availableProps[prop].disabledWhen &&
            availableProps[prop].disabledWhen(componentProps);

          const options =
            availableProps[prop].options &&
            availableProps[prop].options(componentProps);

          return (
            <TableRow
              key={prop}
              type={availableProps[prop].type}
              label={availableProps[prop].label}
              availablePropsForKey={availableProps[prop]}
              value={componentProps[prop]}
              options={options}
              disabled={disabled}
              onChange={(value: any) =>
                setComponentProps({ ...componentProps, [prop]: value })
              }
            />
          );
        })}
      </tbody>
    </Container>
  );
};
