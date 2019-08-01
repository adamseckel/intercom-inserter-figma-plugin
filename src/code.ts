// This plugin will open a modal to prompt the user to enter a number, and
// it will then create that many rectangles on the screen.

// This file holds the main code for the plugins. It has access to the *document*.
// You can access browser APIs in the <script> tag inside "ui.html" which has a
// full browser enviroment (see documentation).

// import createRadioButtonGroup from './generators/radioButtonGroup';

// This shows the HTML page in "ui.html".
figma.showUI(__html__, { height: 500, width: 400 });

// Calls to "parent.postMessage" from within the HTML page will trigger this
// callback. The callback will be passed the "pluginMessage" property of the
// posted message.
figma.ui.onmessage = async ({ type, component, props }) => {
  // One way of distinguishing between different types of messages sent from
  // your HTML page is to use an object with a "type" property like this.
  if (type === 'create-component') {
    await createComponent(component, props);
  }

  // Make sure to close the plugin when you're done. Otherwise the plugin will
  // keep running, which shows the cancel button at the bottom of the screen.
  figma.closePlugin();
};

const createComponent = async (component, properties) => {
  switch (component) {
    case 'button':
      await createButton(properties);
      break;
    case 'radioButtonGroup':
      // await createRadioButtonGroup(properties);
      break;
    default:
      break;
  }
};

const buttonTypeColorHash = {
  Primary: {
    r: 255 / 255,
    g: 255 / 255,
    b: 255 / 255,
  },
  Secondary: {
    r: 34 / 255,
    g: 34 / 255,
    b: 34 / 255,
  },
};

const buttonTypeBackgroundHash = {
  Primary: {
    r: 40 / 255,
    g: 110 / 255,
    b: 250 / 255,
  },
  Secondary: {
    r: 255 / 255,
    g: 255 / 255,
    b: 255 / 255,
  },
};

const buttonStateBackgroundHash = {
  Destructive: {
    r: 253 / 255,
    g: 58 / 255,
    b: 87 / 255,
  },
  Live: {
    r: 27 / 255,
    g: 177 / 255,
    b: 87 / 255,
  },
};

const createButtonFrame = (frame, props) => {
  frame.name = 'Background';

  if (props.state === '' || props.type === 'Secondary') {
    frame.fills = [
      { type: 'SOLID', color: buttonTypeBackgroundHash[props.type] },
    ];
  } else {
    frame.fills = [
      {
        type: 'SOLID',
        color: buttonStateBackgroundHash[props.state],
      },
    ];
  }

  frame.strokes = props.subtle
    ? []
    : [{ type: 'SOLID', color: { r: 0, g: 0, b: 0 }, opacity: 0.2 }];

  frame.x = 0;
  frame.resize(60, 32);
  frame.constraints = {
    horizontal: 'STRETCH',
    vertical: 'STRETCH',
  };
  frame.cornerRadius = 4;

  return frame;
};

const createButtonLabel = (text, font, props) => {
  text.name = 'Label';
  text.characters = props.label;
  text.textAutoResize = 'WIDTH_AND_HEIGHT';
  text.autoRename = true;
  text.fontName = font;

  if (props.state === '' || props.type === 'Primary') {
    text.fills = [{ type: 'SOLID', color: buttonTypeColorHash[props.type] }];
  } else {
    text.fills = [
      { type: 'SOLID', color: buttonStateBackgroundHash[props.state] },
    ];
  }

  text.constraints = {
    horizontal: 'STRETCH',
    vertical: 'STRETCH',
  };
  // text.textStyleID =
  text.textAlignHorizontal = 'CENTER';
  text.textAlignVertical = 'CENTER';

  return text;
};

const createButton = async props => {
  console.log({ props });
  await figma.loadFontAsync({
    family: 'SF Pro Text',
    style: 'Medium',
  });

  const nodes: SelectableNode[] = [];
  const frame = figma.createComponent();
  frame.name = 'Button';

  frame.opacity = props.disabled ? 0.5 : 1;

  const rect = figma.createRectangle();
  const text = figma.createText();
  const styledFrame = createButtonFrame(rect, props);
  const label = await createButtonLabel(
    text,
    {
      family: 'SF Pro Text',
      style: 'Medium',
    },
    props,
  );

  const width = label.width + 12 * 2;

  frame.resize(width, 32);
  styledFrame.resize(width, 32);
  label.resize(width, 32);

  frame.appendChild(styledFrame);
  frame.appendChild(label);
  nodes.push(frame);
  figma.currentPage.appendChild(frame);
  figma.currentPage.selection = nodes;
  figma.viewport.scrollAndZoomIntoView(nodes);
};
