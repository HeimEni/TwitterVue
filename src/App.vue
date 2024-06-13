<script setup>

import Navbar from "@/components/Navbar.vue";
import Home from "@/components/Home.vue";
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
