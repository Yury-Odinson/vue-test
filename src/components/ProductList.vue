<script setup lang="ts">
import Product from "@/components/Product.vue";

interface ProductItem {
  id: number;
  imageUrl: string;
  title: string;
  price: number;
  isFavorite: boolean;
  isAdded: boolean;
}

const props = defineProps<{
  items: ProductItem[];
}>();

const emit = defineEmits(["handlerFavorite", "addToCart"]);

</script>

<template>
  <section class="grid sm:grid-cols-4 gap-5">

    <Product
      v-for="item in items"
      :key="item.id"
      :id="item.id"
      :image-url="item.imageUrl"
      :title="item.title"
      :price="item.price"
      :on-click-favorite="() => emit('handlerFavorite', item)"
      :on-click-cart="() => emit('addToCart', item)"
      :is-favorite="item.isFavorite"
      :is-added="item.isAdded"
    />

  </section>
</template>
