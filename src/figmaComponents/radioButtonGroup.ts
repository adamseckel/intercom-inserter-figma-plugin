import { Props as RadioButtonGroupProps } from '../components/embercomCore/RadioButtonGroup';
import { createButton } from './button';
import { appendNodesToFrame, resizeNodes } from './utils';

//duplicated from '../components/embercomCore/Button' because of weird webpack issues
enum ButtonType {
  Secondary = 'secondary',
}

const positionMap = (i, length) => {
  if (i === 0) return 'start';
  if (i > 0 && i + 1 < length) return 'middle';
  if (i + 1 === length) return 'end';
};

const defaultButtonProps = {
  buttonType: ButtonType['Secondary'],
};

const positionRadioButtons = buttons => {
  buttons.reduce((offset, button) => {
    button.x = offset;
    return offset + button.width - 1;
  }, 0);
};

const stretchRadioButtons = buttons => {
  buttons.forEach(
    button =>
      (button.constraints = {
        horizontal: 'SCALE',
        vertical: 'SCALE',
      }),
  );
};

const createStyledFrame = ({ props }) => (frame: FrameNode | ComponentNode) => {
  frame.name = 'Radio Button Group';
  frame.opacity = props.isDisabled ? 0.5 : 1;
  frame.backgrounds = [];
  return frame;
};

const createButtons = ({ props }) => {
  return props.buttons.map((buttonProps, i) =>
    createButton({
      ...defaultButtonProps,
      ...buttonProps,
      asComponent: false,
      isActive: i.toString() === props.activeButtonIndex.toString(),
      position: positionMap(i, props.buttons.length),
    }),
  );
};

export default (props: RadioButtonGroupProps) => {
  const nodes: SelectableNode[] = [];
  const frame = figma.createComponent();

  const [styledFrame, buttons] = [
    createStyledFrame({ props })(frame),
    createButtons({ props }),
  ];

  positionRadioButtons(buttons);
  stretchRadioButtons(buttons);

  const width = buttons.reduce((width, button) => width + button.width, 0);
  resizeNodes(styledFrame)(width);

  const activeButton = buttons.splice(props.activeButtonIndex, 1);
  appendNodesToFrame(...buttons)(styledFrame);
  appendNodesToFrame(...activeButton)(styledFrame);

  nodes.push(styledFrame);
  figma.currentPage.appendChild(styledFrame);
  figma.currentPage.selection = nodes;
  figma.viewport.scrollAndZoomIntoView(nodes);
};
