import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { Global, css } from '@emotion/core';
import Inserter from './components/ui/Inserter';

import { palette } from './core/palette';
declare function require(path: string): any;

const variables = Object.keys(palette).reduce(
  (variables, paletteKey) => ({
    ...variables,
    [`--${paletteKey}`]: palette[paletteKey],
  }),
  {},
);

class App extends React.Component {
  type: String;

  typeRef = (element: HTMLInputElement) => {
    this.type = element.value;
  };

  onCreate = () => {
    const count = this.type;
    parent.postMessage(
      { pluginMessage: { type: 'create-rectangles', count } },
      '*',
    );
  };

  onCancel = () => {
    parent.postMessage({ pluginMessage: { type: 'cancel' } }, '*');
  };

  render() {
    return (
      <div style={variables}>
        <Global
          styles={css`
            * {
              margin: 0;
              box-sizing: border-box;
            }

            body {
              font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto,
                Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue',
                sans-serif;
            }
          `}
        />

        <Inserter />
      </div>
    );
  }
}

ReactDOM.render(<App />, document.getElementById('react-page'));
