import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user.service';
/*-----------------------------------------------------------------*/
@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css'],
})
/*-----------------------------------------------------------------*/
export class UserProfileComponent implements OnInit {
  isLoading: boolean = false;
  users: any[] = [];
  currentId: any;
  currentuser: any;
  token: any;
  /*-----------------------------------------------------------------*/
  // Ctor
  constructor(private userService: UserService) {}
  /*-----------------------------------------------------------------*/
  ngOnInit(): void {
    this.token = localStorage.getItem('userToken');
    this._getUserById();
  }
  /*-----------------------------------------------------------------*/
  _getUserById() {
    this.isLoading = true;
    this.currentId = localStorage.getItem('currentid');

    this.userService.getUserById(this.currentId).subscribe({
      next: (response: { data: any }) => {
        this.currentuser = response.data;
        this.isLoading = false;
      },
      error: (err: any) => {
        console.error('Error fetching user profile:', err);
        this.isLoading = false;
      },
    });
  }
  /*-----------------------------------------------------------------*/
}
