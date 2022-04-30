import { NgModule } from '@angular/core';
import { AppSharedModule } from '@app/shared/app-shared.module';
import { AdminSharedModule } from '@app/admin/shared/admin-shared.module';
import { TarifaRoutingModule } from './tarifa-routing.module';
import { TarifasComponent } from './tarifas.component';
import { CreateOrEditTarifaModalComponent } from './create-or-edit-tarifa-modal.component';
import { ViewTarifaModalComponent } from './view-tarifa-modal.component';

@NgModule({
    declarations: [TarifasComponent, CreateOrEditTarifaModalComponent, ViewTarifaModalComponent],
    imports: [AppSharedModule, TarifaRoutingModule, AdminSharedModule],
})
export class TarifaModule {}
