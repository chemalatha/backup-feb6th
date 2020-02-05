import { Component, OnInit, OnDestroy } from '@angular/core';
import {FormBuilder, FormGroup} from '@angular/forms';
import {Router, ActivatedRoute } from '@angular/router';

@Component({
	templateUrl:'./sessionDetails.component.html',
  styleUrls:['./sessionDetails.scss'],
})
export class SessionDetailsComponent implements OnInit, OnDestroy{

	public title: string;
  public agendaId: number;
  private routesubscribe;
  public radioGroupForm: FormGroup;
	private homeObj = [{title:'Agenda', route:'/home/agenda', value:'agenda', iconCls:'icon-home'},
	 					{title:'Download', route:'/home/download', value:'download', iconCls:'icon-home'},
	 					{title:'Feedback', route:'/home/feedback', value:'feedback', iconCls:'icon-home'},
	 					{title:'Dashboard', route:'/home/dashboard', value:'dashboard', iconCls:'icon-home'}];

	constructor(
		private formBuilder: FormBuilder,
		private _router: Router,
    private route: ActivatedRoute) {}

	 ngOnInit() {

      this.routesubscribe = this.route.firstChild
          .params
          .subscribe(params => {
            if(params['id']){
                this.agendaId = parseInt(params['id'], 10);
            }
          });

  		this.radioGroupForm = this.formBuilder.group({
  			tab: "agenda"
  		});

  		this.title = 'Session Details';
  }

  ngOnDestroy(){
      if(this.routesubscribe){
          this.routesubscribe.unsubscribe();
      }
  }

  goBack(title){
      this._router.navigate(['/home/agenda']);
  }

}
