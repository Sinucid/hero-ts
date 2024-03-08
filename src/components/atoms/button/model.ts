export enum ButtonComponentType {
  Primary = "primary",
  Secondary = "secondary",
}

export interface ButtonComponentAttributes {
  /**
   * Render a link with specified url.
   */
  href?: string;

  /**
   * Represents the visual type of the button.
   *
   * @default ButtonComponentType.Primary
   */
  type?: ButtonComponentType;
}
