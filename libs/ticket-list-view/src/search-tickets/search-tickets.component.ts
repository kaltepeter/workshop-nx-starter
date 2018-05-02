import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Observable } from 'rxjs/Observable';
import { TicketService, UserService } from '@tuskdesk-suite/backend';
import { User } from '@tuskdesk-suite/data-models';
import { distinctUntilChanged, debounceTime, filter, tap, map } from 'rxjs/operators';

@Component({
  selector: 'app-search-tickets',
  templateUrl: './search-tickets.component.html',
  styleUrls: ['./search-tickets.component.scss']
})
export class SearchTicketsComponent implements OnInit, OnDestroy {
  searchTerm = new FormControl();
  assignedToUser = new FormControl();
  searchResults$: Observable<SearchResult[]>;
  subscription;
  users: String[];

  constructor(private ticketService: TicketService, private userService: UserService) { }

  ngOnInit() {
    this.subscription = this.assignedToUser.valueChanges
      .pipe(
        debounceTime(500),
        distinctUntilChanged(),
        tap(criteria => {
          if (criteria.length < 1) {
            this.users = null;
          }
        }),
        filter(user => user.length > 0)        
      )
      .subscribe(searchValue => {
        const toFullNames = (users) =>  users.map(it => it.fullName);
        this.userService.users(searchValue)
          .pipe(
            map(toFullNames)
          )
          .subscribe(userFullNames => {
            console.log('user: ', userFullNames);
            this.users = userFullNames;
          });
      });
  }

  ngOnDestroy() {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }

  setAssignedToUser(value) {
    this.assignedToUser.patchValue(value, { emitEvent: false });
  }

  submit() {
    this.searchResults$ = this.ticketService.searchTickets(this.searchTerm.value, this.assignedToUser.value);
  }
}

interface SearchResult {
  id: number;
  message: string;
  status: string;
}
