import * as Components from './figmaComponents';

figma.showUI(__html__, { height: 500, width: 400 });

figma.ui.onmessage = async ({ component, props }) => {
  await figma.loadFontAsync({
    family: 'SF Pro Text',
    style: 'Medium',
  });

  // needed to instantiate empty text node
  await figma.loadFontAsync({
    family: 'Roboto',
    style: 'Regular',
  });

  Components[component](props);

  figma.closePlugin();
};
