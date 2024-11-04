<script setup lang="ts">
import {CircleUserRound, Heart, ShoppingCart} from "lucide-vue-next";
</script>

<template>
  <header class="p-8 flex items-center justify-between border-b border-b-slate-300">
    <div class="flex items-center gap-5">
      <img src="/logo.png" alt="logo"/>
      <h1 class="text-2xl font-bold">VUE SNEAKERS</h1>
    </div>

    <nav>
      <ul class="flex items-center gap-10 text-slate-500">
        <li class="flex items-center gap-3 cursor-pointer hover:text-black transition">
          <ShoppingCart/>
          <b>1233 р.</b>
        </li>
        <li class="flex items-center gap-3 cursor-pointer hover:text-black transition">
          <Heart/>
          <span>Закладки</span>
        </li>
        <li class="flex items-center gap-3 cursor-pointer hover:text-black transition">
          <CircleUserRound/>
          <span>Профиль</span>
        </li>
      </ul>
    </nav>
  </header>
</template>
