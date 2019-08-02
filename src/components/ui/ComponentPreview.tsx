import * as React from 'react';
import * as Core from '../embercomCore';
import styled from '@emotion/styled';
import { css } from '@emotion/core';
import { Row } from 'emotion-box';

const Overflow = styled('div')`
  overflow: hidden;
`;
const PreviewContainer = styled('div')`
  padding: 18px;
  background: var(--gray-lightest);
  width: 100%;
  overflow: scroll;
`;

const Preview = ({ component, componentProps }) => {
  switch (component) {
    case 'button':
      return <Core.Button {...componentProps} />;
    case 'radioButtonGroup':
      return <Core.RadioButtonGroup {...componentProps} />;
    case 'tabControl':
      return <Core.TabControl {...componentProps} />;
    case 'tab':
      return <Core.Tab {...componentProps} />;
  }
};

export default props => (
  <Overflow>
    <PreviewContainer>
      <Row align="center" justify="start">
        <Preview {...props} />
      </Row>
    </PreviewContainer>
  </Overflow>
);
