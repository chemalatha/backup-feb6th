import { Component, OnInit, ViewChild} from '@angular/core';
import {FormBuilder, FormGroup} from '@angular/forms';
import {Router } from '@angular/router';
import {DynamicFormComponent} from '../../../../shared/feedbackComponent/dynamicForm.component';

@Component({
  moduleId: module.id,
	templateUrl: './feedback.component.html'
})
export class SessionDetailFeedbackComponent implements OnInit{

   @ViewChild('feedbackDynamicFormRef') feedbackDynamicFormRef: DynamicFormComponent;
   public feedbackGroupForm: FormGroup;

   public feedbackControls = [
         {
          type: 'rating',
          label: 'Lorem ipsum dolor sit amet, ex vis brute scripta, ea eam liber?',
          name: 'rating1',
          required: true,
          attributes: {
              max: 5,
              rate: 0
          }
        },
        {
          type: 'radio',
          label: 'Lorem ipsum dolor sit amet, ex vis brute?',
          name: 'gender',
          required: false,
          attributes: {},
          options: [{
              key: 'Option 1',
              value: 'Option 1'
          }, {
              key: 'Option 2',
              value: 'Option 2'
          }, {
              key: 'Option 3',
              value: 'Option 3'
          }, {
              key: 'Option 4',
              value: 'Option 4'
          }]
        },
        {
          type: 'textbox',
          label: 'Full name',
          name: 'firstname',
          placeholder: 'Enter your name',
          required: true,
          attributes: {}
        },
        {
          type: 'select',
          label: 'Favourite food',
          name: 'food',
          options: [{
              key: '',
              value: 'Please Select'
          }, {
              key: 'Pizza',
              value: 'Pizza'
          }, {
              key: 'Hot Dogs',
              value: 'Hot Dogs'
          }, {
              key: 'Coffee',
              value: 'Coffee'
          }],
          placeholder: 'Select an option',
          required: false,
          attributes: {}
        },
        {
          type: 'textarea',
          label: 'Lorem ipsum dolor sit amet?',
          name: 'comment',
          placeholder: 'Enter Comments',
          required: false,
          attributes: {
              cols: 10,
              rows: 7
          }
        },
        {
          type: 'rating',
          label: 'Lorem ipsum dolor sit amet, ex vis brute scripta, ea eam liber?',
          name: 'rating2',
          required: false,
          attributes: {
              max: 5,
              rate: 0
          }
        },
        {
          type: 'rating',
          label: 'Lorem ipsum dolor sit amet, ex vis brute scripta, ea eam liber?',
          name: 'rating3',
          required: false,
          attributes: {
              max: 5,
              rate: 0
          }
        }
  ];
  constructor(
    private formBuilder: FormBuilder,
		private _router: Router){}

  ngOnInit(){
      this.feedbackGroupForm = this.feedbackDynamicFormRef.createFormGroup(this.feedbackControls);
  }

  onSubmit(value){
      console.log(value);
  }

}
