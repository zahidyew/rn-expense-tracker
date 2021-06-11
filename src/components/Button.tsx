import {
  createBox,
  createRestyleComponent,
  createVariant,
  VariantProps,
} from '@shopify/restyle';
import { Theme } from '@styles/restyle';

const Box = createBox<Theme>();

const Button = createRestyleComponent<
  VariantProps<Theme, 'buttonVariants'> & React.ComponentProps<typeof Box>,
  Theme
>([createVariant({ themeKey: 'buttonVariants' })], Box);

export default Button;
