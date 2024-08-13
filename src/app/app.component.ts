import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  NgZone,
  OnChanges,
  OnInit,
  afterRender,
  inject,
  signal,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import { MovieListComponent } from '../movies/movies-list.component';
import { FormsModule } from '@angular/forms';
import { RandomNumberGeneratorComponent } from '../random-number-generator.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [MovieListComponent, FormsModule, RandomNumberGeneratorComponent],
  template: `
    <random-number-generator />

    <movie-list />
  `,

  // changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppComponent {}
