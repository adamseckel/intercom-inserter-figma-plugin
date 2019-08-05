import { Props as DropdownGroupProps } from '../components/embercomCore/DropdownGroup';
import { createDropdownItem } from './dropdownItem';
import { appendNodesToFrame, resizeNodes } from './utils';
import * as colors from './colors';

const verticalPadding = 9;

const positionItems = items => {
  items.reduce((offset, item) => {
    item.y = offset;
    return offset + item.height;
  }, verticalPadding);
};

const createStyledFrame = ({ props }) => (frame: FrameNode | ComponentNode) => {
  frame.name = 'Dropdown Group';
  frame.backgrounds = [];
  return frame;
};

const createStyledRect = ({ props }) => (rect: RectangleNode) => {
  rect.name = 'Background';
  rect.fills = [{ type: 'SOLID', color: colors.white }];
  rect.x = 0;
  rect.constraints = {
    horizontal: 'STRETCH',
    vertical: 'STRETCH',
  };
  rect.cornerRadius = 4;
  rect.effects = [
    {
      type: 'DROP_SHADOW',
      color: { ...colors.borderShadow, a: 0.2 },
      offset: { x: 0, y: 4 },
      radius: 14,
      visible: true,
      blendMode: 'NORMAL',
    },
  ];

  return rect;
};

const createDropdownItems = ({ props }) => {
  return props.items.map((itemProps, i) =>
    createDropdownItem({
      ...itemProps,
      asComponent: false,
      isActive: i.toString() === props.activeItemIndex.toString(),
    }),
  );
};

export interface Props extends DropdownGroupProps {
  asComponent?: boolean;
}

export const createDropdownGroup = ({
  asComponent = true,
  ...props
}: Props) => {
  const frame = asComponent ? figma.createComponent() : figma.createFrame();
  const rect = figma.createRectangle();

  const [styledFrame, styledRect, items] = [
    createStyledFrame({ props })(frame),
    createStyledRect({ props })(rect),
    createDropdownItems({ props }),
  ];

  positionItems(items);

  const width = Math.max(...items.map(item => item.width));
  const height =
    items.reduce((height, item) => height + item.height, 0) +
    verticalPadding * 2;

  resizeNodes(styledFrame, styledRect)(width, height);

  items.forEach(item => {
    resizeNodes(item)(width, item.height);
  });
  appendNodesToFrame(styledRect, ...items)(styledFrame);

  return styledFrame;
};

export default (props: Props) => {
  const nodes: SelectableNode[] = [];
  const frame = createDropdownGroup(props);

  nodes.push(frame);
  figma.currentPage.appendChild(frame);
  figma.currentPage.selection = nodes;
  figma.viewport.scrollAndZoomIntoView(nodes);
};
