import { Component, OnInit } from '@angular/core';
import { BusyService } from '../../../../../Shared/shared/Services/busy.service';

@Component({
  selector: 'app-spinner',
  templateUrl: './spinner.component.html',
  styleUrls: ['./spinner.component.scss']
})
export class SpinnerComponent implements OnInit {
  loader=true;
  constructor( private busyService:BusyService) {
    this.busyService.loader.subscribe(res=>{
      this.loader=res;
    })
   }
  ngOnInit(): void {
  }

}
