import { Component, inject } from '@angular/core';
import { PokemonApi } from '../../service/pokemon-api';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';


interface Hint {
  kind: 'types' | 'text';
  value: any;
}

@Component({
  selector: 'app-guess',
  imports: [ReactiveFormsModule, MatButtonModule],
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
  helpUsed = 0;

  hints: Hint[] = [];

  typeIcons: { [key: string]: string } = {
    normal: '/normal.png',
    fire: '/fuego.png',
    water: '/agua.png',
    electric: '/electrico.png',
    grass: '/planta.png',
    ice: '/hielo.png',
    fighting: '/lucha.png',
    ground: '/tierra.png',
    flying: '/volador.png',
    psychic: '/psiquico.png',
    bug: '/bicho.png',
    rock: '/roca.png',
    ghost: '/fantasma.png',
    dragon: '/dragon.png',
    dark: '/siniestro.png',
    steel: '/acero.png',
    fairy: '/hada.png',
    poison: '/veneno.png',
  };

  ngOnInit() {
    this.loadRandomPokemon();
  }

  loadRandomPokemon() {
    this.revealed = false;
    this.message = '';
    this.guessControl.setValue('');

    const randomId = Math.floor(Math.random() * 649) + 1;
    this.pokemonApi.getPokemonByName(randomId.toString()).subscribe((data) => {
      this.pokemon = {
        name: data.name,
        image:
          data.sprites.versions['generation-v']['black-white'].animated
            .front_default ||
          data.sprites.other['official-artwork'].front_default,
        types: data.types,
      };
      this.helpUsed = 0;
    });
  }

  checkGuess() {
    const guess = this.guessControl.value?.toLowerCase().trim();
    if (guess === this.pokemon.name.toLowerCase()) {
      this.message = `Correct! It's ${this.pokemon.name.toUpperCase()}!`;
      this.score++;
      this.revealed = true;
    } else {
      this.message = `Nope! Try again.`;
    }
  }

  nextPokemon() {
    this.loadRandomPokemon();
  }

  useHelp() {
    if (this.helpUsed === 0) {
      this.hints.push({ kind: 'types', value: this.pokemon.types });
    } else if (this.helpUsed === 1) {
      this.hints.push({
        kind: 'text',
        value: `Hint: The name has ${this.pokemon.name.length} letters.`,
      });
    } else {
      this.hints.push({ kind: 'text', value: 'No more hints available!' });
    }
    this.helpUsed++;
  }
}
