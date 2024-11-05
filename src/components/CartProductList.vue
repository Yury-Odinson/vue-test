<script setup lang="ts">
import CartProduct from "@/components/CartProduct.vue";
import {inject} from "vue";

defineProps({
  items: Array
});

const {cartItems, removeFromCart} = inject("cart");

</script>

<template>
  <section class="flex flex-col gap-3">

    <CartProduct v-for="item in cartItems"
                 :key="item.id"
                 :title="item.title"
                 :image-url="item.imageUrl"
                 :price="item.price"
                 @on-click-remove="() => removeFromCart(item)"

    />

  </section>
</template>
