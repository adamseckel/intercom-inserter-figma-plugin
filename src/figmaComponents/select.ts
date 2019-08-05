import { Props as SelectProps } from '../components/embercomCore/Select';
import { createDropdownItem } from './dropdownItem';
import { createDropdownGroup } from './dropdownGroup';
import { appendNodesToFrame, resizeNodes } from './utils';
import * as colors from './colors';

const reqSvgs = require.context(
  '../core/svgs/interface-icons/standard',
  true,
  /\.svg$/,
);

const createStyledFrame = ({ props }) => (frame: FrameNode | ComponentNode) => {
  frame.name = 'Dropdown Group';
  frame.backgrounds = [];
  return frame;
};

const createStyledOpener = ({ props }) => (
  frame: FrameNode | ComponentNode,
) => {
  frame.name = 'Opener';
  frame.backgrounds = [];

  return frame;
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
  rect.cornerRadius = 4;

  return rect;
};

const createIcon = ({ props, styles }) => svg => {
  svg.children[0].fills = [styles.color];

  svg.constraints = {
    horizontal: 'MIN',
    vertical: 'MIN',
  };

  return svg;
};

const tabStyles = ({ isOpen }) => ({
  fill: { type: 'SOLID', color: isOpen ? colors.blueLight : colors.white },
  color: { type: 'SOLID', color: isOpen ? colors.blueDark : colors.black },
  border: {
    type: 'SOLID',
    color: isOpen ? colors.blue : colors.borderShadow,
    opacity: isOpen ? 1 : 0.2,
  },
});

export const createSelect = (props: SelectProps) => {
  const styles = tabStyles({
    isOpen: props.isOpen,
  });

  const svgPath = reqSvgs(`./small-down-arrow.svg`);

  const frame = figma.createComponent();
  const opener = figma.createFrame();
  const rect = figma.createRectangle();
  const icon = figma.createNodeFromSvg(svgPath);

  const selectedItem = props.items[props.activeItemIndex];

  const [
    styledFrame,
    styledOpener,
    styledRect,
    styledIcon,
    styledItem,
    styledGroup,
  ] = [
    createStyledFrame({ props })(frame),
    createStyledOpener({ props })(opener),
    createStyledRect({ props, styles })(rect),
    createIcon({ props, styles })(icon),
    createDropdownItem({
      ...selectedItem,
      asComponent: false,
      isOpener: true,
      isOpen: props.isOpen,
    }),
    props.isOpen && createDropdownGroup({ ...props, asComponent: false }),
  ];

  const padding = 6;
  const iconOffset = 0;

  styledItem.x = 1;
  styledItem.y = 1;

  styledIcon.x = styledItem.width + iconOffset;
  styledIcon.y = padding + 1;

  if (props.isOpen) {
    styledGroup.x = 0;
    styledGroup.y = styledItem.height + 2 + 4;
  }

  const openerWidth =
    styledItem.width + styledIcon.width + iconOffset + padding;

  resizeNodes(styledRect, styledOpener)(openerWidth, styledItem.height + 2);

  appendNodesToFrame(styledRect, styledItem, styledIcon)(styledOpener);

  const frameWidth = props.isOpen
    ? Math.max(openerWidth, styledGroup.width)
    : openerWidth;

  const frameHeight = props.isOpen
    ? styledGroup.height + 4 + styledOpener.height
    : styledOpener.height;

  resizeNodes(styledFrame)(frameWidth, frameHeight);

  const nodes = [styledOpener, styledGroup].filter(n => n);

  appendNodesToFrame(...nodes)(styledFrame);

  return styledFrame;
};

export default (props: SelectProps) => {
  const nodes: SelectableNode[] = [];
  const select = createSelect(props);

  nodes.push(select);
  figma.currentPage.appendChild(select);
  figma.currentPage.selection = nodes;
  figma.viewport.scrollAndZoomIntoView(nodes);
};
