import { Component, OnInit } from '@angular/core';
import { RecettesService } from '../recettes.service';
import { Recette } from '../recette'

@Component({
  selector: 'app-recettes',
  templateUrl: './recettes.component.html',
  styleUrls: ['./recettes.component.css']
})
export class RecettesComponent implements OnInit {
  recettes: Recette[] = [];
  currentPage = 0;
  categories: any;
  currentCategory: string;

  constructor(private recetteService: RecettesService) { }

  ngOnInit() {
    this.getRecettes(0);
    this.getCategories();
  }

  getRecettes(page: number, category?: string) {
    this.recetteService.getRecettes(page, category).subscribe(recettes => {
      this.recettes = recettes.data;
    });
  }

  getCategories() {
    this.recetteService.getCategories().subscribe(categories => {
      this.categories = categories.data.filter(item => item._id);
    });
  }

  changeCategory(category) {
    console.log(category);
    this.currentPage = 0;
    this.currentCategory = category;
    this.getRecettes(this.currentPage, this.currentCategory);
  }

  nextPage() {
    if (this.recettes.length !== 0) {
      this.currentPage++;
      this.getRecettes(this.currentPage, this.currentCategory);
    }
  }

  previousPage() {
    if (this.currentPage > 0) {
      this.currentPage--;
      this.getRecettes(this.currentPage, this.currentCategory);
    }
  }

}
