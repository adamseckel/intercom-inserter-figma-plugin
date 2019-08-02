import { Props as ButtonProps } from '../components/embercomCore/Button';
import * as colors from './colors';
import { appendNodesToFrame, resizeNodes } from './utils';

const reqSvgs = require.context(
  '../core/svgs/interface-icons/standard',
  true,
  /\.svg$/,
);

const buttonTypeMap = ({ isSubtle, isActive }) => ({
  primary: {
    fill: { type: 'SOLID', color: isActive ? colors.blueDark : colors.blue },
    color: { type: 'SOLID', color: colors.white },
    border: {
      type: 'SOLID',
      color: colors.borderShadow,
      opacity: 0.2,
    },
  },
  secondary: {
    fill: { type: 'SOLID', color: colors.white },
    color: { type: 'SOLID', color: isActive ? colors.blue : colors.black },
    border: {
      type: 'SOLID',
      color: isActive ? colors.blue : colors.borderShadow,
      opacity: isActive ? 1 : isSubtle ? 0 : 0.2,
    },
  },
  'primary-destructive': {
    fill: { type: 'SOLID', color: isActive ? colors.redDark : colors.red },
    color: { type: 'SOLID', color: colors.white },
    border: {
      type: 'SOLID',
      color: colors.borderShadow,
      opacity: 0.2,
    },
  },
  'secondary-destructive': {
    fill: { type: 'SOLID', color: colors.white },
    color: { type: 'SOLID', color: isActive ? colors.white : colors.red },
    border: {
      type: 'SOLID',
      color: isActive ? colors.red : colors.borderShadow,
      opacity: isActive ? 1 : isSubtle ? 0 : 0.2,
    },
  },
  'primary-live': {
    fill: { type: 'SOLID', color: isActive ? colors.greenDark : colors.green },
    color: { type: 'SOLID', color: colors.white },
    border: {
      type: 'SOLID',
      color: colors.borderShadow,
      opacity: 0.2,
    },
  },

  'secondary-live': {
    fill: { type: 'SOLID', color: colors.white },
    color: { type: 'SOLID', color: colors.green },
    border: {
      type: 'SOLID',
      color: isActive ? colors.green : colors.borderShadow,
      opacity: isActive ? 1 : isSubtle ? 0 : 0.2,
    },
  },

  'primary-on-blue': {
    fill: { type: 'SOLID', color: colors.white },
    color: { type: 'SOLID', color: isActive ? colors.blueDark : colors.blue },
    border: {
      type: 'SOLID',
      color: isActive ? colors.blueDark : colors.borderShadow,
      opacity: 0.2,
    },
  },

  'secondary-on-blue': {
    fill: { type: 'SOLID', color: colors.blue },
    color: { type: 'SOLID', color: colors.white },
    border: {
      type: 'SOLID',
      color: colors.white,
      opacity: isActive ? 1 : isSubtle ? 0 : 0.6,
    },
  },
});

const createCornerRadiusForPosition = props => rect => {
  switch (props.position) {
    case 'start':
      rect.topLeftRadius = 4;
      rect.topRightRadius = 0;
      rect.bottomLeftRadius = 4;
      rect.bottomRightRadius = 0;
      break;
    case 'middle':
      rect.topLeftRadius = 0;
      rect.topRightRadius = 0;
      rect.bottomLeftRadius = 0;
      rect.bottomRightRadius = 0;
      break;
    case 'end':
      rect.topLeftRadius = 0;
      rect.topRightRadius = 4;
      rect.bottomLeftRadius = 0;
      rect.bottomRightRadius = 4;
      break;
    default:
      rect.topLeftRadius = 4;
      rect.topRightRadius = 4;
      rect.bottomLeftRadius = 4;
      rect.bottomRightRadius = 4;
      break;
  }
};

const createStyledRect = ({ props, styles }) => (rect: RectangleNode) => {
  rect.name = 'Background';
  rect.fills = [styles.fill];
  rect.strokes = [styles.border];
  rect.x = 0;
  rect.constraints = {
    horizontal: 'STRETCH',
    vertical: 'STRETCH',
  };

  createCornerRadiusForPosition(props)(rect);

  return rect;
};

const createStyledText = ({ props, styles, font }) => (text: TextNode) => {
  text.name = 'Label';
  text.characters = props.label;
  text.textAutoResize = 'WIDTH_AND_HEIGHT';
  text.constraints = {
    horizontal: 'STRETCH',
    vertical: 'STRETCH',
  };
  text.x = props.hasIcon ? 16 + 3 : 0;
  text.textAlignHorizontal = 'CENTER';
  text.textAlignVertical = 'CENTER';
  text.autoRename = true;
  text.fontName = font;
  text.fontSize = 14;
  text.fills = [styles.color];

  return text;
};

const createIcon = ({ props, styles, x }) => svg => {
  svg.children[0].fills = [styles.color];
  svg.y = 8;
  svg.x = x;

  svg.constraints = {
    horizontal: 'CENTER',
    vertical: 'CENTER',
  };

  return svg;
};

const createStyledFrame = ({ props }) => (frame: FrameNode | ComponentNode) => {
  frame.name = 'Button';
  frame.opacity = props.isDisabled ? 0.5 : 1;
  frame.backgrounds = [];
  return frame;
};

interface Props extends ButtonProps {
  position?: 'start' | 'middle' | 'end';
  asComponent?: boolean;
}

export const createButton = ({ asComponent = true, ...props }: Props) => {
  const font = {
    family: 'SF Pro Text',
    style: 'Medium',
  };

  const styles = buttonTypeMap({
    isSubtle: props.isSubtle,
    isActive: props.isActive,
  })[props.buttonType];

  const frame = asComponent ? figma.createComponent() : figma.createFrame();
  const rect = figma.createRectangle();
  const text = figma.createText();
  const svgPath = reqSvgs(`./${props.icon}.svg`);

  const svg = props.hasIcon && figma.createNodeFromSvg(svgPath);

  const [styledFrame, styledRect, styledText] = [
    createStyledFrame({ props })(frame),
    createStyledRect({ props, styles })(rect),
    createStyledText({ props, styles, font })(text),
  ];

  const width = styledText.width + (props.hasIcon ? 16 + 3 : 0) + 12 * 2;
  const textWidth = styledText.width + 12 * 2;

  resizeNodes(styledFrame, styledRect)(width);
  resizeNodes(styledText)(textWidth);

  appendNodesToFrame(styledRect, styledText)(styledFrame);

  if (props.hasIcon) {
    const x = width / 2 - styledText.width / 2;
    const styledIcon = createIcon({ props, styles, x })(svg);

    appendNodesToFrame(styledIcon)(styledFrame);
  }

  return frame;
};

export default (props: Props) => {
  const nodes: SelectableNode[] = [];
  const buttonFrame = createButton(props);

  nodes.push(buttonFrame);
  figma.currentPage.appendChild(buttonFrame);
  figma.currentPage.selection = nodes;
  figma.viewport.scrollAndZoomIntoView(nodes);
};
