import * as React from 'react';
import * as Core from '../embercomCore';
import styled from '@emotion/styled';
import { css } from '@emotion/core';
import { Row } from 'emotion-box';

const PreviewContainer = styled('div')`
  padding: 18px;
  background: var(--gray-lightest);
  width: 100%;
`;

const Preview = ({ component, componentProps }) => {
  switch (component) {
    case 'button':
      return <Core.Button {...componentProps} />;
    case 'radioButtonGroup':
      return <Core.RadioButtonGroup {...componentProps} />;
  }
};

export default props => (
  <PreviewContainer>
    <Row align="center" justify="center">
      <Preview {...props} />
    </Row>
  </PreviewContainer>
);
