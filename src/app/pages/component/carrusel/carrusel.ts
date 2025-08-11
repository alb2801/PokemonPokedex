import { Component } from '@angular/core';
import { PokemonApi } from '../../../service/pokemon-api';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-carrusel',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './carrusel.html',
  styleUrl: './carrusel.css'
})
export class Carrusel {
  pokemon: any[] = [];

  constructor(private pokemonApi: PokemonApi) {}

  ngOnInit() {
    this.pokemonApi.getPokemons(6).subscribe((data) => {
      // duplicamos la lista para que el carrusel sea infinito visualmente
      this.pokemon = [...data, ...data];
    });
  }
}
