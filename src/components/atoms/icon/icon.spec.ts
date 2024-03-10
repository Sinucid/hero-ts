import { fixture, html } from "@open-wc/testing-helpers";
import { defineIconComponent } from "./define";
import { describe, it, expect, beforeEach, beforeAll } from "vitest";
import { IconComponent } from "./icon";
import { IconType } from "./model";
import { iconsMapping } from "./mapping";

describe("IconComponent", () => {
  let element: IconComponent;

  beforeAll(defineIconComponent);

  beforeEach(async () => {
    element = await fixture(
      html`<icon-component type="${IconType.ArrowRight}"></icon-component>`,
    );
  });

  it("should render nothing", () => {
    expect(element.shadowRoot?.textContent).toContain(
      iconsMapping[IconType.ArrowRight],
    );
  });

  describe("when type is not provided", () => {
    beforeEach(async () => {
      element = await fixture(html`<icon-component></icon-component>`);
    });

    it("should render nothing", () => {
      expect(element.shadowRoot?.textContent).toBe("");
    });
  });
});
