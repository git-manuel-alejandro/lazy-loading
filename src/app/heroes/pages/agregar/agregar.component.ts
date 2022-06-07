import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Heroe, Publisher } from '../../interfaces/heroes.interfaces';
import { HeroesService } from '../../services/heroes.service';
import { switchMap } from 'rxjs/operators';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmarComponent } from '../../components/confirmar/confirmar.component';


@Component({
  selector: 'app-agregar',
  templateUrl: './agregar.component.html',
  styleUrls: ['./agregar.component.css']
})
export class AgregarComponent implements OnInit {

  publisher = [
    { id: 'DC Comics', desc: 'DC -- Comics' },
    { id: 'Marvel Comics', desc: 'Marvel -- Comics' }
  ]

  heroe: Heroe = {
    superhero: '',
    alter_ego: '',
    characters: '',
    first_appearance: '',
    publisher: Publisher.DCComics,
    alt_img: ''

  }

  constructor(
    private heroeSercice: HeroesService,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private _snackBar: MatSnackBar,
    public dialog: MatDialog
  ) { }

  ngOnInit(): void {

    if (!this.router.url.includes('editar')) {
      return
    }

    this.activatedRoute.params
      .pipe(switchMap(({ id }) => this.heroeSercice.getHeroePorId(id)))
      .subscribe(heroe => this.heroe = heroe)
  }

  guardar() {
    if (this.heroe.superhero.length === 0) {
      return
    }

    if (this.heroe.id) {
      this.heroeSercice.actualizarHeroe(this.heroe).subscribe(heroe => this.openSnackBar('Actualizado', 'Ok!'))

    } else {
      this.heroeSercice.agregarHeroe(this.heroe).subscribe(heroe => {
        this.router.navigate(['/heroes/editar', heroe.id])
        this.openSnackBar('Guardado', 'Ok!')
      })
    }

  }

  borrarHeroe() {
    const dialog = this.dialog.open(ConfirmarComponent, {
      width: '250px',
      data: this.heroe
    })

    dialog.afterClosed().subscribe((result) => {
      if (result) {
        this.heroeSercice.borrarHeroe(this.heroe.id!).subscribe(res => { this.router.navigate(['/heroes']) })

      }
    })



  }

  openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action, {
      duration: 2500
    });

  }

}
