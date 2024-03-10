import { fixture, html } from "@open-wc/testing-helpers";
import { defineProductSliderComponent } from "./define";
import { describe, it, expect, beforeEach, beforeAll, vi } from "vitest";
import { ProductSliderComponent } from "./product-slider";

const mockedProduct = {
  image: "mockImage",
  title: "mockTitle",
  description: "mockDescription",
  url: "mockUrl",
};

vi.mock("../../../service", () => {
  return {
    ProductSlidesService: class {
      async get() {
        return [mockedProduct, mockedProduct, mockedProduct];
      }
    },
  };
});

describe("ProductSliderComponent", () => {
  let element: ProductSliderComponent;

  beforeAll(defineProductSliderComponent);

  beforeEach(async () => {
    element = await fixture(
      html`<product-slider-component></product-slider-component>`,
    );
  });

  it("should render slides data from service", () => {
    const slides = element.querySelectorAll("hero-component");
    expect(slides?.length).toBe(3);
  });
});
