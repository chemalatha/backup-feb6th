import { Component, OnInit, Input} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Router } from '@angular/router';

@Component({
  selector: 'feedback-dynamic-form',
  moduleId: module.id,
  templateUrl: './dynamicForm.component.html',
  styleUrls: ['./dynamicForm.scss']
})
export class DynamicFormComponent implements OnInit{

    @Input() feedbackControls: any;
    @Input() feedbackGroupForm: any;

    constructor(
      private formBuilder: FormBuilder,
		  private _router: Router
    ){}

    ngOnInit(){

    }

    createFormGroup(feedbackControls){
          const feedbackControlObj: any = {};

          feedbackControls.forEach(control => {
              let formControlArr = [];
              formControlArr.push('');
              if(control.required){
                  formControlArr.push(Validators.required);
              }
              feedbackControlObj[control.name] = formControlArr;
          });
          const group = this.formBuilder.group(feedbackControlObj);
          return group;
      }

}
