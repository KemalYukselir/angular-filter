import { Component } from '@angular/core';
import { ProductsService } from './products.service';
import { Product } from './product';
import { Observable, timer } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.css']
})
export class AppComponent {

  // Get product
  public products$: Observable<Product[]> = this.productsService.getProducts();

  // priavte user filters array to monitor what the user has selected
  private userFilters: [string,string,boolean] = ['', undefined, undefined]; // search , brand , out of stock vars

  // Observable that will be used in the app component HTML
  public filteredProducts$: Observable<Product[]>; 

  // Observable to populate the brand select options in app component HTML
  public uniqueBrands$: Observable<string[]>;

  constructor(
    public productsService: ProductsService
  ) { 
    console.log("Hi I'm Kemal Yukselir")

    // Show every product on page load
    this.filteredProducts$ = this.products$;
    
    // Extract unique brand names when products data is received
    this.uniqueBrands$ = new Observable<string[]>(observer => {
      this.products$.subscribe((products: Product[]) => {
        const brandsSet = new Set<string>(); // Using Set to ensure uniqueness
        products.forEach(product => brandsSet.add(product.brand));
        observer.next(Array.from(brandsSet)); // Convert Set back to array and emit
      });
    });

  }

  // ngModel input param
  searchInput: string = "";
  filterProducts(product: Product): boolean {
    // check all the filters are matching
    // Filters work inclusive and by individual
    const [searchTerm, brandFilter, outOfStockFilter] = this.userFilters;
  
    const matchesSearchTerm = product.name.includes(searchTerm) || product.description.includes(searchTerm);
    const matchesBrand = brandFilter === undefined || product.brand.includes(brandFilter);
    const matchesStock = outOfStockFilter === undefined || (outOfStockFilter ? product.quantity === 0 : product.quantity > 0);
  
    return matchesSearchTerm && matchesBrand && matchesStock;
  }
  
  
  
  
  // Called everytime user changes the input field on app comp HTML
  onSearchProduct() {
    if (this.searchInput.length >= 3) {
      this.userFilters[0] = this.searchInput;
      this.updateFilteredProducts();
      console.log("Updated search filter...");
    } else {
      // Back to showing all products
      this.userFilters[0] = '';
      console.log("Less than three letters. Reapplying other filters");
      this.updateFilteredProducts();
    }
  }

  // Called everytime user changes the brand dropwdown on app comp HTML
  onBrandsSelection(brand: string) {
    brand = brand.trim()
    this.userFilters[1] = brand;
    this.updateFilteredProducts() 
    console.log("Updated brand filter...");
  }

  // Called everytime user changes the brand dropwdown on app comp HTML
  onStockSelection(stockStatus:  string){
    // get stock status
    let outOfStock: boolean = false;

    if (stockStatus == "in-stock") {
      outOfStock = false;
    } else if (stockStatus == "out-of-stock") {
      outOfStock = true;
    } else {
      outOfStock = undefined;
    }

    // set stock status on user filter
    this.userFilters[2] = outOfStock;
    this.updateFilteredProducts()
    console.log("Updated stock filter...");
  }

  // Function to update the filtered products observable
  private updateFilteredProducts() {
    timer(400).subscribe(() => { // Delay by 400 milliseconds
      // console.log("fired...")
      this.products$.subscribe((products: Product[]) => {
        this.filteredProducts$ = new Observable<Product[]>(observer => {
          observer.next(products.filter(product => this.filterProducts(product)));
        });
      });
    });
  }

}
