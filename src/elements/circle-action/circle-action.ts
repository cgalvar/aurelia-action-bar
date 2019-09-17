import { bindable } from "aurelia-framework";

export interface CircleOption{
    href?: string;
    action?: Function;
    title?: string;
    icon: string
}

export class CircleAction {

    @bindable option: CircleOption;

}