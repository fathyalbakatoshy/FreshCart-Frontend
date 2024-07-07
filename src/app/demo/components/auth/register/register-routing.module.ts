import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { RegisterComponent } from './register.component';

@NgModule({
    imports: [RouterModule.forChild([
        { path: '', component: RegisterComponent },
        { path: '**', redirectTo: '', pathMatch: 'full' }
    ])],
    exports: [RouterModule]
})
export class RegisterRoutingModule { }
