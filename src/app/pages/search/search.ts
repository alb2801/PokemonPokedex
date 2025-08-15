import { Component, EventEmitter, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-search',
  imports: [CommonModule ,MatInputModule, MatButtonModule, FormsModule],
  templateUrl: './search.html',
  styleUrl: './search.css'
})
export class Search {
  @Output() search = new EventEmitter<string>();
  searchName = '';

  buscarPokemon() {
    if (this.searchName.trim()) {
      this.search.emit(this.searchName);
    }
  }
}
