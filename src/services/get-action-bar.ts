import { GetViewmodel } from "./get-viewmodel";
import { autoinject } from "aurelia-framework";
import { EventAggregator } from "aurelia-event-aggregator";

@autoinject
export class GetActionBar extends GetViewmodel{
    constructor(events:EventAggregator) {
        super(events, 'action-bar')
    }
}