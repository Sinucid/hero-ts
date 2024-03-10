import styles from "./app.css?inline";

export class AppComponent extends HTMLElement {
  protected render() {
    this.innerHTML = `
      <style>${styles}</style>
      <main>
        <h2>Static data slider</h2>
        <slider-component>
          <hero-component>
            <img src="/1.jpeg" alt="first slide"/>
            <h1>Ihr zuverlässiger Partner für den Werkzeug- Formen- und Maschinenbau</h1>
            <p>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla
              tincidunt, nunc nec tincidunt.
            </p>
            <button-component slot="actions" href="/">
              Mehr arfahren
              <icon-component type="arrowRight" slot="icon"></icon-component>
            </button-component>
            <button-component slot="actions" href="/" type="secondary">Kontakt</button-component>
          </hero-component>

          <hero-component>
            <img src="/2.jpeg" alt="second slide"/>
            <h1>Ihr zuverlässiger Partner für den Werkzeug- Formen- und Maschinenbau</h1>
            <p>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla
              tincidunt, nunc nec tincidunt.
            </p>
            <button-component slot="actions" href="/">
              Mehr arfahren
              <icon-component type="arrowRight" slot="icon"></icon-component>
            </button-component>
            <button-component slot="actions" href="/" type="secondary">Kontakt</button-component>
          </hero-component>

          <hero-component>
            <img src="/3.jpeg" alt="third slide"/>
            <h1>Ihr zuverlässiger Partner für den Werkzeug- Formen- und Maschinenbau</h1>
            <p>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla
              tincidunt, nunc nec tincidunt.
            </p>
            <button-component slot="actions" href="/">
              Mehr arfahren
              <icon-component type="arrowRight" slot="icon"></icon-component>
            </button-component>
            <button-component slot="actions" href="/" type="secondary">Kontakt</button-component>
          </hero-component>

          <hero-component>
            <img src="/2.jpeg" alt="fourth slide"/>
            <h1>Ihr zuverlässiger Partner für den Werkzeug- Formen- und Maschinenbau</h1>
            <p>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla
              tincidunt, nunc nec tincidunt.
            </p>
            <button-component slot="actions" href="/">
              Mehr arfahren
              <icon-component type="arrowRight" slot="icon"></icon-component>
            </button-component>
            <button-component slot="actions" href="/" type="secondary">Kontakt</button-component>
          </hero-component>
        </slider-component>

        <h2>API data slider</h2>
        <product-slider-component></product-slider-component>
      </main>`;
  }

  async connectedCallback() {
    this.render();
  }
}
