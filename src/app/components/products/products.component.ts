import {Component, OnInit} from '@angular/core';
import {ProductsService} from "../../services/products.service";
import {ProductModel} from "../../model/product.model";
import {Observable, of} from "rxjs";
import {catchError, map, startWith} from "rxjs/operators";
import {AppDataState, DataStateEnum} from "../../state/product.state";
import {Router} from "@angular/router";

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {
  //products?: ProductModel[];
  products$?: Observable<AppDataState<ProductModel[]>>;
  readonly DataStateEnum = DataStateEnum;

  constructor(private productsService: ProductsService, private router: Router) {
  }

  ngOnInit(): void {
  }

  OnGetAllProducts() {
    /*this.productsService.getAllProducts().subscribe(data=>{
      this.products = data;
    },error => {
      console.log(error);
    })*/
    this.products$ = this.productsService.getAllProducts()
      .pipe(
        map(data => ({dataState: DataStateEnum.LOADED, data: data})),
        startWith({dataState: DataStateEnum.LOADING}),
        catchError(err => of({dataState: DataStateEnum.ERROR, errorMessage: err.message}))
      );
  }

  OnGetSelected() {
    this.products$ = this.productsService.getSelectedProducts()
      .pipe(
        map(data => ({dataState: DataStateEnum.LOADED, data: data})),
        startWith({dataState: DataStateEnum.LOADING}),
        catchError(err => of({dataState: DataStateEnum.ERROR, errorMessage: err.message}))
      );

  }

  OnGetAvailable() {
    this.products$ = this.productsService.getAvailableProducts()
      .pipe(
        map(data => ({dataState: DataStateEnum.LOADED, data: data})),
        startWith({dataState: DataStateEnum.LOADING}),
        catchError(err => of({dataState: DataStateEnum.ERROR, errorMessage: err.message}))
      );
  }

  OnSearch(dataForm: any) {
    this.products$ = this.productsService.searchProducts(dataForm.keyword)
      .pipe(
        map(data => ({dataState: DataStateEnum.LOADED, data: data})),
        startWith({dataState: DataStateEnum.LOADING}),
        catchError(err => of({dataState: DataStateEnum.ERROR, errorMessage: err.message}))
      );
  }

  OnSelect(p: ProductModel) {
    this.productsService.selectProducts(p)
      .subscribe(data => {
        p.selected = data.selected;
      })
  }

  OnDelete(p: ProductModel) {
    let v = confirm("Etes vous sure?")
    if (v == true)
      this.productsService.deleteProducts(p)
        .subscribe(data => {
          this.OnGetAllProducts();
        })
  }

  OnNewProduct() {
    this.router.navigateByUrl("/newProduct")
  }

  OnEdit(p: ProductModel) {
    this.router.navigateByUrl("editProduct/" + p.id)
  }
}
