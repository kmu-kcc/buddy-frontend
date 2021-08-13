import styled from 'styled-components';
import {
  compose, background, BackgroundProps,
  color, ColorProps,
  typography, TypographyProps,
  width, WidthProps,
  height, HeightProps,
  space, SpaceProps,
} from 'styled-system';

type StyleProps = BackgroundProps & ColorProps & TypographyProps & WidthProps & HeightProps & SpaceProps;

export const Text = styled.p<StyleProps>`
  ${compose(
      background,
      color,
      typography,
      width,
      height,
      space,
  )}
`;

export const Span = Text.withComponent('span');

Text.defaultProps = {
  fontSize: '16px',
  color: '#000',
};
