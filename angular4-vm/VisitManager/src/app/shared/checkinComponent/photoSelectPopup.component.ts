import {Component, Input, OnInit, ViewChild, ElementRef, OnDestroy, EventEmitter, Output} from '@angular/core';
import {UtilityServices} from '../../core/services/utility.service';
import {NgbModal, NgbActiveModal, NgbModalOptions} from '@ng-bootstrap/ng-bootstrap';
import {TranslateService} from 'ng2-translate/ng2-translate';

@Component({
  selector: 'photoselect-popup-component',
  templateUrl: "./photoSelectPopup.component.html",
  styleUrls: ['./photoSelectPopup.component.scss']
})
export class PhotoSelectPopupComponent implements OnInit, OnDestroy{

    @ViewChild('photoCompRef') photoCompref: ElementRef;
    @Output() photoSelectActionEvent: EventEmitter<string> = new EventEmitter();

    private modaloption: NgbModalOptions = {
        backdrop:"static",
        windowClass: "photoselect-modal-popup"
    };

    private modalAlertRef;

    constructor(
        private utilityService: UtilityServices,
        private modalinstance: NgbModal,
        private _translate: TranslateService) {
    }

    ngOnInit() {

    }

    openPopup(){
        this.modalAlertRef = this.modalinstance.open(this.photoCompref, this.modaloption);
    }

    takephotoAction(actionText){
        if(actionText && actionText !== 'close'){
            this.photoSelectActionEvent.emit(actionText);
        }
        if(this.modalAlertRef){
            this.modalAlertRef.close();
        }
    }

    ngOnDestroy(){

    }

}
