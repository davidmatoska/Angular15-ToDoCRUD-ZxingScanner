import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';

//Articles

import { ArticleAddEditComponent } from './article-add-edit/article-add-edit.component';
import { ArticlesService } from './services/articles.service';

//tableau

import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';
import { CoreService } from './core/core.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'scan-app';


  // tableau
  displayedColumns: string[] = [
  'id', 
  'reference', 
  'date', 
  'quantite',
  'commentaire',
  'action',
  ];
  dataSource!: MatTableDataSource<any>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  // Ajout article
  constructor (
    private _dialog: MatDialog, 
    private _articlesService: ArticlesService,
    private _coreService: CoreService,
    ) {}

  // Affichage et refresh de la liste d'articles
  ngOnInit(): void{
    this.getArticlesList();
  }

  // Modification article
  openArticleAddEditForm(){
    const dialogRef = this._dialog.open(ArticleAddEditComponent);
    dialogRef.afterClosed().subscribe(
      {
        next: (val) => {
          if(val){
            this.getArticlesList();
          }
        },
      }
    );
  }

  getArticlesList() {
    this._articlesService.getArticlesList().subscribe(
      {
        next: (res) => {
          this.dataSource = new MatTableDataSource(res);
          this.dataSource.sort = this.sort;
          this.dataSource.paginator = this.paginator;
        },
        error: console.log,
        
      }
    )
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  deleteArticle(id: number){
    this._articlesService.deleteArticle(id).subscribe(
      {
        next: (res) => {
            this._coreService.openSnackBar('Article supprimé', 'Réalisé');
            this.getArticlesList();
        },
        error: console.log,
      }
    );
  }

  openEditForm(data:any){
   const dialogRef = this._dialog.open(ArticleAddEditComponent, {
      data,
    });

    dialogRef.afterClosed().subscribe(
      {
        next: (val) => {
          if(val){
            this.getArticlesList();
          }
        },
      }
    );
  }

}
