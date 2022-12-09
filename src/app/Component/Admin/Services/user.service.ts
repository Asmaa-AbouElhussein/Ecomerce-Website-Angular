import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { CommonSearchModel } from '../Models/search';
import { User } from '../Models/user';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private url = environment.apiUrl + 'account/';

  constructor(private http: HttpClient) { }

  getUsers(commonSearchModel: CommonSearchModel): any {
    return this.http.post(this.url + 'getUsers', commonSearchModel);
  }

  deleteUser(userId: any) {
    return this.http.delete(this.url + 'deleteUser/' + userId);
  }
}
