import { Component, inject, OnInit } from '@angular/core';
import { MoviesProvider } from '../store/movies.store';
import { MovieItemComponent } from './movie-item.component';

@Component({
  selector: 'movie-list',
  template: `
    <div class="text-center">
      <h1 class="prose-xl mb-8">
        My movies Gallery <b>{{ moviesState.moviesCount() }} movie(s)</b> in
        total
      </h1>
    </div>
    @if (moviesState.selectedMoviesCount()) {
    <div class="text-center sticky top-10 z-[10] bg-white">
      <button
        (click)="moviesState.deleteSelectedMovies()"
        class="btn btn-outline btn-error"
      >
        Delete {{ moviesState.selectedMoviesCount() }} selected movie(s)
      </button>
    </div>
    } @if (moviesState.loading()) {

    <div class="text-center">
      <h1 class="prose-xl mb-8 text-4xl">{{ moviesState.status() }}</h1>
    </div>

    } @else {
    <div class="max-w-[1440px] mx-auto">
      <div class="grid grid-cols-4  gap-5  items-stretch auto-cols-[3fr]">
        @for (movie of moviesState.movies(); track movie.title) {
        <movie-item
          [movie]="movie"
          [isSelected]="moviesState.selectedMovies().has(movie.title)"
        />
        }
      </div>
    </div>
    }
  `,
  styles: [``],
  standalone: true,
  providers: [MoviesProvider],
  imports: [MovieItemComponent],
})
export class MovieListComponent implements OnInit {
  moviesState = inject(MoviesProvider);

  ngOnInit(): void {
    console.log(this.moviesState);
  }
}
