import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { timer } from 'rxjs';
import { Brand } from 'src/app/models/brand';
import { BrandService } from 'src/app/services/brand.service';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { AlertDialogComponent } from '../../dialogs/alert-dialog/alert-dialog.component';
/*-----------------------------------------------------------------*/
@Component({
  selector: 'app-admin-add-brand',
  templateUrl: './admin-add-brand.component.html',
  styleUrls: ['./admin-add-brand.component.css'],
})
/*-----------------------------------------------------------------*/
export class AdminAddBrandComponent implements OnInit {
  brands: Brand[] = [];
  imageDisplay!: string | ArrayBuffer;
  backendErrors: boolean = false;
  editMode: boolean = false;
  currentBrandID?: string;
  /*-----------------------------------------------------------------*/
  // Ctor
  constructor(private _BrandService: BrandService, private _Router: Router, private _Route: ActivatedRoute, private dialog: MatDialog) {}
  /*-----------------------------------------------------------------*/
  ngOnInit(): void {
    // Get list of Brands
    this._BrandService.getAllBrands().subscribe(
      (response: any) => {
        this.brands = response.data;
      },
      (error: any) => {
        console.error('Error fetching brands:', error);
      }
    );
    /*-----------------------------------------------------------------*/
    this.checkEditMode();
  }
  /*-----------------------------------------------------------------*/
  // Brand Form
  addBrandForm = new FormGroup({
    name: new FormControl('', [Validators.required, Validators.minLength(3), Validators.maxLength(15), Validators.pattern('^[a-zA-Z ]*$')]),
    image: new FormControl<File | null>(null, [Validators.required]),
  });
  /*-----------------------------------------------------------------*/
  // Image Upload
  onImageUpload(event: any) {
    const file = event.target.files[0];
    if (file) {
      this.addBrandForm.patchValue({ image: file });
      this.addBrandForm.get('image')?.updateValueAndValidity();
      const reader = new FileReader();
      reader.onload = () => {
        this.imageDisplay = reader.result as string | ArrayBuffer;
      };
      reader.readAsDataURL(file);
    }
  }
  /*-----------------------------------------------------------------*/
  // Create Brand Button (Edit or Add Category)
  createBrandBtn() {
    if (this.addBrandForm.invalid) {
      return;
    }

    const newBrandFormData = new FormData();
    newBrandFormData.append('name', this.addBrandForm.controls['name'].value!);
    newBrandFormData.append('image', this.addBrandForm.controls['image'].value!);

    if (this.editMode) {
      this._updateBrand(this.currentBrandID!, newBrandFormData);
    } else {
      this._addBrand(newBrandFormData);
    }
  }
  /*-----------------------------------------------------------------*/
  // Get specific Brand by id
  private _addBrand(brand: FormData) {
    this._BrandService.createBrand(brand).subscribe(
      (response: any) => {
        this.openAlertDialog('Success', 'Brand Created successfully.').then(() => {
          this.addBrandForm.reset();
          this.imageDisplay = '';

          // Navigate to Brands dashboard after a delay
          timer(1000).subscribe(() => {
            this.navigateToBrandsDashboard();
          });
        });
      },
      (error: any) => {
        this.openAlertDialog('Error', 'An error occurred while creating the Brand. Please try again.');
        this.backendErrors = true;
      }
    );
  }
  /*-----------------------------------------------------------------*/
  // Update specific Brand
  private _updateBrand(brandID: string, brand: FormData) {
    this._BrandService.updateBrand(brandID, brand).subscribe(
      (response: any) => {
        this.openAlertDialog('Success', 'Brand updated successfully.').then(() => {
          this.addBrandForm.reset();
          this.imageDisplay = '';

          // Navigate to Brands dashboard after a delay
          timer(1000).subscribe(() => {
            this.navigateToBrandsDashboard();
          });
        });
      },
      (error: any) => {
        this.openAlertDialog('Error', 'An error occurred while updating the Brand. Please try again.');
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
  // Navigate To Brands Dashboard After Add or Edit
  navigateToBrandsDashboard() {
    this._Router.navigate(['/adminPanel/brandsDashboard']);
  }
  /*-----------------------------------------------------------------*/
  // Check Edit Mode for Brands Dashboard (Edit or Add Brand)
  private checkEditMode() {
    this._Route.params.subscribe((params) => {
      if (params['id']) {
        this.editMode = true;
        this.currentBrandID = params['id'];
        this._getBrandById(params['id']);
      }
    });
  }
  /*-----------------------------------------------------------------*/
  // Get specific Brand by id
  private _getBrandById(id: any) {
    this._BrandService.getBrandById(id).subscribe(
      (brand: any) => {
        this.loadBrandData(brand);
      },
      (error: any) => {
        console.error('Error fetching brand by ID:', error);
      }
    );
  }
  /*-----------------------------------------------------------------*/
  // Load Data Into Form When Loading Edit Form
  private loadBrandData(brand: any) {
    this.addBrandForm.controls['name'].setValue(brand.data.name);

    // Display the image
    const image = new Image();
    image.onload = () => {
      this.imageDisplay = brand.data.image;
    };
    image.src = brand.data.image;
  }
  /*-----------------------------------------------------------------*/
  // Reset All Form
  resetAll() {
    this.addBrandForm.reset();
    this.imageDisplay = '';
    this.backendErrors = false;
  }
  /*-----------------------------------------------------------------*/
}
