import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class PaystackService {

  constructor() { }

  public payWithPaystack(amount: number, email: string, callback: (response: any) => void, onClose: () => void) {
    if (!(<any>window).PaystackPop) {
      console.error('Paystack library not loaded');
      return;
    }

    const handler = (<any>window).PaystackPop.setup({
      key: 'pk_live_your_live_key_here', // Replace with your Paystack live public key
      email: email,
      amount: amount, // Amount in kobo, not converting again
      currency: 'NGN',
      ref: this.generateReference(), // Generate a unique reference
      callback: (response: any) => {
        callback(response); // Handle successful payment
      },
      onClose: () => {
        onClose(); // Handle payment window closure
      }
    });

    handler.openIframe();
  }

  private generateReference(): string {
    return `ref-${Math.floor((Math.random() * 1000000000) + 1)}`;
  }
}
