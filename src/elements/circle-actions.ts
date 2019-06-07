import {bindable} from 'aurelia-framework';
import { EventAggregator } from 'aurelia-event-aggregator';
import {inject} from 'aurelia-framework';
import { debug } from 'util';

@inject(EventAggregator)
export class CircleActions{

    @bindable options = [];
    @bindable onReturn = undefined;
	
	_return = false;

	returnOption = undefined;

    constructor(EventAggregator){
		this.events = EventAggregator;
		this.onRoute();
	}

    onRoute(){

		let backUp = this.options;

		this.events.subscribe('router:navigation:processing', message=>{
			
			this._clear();
		});

		this.events.subscribe('router:navigation:canceled', message=>{
			
			this.options = backUp;
			
		});

		this.events.subscribe('router:navigation:error', message=>{
			
			this.options = backUp;
			
		});
		
	}

	_clear(){
		this.options = [];
		this._return = false;
		this.onReturn = undefined;
	}



    /**
	 * Si setReturn fue llamado
	 * Quita la vista de return, y regresa las opciones a su estado anterior
	 * 
	 * @memberof CircleActions
	 * 
	 * @return {void}
	 */
	clearReturn(){
		
		if(this._return){
			this._return = false;
			this.options = this.backUpoptions;
		}

	}

    setReturn(){
		
		if (this._return)
			return;

		setTimeout(()=>{
			this._return = true;
		}, 300)

		this.backUpoptions = this.options;

		this.returnOption = {
			icon: 'close',
			action: () => {
				this.return()
			}
		}


	}

    return(){
		
		
		this.clearReturn();

		this.returnOption = {};

		if (this.onReturn)
			this.onReturn();

	}





	/**
	 * @memberof CircleActions
	 */
	setOptions(options){
		
		if(this.options.length){
			this.options = [];
		}

		// se pone asi para que la animacion en css se ejecute
		setTimeout(()=>{
			this.options = options;
		}, 300);
	}


	/**
	 * 
	 * 
	 * @param {Object} option 
	 * 
	 * @memberof CircleActions
	 */
	setOption(option){
		//this.showActions = true;

		this.setOptions([option]);

		//this.actions = [action];
		//this.actions.push(action);
	}




}