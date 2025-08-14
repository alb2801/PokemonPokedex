import { CommonModule } from '@angular/common';
import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { MatCardModule } from '@angular/material/card';

@Component({
  selector: 'app-info-pokemon',
  imports: [CommonModule, MatCardModule],
  templateUrl: './info-pokemon.html',
  styleUrl: './info-pokemon.css',
})
export class InfoPokemon implements OnChanges {
  @Input() pokemon: any = null;
  tipos: string = '';
  habilidades = '';

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['pokemon'] && this.pokemon) {
      this.tipos = this.pokemon.types.map((t: any) => t.type.name).join(', ');

      this.habilidades = this.pokemon.abilities
        .map((a: any) => a.ability.name)
        .join(', ');
    }
  }
}
