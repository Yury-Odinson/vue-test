<script setup lang="ts">
import {Heart, SquarePlus, SquareCheck} from "lucide-vue-next";

const props = defineProps({
  imageUrl: String,
  title: String,
  price: Number,
  isFavorite: Boolean,
  isAdded: Boolean,
  onClickFavorite: Function,
  onClickCart: Function
});

</script>

<template>
  <article
    class="relative p-4 flex flex-col rounded-xl border cursor-pointer last:mr-auto
    hover:-translate-y-2 transition hover:shadow-2xl">

    <button class="absolute top-5 left-5" @click="onClickFavorite">
      <span v-if="props.isFavorite">
        <Heart color="red" fill="red"/>
      </span>
      <span v-else class="opacity-50 hover:opacity-100 transition">
        <Heart color="gray"/>
      </span>
    </button>

    <img :src="imageUrl" alt="sneakers"/>

    <div class="flex items-end justify-between gap-3">
      <div class="flex flex-col gap-1">
        <p class="text-xl"> {{ title }}</p>
        <p class="mt-3 flex flex-col text-gray-500">
          ЦЕНА: <span class="text-black font-bold">{{ price + " Р." }}</span>
        </p>
      </div>

      <button class="opacity-50 hover:opacity-100 transition" @click="onClickCart">
        <span v-if="isAdded">
          <SquareCheck :size="40" :stroke-width="1"/>
        </span>
        <span v-else>
          <SquarePlus :size="40" :stroke-width="1"/>
        </span>
      </button>

    </div>

    <slot/>
  </article>
</template>
