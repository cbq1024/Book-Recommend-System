<template>
  <div class="comment-list">
    <slot name="before-comments"></slot>
    <div v-for="comment in comments" :key="comment.id" class="comment-item">
      <div class="comment-header">
        <img :src="comment.avatar" class="avatar" />
        <span class="username">{{ comment.username }}</span>
        <span class="time">{{ formatTime(comment.time) }}</span>
      </div>
      <div class="comment-content">{{ comment.content }}</div>
    </div>
    <slot name="after-comments"></slot>
  </div>
</template>

<script setup lang="ts">
interface Comment {
  id: number | string
  avatar: string
  username: string
  time: string | Date
  content: string
}

defineProps<{
  comments: Comment[]
}>()

const formatTime = (time: string | Date) => {
  // 统一的时间格式化逻辑
  return new Date(time).toLocaleString()
}
</script>

<style scoped>
.comment-list {
  @apply space-y-4;
}

.comment-item {
  @apply p-4 rounded-lg bg-gray-50;
}

.comment-header {
  @apply flex items-center gap-2 mb-2;
}

.avatar {
  @apply w-8 h-8 rounded-full;
}

.username {
  @apply font-medium;
}

.time {
  @apply text-sm text-gray-500;
}
</style> 