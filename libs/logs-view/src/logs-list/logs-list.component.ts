import { Component, OnInit } from '@angular/core';
import { LogService } from '@tuskdesk-suite/logs-backend';
import { EventLog } from '@tuskdesk-suite/data-models';
import { Observable } from 'rxjs/Observable';
import { LoadLogsRoot, LogsRootLoaded, LogsRootState } from '@tuskdesk-suite/logs-state';
import { LogsRoot } from '@tuskdesk-suite/logs-state/src/+state/logs-root.actions';
import { Store } from '@ngrx/store';

@Component({
  selector: 'logs-list',
  templateUrl: './logs-list.component.html',
  styleUrls: ['./logs-list.component.scss']
})
export class LogsListComponent implements OnInit {
  logs$: Observable<EventLog[]> =  this.store.select(s => s.logsRoot.eventLogs);

  constructor(private logService: LogService, private store: Store<LogsRootState>) {}

  ngOnInit() {
    this.store.dispatch(new LoadLogsRoot());
  }
}
