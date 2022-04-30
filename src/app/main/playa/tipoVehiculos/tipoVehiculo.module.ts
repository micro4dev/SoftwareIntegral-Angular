import { NgModule } from '@angular/core';
import { AppSharedModule } from '@app/shared/app-shared.module';
import { AdminSharedModule } from '@app/admin/shared/admin-shared.module';
import { TipoVehiculoRoutingModule } from './tipoVehiculo-routing.module';
import { TipoVehiculosComponent } from './tipoVehiculos.component';
import { CreateOrEditTipoVehiculoModalComponent } from './create-or-edit-tipoVehiculo-modal.component';
import { ViewTipoVehiculoModalComponent } from './view-tipoVehiculo-modal.component';

@NgModule({
    declarations: [TipoVehiculosComponent, CreateOrEditTipoVehiculoModalComponent, ViewTipoVehiculoModalComponent],
    imports: [AppSharedModule, TipoVehiculoRoutingModule, AdminSharedModule],
})
export class TipoVehiculoModule {}
