import { AppComponent } from "./app";

export const defineAppComponent = () =>
  customElements.define("app-root", AppComponent);
