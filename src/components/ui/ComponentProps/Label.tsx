import * as React from 'react';
import styled from '@emotion/styled';

interface LabelProps {
  disabled: boolean;
}

export default styled('label')<LabelProps>`
  font-size: 10px;
  font-weight: 600;
  color: #333;
  margin-right: 12px;
  transition: opacity 0.1s ease;
  opacity: ${props => (props.disabled ? 0.5 : 1)};
`;
