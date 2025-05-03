import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DialogService {

  constructor() { }
  
  private closeDialogSource = new Subject<void>();
  closeDialog$ = this.closeDialogSource.asObservable();

  closeDialog() {
    this.closeDialogSource.next();
  }
}
