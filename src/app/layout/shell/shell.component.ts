import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
// import { MatFormFieldModule } from "@angular/material/form-field";
import { FormsModule } from '@angular/forms';
import { MatIconModule } from "@angular/material/icon";
import { MatInputModule } from "@angular/material/input";
import { MatToolbarModule } from "@angular/material/toolbar";
import { MatTooltipModule } from "@angular/material/tooltip";
import { RouterModule } from '@angular/router';
import { Observable } from 'rxjs';
import { BookmarkService } from '../../shared/services/bookmark/bookmark.service';
import { GlobalStoreFacadeService } from '../../store/global.store.facade';



@Component({
  selector: 'app-shell',
  standalone: true,
  imports: [MatToolbarModule, MatIconModule, MatTooltipModule, MatInputModule, RouterModule, FormsModule],
  templateUrl: './shell.component.html',
  styleUrl: './shell.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ShellComponent {
  constructor(public readonly bookmarkService: BookmarkService, private readonly store: GlobalStoreFacadeService) { }

  onFilterChange(inputEvent: Event): void {
    const target: HTMLInputElement = (inputEvent.target) as HTMLInputElement;
    this.store.onFilterChange(target.value ?? '');
  }

}
