<script setup lang="ts">
import {MoveLeft} from "lucide-vue-next";
import CartProductList from "@/components/CartProductList.vue";

</script>

<template>
  <div class="fixed top-0 left-0 right-0 bottom-0 bg bg-black z-10 opacity-30"/>

  <div class="fixed top-0 right-0 flex flex-col gap-5 justify-between bg-white w-96 h-full z-20 p-5">

    <div class="flex flex-col gap-5">

      <div class="flex items-center gap-5">
        <button class="cursor-pointer opacity-50 hover:opacity-100 hover:-translate-x-1 transition">
          <MoveLeft/>
        </button>
        <h3 class="text-xl font-bold">Корзина:</h3>
      </div>

      <CartProductList/>

    </div>

    <div class="flex flex-col gap-5">

      <div class="flex">
        <span>Итого: </span>
        <div class="flex-1 border-b border-dashed"/>
        <b>1245 р.</b>
      </div>

      <div class="flex">
        <span>Налог 5%: </span>
        <div class="flex-1 border-b border-dashed"/>
        <b>143 р.</b>
      </div>

      <button class="mt-5 py-3 bg-lime-500 w-full rounded-xl hover:bg-lime-600 transition active:bg-lime-700
                              disabled:bg-slate-300">
        Оформить заказ
      </button>

    </div>

  </div>

</template>
