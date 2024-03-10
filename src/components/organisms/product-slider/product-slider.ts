import { ProductSlidesService } from "../../../service";
import { Slide } from "../../../models";

export class ProductSliderComponent extends HTMLElement {
  private service = new ProductSlidesService();

  protected async handleDynamicData() {
    const slides = await this.service.get();

    this.innerHTML = `
      <slider-component>
        ${slides.map(this.renderSlide).join("")}
      </slider-component>
    `;
  }

  protected renderSlide({ image, title, description, url }: Slide): string {
    return `
      <hero-component>
        <img src="${image}" alt="${title}"/>
        <h1>${title}</h1>
        <p>${description}</p>
        <button-component slot="actions" href="${url}">
          Details
          <icon-component type="arrowRight" slot="icon"></icon-component>
        </button-component>
      </hero-component>
    `;
  }

  connectedCallback() {
    this.handleDynamicData();
  }
}
