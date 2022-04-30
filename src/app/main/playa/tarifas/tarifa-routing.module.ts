import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TarifasComponent } from './tarifas.component';

const routes: Routes = [
    {
        path: '',
        component: TarifasComponent,
        pathMatch: 'full',
    },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class TarifaRoutingModule {}
