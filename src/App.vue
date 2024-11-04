<script setup lang="ts">
import Header from "@/components/Header.vue";
import ProductList from "@/components/ProductList.vue";
import Drawer from "@/components/Drawer.vue";
import {Search} from "lucide-vue-next";
import {onMounted, provide, reactive, ref, watch} from "vue";
import axios from "axios";

const items = ref([]);

const filters = reactive({
  sortBy: "title",
  searchQuery: ""
});

const fetchItems = async () => {
  try {
    const params = {
      sortBy: filters.sortBy
    };

    if (filters.searchQuery) {
      params.title = `*${filters.searchQuery}*`;
    }

    const {data} = await axios.get(
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
    const {data: favorites} = await axios.get("https://ea0f705538326561.mokky.dev/favorites");
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
      const {data} = await axios.post("https://ea0f705538326561.mokky.dev/favorites", obj);
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
provide("toFavorite", handlerFavorite);

</script>

<template>
  <div class="mx-auto my-14 w-4/5 max-w-[1440px] bg-white rounded-xl shadow-xl">

    <Header/>

    <!--    <Drawer/>-->

    <div class="p-10 flex flex-col gap-5">
      <div class="flex items-center  justify-between">
        <h2 class="text-2xl font-bold">Все кроссовки</h2>

        <div class="flex items-center gap-3">
          <select
            class="py-2 px-3 border border-gray-200 focus:border-gray-400 rounded-md focus:outline-none"
            @change="handlerChangeSelect"
          >
            <option value="name">По названию</option>
            <option value="price">По цене (дешевые)</option>
            <option value="-price">По цене (дорогие)</option>
          </select>
          <label class="relative w-full">
          <span class="absolute top-2 left-2">
            <Search color="gray"/>
          </span>
            <input @input="handlerChangeInput" class="px-10 py-2 border rounded-md outline-none w-full" type="text"
                   placeholder="Поиск..."/>
          </label>
        </div>

      </div>

      <ProductList :items="items" @handlerFavorite="handlerFavorite"/>
    </div>
    <!--    <div class="mt-5 p-5 border">-->
    <!--      <RouterView/>-->
    <!--    </div>-->
  </div>
</template>
