import styled from 'styled-components';
import {
  compose, background, BackgroundProps,
  color, ColorProps,
  flex, FlexProps,
  typography, TypographyProps,
  width, WidthProps,
  height, HeightProps,
  space, SpaceProps,
} from 'styled-system';

type StyleProps = BackgroundProps & ColorProps & FlexProps & TypographyProps & WidthProps & HeightProps & SpaceProps;

export const Text = styled.p<StyleProps>`
  margin-block-start: 0;
  margin-block-end: 0;
  ${compose(
      background,
      color,
      flex,
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
