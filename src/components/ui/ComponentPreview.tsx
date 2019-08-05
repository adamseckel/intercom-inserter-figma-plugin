import * as React from 'react';
import * as Core from '../embercomCore';
import styled from '@emotion/styled';
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

const Preview = ({
  component,
  componentProps,
}: {
  component: string;
  componentProps: { [key: string]: string };
}) => {
  let Component = Core[component];

  return <Component {...componentProps} />;
};

interface Props {
  component: string;
  componentProps: { [key: string]: string };
}

export default (props: Props) => (
  <Overflow>
    <PreviewContainer>
      <Row align="center" justify="start">
        <Preview {...props} />
      </Row>
    </PreviewContainer>
  </Overflow>
);
