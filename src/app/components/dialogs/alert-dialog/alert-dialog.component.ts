import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

/*-----------------------------------------------------------------*/
@Component({
  selector: 'app-alert-dialog',
  templateUrl: './alert-dialog.component.html',
  styleUrls: ['./alert-dialog.component.css'],
})
/*-----------------------------------------------------------------*/
export class AlertDialogComponent {
  constructor(public dialogRef: MatDialogRef<AlertDialogComponent>, @Inject(MAT_DIALOG_DATA) public data: { title: string; message: string; proceed: () => void }) {}
  onConfirm() {
    this.dialogRef.close();
  }
  /*-----------------------------------------------------------------*/
}
