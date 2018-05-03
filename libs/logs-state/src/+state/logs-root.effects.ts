import {Injectable} from '@angular/core';
import {Actions, Effect} from '@ngrx/effects';
import {LoadLogsRoot, LogsRootActionTypes, LogsRootLoaded} from './logs-root.actions';
import {LogsRootState} from './logs-root.reducer';
import {DataPersistence} from '@nrwl/nx';
import {LogService} from '@tuskdesk-suite/logs-backend';
import {catchError, map, mergeMap, tap} from 'rxjs/operators';
import {of} from 'rxjs/observable/of';

@Injectable()
export class LogsRootEffects {
  @Effect() effect$ = this.actions$.ofType(LogsRootActionTypes.LoadLogsRoot).pipe(
    mergeMap(action => {
      return this.logService
        .logs()
        .pipe(
          map(logs => new LogsRootLoaded(logs)),
          catchError(_ => of(null))
        );
    })
  );

  @Effect()
  loadLogsRoot$ = this.dataPersistence.fetch(LogsRootActionTypes.LoadLogsRoot, {
    run: (action: LoadLogsRoot, state: LogsRootState) => {
      return new LogsRootLoaded(state.logsRoot.eventLogs);
    },

    onError: (action: LoadLogsRoot, error) => {
      console.error('Error', error);
    }
  });

  constructor(private actions$: Actions, private dataPersistence: DataPersistence<LogsRootState>, private logService: LogService) {
  }
}
