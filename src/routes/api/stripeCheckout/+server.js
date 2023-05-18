import Stripe from 'stripe';

const SECRET_STRIPE_KEY = 'sk_test_51N5a5QBFnqi1GssA08G9d8wRJBFJWVGUE95JqJzUq1GMWab8lIdKVAdEQU33Ukl5ZFkojdmi8LT1Ei8ZMer3g33x00YShTJohw';
const stripe = new Stripe(SECRET_STRIPE_KEY, {
    apiVersion: '2022-11-15'
});

export const POST = async ({request}) => {
    const data = await request.json();
    const items = data.items;
    let lineItems = [];

    items.forEach((item) => {
        lineItems.push({price: item.id, quantity: item.quantity});
    })

    const session = await stripe.checkout.sessions.create({
        line_items: lineItems,
        mode: 'payment',
        success_url: 'http://localhost:5173/success',
        cancel_url: 'http://localhost:5173/cancel'
    });

    return new Response(
        JSON.stringify({url: session.url}),
        {
            status: 200,
            headers: {'content-type': 'application/json'}
        }
    );
}