<script setup lang="ts">
import Product from "@/components/Product.vue";

// import {inject} from "vue";

interface ProductItem {
  id: number;
  imageUrl: string;
  title: string;
  price: number;
}

const props = defineProps<{
  items: ProductItem[];
}>();

const emit = defineEmits(["handlerFavorite"]);

// const handlerFavorite = inject("toFavorite");

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
      :onClickFavorite="() => emit('handlerFavorite', item)"
      :is-favorite="item.isFavorite"
    />

  </section>
</template>
