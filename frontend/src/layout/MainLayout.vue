<template>
  <div class="min-h-screen flex flex-col bg-white dark:bg-dark transition-colors duration-200">
    <NavBar />
    <main class="flex-grow">
      <router-view />
    </main>
    <FootBar />
  </div>
</template>

<script setup lang="ts">
import NavBar from './NavBar.vue'
import FootBar from './FootBar.vue'
</script> 