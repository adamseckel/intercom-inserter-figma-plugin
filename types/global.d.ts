declare namespace JSX {
  interface IElementProps {
    [key: string]: any;
    style?: { [key: string]: any };
    children?: any;
  }

  interface ISVGElementProps extends IElementProps {
    svg: string;
  }

  interface IImgElementProps extends IElementProps {
    src: string;
  }

  interface IntrinsicElements {
    View: IElementProps;
    Text: IElementProps;
    SVG: ISVGElementProps;
    Image: IImgElementProps;
  }
}
