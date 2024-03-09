export class Component extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });
  }

  connectedCallback() {
    this.render();
  }

  protected setupStyles(styles: string | string[]) {
    const sheet = new CSSStyleSheet();
    sheet.replaceSync(Array.isArray(styles) ? styles.join("") : styles);
    this.shadowRoot!.adoptedStyleSheets = [sheet];
  }

  protected render() {
    this.shadowRoot!.innerHTML = ``;
  }
}
