import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BusyService {


  constructor() {  }

   loader=new BehaviorSubject<boolean>(true);
 

}
