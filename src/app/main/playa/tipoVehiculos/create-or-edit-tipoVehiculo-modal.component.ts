import { Component, ViewChild, Injector, Output, EventEmitter, OnInit, ElementRef } from '@angular/core';
import { ModalDirective } from 'ngx-bootstrap/modal';
import { finalize } from 'rxjs/operators';
import { TipoVehiculosServiceProxy, CreateOrEditTipoVehiculoDto } from '@shared/service-proxies/service-proxies';
import { AppComponentBase } from '@shared/common/app-component-base';
import { DateTime } from 'luxon';

import { DateTimeService } from '@app/shared/common/timing/date-time.service';

@Component({
    selector: 'createOrEditTipoVehiculoModal',
    templateUrl: './create-or-edit-tipoVehiculo-modal.component.html',
})
export class CreateOrEditTipoVehiculoModalComponent extends AppComponentBase implements OnInit {
    @ViewChild('createOrEditModal', { static: true }) modal: ModalDirective;

    @Output() modalSave: EventEmitter<any> = new EventEmitter<any>();

    active = false;
    saving = false;

    tipoVehiculo: CreateOrEditTipoVehiculoDto = new CreateOrEditTipoVehiculoDto();

    constructor(
        injector: Injector,
        private _tipoVehiculosServiceProxy: TipoVehiculosServiceProxy,
        private _dateTimeService: DateTimeService
    ) {
        super(injector);
    }

    show(tipoVehiculoId?: string): void {
        if (!tipoVehiculoId) {
            this.tipoVehiculo = new CreateOrEditTipoVehiculoDto();
            this.tipoVehiculo.id = tipoVehiculoId;

            this.active = true;
            this.modal.show();
        } else {
            this._tipoVehiculosServiceProxy.getTipoVehiculoForEdit(tipoVehiculoId).subscribe((result) => {
                this.tipoVehiculo = result.tipoVehiculo;

                this.active = true;
                this.modal.show();
            });
        }
    }

    save(): void {
        this.saving = true;

        this._tipoVehiculosServiceProxy
            .createOrEdit(this.tipoVehiculo)
            .pipe(
                finalize(() => {
                    this.saving = false;
                })
            )
            .subscribe(() => {
                this.notify.info(this.l('SavedSuccessfully'));
                this.close();
                this.modalSave.emit(null);
            });
    }

    close(): void {
        this.active = false;
        this.modal.hide();
    }

    ngOnInit(): void {}
}
