import { fixture, html } from "@open-wc/testing-helpers";
import { describe, it, expect, beforeEach, beforeAll } from "vitest";
import { Component } from "./component";

describe("Component", () => {
  let element: Component;

  beforeAll(() => customElements.define("test-component", Component));

  beforeEach(async () => {
    element = await fixture(html`<test-component></test-component>`);
  });

  it("should create shadow root", () => {
    expect(element.shadowRoot).toBeDefined();
  });
});
