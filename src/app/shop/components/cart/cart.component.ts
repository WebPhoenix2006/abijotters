import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Product } from '../../interfaces/Products';
import { CartService } from '../../services/cart.service';
import { ShopService } from '../../services/shop.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {

  cartProducts: Product[] = []; // Array to store cart items
  email: string = ''; // Email address for payment

  constructor(
    private http: HttpClient, 
    public shop: ShopService, 
    public cart: CartService
  ) {}

  ngOnInit(): void {
    this.cartProducts = this.cart.cartProducts;
  }

  getTotal(): number {
    let total = 0;
    for (const item of this.cartProducts) {
      total += Number(item.price) * item.quantity;
    }
    return total;
  }

  onCheckout() {
    if (!this.email) {
      console.error('Email is required');
      return;
    }

    // Calculate the total amount in kobo (assuming amount is in Naira and converting to kobo)
    const totalAmount = this.getTotal(); // Amount in Naira

    // Send payment request to backend
    this.http.post('http://localhost:4242/create-payment', {
      amount: totalAmount,
      email: this.email
    }).subscribe((res: any) => {
      if (res.status === 'success') {
        const paymentUrl = res.data.authorization_url;
        window.location.href = paymentUrl; // Redirect to Paystack's checkout page
      } else {
        console.error('Payment initialization error', res);
      }
    }, error => {
      console.error('Payment initialization error', error);
    });
  }
}
