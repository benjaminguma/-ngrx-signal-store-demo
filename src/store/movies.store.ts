import { computed, Inject, inject } from '@angular/core';
import {
  patchState,
  signalStore,
  signalStoreFeature,
  withComputed,
  withHooks,
  withMethods,
  withState,
} from '@ngrx/signals';
import { MovieService } from '../movies/services/movies.service';
import { filter } from 'rxjs';
import { movie } from '../movies/static/movies';

const withLoadingFeature = () => {
  return signalStoreFeature(
    withState<{ loading: boolean }>({
      loading: false,
    }),
    withComputed((state) => ({
      status: computed(() => (state.loading() ? 'loading' : 'success')),
    }))
  );
};

function setLoading() {
  return { loading: true };
}

function stopLoading() {
  return { loading: false };
}
type moviesState = {
  movies: movie[];
  loading: boolean;
  selectedMovies: Map<string, boolean>;
};

const initialState: moviesState = {
  movies: [],
  loading: false,
  selectedMovies: new Map<string, boolean>(),
};

export const MoviesProvider = signalStore(
  withState(initialState),
  withComputed((state) => ({
    moviesCount: computed(() => state.movies().length),
    selectedMoviesCount: computed(() => state.selectedMovies().size),
  })),

  withHooks((state) => {
    const moviesService = inject(MovieService);
    return {
      async onInit() {
        patchState(state, setLoading());
        const movies = await moviesService.getMovies();
        patchState(state, { movies }, stopLoading());
      },
    };
  }),
  // withHooks((state) => {
  //   const moviesService = inject(MovieService);
  //   return {
  //     async onInit() {
  //       patchState(state, { loading: true });
  //       const movies = await moviesService.getMovies();
  //       patchState(state, { movies, loading: false });
  //     },
  //   };
  // }),

  withMethods((state) => {
    return {
      selectMovieToggle(title: string) {
        const updatedSelected = new Map<string, boolean>(
          state.selectedMovies()
        );

        if (updatedSelected.has(title)) {
          updatedSelected.delete(title);
        } else updatedSelected.set(title, true);
        patchState(state, {
          selectedMovies: updatedSelected,
        });

        this._printMessage('selected movie');
      },
      _printMessage(message: string) {
        console.log('pip');
      },

      deleteSelectedMovies() {
        const movies: movie[] = [];
        state.movies().map((movie) => {
          if (!state.selectedMovies().has(movie.title)) {
            movies.push(movie);
          }
        });

        patchState(state, (state) => ({
          ...state,
          movies,
          selectedMovies: new Map(),
        }));
      },
    };
  }),

  withLoadingFeature()
);
