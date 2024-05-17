import { Component, Inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import {
  MAT_DIALOG_DATA,
  MatDialogModule,
  MatDialogRef,
} from '@angular/material/dialog';
import { GlobalStoreFacadeService } from '../../../store/global.store.facade';

export interface Error {
  errorMessage: string;
  redirectTo: string;
}

@Component({
  selector: 'app-error-dialog',
  standalone: true,
  imports: [MatDialogModule, MatButtonModule],
  templateUrl: './error-dialog.component.html',
  styleUrl: './error-dialog.component.scss',
})
export class ErrorDialogComponent {
  constructor(
    public readonly dialogRef: MatDialogRef<ErrorDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public error: Error,
    private readonly store: GlobalStoreFacadeService,
  ) {}

  confirm(): void {
    if (this.error.redirectTo) {
      this.store.onRedirectToProvidedRoute(this.error.redirectTo);
    }
    this.dialogRef.close();
  }
}
