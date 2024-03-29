import "./reset.css";
import "./theme.css";

import {
  defineButtonComponent,
  defineIconComponent,
  defineHeroComponent,
} from "./components/atoms";
import { defineSliderComponent } from "./components/molecules";
import {
  defineAppComponent,
  defineProductSliderComponent,
} from "./components/organisms";

defineButtonComponent();
defineIconComponent();
defineHeroComponent();
defineSliderComponent();
defineAppComponent();
defineProductSliderComponent();
