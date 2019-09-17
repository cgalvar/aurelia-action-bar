import {autoinject} from 'aurelia-framework';
import { Awaitable } from 'services/awaitable';
import { Subscription } from 'aurelia-event-aggregator';

@autoinject()
export class AwaitableCustomAttribute {

  disposables:Subscription[] = [];

  constructor(private element: Element, private awaitable:Awaitable) { 
    this.setAwait();
  }
  
  setAwait(){
    debugger

    this.element.classList.add('awaitable');

    this.awaitable.onSuspend((disposable)=>{
      this.disposables.push(disposable)
      this.element.classList.add('awaitable-hide')
    })

    this.awaitable.onResume((disposable)=>{
      this.disposables.push(disposable)
      this.element.classList.remove('awaitable-hide')
    })

  }

  detached() {
    for (const disposable of this.disposables) {
      disposable.dispose();
    }
  }

}
