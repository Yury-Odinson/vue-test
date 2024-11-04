<script setup lang="ts">
import CartProduct from "@/components/CartProduct.vue";
defineProps({
  items: Array
});
</script>

<template>
  <section class="flex flex-col gap-3">
    <CartProduct
      image-url="/sneakers-1.jpg"
      title="Мужские кроссовки 1"
      :price="45"
      :is-added="false"
    />
    <CartProduct
      image-url="/sneakers-1.jpg"
      title="Мужские кроссовки 1"
      :price="45"
      :is-added="false"
    />
    <CartProduct
      image-url="/sneakers-1.jpg"
      title="Мужские кроссовки 1"
      :price="45"
      :is-added="false"
    />
  </section>
</template>
