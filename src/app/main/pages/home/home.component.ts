import { Component, OnInit } from '@angular/core';
import { faChevronRight, faChevronLeft } from '@fortawesome/free-solid-svg-icons';
import { Product } from 'src/app/shop/interfaces/Products';
import { ShopService } from 'src/app/shop/services/shop.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  faChevronRight = faChevronRight;
  faChevronLeft = faChevronLeft;
  products: Product[] = [];


  constructor(private shop: ShopService) {

  }

  ngOnInit(): void {
    this.shop.getAllProducts()
      .subscribe(data => {
        const coffe = data.filter(item => item.type === 'Notebook' || item.type === 'Notepad');
        this.products = coffe;
        this.products.splice(0, 3);
      })
  }

  scrollDown() {
    const target = document.querySelector('#products') as HTMLElement;
    window.scrollTo(0, target.offsetTop);
  }

}
