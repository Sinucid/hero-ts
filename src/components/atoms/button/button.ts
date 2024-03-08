import { Component } from "../../../utils";

import styles from "./button.css?inline";
import { ButtonComponentAttributes } from "./model";

export class ButtonComponent extends Component {
  static get observedAttributes(): (keyof ButtonComponentAttributes)[] {
    return ["href"];
  }

  attributeChangedCallback() {
    this.render();
  }

  protected override render() {
    const content = `<slot></slot><slot name="icon"></slot>`;
    const href = this.getAttribute("href");

    this.shadowRoot!.innerHTML = href
      ? `<a href=${href}>${content}</a>`
      : `<button>${content}</button>`;
  }

  constructor() {
    super();
    this.setupStyles(styles);
  }
}
