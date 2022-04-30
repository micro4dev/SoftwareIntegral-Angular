import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TipoVehiculosComponent } from './tipoVehiculos.component';

const routes: Routes = [
    {
        path: '',
        component: TipoVehiculosComponent,
        pathMatch: 'full',
    },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class TipoVehiculoRoutingModule {}
