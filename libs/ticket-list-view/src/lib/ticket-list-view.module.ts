import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { FlexLayoutModule } from '@angular/flex-layout';

import { EffectsModule } from '@ngrx/effects';
import { StoreRouterConnectingModule } from '@ngrx/router-store';

import { TicketsStateModule } from '@tuskdesk-suite/tickets-state';

import { TicketListViewRoutingModule } from './ticket-list-view.routing.module';
import { TicketListComponent } from './ticket-list/ticket-list.component';
import { TicketDetailsComponent } from './ticket-details/ticket-details.component';
import { SearchTicketsComponent } from './search-tickets/search-tickets.component';
import { UiMaterialModule } from '@tuskdesk-suite/ui-material';

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RouterModule,
    FlexLayoutModule,
    UiMaterialModule,
    TicketListViewRoutingModule,
    TicketsStateModule,
    EffectsModule.forRoot([]),
    StoreRouterConnectingModule
  ],
  declarations: [TicketListComponent, TicketDetailsComponent, SearchTicketsComponent]
})
export class TicketListViewModule {}
