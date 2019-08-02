import { Props as TabProps } from '../components/embercomCore/Tab';
import * as colors from './colors';
import { appendNodesToFrame, resizeNodes } from './utils';

const tabStyles = ({ isActive }) => ({
  fill: { type: 'SOLID', color: colors.white },
  color: { type: 'SOLID', color: isActive ? colors.blue : colors.black },
  attributeColor: {
    type: 'SOLID',
    color: isActive ? colors.blue : colors.gray,
  },
  border: {
    type: 'SOLID',
    color: colors.blue,
    opacity: 1,
  },
});

const createStyledRect = ({ props, styles }) => (rect: RectangleNode) => {
  rect.name = 'Background';
  rect.fills = [styles.fill];
  rect.x = 0;
  rect.constraints = {
    horizontal: 'STRETCH',
    vertical: 'STRETCH',
  };

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
  text.x = 0;
  text.textAlignVertical = 'CENTER';
  text.autoRename = true;
  text.fontName = font;
  text.fills = [styles.color];

  return text;
};

const createStyledTextAttribute = ({ props, styles, font }) => (
  text: TextNode,
) => {
  text.name = 'Label';
  text.characters = `(${props.attribute})`;
  text.textAutoResize = 'WIDTH_AND_HEIGHT';
  text.constraints = {
    horizontal: 'STRETCH',
    vertical: 'STRETCH',
  };
  text.x = 0;
  text.textAlignHorizontal = 'CENTER';
  text.textAlignVertical = 'CENTER';
  text.autoRename = true;
  text.fontName = font;
  text.fills = [styles.attributeColor];

  return text;
};

const createStyledFrame = ({ props }) => (frame: FrameNode | ComponentNode) => {
  frame.name = 'Button';
  frame.opacity = props.isDisabled ? 0.5 : 1;
  frame.backgrounds = [];
  frame.effects = [
    {
      type: 'INNER_SHADOW',
      color: { ...colors.blue, a: 1 },
      offset: { x: 0, y: -2 },
      radius: 0,
      visible: props.isActive,
      blendMode: 'NORMAL',
    },
  ];
  return frame;
};

export interface Props extends TabProps {
  position?: 'start' | 'middle' | 'end';
  asComponent?: boolean;
}

export const createTab = ({ asComponent = true, ...props }: Props) => {
  const font = {
    family: 'SF Pro Text',
    style: 'Medium',
  };

  const styles = tabStyles({
    isActive: props.isActive,
  });

  const frame = asComponent ? figma.createComponent() : figma.createFrame();
  const rect = figma.createRectangle();
  const text = figma.createText();
  const attribute = figma.createText();

  const [styledFrame, styledRect, styledText, styledAttribute] = [
    createStyledFrame({ props })(frame),
    createStyledRect({ props, styles })(rect),
    createStyledText({ props, styles, font })(text),
    props.attribute &&
      createStyledTextAttribute({ props, styles, font })(attribute),
  ];

  const width = styledText.width;
  const attributeWidth = styledAttribute && styledAttribute.width;

  if (styledAttribute) {
    resizeNodes(styledAttribute)(styledAttribute.width, 36);
    styledAttribute.x = styledText.width + 3;
    resizeNodes(styledText)(width, 36);
    resizeNodes(styledFrame, styledRect)(width + 3 + attributeWidth, 36);
    appendNodesToFrame(styledRect, styledText, styledAttribute)(styledFrame);
  } else {
    resizeNodes(styledFrame, styledRect, styledText)(width, 36);
    appendNodesToFrame(styledRect, styledText)(styledFrame);
  }

  return frame;
};

export default (props: Props) => {
  const nodes: SelectableNode[] = [];
  const buttonFrame = createTab(props);

  nodes.push(buttonFrame);
  figma.currentPage.appendChild(buttonFrame);
  figma.currentPage.selection = nodes;
  figma.viewport.scrollAndZoomIntoView(nodes);
};
