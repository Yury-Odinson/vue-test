<script setup lang="ts">
import Product from "@/components/Product.vue";

interface ProductItem {
  id: number;
  imageUrl: string;
  title: string;
  price: number;
}

// Указываем тип для props
const props = defineProps<{
  items: ProductItem[];
}>();

</script>

<template>
  <section class="grid sm:grid-cols-4 gap-5">

    <Product
      v-for="item in items as ProductItem"
      :key="item.id"
      :image-url="item.imageUrl"
      :title="item.title"
      :price="item.price"
    />

  </section>
</template>
