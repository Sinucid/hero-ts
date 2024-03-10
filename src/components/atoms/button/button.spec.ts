import { fixture, html } from "@open-wc/testing-helpers";
import { defineButtonComponent } from "./define";
import { describe, it, expect, beforeEach, beforeAll } from "vitest";
import { ButtonComponent } from "./button";

describe("ButtonComponent", () => {
  let element: ButtonComponent;

  beforeAll(defineButtonComponent);

  beforeEach(async () => {
    element = await fixture(html`<button-component></button-component>`);
  });

  it("should render button element", () => {
    const button = element.shadowRoot?.querySelector("button");
    expect(button).toBeDefined();
  });

  it("should render slots for the content", () => {
    const slot = element.shadowRoot?.querySelector("slot:not([name])");
    const iconSlot = element.shadowRoot?.querySelector("slot[name]");
    expect(slot).toBeDefined();
    expect(iconSlot).toBeDefined();
  });

  describe("when href is provided", () => {
    const href = "https://example.com";
    beforeEach(async () => {
      element = await fixture(
        html`<button-component href="${href}"></button-component>`,
      );
    });

    it("should render an anchor element with proper href", () => {
      const a = element.shadowRoot?.querySelector(`a[href="${href}"]`);
      expect(a).toBeDefined();
    });
  });

  describe("when icon is slotted", () => {
    beforeEach(async () => {
      element = await fixture(
        html`<button-component>
          <span slot="icon"></span>
        </button-component>`,
      );
    });

    it("should render an anchor element with proper href", () => {
      const icon = element.shadowRoot
        ?.querySelector<HTMLSlotElement>("slot[name]")
        ?.assignedElements()[0];
      expect(icon?.tagName).toBe("SPAN");
    });
  });
});
