import { ModuleWithProviders } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {AppNotFoundComponent} from "../../modules/not-found/components/not-found.component";
import {AUTH_ROUTING} from "./auth.routing";
import {AuthGuard} from "../guards/auth.guard";

const routes: Routes = [
  {path: '', redirectTo: '', pathMatch: 'full', canActivate: [AuthGuard]},
  ...AUTH_ROUTING,

  {path: '**', component: AppNotFoundComponent},
];

export const APP_ROUTING: ModuleWithProviders<any> = RouterModule.forRoot(routes);
