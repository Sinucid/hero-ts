import { fixture, html } from "@open-wc/testing-helpers";
import { defineHeroComponent } from "./define";
import { describe, it, expect, beforeEach, beforeAll } from "vitest";
import { HeroComponent } from "./hero";

describe("HeroComponent", () => {
  let element: HeroComponent;

  beforeAll(defineHeroComponent);

  beforeEach(async () => {
    element = await fixture(html`<hero-component></hero-component>`);
  });

  it("should render slots for the content", async () => {
    const slot = element.shadowRoot?.querySelector("slot:not([name])");
    const iconSlot = element.shadowRoot?.querySelector("slot[name]");
    expect(slot).toBeDefined();
    expect(iconSlot).toBeDefined();
  });
});
