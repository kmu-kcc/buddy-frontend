import styled from 'styled-components';
import {
  compose,
  background, BackgroundProps,
  border, BorderProps,
  color, ColorProps,
  flexbox, FlexboxProps,
  grid, GridProps,
  layout, LayoutProps,
  position, PositionProps,
  shadow, ShadowProps,
  space, SpaceProps,
  typography, TypographyProps,
} from 'styled-system';

interface Props extends BackgroundProps, BorderProps, ColorProps,
                        FlexboxProps, GridProps, LayoutProps,
                        PositionProps,
                        SpaceProps, ShadowProps, TypographyProps {
  isFlex?: boolean;
  isBlock?: boolean;
  isInlineFlex?: boolean;
  isInlineBlock?: boolean;
}

export const Box = styled.div<Props>`
  box-sizing: border-box;
  ${compose(
      background,
      border,
      color,
      flexbox,
      grid,
      layout,
      position,
      shadow,
      space,
      typography,
  )}
  ${({isFlex, isBlock, isInlineBlock, isInlineFlex}) => {
    if (isFlex || isBlock || isInlineFlex || isInlineBlock) {
      if (isFlex) {
        return 'display: flex;';
      }
      if (isBlock) {
        return 'display: block;';
      }
      if (isInlineFlex) {
        return 'display: inline-flex;';
      }
      if (isInlineBlock) {
        return 'display: inline-block';
      }
    } else {
      return '';
    }
  }}
`;

Box.defaultProps = {
  display: 'block',
};
