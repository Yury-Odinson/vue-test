<script setup lang="ts">
import Header from "@/components/Header.vue";
import ProductList from "@/components/ProductList.vue";
import Drawer from "@/components/Drawer.vue";
import { Search } from "lucide-vue-next";
import { computed, onMounted, provide, reactive, ref, watch } from "vue";
import axios from "axios";
import type { ProductActions, ProductItem } from "@/types";

const items = ref<ProductItem[]>([]);
const cartItems = ref<ProductItem[]>([]);

const isCreatingOrder = ref<boolean>(false);
const cartButtonDisabled = computed(() => isCreatingOrder.value ? true : totalPrice.value ? false : true);

const cartOpen = ref(false);

const totalPrice = computed<number>(() => cartItems.value.reduce((acc, cur) => acc + cur.price, 0));

const vatPrice = computed(() => Math.round((totalPrice.value * 5) / 100));

const closeDrawer = () => {
  cartOpen.value = false;
};

const openDrawer = () => {
  cartOpen.value = true;
};

const filters = reactive({
  sortBy: "title",
  searchQuery: ""
});

const onClickToCart = (item: ProductActions) => {

  if (!item.isAdded) {
    addToCart(item);
  } else {
    removeFromCart(item);
  }
}

const addToCart = (item: ProductActions) => {
  cartItems.value.push(item);
  item.isAdded = true;
}

const removeFromCart = (item) => {
  cartItems.value.splice(cartItems.value.indexOf(item), 1);
  item.isAdded = false;
}

const createOrder = async () => {
  try {
    isCreatingOrder.value = true;
    const { data } = await axios.post("https://ea0f705538326561.mokky.dev/orders", {
      items: cartItems.value,
      totalPrice: totalPrice.value
    });

    cartItems.value = [];

    return data;
  } catch (error) {
    console.log(error);
  } finally {
    isCreatingOrder.value = false;
  }
}

const fetchItems = async () => {
  try {
    const params = {
      sortBy: filters.sortBy
    };

    if (filters.searchQuery) {
      params.title = `*${filters.searchQuery}*`;
    }

    const { data } = await axios.get(
      `https://ea0f705538326561.mokky.dev/items`, {
      params
    }
    );
    items.value = data.map(item => ({
      ...item,
      isFavorite: false,
      favoriteId: null,
      isAdded: false
    }));
  } catch (error) {
    console.log(error);
  }
}

const fetchFavorites = async () => {
  try {
    const { data: favorites } = await axios.get("https://ea0f705538326561.mokky.dev/favorites");
    items.value = items.value.map(item => {
      const favorite = favorites.find(favorite => favorite.parentId === item.id);

      if (!favorite) {
        return item;
      }

      return {
        ...item,
        isFavorite: true,
        favoriteId: favorite.id,
      }
    });
  } catch (error) {
    console.log(error);
  }
}

onMounted(async () => {
  await fetchItems();
  await fetchFavorites();
});

const handlerChangeSelect = (e) => filters.sortBy = e.target.value;

const handlerChangeInput = (e) => filters.searchQuery = e.target.value;

const handlerFavorite = async (item) => {

  try {
    if (!item.isFavorite) {
      const obj = {
        parentId: item.id
      }
      item.isFavorite = true;
      const { data } = await axios.post("https://ea0f705538326561.mokky.dev/favorites", obj);
      item.favoriteId = data.id;
    } else {
      item.isFavorite = false;
      await axios.delete(`https://ea0f705538326561.mokky.dev/favorites/${item.favoriteId}`);
      item.favoriteId = null;
    }

  } catch (error) {
    console.log(error);
  }

}

watch(filters, fetchItems);

provide("cart", {
  cartItems,
  openDrawer,
  closeDrawer,
  addToCart,
  removeFromCart,
});

</script>

<template>
  <div class="mx-auto my-14 w-4/5 max-w-[1440px] bg-white rounded-xl shadow-xl">

    <Header :total-price="totalPrice" @open-drawer="openDrawer" />

    <Drawer v-if="cartOpen" @close-drawer="closeDrawer" :total-price="totalPrice" :vat-price="vatPrice"
      @create-order="createOrder" :is-disabled-button="cartButtonDisabled" />

    <div class="p-10 flex flex-col gap-5">
      <div class="flex items-center  justify-between">
        <h2 class="text-2xl font-bold">Все кроссовки</h2>

        <div class="flex items-center gap-3">
          <select class="py-2 px-3 border border-gray-200 focus:border-gray-400 rounded-md focus:outline-none"
            @change="handlerChangeSelect">
            <option value="name">По названию</option>
            <option value="price">По цене (дешевые)</option>
            <option value="-price">По цене (дорогие)</option>
          </select>
          <label class="relative w-full">
            <span class="absolute top-2 left-2">
              <Search color="gray" />
            </span>
            <input @input="handlerChangeInput" class="px-10 py-2 border rounded-md outline-none w-full" type="text"
              placeholder="Поиск..." />
          </label>
        </div>

      </div>

      <ProductList :items="items" @handler-favorite="handlerFavorite" @add-to-cart="onClickToCart" />
    </div>
    <!--    <div class="mt-5 p-5 border">-->
    <!--      <RouterView/>-->
    <!--    </div>-->
  </div>
</template>
