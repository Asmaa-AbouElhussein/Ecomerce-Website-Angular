import { Component, OnInit } from '@angular/core';
import { CommonSearchModel } from 'src/app/Component/Admin/Models/search';
import { IUser, User } from 'src/app/Component/Admin/Models/user';
import { UserService } from 'src/app/Component/Admin/Services/user.service';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss']
})
export class UserComponent implements OnInit {
  phoneNumber!:string
  loadingUsers!: boolean;
  users:any[]=[];
  config: any = {};
   commonSearchModel: CommonSearchModel = new CommonSearchModel();
  loadingUsersSearch!: boolean;
  loadingResetUers!: boolean;
  userId!: number;
  loadingPaggingData!: boolean;
  loadingDelete!: boolean;
  constructor(private userService:UserService) { }

  ngOnInit(): void {
    
    this.userService.getUsers((this.commonSearchModel)).subscribe((res:any) =>{
      this.users=res.data
    })
    
  }

}
