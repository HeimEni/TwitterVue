<script setup>

import Navbar from "@/components/navbar.vue";
import Home from "@/components/home.vue";
import {nextTick, ref} from "vue";

</script>

<template>
  <div>
    <Navbar />
    <router-view />
  </div>
</template>
<style scoped>
</style>
