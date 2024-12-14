<template>
  <span
      class="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium"
      :class="colorClasses[color]"
  >
    <slot></slot>
  </span>
</template>

<script lang="ts" setup>
type ColorType = 'pink' | 'red' | 'yellow' | 'orange' | 'cyan' | 'green';

const props = defineProps<{
    color: ColorType
}>();

const colorClasses = {
    pink: 'bg-pink-100 text-pink-800 dark:bg-pink-900 dark:text-pink-300',
    red: 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300',
    yellow: 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300',
    orange: 'bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-300',
    cyan: 'bg-cyan-100 text-cyan-800 dark:bg-cyan-900 dark:text-cyan-300',
    green: 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300'
};
</script>
