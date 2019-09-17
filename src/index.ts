import {FrameworkConfiguration} from 'aurelia-framework';
import {PLATFORM} from 'aurelia-pal';

export function configure(config: FrameworkConfiguration) {
  config.globalResources([
    PLATFORM.moduleName('./elements/action-bar'),
    PLATFORM.moduleName('./attributes/awaitable')
  ]);

  config.plugin(PLATFORM.moduleName("aurelia-animator-css"))

}

export {CircleOption} from "./elements/circle-action/circle-action"
export { GetActionBar } from "./services/get-action-bar";