import { HeroComponent } from "./hero";

export const defileHeroComponent = () =>
  customElements.define("hero-component", HeroComponent);
