import { ActionBar } from "elements/action-bar";
import { Awaitable } from "services/awaitable";
import { autoinject } from "aurelia-framework";

@autoinject
export class App {
  public message: string = 'from Aurelia!';

  actionBar:ActionBar;

  constructor(private awaitable:Awaitable){

  }

  clicked() {
    // eslint-disable-next-line no-alert
    alert('A primary button click or a touch');
  }

  attached(){
    this.setOptions()
  }


  setOptions(){
    this.actionBar.setOptions([{
      icon: 'save',
      href: 'ss'
    },
    {
      icon: 'add',
      action: ()=>{
        this.awaitable.suspend();
        setTimeout(() => {
          this.awaitable.resume();
        }, 3000);
      }
    }])
  

  }

}
