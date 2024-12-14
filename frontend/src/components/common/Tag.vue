<template>
    <span class="tag-item" 
          :class="[activeClass, 'text-white']">
        <slot></slot>
        <span v-if="count !== undefined" class="tag-count">
            {{ count }}
        </span>
    </span>
</template>

<script setup lang="ts">
defineProps<{
    activeClass: string
    count?: number
}>()
</script>

<style scoped>
.tag-item {
    @apply px-3 py-1.5 rounded-full text-sm
           transition-all duration-300
           transform origin-center
           animate-tag-pop
           flex items-center gap-1.5;
}

.tag-count {
    @apply text-xs px-1.5 py-0.5 rounded-full
           bg-white/20
           min-w-[1.5em] text-center
           inline-flex items-center justify-center;
}

@keyframes tag-pop {
    0% {
        transform: scale(0.95);
        opacity: 0;
    }
    50% {
        transform: scale(1.02);
    }
    100% {
        transform: scale(1);
        opacity: 1;
    }
}

.animate-tag-pop {
    animation: tag-pop 0.3s ease-out;
}
</style> 