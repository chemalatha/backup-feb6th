import { Component, OnInit, OnDestroy } from '@angular/core';
import {FormBuilder, FormGroup} from '@angular/forms';
import {Router } from '@angular/router';

@Component({
	templateUrl:'./home.component.html',
	styleUrls:['./home.scss']
})
export class HomeComponent implements OnInit, OnDestroy{

	public title: string;
  public radioGroupForm: FormGroup;
  private homeObj = [{title:'Agenda', route:'/home/agenda', value:'agenda', iconCls:'icon-home'},
          {title:'Download', route:'/home/download', value:'download', iconCls:'icon-home'},
          {title:'Feedback', route:'/home/feedback', value:'feedback', iconCls:'icon-home'},
          {title:'Dashboard', route:'/home/dashboard', value:'dashboard', iconCls:'icon-home'}];

	constructor(
		private formBuilder: FormBuilder,
		private _router: Router) {}

	 ngOnInit() {
    
		this.radioGroupForm = this.formBuilder.group({
			tab: "agenda"
		});

		this.title = 'Home';
  }

  ngOnDestroy(){
	  
  }

}