import { Component, ElementRef, ViewChild, AfterViewChecked } from '@angular/core';
import { PokemonApi } from '../../../service/pokemon-api';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-carrusel',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './carrusel.html',
  styleUrl: './carrusel.css',
})
export class Carrusel implements AfterViewChecked {
  @ViewChild('carouselWrapper') carouselWrapper!: ElementRef<HTMLDivElement>;
  pokemon: any[] = [];
  anchoSetCalculado = false;

  constructor(private pokemonApi: PokemonApi) {}

  ngOnInit() {
    this.pokemonApi.getPokemons(151).subscribe((data) => {
      this.pokemon = [...data];
    });
  }

  ngAfterViewChecked() {
    if (!this.anchoSetCalculado && this.carouselWrapper) {
      const wrapperEl = this.carouselWrapper.nativeElement;
      const setWidth = wrapperEl.scrollWidth / 2;
      document.documentElement.style.setProperty('--set-width', `${setWidth}px`);
      this.anchoSetCalculado = true;
    }
  }
}
