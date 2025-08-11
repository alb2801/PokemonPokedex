import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PokemonApi {
  private http = inject(HttpClient);

  getPokemons(limit: number = 5): Observable<any[]> {
    return this.http.get<any>(`https://pokeapi.co/api/v2/pokemon?limit=${limit}`)
      .pipe(
        map(res => res.results.map((pokemon: any, index: number) => {
          return {
            name: pokemon.name,
            image: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${index + 1}.png`
          };
        }))
      );
  }
}
