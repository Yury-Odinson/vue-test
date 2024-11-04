<script setup>
import {ref} from "vue";
import Product from "@/components/Product.vue";

const count = ref(0);

function increment() {
  count.value++;
}

</script>

<template>
  <main>
    <div class="flex gap-5">
      <Product title="title 1" :price="45" :is-added="false"/>
<!--      <Product title="title 2" :price="15" :is-added="false"/>-->
<!--      <Product title="title 3" :price="77" :is-added="false"/>-->
    </div>
  </main>
</template>
