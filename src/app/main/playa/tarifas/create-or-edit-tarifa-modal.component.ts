import { Component, ViewChild, Injector, Output, EventEmitter, OnInit, ElementRef } from '@angular/core';
import { ModalDirective } from 'ngx-bootstrap/modal';
import { finalize } from 'rxjs/operators';
import {
    TarifasServiceProxy,
    CreateOrEditTarifaDto,
    TarifaTipoVehiculoLookupTableDto,
} from '@shared/service-proxies/service-proxies';
import { AppComponentBase } from '@shared/common/app-component-base';
import { DateTime } from 'luxon';

import { DateTimeService } from '@app/shared/common/timing/date-time.service';

@Component({
    selector: 'createOrEditTarifaModal',
    templateUrl: './create-or-edit-tarifa-modal.component.html',
})
export class CreateOrEditTarifaModalComponent extends AppComponentBase implements OnInit {
    @ViewChild('createOrEditModal', { static: true }) modal: ModalDirective;

    @Output() modalSave: EventEmitter<any> = new EventEmitter<any>();

    active = false;
    saving = false;

    tarifa: CreateOrEditTarifaDto = new CreateOrEditTarifaDto();

    tipoVehiculoNombre = '';

    allTipoVehiculos: TarifaTipoVehiculoLookupTableDto[];

    constructor(
        injector: Injector,
        private _tarifasServiceProxy: TarifasServiceProxy,
        private _dateTimeService: DateTimeService
    ) {
        super(injector);
    }

    show(tarifaId?: string): void {
        if (!tarifaId) {
            this.tarifa = new CreateOrEditTarifaDto();
            this.tarifa.id = tarifaId;
            this.tipoVehiculoNombre = '';

            this.active = true;
            this.modal.show();
        } else {
            this._tarifasServiceProxy.getTarifaForEdit(tarifaId).subscribe((result) => {
                this.tarifa = result.tarifa;

                this.tipoVehiculoNombre = result.tipoVehiculoNombre;

                this.active = true;
                this.modal.show();
            });
        }
        this._tarifasServiceProxy.getAllTipoVehiculoForTableDropdown().subscribe((result) => {
            this.allTipoVehiculos = result;
        });
    }

    save(): void {
        this.saving = true;

        this._tarifasServiceProxy
            .createOrEdit(this.tarifa)
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
