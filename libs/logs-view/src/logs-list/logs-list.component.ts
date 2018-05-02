import { Component, OnInit } from '@angular/core';
import {LogService} from "@tuskdesk-suite/logs-backend";
import {EventLog} from "@tuskdesk-suite/data-models";
import {Observable} from "rxjs/Observable";

@Component({
  selector: 'logs-list',
  templateUrl: './logs-list.component.html',
  styleUrls: ['./logs-list.component.scss']
})
export class LogsListComponent implements OnInit {
  logs$: Observable<EventLog[]> = this.logService.logs();

  constructor(private logService: LogService) { }

  ngOnInit() {
  }

}
