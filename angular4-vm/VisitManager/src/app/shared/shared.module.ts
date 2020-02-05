import { NgModule, ModuleWithProviders }  from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import {TranslateModule} from 'ng2-translate/ng2-translate';
import { NgbModule} from '@ng-bootstrap/ng-bootstrap';
import { Http} from '@angular/http';
import { HeaderComponent } from './headerComponent/header.component';
import { HeaderRadioFieldComponent } from './headerRadioFieldComponent/header.radiofield.component';
import { RouterModule } from '@angular/router';
import { PhotoSelectPopupComponent } from './checkinComponent/photoSelectPopup.component';
import { DynamicFormComponent } from './feedbackComponent/dynamicForm.component';
import {  ReactiveFormsModule }   from '@angular/forms';

@NgModule({
  imports: [
   CommonModule,
   FormsModule,
   TranslateModule,
   NgbModule.forRoot(),
   RouterModule,
   ReactiveFormsModule
  ],
  exports : [
    TranslateModule,
    CommonModule,
    FormsModule,
    NgbModule,
    HeaderComponent,
    HeaderRadioFieldComponent,
    PhotoSelectPopupComponent,
    DynamicFormComponent,
    ReactiveFormsModule
  ],
  declarations: [
   HeaderComponent,
   HeaderRadioFieldComponent,
   PhotoSelectPopupComponent,
   DynamicFormComponent
   ],
  providers:[
  ]
})

export class SharedModule {
  static forRoot(): ModuleWithProviders {
        return {
            ngModule: SharedModule,
           
        };
    }

}