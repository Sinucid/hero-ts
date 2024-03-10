import { HeroComponent } from "./hero";

export const defineHeroComponent = () =>
  customElements.define("hero-component", HeroComponent);
