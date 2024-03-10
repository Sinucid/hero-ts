import { fixture, html } from "@open-wc/testing-helpers";
import { defineSliderComponent } from "./define";
import {
  describe,
  it,
  expect,
  beforeEach,
  beforeAll,
  vi,
  MockInstance,
  afterEach,
} from "vitest";
import { SliderComponent } from "./slider";

describe("SliderComponent", () => {
  let element: SliderComponent;

  const checkActiveSlide = (index: number) => {
    const indicators = element.shadowRoot?.querySelectorAll("section ul li");
    expect(indicators?.[index].classList.contains("active")).toBe(true);
  };

  const checkButtonsDisabled = (
    prevDisabled: boolean,
    nextDisabled: boolean,
  ) => {
    const buttons = element.shadowRoot?.querySelectorAll("button");
    expect(buttons?.[0].disabled).toBe(prevDisabled);
    expect(buttons?.[1].disabled).toBe(nextDisabled);
  };

  beforeAll(defineSliderComponent);

  beforeEach(async () => {
    element = await fixture(
      html`<slider-component>
        <div></div>
        <div></div>
      </slider-component>`,
    );
  });

  it("should render inner content", () => {
    const slot = element.shadowRoot?.querySelector("slot");
    const navigation = element.shadowRoot?.querySelector("navigation");
    expect(slot).toBeDefined();
    expect(navigation).toBeDefined();
  });

  it("should render indicators with active first", () => {
    const indicators = element.shadowRoot?.querySelectorAll("section ul li");
    expect(indicators?.length).toBe(2);
    checkActiveSlide(0);
  });

  it("should render arrow buttons", () => {
    const buttons = element.shadowRoot?.querySelectorAll("button");
    expect(buttons?.length).toBe(2);
    checkButtonsDisabled(true, false);
  });

  describe("when additional slides are added", () => {
    beforeEach(() => {
      element.appendChild(document.createElement("div"));
      element.appendChild(document.createElement("div"));
      element.appendChild(document.createElement("div"));
    });

    it("should render appropriate amount of indicators", () => {
      const indicators = element.shadowRoot?.querySelectorAll("section ul li");
      expect(indicators?.length).toBe(5);
    });
  });

  describe("when all slides are removed", () => {
    beforeEach(() => {
      element.querySelectorAll("div").forEach((element) => element.remove());
    });

    it("should not render indicators", () => {
      const indicators = element.shadowRoot?.querySelectorAll("section ul li");
      expect(indicators?.length).toBe(0);
    });

    it("should not render arrow buttons", () => {
      const buttons = element.shadowRoot?.querySelectorAll("button");
      expect(buttons?.length).toBe(0);
    });
  });

  describe("when next slide button is clicked", () => {
    let scrollToSpy: MockInstance;
    beforeEach(() => {
      const slot = element.shadowRoot?.querySelector("slot")!;
      scrollToSpy = vi.spyOn(slot, "scrollTo");
      element.shadowRoot?.querySelectorAll("button")[1]?.click();
    });

    it("should scroll the container", () => {
      expect(scrollToSpy).toHaveBeenCalled();
    });

    it("should unable prev slide button and disable next", () => {
      checkButtonsDisabled(false, true);
    });

    it("should make second indicator active", () => {
      checkActiveSlide(1);
    });
  });

  describe("when container is scrolled", () => {
    let scrollToSpy: MockInstance;
    beforeEach(() => {
      vi.useFakeTimers();

      const slot = element.shadowRoot?.querySelector("slot")!;
      scrollToSpy = vi.spyOn(slot, "scrollTo");
      slot.dispatchEvent(new Event("scroll"));

      vi.runAllTimers();
    });

    afterEach(() => {
      vi.restoreAllMocks();
    });

    it("should scroll the container", () => {
      expect(scrollToSpy).toHaveBeenCalled();
    });
  });
});
