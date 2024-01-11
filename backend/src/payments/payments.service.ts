import { Injectable } from '@nestjs/common';
import Stripe from 'stripe';
import { PaymentRequestBody } from './types/PaymentRequestBody';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class PaymentsService {
  constructor(private config: ConfigService) {}

  createPayment(paymentRequestBody: PaymentRequestBody): Promise<any> {
    let sumAmount = 0;

    const stripe = new Stripe(this.config.get<string>('STRIPE_API_KEY'), {
      apiVersion: '2023-10-16',
    });

    paymentRequestBody.products.forEach((product) => {
      sumAmount = sumAmount + product.price * product.quantity;
    });

    return stripe.paymentIntents.create({
      amount: sumAmount * 10,
      currency: paymentRequestBody.currency,
    });
  }
}
