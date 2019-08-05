import { Props as ItemProps } from '../components/embercomCore/DropdownItem';
import * as colors from './colors';
import { appendNodesToFrame, resizeNodes } from './utils';
const reqSvgs = require.context(
  '../core/svgs/interface-icons/standard',
  true,
  /\.svg$/,
);

const tabStyles = ({ isActive, isOpen }) => ({
  fill: { type: 'SOLID', color: isOpen ? colors.blueLight : colors.white },
  color: {
    type: 'SOLID',
    color: isOpen ? colors.blueDark : isActive ? colors.blue : colors.black,
  },
  descriptionValueColor: {
    type: 'SOLID',
    color: colors.gray,
  },
});

const createStyledRect = ({ props, styles }) => (rect: RectangleNode) => {
  rect.name = 'Background';
  rect.fills = props.isOpen ? [] : [styles.fill];
  rect.x = 0;
  rect.constraints = {
    horizontal: 'STRETCH',
    vertical: 'STRETCH',
  };
  rect.cornerRadius = props.isOpener ? 4 : 0;

  return rect;
};

const createStyledText = ({ props, styles, font }) => (text: TextNode) => {
  text.name = 'Label';
  text.characters = props.label;
  text.textAutoResize = 'WIDTH_AND_HEIGHT';
  text.constraints = {
    horizontal: 'MIN',
    vertical: 'MIN',
  };
  text.x = 0;
  text.textAlignVertical = 'CENTER';
  text.autoRename = true;
  text.fontName = font;
  text.fontSize = 14;
  text.fills = [styles.color];

  return text;
};

const createStyledTextCount = ({ props, styles, font }) => (text: TextNode) => {
  text.name = 'Label';
  text.characters = props.count;
  text.textAutoResize = 'WIDTH_AND_HEIGHT';
  text.constraints = {
    horizontal: 'MIN',
    vertical: 'MIN',
  };
  text.x = 0;
  text.textAlignHorizontal = 'LEFT';
  text.textAlignVertical = 'CENTER';
  text.autoRename = true;
  text.fontName = font;
  text.fontSize = 14;
  text.fills = [styles.descriptionValueColor];

  return text;
};

const createStyledTextDescription = ({ props, styles, font }) => (
  text: TextNode,
) => {
  text.name = 'Description';
  text.characters = props.description;
  text.textAutoResize = 'WIDTH_AND_HEIGHT';
  text.constraints = {
    horizontal: 'STRETCH',
    vertical: 'STRETCH',
  };
  text.x = 0;
  text.textAlignHorizontal = 'LEFT';
  text.textAlignVertical = 'TOP';
  text.autoRename = true;
  text.fontName = font;
  text.fontSize = 13;
  text.fills = [styles.descriptionValueColor];

  return text;
};

const createStyledFrame = ({ props }) => (frame: FrameNode | ComponentNode) => {
  frame.name = 'DropdownItem';
  frame.opacity = props.isDisabled ? 0.5 : 1;
  frame.backgrounds = [];
  frame.constraints = {
    horizontal: 'STRETCH',
    vertical: 'STRETCH',
  };
  return frame;
};

const createIcon = ({ props, styles }) => svg => {
  svg.children[0].fills = [styles.color];

  svg.constraints = {
    horizontal: 'MIN',
    vertical: 'MIN',
  };

  return svg;
};

const createCheck = ({ props, styles }) => svg => {
  svg.children[0].fills = [styles.color];

  svg.constraints = {
    horizontal: 'MAX',
    vertical: 'MIN',
  };

  return svg;
};

export interface Props extends ItemProps {
  asComponent?: boolean;
  isOpener?: boolean;
  isOpen?: boolean;
}

export const createDropdownItem = ({ asComponent = true, ...props }: Props) => {
  const font = {
    family: 'SF Pro Text',
    style: 'Medium',
  };

  const styles = tabStyles({
    isActive: props.isActive,
    isOpen: props.isOpen,
  });

  const svgPath = reqSvgs(`./check.svg`);
  const iconPath = reqSvgs(`./${props.icon}.svg`);

  const frame = asComponent ? figma.createComponent() : figma.createFrame();
  const rect = figma.createRectangle();
  const text = figma.createText();
  const description = props.description && figma.createText();
  const count = props.count && figma.createText();
  const svg = props.isActive && figma.createNodeFromSvg(svgPath);
  const icon = props.hasIcon && figma.createNodeFromSvg(iconPath);

  const [
    styledFrame,
    styledRect,
    styledText,
    styledDescription,
    styledCount,
    styledCheck,
    styledIcon,
  ] = [
    createStyledFrame({ props })(frame),
    createStyledRect({ props, styles })(rect),
    createStyledText({ props, styles, font })(text),

    props.description &&
      createStyledTextDescription({ props, styles, font })(description),
    props.count && createStyledTextCount({ props, styles, font })(count),
    props.isActive && createCheck({ props, styles })(svg),
    props.hasIcon && createIcon({ props, styles })(icon),
  ];

  const verticalPadding = 6;
  const horizontalPadding = 12;
  const iconMargin = 10;
  const countMargin = 5;

  const iconWidth = props.hasIcon ? styledIcon.width + iconMargin : 0;

  const height =
    verticalPadding * 2 +
    styledText.height +
    (props.description ? styledDescription.height : 0);

  const topWidth =
    iconWidth +
    styledText.width +
    (props.isActive ? 16 + iconMargin : 0) +
    (props.count ? styledCount.width + countMargin : 0);

  const bottomWidth =
    (styledDescription ? styledDescription.width : 0) + iconWidth;

  const width = horizontalPadding * 2 + Math.max(topWidth, bottomWidth);

  resizeNodes(styledFrame, styledRect)(width, height);

  if (styledCount) {
    styledCount.y = verticalPadding;
    styledCount.x =
      iconWidth + styledText.width + horizontalPadding + countMargin;
  }

  if (styledIcon) {
    styledIcon.x = horizontalPadding;
    styledIcon.y = verticalPadding;
  }

  if (styledCheck) {
    const xBasedOnTop =
      horizontalPadding +
      iconWidth +
      styledText.width +
      (props.count ? styledCount.width + countMargin : 0) +
      iconMargin;

    const xBasedOnDescription = +horizontalPadding + bottomWidth - 16;

    const x = Math.max(xBasedOnTop, xBasedOnDescription);

    styledCheck.y = verticalPadding;
    styledCheck.x = x;
  }

  if (props.description) {
    styledDescription.y = verticalPadding + styledText.height;
    styledDescription.x = horizontalPadding + iconWidth;
  }

  styledText.y = verticalPadding;
  styledText.x = horizontalPadding + iconWidth;

  const nodes = [
    styledRect,
    styledText,
    styledDescription,
    styledCount,
    styledCheck,
    styledIcon,
  ].filter(n => n);

  appendNodesToFrame(...nodes)(styledFrame);

  return styledFrame;
};

export default (props: Props) => {
  const nodes: SelectableNode[] = [];
  const buttonFrame = createDropdownItem(props);

  nodes.push(buttonFrame);
  figma.currentPage.appendChild(buttonFrame);
  figma.currentPage.selection = nodes;
  figma.viewport.scrollAndZoomIntoView(nodes);
};
