import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {ProductModel} from "../model/product.model";
import {environment} from "../../environments/environment";

@Injectable({
  providedIn: "root",
})
export class ProductsService {
  constructor(private http: HttpClient) {
  }

  getAllProducts(): Observable<ProductModel[]> {
    let host = environment.host;
    return this.http.get<ProductModel[]>(host + "/products");
  }

  getSelectedProducts(): Observable<ProductModel[]> {
    let host = environment.host;
    return this.http.get<ProductModel[]>(host + "/products?selected=true");
  }

  getAvailableProducts(): Observable<ProductModel[]> {
    let host = environment.host;
    return this.http.get<ProductModel[]>(host + "/products?available=true");
  }

  searchProducts(keyword: string): Observable<ProductModel[]> {
    let host = environment.host;
    return this.http.get<ProductModel[]>(host + "/products?name_like=" + keyword);
  }

  selectProducts(product: ProductModel): Observable<ProductModel> {
    let host = environment.host;
    product.selected = !product.selected;
    return this.http.put<ProductModel>(host + "/products/" + product.id, product);
  }

  deleteProducts(product: ProductModel): Observable<void> {
    let host = environment.host;
    return this.http.delete<void>(host + "/products/" + product.id);
  }

  save(product: ProductModel): Observable<ProductModel> {
    let host = environment.host;
    return this.http.post<ProductModel>(host + "/products", product);
  }

  getProduct(id: number): Observable<ProductModel> {
    let host = environment.host;
    return this.http.get<ProductModel>(host + "/products/" + id);
  }

  UpdateProducts(product: ProductModel): Observable<ProductModel> {
    let host = environment.host;
    return this.http.put<ProductModel>(host + "/products/" + product.id, product);
  }
}
