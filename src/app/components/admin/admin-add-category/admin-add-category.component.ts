import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { timer } from 'rxjs';
import { Category } from 'src/app/models/category';
import { CategoryService } from 'src/app/services/category.service';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { AlertDialogComponent } from '../../dialogs/alert-dialog/alert-dialog.component';
/*-----------------------------------------------------------------*/
@Component({
  selector: 'app-admin-add-category',
  templateUrl: './admin-add-category.component.html',
  styleUrls: ['./admin-add-category.component.css'],
})
/*-----------------------------------------------------------------*/
export class AdminAddCategoryComponent implements OnInit {
  categories: Category[] = [];
  imageDisplay!: string | ArrayBuffer;
  backendErrors: boolean = false;
  editMode: boolean = false;
  currentCategoryID?: string;
  /*-----------------------------------------------------------------*/
  // Ctor
  constructor(private _CategoryService: CategoryService, private _Router: Router, private _Route: ActivatedRoute, private dialog: MatDialog) {}
  /*-----------------------------------------------------------------*/
  ngOnInit(): void {
    // Get list of Categories
    this._CategoryService.getAllcategories().subscribe(
      (response: any) => {
        this.categories = response.data;
      },
      (error: any) => {
        console.error('Error fetching categories:', error);
      }
    );
    /*-----------------------------------------------------------------*/
    this.checkEditMode();
  }
  /*-----------------------------------------------------------------*/
  // Category Form
  addCategoryForm = new FormGroup({
    name: new FormControl('', [Validators.required, Validators.minLength(3), Validators.maxLength(15), Validators.pattern('^[a-zA-Z ]*$')]),
    image: new FormControl<File | null>(null, [Validators.required]),
  });
  /*-----------------------------------------------------------------*/
  // Image Upload
  onImageUpload(event: any) {
    const file = event.target.files[0];
    if (file) {
      this.addCategoryForm.patchValue({ image: file });
      this.addCategoryForm.get('image')?.updateValueAndValidity();
      const reader = new FileReader();
      reader.onload = () => {
        this.imageDisplay = reader.result as string | ArrayBuffer;
      };
      reader.readAsDataURL(file);
    }
  }
  /*-----------------------------------------------------------------*/
  // Create Category Button (Edit or Add Category)
  createCategoryBtn() {
    if (this.addCategoryForm.invalid) {
      return;
    }

    const newCategoryFormData = new FormData();
    newCategoryFormData.append('name', this.addCategoryForm.controls['name'].value!);
    newCategoryFormData.append('image', this.addCategoryForm.controls['image'].value!);

    if (this.editMode) {
      this._updateCategory(this.currentCategoryID!, newCategoryFormData);
    } else {
      this._addCategory(newCategoryFormData);
    }
  }
  /*-----------------------------------------------------------------*/
  // Get specific Category by id
  private _addCategory(category: FormData) {
    this._CategoryService.createCategory(category).subscribe(
      (response: any) => {
        this.openAlertDialog('Success', 'Category Created successfully.').then(() => {
          this.addCategoryForm.reset();
          this.imageDisplay = '';

          // Navigate to categories dashboard after a delay
          timer(1000).subscribe(() => {
            this.navigateToCategoriesDashboard();
          });
        });
      },
      (error: any) => {
        this.openAlertDialog('Error', 'An error occurred while creating the category. Please try again.');
        this.backendErrors = true;
      }
    );
  }
  /*-----------------------------------------------------------------*/
  // Update specific Category
  private _updateCategory(categoryID: string, category: FormData) {
    this._CategoryService.updateCategory(categoryID, category).subscribe(
      (response: any) => {
        this.openAlertDialog('Success', 'Category updated successfully.').then(() => {
          this.addCategoryForm.reset();
          this.imageDisplay = '';

          // Navigate to categories dashboard after a delay
          timer(1000).subscribe(() => {
            this.navigateToCategoriesDashboard();
          });
        });
      },
      (error: any) => {
        this.openAlertDialog('Error', 'An error occurred while updating the category. Please try again.');

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
  navigateToCategoriesDashboard() {
    this._Router.navigate(['/adminPanel/categoriesDashboard']);
  }
  /*-----------------------------------------------------------------*/
  // Check Edit Mode for Categories Dashboard (Edit or Add Category)
  private checkEditMode() {
    this._Route.params.subscribe((params) => {
      if (params['id']) {
        this.editMode = true;
        this.currentCategoryID = params['id'];
        this._getCategoryById(params['id']);
      }
    });
  }
  /*-----------------------------------------------------------------*/
  // Get specific Category by id
  private _getCategoryById(id: any) {
    this._CategoryService.getCategoryById(id).subscribe(
      (category: any) => {
        this.loadCategoryData(category);
      },
      (error: any) => {
        console.error('Error fetching category by ID:', error);
      }
    );
  }
  /*-----------------------------------------------------------------*/
  // Load Data Into Form When Loading Edit Form
  private loadCategoryData(category: any) {
    this.addCategoryForm.controls['name'].setValue(category.data.name);

    // Display the image
    const image = new Image();
    image.onload = () => {
      this.imageDisplay = category.data.image;
    };
    image.src = category.data.image;
  }
  /*-----------------------------------------------------------------*/
  // Reset All Form
  resetAll() {
    this.addCategoryForm.reset();
    this.imageDisplay = '';
    this.backendErrors = false;
  }
  /*-----------------------------------------------------------------*/
}
