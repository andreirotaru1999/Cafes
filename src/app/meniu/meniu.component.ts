import { Component, OnInit, Input, SimpleChanges, OnChanges  } from '@angular/core';
import { UntypedFormGroup,UntypedFormControl } from '@angular/forms';
import { PseudoApiService } from '../pseudo-api.service';
import { debounceTime } from "rxjs/operators";
import { Cafea } from './meniu.model';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-meniu',
  templateUrl: './meniu.component.html',
  styleUrls: ['./meniu.component.scss']
})
export class MeniuComponent implements OnChanges {
  subscription: Subscription = new Subscription;
  meniu:Cafea[] = [];
  meniuNefiltrat:Cafea[] = [];
  @Input() id:any;
  filters: string[] = [];
  eroare = false;
  searchForm = new UntypedFormGroup({
    search: new UntypedFormControl('')
  })
  meniuFiltrat:Cafea[] = [];
  isLoaded = false;

  constructor(private api: PseudoApiService)
  {
    this.searchForm.valueChanges.pipe(debounceTime(250)).subscribe(res => {
      this.filters = res.search.split(" ");
      console.log(this.filters);
      this.meniu = [];
      this.meniuNefiltrat.forEach(coffee => {
        let ok = true;
        this.filters.forEach(filter => {
          // verificam daca cuvantul este alcatuit din cifre
          if(/^\d+$/.test(filter)) {
            //verificam daca id-ul este asociat vreunei cafele
            if(coffee.id.toString() !== filter) {
              ok = false;
            }
            // verificam daca denumirea sau descrierea cafelei contin valoarea filtrului
          } else if(!(coffee.denumire.toLowerCase().includes(filter.toLowerCase()) ||
               coffee.descriere.toLowerCase().includes(filter.toLowerCase()))) {
                ok = false;
            }
          })
          if(ok) {
            this.meniu.push(coffee);
          }
       })
    });
  }

  // folosim ngOnChanges pentru a detecta selectarea unei alte cafenele

  ngOnChanges() {
    this.isLoaded = false;
    this.subscription=this.api.ProduseDisponibile(this.id).subscribe(cafele => {
      this.meniu = cafele;
      this.meniuNefiltrat = cafele;
      console.log('Am obtinut o lista cu cafele', cafele);
      this.eroare = false;
      this.isLoaded = true

    },
    (error) => {
      this.meniu = [];
      this.eroare = true;
      console.log("eroare:", error);
      this.isLoaded = true
    })
  }
// padding la localitati si cafele si search
// inchis toti copii cand inchidem un parinte

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

}
