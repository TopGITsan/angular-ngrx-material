import { ChangeDetectionStrategy, Component } from '@angular/core';
// import { MatFormFieldModule } from "@angular/material/form-field";
import { MatIconModule } from "@angular/material/icon";
import { MatInputModule } from "@angular/material/input";
import { MatToolbarModule } from "@angular/material/toolbar";
import { MatTooltipModule } from "@angular/material/tooltip";
import { RouterModule } from '@angular/router';



@Component({
  selector: 'app-shell',
  standalone: true,
  imports: [MatToolbarModule, MatIconModule, MatTooltipModule, MatInputModule, RouterModule],
  templateUrl: './shell.component.html',
  styleUrl: './shell.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ShellComponent {

}
