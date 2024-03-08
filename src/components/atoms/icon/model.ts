export enum IconType {
  ArrowRight = "arrowRight",
  ChevronLeft = "chevronLeft",
  ChevronRight = "chevronRight",
}

export interface IconComponentAttributes {
  /**
   * Type of the icon.
   */
  type?: IconType;
}
