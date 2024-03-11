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

  const slot = () =>
    element.shadowRoot?.querySelector("slot") as HTMLSlotElement;

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
    const navigation = element.shadowRoot?.querySelector("navigation");
    expect(slot()).toBeDefined();
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
      scrollToSpy = vi.spyOn(slot(), "scrollTo");
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

    describe("and prev slide button is clicked", () => {
      beforeEach(() => {
        scrollToSpy = vi.spyOn(slot(), "scrollTo");
        element.shadowRoot?.querySelectorAll("button")[0]?.click();
      });

      it("should scroll the container", () => {
        expect(scrollToSpy).toHaveBeenCalled();
      });

      it("should unable next slide button and disable prev", () => {
        checkButtonsDisabled(true, false);
      });

      it("should make first indicator active", () => {
        checkActiveSlide(0);
      });
    });
  });

  describe("when container is scrolled", () => {
    const snapSize = 200;
    beforeEach(() => {
      vi.useFakeTimers();

      slot().scrollLeft = snapSize;
      slot().dispatchEvent(new Event("scroll"));
      const firstSlide = element.querySelector("div")!;
      vi.spyOn(firstSlide, "offsetWidth", "get").mockReturnValue(snapSize);
      slot().dispatchEvent(new Event("scroll"));

      vi.advanceTimersByTime(100);
    });

    afterEach(() => {
      vi.restoreAllMocks();
      vi.clearAllTimers();
    });

    it("should make second indicator active and disable next button", () => {
      checkActiveSlide(1);
      checkButtonsDisabled(false, true);
      vi.clearAllTimers();
    });
  });
});
