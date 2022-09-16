import { Component, OnInit } from '@angular/core';
import { PseudoApiService } from './pseudo-api.service';
import { CafeneaSauLocalitate } from './cafeneasaulocalitate';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  subscription: Subscription = new Subscription;
  title = 'ExAngular';
  lista: CafeneaSauLocalitate[] = [];
  localitati: CafeneaSauLocalitate[] = []
  idCafeneaSelectata: number | null = null;
  constructor(private api: PseudoApiService)
  {
  }
  ngOnInit(): void {
    // Obtin lista cu toate cafenelele si toate localitatile
    this.subscription = this.api.ListaLocalitati().subscribe(lista => {
      this.lista = lista;
      const dataTree:any = {};
      console.log('Am obtinut lista', lista);

      // Parsam locatiile pentru a le organiza intr-o forma ce ne va ajuta la afisare.
      // Adaugam locatiile copil in proprietatea de tip array "copii" pe care o vom adauga
      // fiecarei locatii parinte

      lista.forEach(location=> {
        dataTree[location.id] = {...location, copii: []};
        dataTree[location.id].arataCopii = false;
      })

      // In cazul nostru, unde datele vin corect ordonate, parsarea putea fi facuta intr-un singur forEach
      // dar avand in vedere controlul limitat asupra "endpoint-ului" am preferat o implementare mai robusta
      // dar mai putin performanta.

      lista.forEach(location=> {
        if(location.idParinte) {
          dataTree[location.idParinte].copii.push(dataTree[location.id])
        }  else this.localitati.push(dataTree[location.id])
      })
      console.log("Arbore:", this.localitati);
    })
  }
  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  selectCafe(id: any) {
    console.log(id);
    this.idCafeneaSelectata = id;
  }

}
