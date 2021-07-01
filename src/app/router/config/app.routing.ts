import { ModuleWithProviders } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {POSTS_ROUTING} from "./posts.routing";
import {AppNotFoundComponent} from "../../modules/not-found/components/not-found.component";
import {AUTH_ROUTING} from "./auth.routing";

const routes: Routes = [
  {path: '', redirectTo: '', pathMatch: 'full'},
  ...POSTS_ROUTING,
  ...AUTH_ROUTING,

  {path: '**', component: AppNotFoundComponent},
];

export const APP_ROUTING: ModuleWithProviders<any> = RouterModule.forRoot(routes);
