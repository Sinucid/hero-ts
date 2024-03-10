import { Component, debounce } from "../../../utils";
import { IconType } from "../../atoms";

import styles from "./slider.css?inline";

export class SliderComponent extends Component {
  protected activeSlideIndex = 0;

  protected get slotElement(): HTMLSlotElement {
    return this.shadowRoot?.querySelector<HTMLSlotElement>("slot")!;
  }

  protected get navigationElement(): HTMLElement {
    return this.shadowRoot?.querySelector<HTMLElement>("section")!;
  }

  protected get slides(): Element[] | undefined {
    return this.slotElement?.assignedElements({ flatten: true });
  }

  protected handleSlotChange(): void {
    this.activeSlideIndex = 0;
    this.navigationElement.innerHTML =
      (this.slides?.length ?? 0) > 1
        ? `${this.renderIndicators()}${this.renderButtons()}`
        : "";

    this.syncState();
  }

  protected handleScroll(): void {
    const newIndexMaybe = Math.floor(
      Math.floor(this.slotElement.scrollLeft) /
        Math.floor(this.slides![0].getBoundingClientRect().width),
    );

    if (newIndexMaybe === this.activeSlideIndex) return;

    this.activeSlideIndex = newIndexMaybe;
    this.syncState();
  }

  protected handleClick(event: MouseEvent): void {
    const eventPath = event.composedPath();
    const sliderPathIndex = eventPath.findIndex((element) => element === this);
    const navElement = eventPath.find((element, i) => {
      return sliderPathIndex > i && (element as HTMLElement).dataset?.nav;
    }) as HTMLElement;

    if (!navElement) return;

    this.activeSlideIndex += navElement.dataset.nav === "prev" ? -1 : 1;
    this.syncState();
  }

  protected syncState(): void {
    if (!this.slides?.length) return;

    //sync scroll
    this.slotElement?.scrollTo({
      left: this.activeSlideIndex * this.slides![0].clientWidth,
    });

    //sync indicators
    this.shadowRoot!.querySelectorAll<HTMLElement>("li").forEach(
      (indicator, index) => {
        indicator.classList.toggle("active", index === this.activeSlideIndex);
      },
    );

    //sync buttons
    this.shadowRoot!.querySelectorAll<HTMLButtonElement>("button").forEach(
      (button, index) => {
        button.toggleAttribute(
          "disabled",
          (index === 0 && this.activeSlideIndex === 0) ||
            (index === 1 && this.activeSlideIndex + 1 === this.slides?.length),
        );
      },
    );
  }

  protected override render() {
    this.shadowRoot!.innerHTML = `
      <slot></slot>
      <section></section>
    `;
  }

  protected renderIndicators(): string {
    return `<ul>
      ${this.slides?.map(() => `<li></li>`).join("")}
    </ul>`;
  }

  protected renderButtons(): string {
    return `
      <button data-nav="prev" aria-label="previous slide">
        <icon-component type="${IconType.ChevronLeft}"></icon-component>
      </button>
      <button data-nav="next" aria-label="next slide">
        <icon-component type="${IconType.ChevronRight}"></icon-component>
      </button>
    `;
  }

  connectedCallback(): void {
    super.connectedCallback();

    this.addEventListener("click", this.handleClick);
    this.slotElement.addEventListener("scroll", this.handleScroll);
    this.slotElement.addEventListener("slotchange", this.handleSlotChange);
  }

  disconnectedCallback(): void {
    this.removeEventListener("click", this.handleClick);
    this.slotElement.removeEventListener("scroll", this.handleScroll);
    this.slotElement.removeEventListener("slotchange", this.handleSlotChange);
  }

  constructor() {
    super();
    this.setupStyles(styles);

    this.handleScroll = debounce(this.handleScroll.bind(this), 33);
    this.handleClick = this.handleClick.bind(this);
    this.handleSlotChange = this.handleSlotChange.bind(this);
  }
}
