import {Component, Input, OnInit, ViewChild, ElementRef, OnDestroy} from '@angular/core';
import {UtilityServices} from '../../services/utility.service';
import {NgbModal, NgbActiveModal, NgbModalOptions} from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'spinner-component',
  template: `
    <ng-template #spinnerCompRef>
    <div><div class="modal-header spinner-header" >
    <div class="loader-outer">
      <div class="spinnerClass"></div>
      </div>
      </div></div>
    </ng-template>  `

})
export class SpinnerComponent implements OnInit, OnDestroy{
    @ViewChild('spinnerCompRef') spinnerCompref: ElementRef;

    private modaloption: NgbModalOptions = {
        backdrop:"static",
        windowClass: "dark-modal"
    };
    private modalSpinnerRef = null;
    private loaderstatussubscribe;

    constructor(
        private utilityService: UtilityServices,
        private modalinstance: NgbModal) {
    }

    ngOnInit() {
        this.loaderstatussubscribe = this.utilityService.loaderStatusObservable.subscribe((val: boolean) => {
            if(val){
                this.modalSpinnerRef = this.modalinstance.open(this.spinnerCompref, this.modaloption);
            }else{
                if(this.modalSpinnerRef){
                    this.modalSpinnerRef.close();
                }
            }
        });
    }

    ngOnDestroy(){
        if(this.loaderstatussubscribe){
            this.loaderstatussubscribe.unsubscribe();
        }
    }
}
