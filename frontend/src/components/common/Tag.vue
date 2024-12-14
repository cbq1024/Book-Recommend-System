<template>
    <div class="tag-item"
         :class="[
             activeClass,
             selected ? 'selected' : '',
             'cursor-pointer hover:shadow-lg'
         ]"
         @click="$emit('click')">
        <div class="flex items-center gap-2">
            <span class="relative">
                {{ name }}
                <span v-if="selected" 
                      class="absolute bottom-0 left-0 w-full h-0.5 
                             bg-white/50 rounded-full animate-expand-width"/>
            </span>
            <span v-if="count" 
                  class="tag-count animate-bounce-in"
                  :class="{ 'selected': selected }">
                {{ count }}
            </span>
        </div>
    </div>
</template>

<script setup lang="ts">
defineProps<{
    name: string
    activeClass?: string
    count?: number
    selected?: boolean
}>()

defineEmits(['click'])
</script>

<style scoped>
.tag-item {
    @apply px-2.5 py-1 rounded-full text-xs
           transition-all duration-300
           hover:scale-105 active:scale-95    /* 使用有效的缩放值 */
           transform origin-center
           text-white
           shadow-sm hover:shadow-md
           flex items-center gap-1.5
           border border-white/10;
}

.tag-item.selected {
    @apply ring-1 ring-offset-1 ring-offset-white dark:ring-offset-dark-200
           shadow-md scale-105                /* 使用有效的缩放值 */
           font-medium;
}

.tag-count {
    @apply text-[10px] px-1.5 py-0.5 rounded-full  /* 更小的计数器文字 */
           bg-white/20
           min-w-[1.2em] text-center
           inline-flex items-center justify-center
           transition-all duration-300
           backdrop-blur-sm;
}

@keyframes expand-width {
    from { transform: scaleX(0); }
    to { transform: scaleX(1); }
}

@keyframes bounce-in {
    0% { transform: scale(0); }
    50% { transform: scale(1.2); }
    100% { transform: scale(1); }
}

.animate-expand-width {
    animation: expand-width 0.3s ease-out forwards;
}

.animate-bounce-in {
    animation: bounce-in 0.3s cubic-bezier(0.68, -0.55, 0.265, 1.55) forwards;
}
</style> 