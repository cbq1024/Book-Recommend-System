<script setup lang="ts">
import { RouterView } from 'vue-router'
import Navbar from '@/layout/NavBar.vue'
import FootBar from '@/layout/FootBar.vue'
</script>

<template>
      <div class="min-h-screen flex flex-col bg-white dark:bg-dark transition-colors duration-200">
          <Navbar />
          <main class="flex-grow">
              <router-view />
          </main>
          <FootBar />
      </div>
</template>

<style scoped>
</style>
