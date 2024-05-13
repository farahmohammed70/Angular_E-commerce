import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { timer } from 'rxjs';
import { User } from 'src/app/models/user';
import { UserService } from 'src/app/services/user.service';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { AlertDialogComponent } from '../dialogs/alert-dialog/alert-dialog.component';
/*-----------------------------------------------------------------*/
@Component({
  selector: 'app-user-edit-profile',
  templateUrl: './user-edit-profile.component.html',
  styleUrls: ['./user-edit-profile.component.css'],
})
/*-----------------------------------------------------------------*/
export class UserEditProfileComponent implements OnInit {
  isLoading: boolean = false;
  users: any[] = [];
  currentId: any;
  currentuser: any;
  token: any;
  imageDisplay!: string | ArrayBuffer;
  backendErrors: boolean = false;
  /*-----------------------------------------------------------------*/
  // Ctor
  constructor(private _UserService: UserService, private _Router: Router, private _Route: ActivatedRoute, private dialog: MatDialog) {}
  /*-----------------------------------------------------------------*/
  ngOnInit(): void {
    this.token = localStorage.getItem('userToken');
    this._getUserById();
  }
  /*-----------------------------------------------------------------*/
  _getUserById() {
    this.isLoading = true;
    this.currentId = localStorage.getItem('currentid');

    this._UserService.getUserById(this.currentId).subscribe(
      (response: any) => {
        this.currentuser = response.data;
        this.loadUserData(response);
        this.isLoading = false;
      },
      (error: any) => {
        console.error('Error fetching user profile:', error);
        this.isLoading = false;
      }
    );
  }
  /*-----------------------------------------------------------------*/
  // Category Form
  editUserForm = new FormGroup({
    name: new FormControl('', [Validators.required, Validators.minLength(3), Validators.maxLength(15), Validators.pattern('^[a-zA-Z ]*$')]),
    phone: new FormControl('', [Validators.required, Validators.minLength(3), Validators.maxLength(15), Validators.pattern(/^(\+[0-9]{1,3})?([0-9()\-\s]{8,15})$/)]),
    image: new FormControl<File | null>(null),
  });
  /*-----------------------------------------------------------------*/
  // Image Upload
  onImageUpload(event: any) {
    const file = event.target.files[0];
    if (file) {
      this.editUserForm.patchValue({ image: file });
      this.editUserForm.get('image')?.updateValueAndValidity();
      const reader = new FileReader();
      reader.onload = () => {
        this.imageDisplay = reader.result as string | ArrayBuffer;
      };
      reader.readAsDataURL(file);
    } else {
      // If no file is selected, set a default image in imageDisplay
      this.imageDisplay = '../../../assets/images/user.png';
    }
  }
  /*-----------------------------------------------------------------*/
  // Update User Button
  updateUserBtn() {
    if (this.editUserForm.invalid) {
      return;
    }

    const newUserFormData = new FormData();
    newUserFormData.append('name', this.editUserForm.controls['name'].value!);
    newUserFormData.append('phone', this.editUserForm.controls['phone'].value!);
    newUserFormData.append('image', this.editUserForm.controls['image'].value!);

    this._updateUser(this.currentId!, newUserFormData);
  }
  /*-----------------------------------------------------------------*/
  // Update User
  private _updateUser(userID: string, user: FormData) {
    this._UserService.updateUser(userID, user).subscribe(
      (response: any) => {
        this.openAlertDialog('Success', 'User updated successfully.').then(() => {
          this.editUserForm.reset();
          this.imageDisplay = '';

          // Navigate to user profile after a delay
          timer(50).subscribe(() => {
            this.navigateToUserProfile();
          });
        });
      },
      (error: any) => {
        this.openAlertDialog('Error', 'An error occurred while updating the profile. Please try again.');
        this.backendErrors = true;
      }
    );
  }
  /*-----------------------------------------------------------------*/
  // Alert Dialog
  openAlertDialog(title: string, message: string): Promise<void> {
    return new Promise<void>((resolve, reject) => {
      const dialogRef = this.dialog.open(AlertDialogComponent, {
        width: '550px',
        data: { title: title, message: message },
      });
      dialogRef.afterClosed().subscribe(() => {
        console.log('The dialog was closed');
        resolve();
      });
    });
  }
  /*-----------------------------------------------------------------*/
  // Navigate To Categories Dashboard After Add or Edit
  navigateToUserProfile() {
    this._Router.navigate([`/userprofile/${this.currentId}`]);
  }

  /*-----------------------------------------------------------------*/
  // Load Data Into Form When Loading Edit Form
  private loadUserData(user: any) {
    this.editUserForm.controls['name'].setValue(user.data.name);
    this.editUserForm.controls['phone'].setValue(user.data.phone);

    // Display the image
    const image = new Image();
    image.onload = () => {
      this.imageDisplay = user.data.image;
    };
    image.src = user.data.image;
  }
  /*-----------------------------------------------------------------*/
  // Reset All Form
  resetAll() {
    this.editUserForm.reset();
    this.imageDisplay = '';
    this.backendErrors = false;
    this.navigateToUserProfile();
  }
  /*-----------------------------------------------------------------*/
}
