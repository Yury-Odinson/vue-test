<script setup lang="ts">
import {Trash2} from "lucide-vue-next";
const props = defineProps({
  imageUrl: String,
  title: String,
  price: Number,
  isFavorite: Boolean,
  isAdded: Boolean
});

</script>

<template>
  <article class="p-2 flex gap-5 items-center w-full border border-slate-100 rounded-xl">
    <img class="w-20" :src="imageUrl" alt="sneakers"/>

    <div class="flex flex-col gap-2 w-full">

      <p class="w-full">{{ title }}</p>

      <div class="flex items-center justify-between">
        <span class="font-bold">{{ price }} Р.</span>
        <button class="opacity-30 hover:opacity-100 transition">
          <Trash2 />
        </button>

      </div>
    </div>
  </article>
</template>
