<script>
	import ProductCard from '$lib/productCard.svelte';
	import {get} from 'svelte/store';
	import {cartItems} from '../cart';

	const products = [
		{
			id: "price_1N5aCsBFnqi1GssAwc3onDxw",
			name: "Coffee",
			price: 5
		},
		{
			id: "price_1N5aIcBFnqi1GssAZso3ellm",
			name: "Sunglasses",
			price: 10
		},
		{
			id: "price_1N5aJCBFnqi1GssAiDYuQUFg",
			name: "Waterbottle",
			price: 2
		}
	];

	async function checkout() {
		await fetch('api/stripeCheckout', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify(
				{items: get(cartItems)}
			)
		}).then((data) => {
			return data.json();
		}).then((data) => {
			data.url;
			window.location.replace(data.url);
		})
	}
</script>

<div class="container h-full mx-auto flex justify-center items-center">
	<div class="grid grid-cols-3 gap-4">
		<div class="col-span-3">
			<h1>Busy Little Bat Sewing</h1>
		</div>
		{#each products as product}
			<ProductCard product={product} />
		{/each}
		<div class="col-span-3">
			<button class="btn variant-filled-primary" on:click={() => checkout()}>Checkout</button>
		</div>
	</div>
</div>
