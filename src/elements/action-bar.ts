import {bindable, autoinject} from 'aurelia-framework';
import { EventAggregator } from 'aurelia-event-aggregator';
import { CircleOption } from './circle-action/circle-action';

@autoinject
export class ActionBar{

    @bindable options:CircleOption[] = [];
    @bindable onReturn = undefined;
	
	private _return = false;

	returnOption : CircleOption = {
		icon: 'close',
		action: () => {
			this.return()
		}
	};

	backUpoptions: CircleOption[];

    constructor(private events:EventAggregator){
		this.onRoute();
	}


    private onRoute(){

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

	private _clear(){
		this.options = [];
		this._return = false;
		this.onReturn = undefined;
	}



    /**
	 * Si setReturn fue llamado
	 * Quita la vista de return, y regresa las opciones a su estado anterior
	 * 
	 */
	clearReturn(){
		
		if(this._return){
			this._return = false;
			this.options = this.backUpoptions;
		}

	}

    setReturn(options:CircleOption[], onReturn:()=>void){
		
		if (this._return)
			return;

		setTimeout(()=>{
			this._return = true;
		}, 300)

		// las opciones actuales se van al backup
		this.setBackup();

		// se establece la opcion return
		

		this.setOptions(options);

		this.onReturn = onReturn;

	}

    return(){
			
		this.clearReturn();

		if (this.onReturn)
			this.onReturn();

	}

	setBackup(){
		this.backUpoptions = this.options;
		this.clearOptions();
	}

	restoreBackup(){
		this.options = this.backUpoptions;
		this.backUpoptions = [];
	}

	/**
	 * @memberof CircleActions
	 */
	setOptions(options:CircleOption[]){
		this.clearOptions();
		// se pone asi para que la animacion en css se ejecute
		setTimeout(()=>{
			this.options = options;
		}, 300);
	}

	private clearOptions(){
		if(this.options.length){
			this.options = [];
		}
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