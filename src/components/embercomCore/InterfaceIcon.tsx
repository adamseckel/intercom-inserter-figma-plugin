import * as React from 'react';
import styled from '@emotion/styled';

const Icon = styled('span')`
  svg {
    width: 16px;
    height: 16px;
    margin-right: 3px;
    display: inline-block;
    vertical-align: bottom;
    margin-bottom: 1px;
  }
`;

const reqSvgs = require.context(
  '../../core/svgs/interface-icons/standard',
  true,
  /\.svg$/,
);

export default ({ icon, ...props }) => {
  const image = reqSvgs(`./${icon}.svg`);

  return <Icon dangerouslySetInnerHTML={{ __html: image }} />;
};
