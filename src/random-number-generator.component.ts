import { Component, computed, OnInit } from '@angular/core';
import { getState, patchState, signalState } from '@ngrx/signals';

type RandomNumberGeneratorState = {
  generatedNumbers: number[];
};

@Component({
  selector: 'random-number-generator',
  template: `
    <div class="grid justify-center mt-7">
      <button class="btn btn-active btn-accent" (click)="addRandomNumber()">
        Add random number
      </button>
      <h1 class="text-center text-2xl font-bold">
        total of {{ noOfRandomNumbers() }} random number(s) generated
      </h1>
      <div class="mt-7 divide-y-2 grid border-2 mb-9">
        @for (number of randomNumberState.generatedNumbers(); track $index) {
        <h2>
          <b class="border-r-2 py-3 px-2 w-12 inline-block"
            >{{ $index + 1 }}.</b
          >

          {{ number }}
        </h2>
        }
      </div>
    </div>
  `,
  styles: [``],
  standalone: true,
})
export class RandomNumberGeneratorComponent implements OnInit {
  randomNumberState = signalState<RandomNumberGeneratorState>({
    generatedNumbers: [],
  });

  noOfRandomNumbers = computed(
    () => this.randomNumberState().generatedNumbers.length
  );

  addRandomNumber() {
    const randomNumber = Math.random();

    patchState(
      this.randomNumberState,

      (state) => ({
        ...state,
        generatedNumbers: [randomNumber, ...state.generatedNumbers],
      }),
      {
        generatedNumbers: [
          randomNumber,
          ...this.randomNumberState().generatedNumbers,
        ],
      }
    );
  }

  ngOnInit(): void {
    this.addRandomNumber();
  }
}
