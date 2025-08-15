import { Component, inject } from '@angular/core';
import { PokemonApi } from '../../service/pokemon-api';
import { FormControl, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-guess',
  imports: [ReactiveFormsModule],
  templateUrl: './guess.html',
  styleUrl: './guess.css',
})
export class Guess {
  private pokemonApi = inject(PokemonApi);

  pokemon: any;
  guessControl = new FormControl('');
  message = '';
  score = 0;
  revealed = false;

  ngOnInit() {
    this.loadRandomPokemon();
  }

  loadRandomPokemon() {
    this.revealed = false;
    this.message = '';
    this.guessControl.setValue('');

    const randomId = Math.floor(Math.random() * 151) + 1;
    this.pokemonApi.getPokemonByName(randomId.toString()).subscribe((data) => {
      this.pokemon = {
        name: data.name,
        image: data.sprites.other['official-artwork'].front_default,
      };
    });
  }

  checkGuess() {
    const guess = this.guessControl.value?.toLowerCase().trim();
    if (guess === this.pokemon.name.toLowerCase()) {
      this.message = `✅ Correct! It's ${this.pokemon.name.toUpperCase()}!`;
      this.score++;
      this.revealed = true;
    } else {
      this.message = `❌ Nope! Try again.`;
    }
  }

  nextPokemon() {
    this.loadRandomPokemon();
  }
}
