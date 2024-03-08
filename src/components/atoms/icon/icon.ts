import { Component } from "../../../utils";
import styles from "./icon.css?inline";
import { iconsMapping } from "./mapping";
import { IconComponentAttributes, IconType } from "./model";

export class IconComponent extends Component {
  static get observedAttributes(): (keyof IconComponentAttributes)[] {
    return ["type"];
  }

  attributeChangedCallback() {
    this.render();
  }

  protected override render() {
    const type = this.getAttribute("type");

    this.shadowRoot!.innerHTML = type ? iconsMapping[type as IconType] : "";
  }

  constructor() {
    super();
    this.setupStyles(styles);
  }
}
