import { Component } from "../../../utils";

import styles from "./hero.css?inline";

export class HeroComponent extends Component {
  protected override render() {
    this.shadowRoot!.innerHTML = `
      <slot></slot>
      <slot name="actions"></slot>
    `;
  }

  constructor() {
    super();
    this.setupStyles(styles);
  }
}
