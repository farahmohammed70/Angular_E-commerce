import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user.service';
import { User } from 'src/app/models/user';
import { ConfirmationDialogComponent } from '../../dialogs/confirmation-dialog/confirmation-dialog.component';
import { MatDialog } from '@angular/material/dialog';
/*-----------------------------------------------------------------*/
@Component({
  selector: 'app-admin-users-dashboard',
  templateUrl: './admin-users-dashboard.component.html',
  styleUrls: ['./admin-users-dashboard.component.css'],
})
/*-----------------------------------------------------------------*/
export class AdminUsersDashboardComponent implements OnInit {
  users: User[] = [];
  constructor(private _UserService: UserService, private dialog: MatDialog) {}
  /*-----------------------------------------------------------------*/
  ngOnInit(): void {
    this._getAllusers();
  }
  /*-----------------------------------------------------------------*/
  // Delete specific User
  _deleteUser(userId: any): void {
    this.dialog.open(ConfirmationDialogComponent, {
      data: {
        message: 'Are you sure you want to delete this user?',
        proceed: () => {
          this._UserService.deleteUser(userId).subscribe({
            next: () => {
              // this.users = this.users.filter((user: any) => user._id != userId);
              this._getAllusers();
            },
            error: (error) => {
              console.error('Error deleting user:', error);
            },
          });
        },
      },
    });
  }
  /*-----------------------------------------------------------------*/
  // Get list of Users
  private _getAllusers() {
    this._UserService.getAllUsers().subscribe(
      (response: any) => {
        this.users = response.data;
        this.users = this.users.filter((user: any) => user.role != 'admin');
      },
      (error: any) => {
        console.error('Error fetching users:', error);
      }
    );
  }
  /*-----------------------------------------------------------------*/
  // Delete specific User
  // _deleteUser(userId: any) {
  //   this._UserService.deleteUser(userId).subscribe((response) => {
  //     console.log(response);
  //     this.users = this.users.filter((user: any) => user._id != userId);
  //   });
  // }
  /*-----------------------------------------------------------------*/
}
