import { AppConsts } from '@shared/AppConsts';
import { Component, ViewChild, Injector, Output, EventEmitter } from '@angular/core';
import { ModalDirective } from 'ngx-bootstrap/modal';
import { GetTipoVehiculoForViewDto, TipoVehiculoDto } from '@shared/service-proxies/service-proxies';
import { AppComponentBase } from '@shared/common/app-component-base';

@Component({
    selector: 'viewTipoVehiculoModal',
    templateUrl: './view-tipoVehiculo-modal.component.html',
})
export class ViewTipoVehiculoModalComponent extends AppComponentBase {
    @ViewChild('createOrEditModal', { static: true }) modal: ModalDirective;
    @Output() modalSave: EventEmitter<any> = new EventEmitter<any>();

    active = false;
    saving = false;

    item: GetTipoVehiculoForViewDto;

    constructor(injector: Injector) {
        super(injector);
        this.item = new GetTipoVehiculoForViewDto();
        this.item.tipoVehiculo = new TipoVehiculoDto();
    }

    show(item: GetTipoVehiculoForViewDto): void {
        this.item = item;
        this.active = true;
        this.modal.show();
    }

    close(): void {
        this.active = false;
        this.modal.hide();
    }
}
