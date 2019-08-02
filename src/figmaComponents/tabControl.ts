import { createTab, Props as TabProps } from './tab';
import { appendNodesToFrame, resizeNodes } from './utils';
import { Props as TabControlProps } from '../components/embercomCore/TabControl';
import * as colors from './colors';

const positionMap = (i, length) => {
  if (i === 0) return 'start';
  if (i > 0 && i + 1 < length) return 'middle';
  if (i + 1 === length) return 'end';
};

const positionTabs = tabs => {
  tabs.reduce((offset, tab, i) => {
    tab.x = offset;
    return offset + tab.width + 20;
  }, 0);
};

const stretchTabs = buttons => {
  buttons.forEach(
    button =>
      (button.constraints = {
        horizontal: 'SCALE',
        vertical: 'SCALE',
      }),
  );
};

const createStyledFrame = ({ props }) => (frame: FrameNode | ComponentNode) => {
  frame.name = 'Tab Control Group';
  frame.backgrounds = [{ type: 'SOLID', color: colors.white }];
  return frame;
};

const createTabs = ({ props }) => {
  return props.tabs.map((tabProps, i) =>
    createTab({
      ...tabProps,
      asComponent: false,
      isActive: i.toString() === props.activeTabIndex.toString(),
      position: positionMap(i, props.tabs.length),
    }),
  );
};

export default (props: TabControlProps) => {
  const nodes: SelectableNode[] = [];
  const frame = figma.createComponent();

  const [styledFrame, tabs] = [
    createStyledFrame({ props })(frame),
    createTabs({ props }),
  ];

  positionTabs(tabs);
  stretchTabs(tabs);

  const width = tabs.reduce(
    (width, tab, i) => width + tab.width + (i + 1 === tabs.length ? 0 : 20),
    0,
  );
  resizeNodes(styledFrame)(width, 36);

  appendNodesToFrame(...tabs)(styledFrame);

  nodes.push(styledFrame);
  figma.currentPage.appendChild(styledFrame);
  figma.currentPage.selection = nodes;
  figma.viewport.scrollAndZoomIntoView(nodes);
};
