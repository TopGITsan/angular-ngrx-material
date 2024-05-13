import { Component, Inject } from '@angular/core';
import { MatButtonModule } from "@angular/material/button";
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from "@angular/material/dialog";
import { Router } from '@angular/router';

export interface Error {
  errorMessage: string,
  redirectTo: string
}

@Component({
  selector: 'app-error-dialog',
  standalone: true,
  imports: [MatDialogModule, MatButtonModule],
  templateUrl: './error-dialog.component.html',
  styleUrl: './error-dialog.component.scss'
})
export class ErrorDialogComponent {

  constructor(public readonly dialogRef: MatDialogRef<ErrorDialogComponent>, @Inject(MAT_DIALOG_DATA) public error: Error, private readonly router: Router) { }

  confirm(): void {
    if (this.error.redirectTo) {
      this.router.navigate([this.error.redirectTo])
    }
    this.dialogRef.close()
  }

}
