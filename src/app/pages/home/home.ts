import { Component } from '@angular/core';
import { Carrusel } from "../component/carrusel/carrusel";
import { Search } from "../search/search"
import { InfoPokemon } from "../component/info-pokemon/info-pokemon";
import { PokemonApi } from '../../service/pokemon-api';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-home',
  imports: [CommonModule, Search ,Carrusel, InfoPokemon],
  templateUrl: './home.html',
  styleUrl: './home.css'
})
export class Home {
  pokemon: any = null;
  errorMessage = '';

  constructor(private pokemonApi : PokemonApi) {}

  onSearch(name: string) {
    this.errorMessage = '';
    this.pokemon = null;

    this.pokemonApi.getPokemonByName(name).subscribe({
      next: (data) => this.pokemon = data,
      error: () => this.errorMessage = 'Pokémon no encontrado'
    });
  }
}
