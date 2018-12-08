import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { RecettesService } from '../recettes.service';
import { Recette } from '../recette';

@Component({
  selector: 'app-recette',
  templateUrl: './recette.component.html',
  styleUrls: ['./recette.component.scss']
})
export class RecetteComponent implements OnInit {
  recette: Recette;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private recetteService: RecettesService
  ) { }

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');
    this.getRecette(id);
  }

  getRecette(id: string) {
    this.recetteService.getRecette(id).subscribe(recette => {
      console.log(recette.data);
      this.recette = recette.data;
    });
  }


}
