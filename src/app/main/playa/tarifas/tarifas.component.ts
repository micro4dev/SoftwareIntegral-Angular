import { AppConsts } from '@shared/AppConsts';
import { Component, Injector, ViewEncapsulation, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { TarifasServiceProxy, TarifaDto } from '@shared/service-proxies/service-proxies';
import { NotifyService } from 'abp-ng2-module';
import { AppComponentBase } from '@shared/common/app-component-base';
import { TokenAuthServiceProxy } from '@shared/service-proxies/service-proxies';
import { CreateOrEditTarifaModalComponent } from './create-or-edit-tarifa-modal.component';

import { ViewTarifaModalComponent } from './view-tarifa-modal.component';
import { appModuleAnimation } from '@shared/animations/routerTransition';
import { Table } from 'primeng/table';
import { Paginator } from 'primeng/paginator';
import { LazyLoadEvent } from 'primeng/api';
import { FileDownloadService } from '@shared/utils/file-download.service';
import { filter as _filter } from 'lodash-es';
import { DateTime } from 'luxon';

import { DateTimeService } from '@app/shared/common/timing/date-time.service';

@Component({
    templateUrl: './tarifas.component.html',
    encapsulation: ViewEncapsulation.None,
    animations: [appModuleAnimation()],
})
export class TarifasComponent extends AppComponentBase {
    @ViewChild('createOrEditTarifaModal', { static: true }) createOrEditTarifaModal: CreateOrEditTarifaModalComponent;
    @ViewChild('viewTarifaModalComponent', { static: true }) viewTarifaModal: ViewTarifaModalComponent;

    @ViewChild('dataTable', { static: true }) dataTable: Table;
    @ViewChild('paginator', { static: true }) paginator: Paginator;

    advancedFiltersAreShown = false;
    filterText = '';
    maxPrecioDiaFilter: number;
    maxPrecioDiaFilterEmpty: number;
    minPrecioDiaFilter: number;
    minPrecioDiaFilterEmpty: number;
    tipoVehiculoNombreFilter = '';

    constructor(
        injector: Injector,
        private _tarifasServiceProxy: TarifasServiceProxy,
        private _notifyService: NotifyService,
        private _tokenAuth: TokenAuthServiceProxy,
        private _activatedRoute: ActivatedRoute,
        private _fileDownloadService: FileDownloadService,
        private _dateTimeService: DateTimeService
    ) {
        super(injector);
    }

    getTarifas(event?: LazyLoadEvent) {
        if (this.primengTableHelper.shouldResetPaging(event)) {
            this.paginator.changePage(0);
            return;
        }

        this.primengTableHelper.showLoadingIndicator();

        this._tarifasServiceProxy
            .getAll(
                this.filterText,
                this.maxPrecioDiaFilter == null ? this.maxPrecioDiaFilterEmpty : this.maxPrecioDiaFilter,
                this.minPrecioDiaFilter == null ? this.minPrecioDiaFilterEmpty : this.minPrecioDiaFilter,
                this.tipoVehiculoNombreFilter,
                this.primengTableHelper.getSorting(this.dataTable),
                this.primengTableHelper.getSkipCount(this.paginator, event),
                this.primengTableHelper.getMaxResultCount(this.paginator, event)
            )
            .subscribe((result) => {
                this.primengTableHelper.totalRecordsCount = result.totalCount;
                this.primengTableHelper.records = result.items;
                this.primengTableHelper.hideLoadingIndicator();
            });
    }

    reloadPage(): void {
        this.paginator.changePage(this.paginator.getPage());
    }

    createTarifa(): void {
        this.createOrEditTarifaModal.show();
    }

    deleteTarifa(tarifa: TarifaDto): void {
        this.message.confirm('', this.l('AreYouSure'), (isConfirmed) => {
            if (isConfirmed) {
                this._tarifasServiceProxy.delete(tarifa.id).subscribe(() => {
                    this.reloadPage();
                    this.notify.success(this.l('SuccessfullyDeleted'));
                });
            }
        });
    }

    exportToExcel(): void {
        this._tarifasServiceProxy
            .getTarifasToExcel(
                this.filterText,
                this.maxPrecioDiaFilter == null ? this.maxPrecioDiaFilterEmpty : this.maxPrecioDiaFilter,
                this.minPrecioDiaFilter == null ? this.minPrecioDiaFilterEmpty : this.minPrecioDiaFilter,
                this.tipoVehiculoNombreFilter
            )
            .subscribe((result) => {
                this._fileDownloadService.downloadTempFile(result);
            });
    }
}
