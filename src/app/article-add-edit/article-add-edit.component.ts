import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ArticlesService } from '../services/articles.service';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { CoreService } from '../core/core.service';

// the scanner
import { BarcodeFormat } from '@zxing/library';


@Component({
  selector: 'app-article-add-edit',
  templateUrl: './article-add-edit.component.html',
  styleUrls: ['./article-add-edit.component.scss'],
})
export class ArticleAddEditComponent implements OnInit {

 articleForm: FormGroup;

 constructor(
  private _fb: FormBuilder, 
  private _articlesService: ArticlesService, 
  private _dialogRef : MatDialogRef<ArticleAddEditComponent>,
  @Inject(MAT_DIALOG_DATA) public data: any,
  private _coreService: CoreService,
  ){
  this.articleForm = this._fb.group(
  {
    reference:'',
    date:'',
    quantite:'',
    commentaire:''
  }
  );
 }

ngOnInit(): void {
  this.articleForm.patchValue(this.data);
}

 onFormSubmit(){
  if(this.articleForm.valid){
    if(this.data){
      this._articlesService.updateArticle(this.data.id, this.articleForm.value)
      .subscribe(
        {
          next: (val: any) => {
            this._coreService.openSnackBar('Article modifié', 'Réalisé');
            this._dialogRef.close(true);
          },
          error: (err: any) =>{
            console.error(err);
          },
        }
      );

    } else {
      this._articlesService.addArticle(this.articleForm.value).subscribe(
        {
          next: (val: any) => {
            this._coreService.openSnackBar('Article ajouté', 'Réalisé');
            this._dialogRef.close(true);
          },
          error: (err: any) =>{
            console.error(err);
          },
        }
      );
    }
    
  }
 }

 // scanner

 allowedFormats = [BarcodeFormat.QR_CODE, BarcodeFormat.EAN_13, BarcodeFormat.CODE_128, BarcodeFormat.DATA_MATRIX];
  title = 'scanner';
  scanResult: any='';
  onCodeResult(result:string)
  {
this.scanResult=result;
  }

}
