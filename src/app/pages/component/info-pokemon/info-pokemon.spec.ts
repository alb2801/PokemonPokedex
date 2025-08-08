import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InfoPokemon } from './info-pokemon';

describe('InfoPokemon', () => {
  let component: InfoPokemon;
  let fixture: ComponentFixture<InfoPokemon>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [InfoPokemon]
    })
    .compileComponents();

    fixture = TestBed.createComponent(InfoPokemon);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
