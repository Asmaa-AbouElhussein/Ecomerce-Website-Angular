import { Component, OnInit } from '@angular/core';
import { Route, Router } from '@angular/router';
import { AuthService } from '../../../Services/auth.service';

@Component({
  selector: 'app-dashboart',
  templateUrl: './dashboart.component.html',
  styleUrls: ['./dashboart.component.scss']
})
export class DashboartComponent implements OnInit {
  currentAdmin: any
  displayName: any = "";
  constructor(private router: Router, private authservice: AuthService) {
    this.displayName = localStorage.getItem('displayName');
  }

  ngOnInit(): void {

    this.authservice.getCurrentUser().subscribe((res: any) => {
      this.currentAdmin = res

    })
  }
  public logout() {
    let _token = localStorage.getItem('token');
    let _displayName = localStorage.getItem('displayName');

    if (_token && _displayName) {
      localStorage.removeItem('token');
      localStorage.removeItem('displayName');
      this.router.navigate(['/login']);
    }
    else {
      localStorage.removeItem('token');
      localStorage.removeItem('displayName');
      localStorage.removeItem('userData');
      this.router.navigate(['/login']);
    }

  }
}
