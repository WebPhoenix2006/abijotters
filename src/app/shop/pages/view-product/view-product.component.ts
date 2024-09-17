import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Product } from '../../interfaces/Products';
import { ShopService } from '../../services/shop.service';
import { faChevronDown } from '@fortawesome/free-solid-svg-icons';
import { CartService } from '../../services/cart.service';

@Component({
  selector: 'app-view-product',
  templateUrl: './view-product.component.html',
  styleUrls: ['./view-product.component.css'],
})
export class ViewProductComponent implements OnInit {
  faChevronDown = faChevronDown;
  productId: string = '1';
  productData!: Product;
  @ViewChild('counterdisplay')
  
  counterdisplay!: ElementRef;
  productQuantity: number = 1;

  get data(): string {
    return this.shop.productId;
  }
  set data(id: string) {
    this.shop.productId = id;
  }

  constructor(
    private route: ActivatedRoute,
    private shop: ShopService,
    public cart: CartService
  ) {
    this.route.params.subscribe(({ id }) => {
      this.productId = id;
      console.log('Product ID:', id); // Log the ID to verify it's correct
      this.data = this.productId;
      this.shop.viewProduct(id).subscribe((item) => {
        this.productData = item;
      });
    });
  }

  ngOnInit(): void {
    window.scrollTo(0, 0);
    
  }

  addToCart(product: Product) {
    this.cart.addProduct(product);
  }

  // Quantity Controls
  add() {
    this.productData.quantity++;
  }

  remove() {
    if (this.productData.quantity > 1) {
      this.productData.quantity--;
    }
  }
  editQuant(){
    console.log('+')
    this.productData.quantity = this.counterdisplay.nativeElement.value;
  }
}
