import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ArmadilhaComponent } from './pages/armadilha/armadilha.component';
import { HomeComponent } from './pages/home/home.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  {
    path: 'armadilha',
    component: ArmadilhaComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
