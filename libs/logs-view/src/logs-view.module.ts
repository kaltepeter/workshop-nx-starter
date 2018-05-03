import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { LogsListComponent } from './logs-list/logs-list.component';
import { EffectsModule } from '@ngrx/effects';
import { LogsRootEffects } from '@tuskdesk-suite/logs-state';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild([
      /* {path: '', pathMatch: 'full', component: InsertYourComponentHere} */
      { path: '', pathMatch: 'full', component: LogsListComponent }
    ])
  ],
  declarations: [LogsListComponent]
})
export class LogsViewModule {}
