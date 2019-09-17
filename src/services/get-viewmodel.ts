import { EventAggregator } from "aurelia-event-aggregator";

export class GetViewmodel {
    viewmodel: any;

    constructor(private events:EventAggregator, private viewModelName){
        this.setViewmodel();
    }
    
    private setViewmodel(){
        return new Promise((next, error)=>{
            if (!this.viewmodel) {
                this.events.subscribeOnce(`${this.viewModelName}-attached`, (viewmodel)=>{
                    this.viewmodel = viewmodel;
                    next(viewmodel);
                })
            }
            else
                next(this.viewmodel);

        });
    }

    get(){
        return this.setViewmodel();
    }

}
