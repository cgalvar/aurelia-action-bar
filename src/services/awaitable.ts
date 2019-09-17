import { EventAggregator, Subscription } from "aurelia-event-aggregator";
import { autoinject } from "aurelia-framework";

@autoinject
export class Awaitable {
    
    constructor(private events:EventAggregator) {}

    suspend(){
        this.events.publish('awaitable.suspend');
    }

    resume(){
        this.events.publish('awaitable.resume');
    }

    onSuspend(cb:(disposable:Subscription)=>any){
        
        let disposable = this.events.subscribe('awaitable.suspend', ()=>{
            cb(disposable);
        });
   
}

    onResume(cb:(disposable:Subscription)=>any){
        
            let disposable = this.events.subscribe('awaitable.resume', ()=>{
                cb(disposable);
            });
       
    }

}