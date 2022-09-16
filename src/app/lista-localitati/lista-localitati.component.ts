import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { PseudoApiService } from '../pseudo-api.service';
import { CafeneaSauLocalitate } from '../cafeneasaulocalitate';

@Component({
  selector: 'app-lista-localitati',
  templateUrl: './lista-localitati.component.html',
  styleUrls: ['./lista-localitati.component.scss']
})
export class ListaLocalitatiComponent {
  @Input()localitati: CafeneaSauLocalitate[] = []
  idCafeneaSelectata: number | null = null;
  @Output() selectCafeEmitter = new EventEmitter<number>();
  @Input() selectedCafe: number | null = null;

  constructor()
  {
  }

  selectCafe(id: number) {
    this.selectCafeEmitter.emit(id);
    this.idCafeneaSelectata = id;
  }
  ngOnChanges() {
    if( this.selectedCafe!= this.idCafeneaSelectata)
    this.idCafeneaSelectata = null;
  }

  arataCopii(localitate:CafeneaSauLocalitate){
    if(localitate.arataCopii === true) {
      this.inchideSubmeniuri(localitate)
    }
      localitate.arataCopii = !localitate.arataCopii;
  }

  inchideSubmeniuri(localitate:CafeneaSauLocalitate){
    if(localitate.copii && localitate.copii.length > 0){
      localitate.copii!.forEach(copil => {
        copil.arataCopii = false;
        this.inchideSubmeniuri(copil);
      });
    }
  }


}

