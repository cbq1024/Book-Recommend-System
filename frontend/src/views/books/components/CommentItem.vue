<template>
    <div class="comment-card" :class="[fromRight ? 'from-right' : '', sizeClass]">
        <div class="flex items-start gap-3">
            <template v-if="!fromRight">
                <img :src="comment.avatar" 
                     :alt="comment.username" 
                     class="w-8 h-8 rounded-full ring-2 ring-primary-100 dark:ring-primary-900"/>
                <div class="flex-1">
                    <CommentContent 
                        :comment="comment"
                        :from-right="fromRight"
                        @toggle-like="toggleLike"
                        @show-reply="showReplyInput"
                        @toggle-replies="toggleReplies"
                        @reply-to-user="replyToUser"/>
                </div>
            </template>
            <template v-else>
                <div class="flex-1">
                    <CommentContent 
                        :comment="comment"
                        :from-right="fromRight"
                        @toggle-like="toggleLike"
                        @show-reply="showReplyInput"
                        @toggle-replies="toggleReplies"
                        @reply-to-user="replyToUser"/>
                </div>
                <img :src="comment.avatar" 
                     :alt="comment.username" 
                     class="w-8 h-8 rounded-full ring-2 ring-primary-100 dark:ring-primary-900"/>
            </template>
        </div>
    </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import type { Comment } from '../types/book'
import CommentContent from './CommentContent.vue'

const props = defineProps<{
    comment: Comment
    fromRight?: boolean
}>()

const sizeClass = computed(() => {
    const length = props.comment.content.length
    if (length < 50) return 'w-2/3'
    if (length < 100) return 'w-3/4'
    return 'w-full'
})

const emit = defineEmits<{
    (e: 'toggleLike', comment: Comment): void
    (e: 'showReply', comment: Comment): void
    (e: 'toggleReplies', comment: Comment): void
    (e: 'replyToUser', username: string, comment: Comment): void
}>()

const toggleLike = () => emit('toggleLike', props.comment)
const showReplyInput = () => emit('showReply', props.comment)
const toggleReplies = () => emit('toggleReplies', props.comment)
const replyToUser = (username: string) => emit('replyToUser', username, props.comment)
</script>

<style scoped>
.comment-card {
    @apply bg-white dark:bg-dark-100 rounded-lg p-3
           transition-all duration-300
           border border-gray-100 dark:border-dark-300
           hover:border-primary-100 dark:hover:border-primary-900
           hover:shadow-md hover:shadow-primary-500/5;
}

.comment-card.from-right {
    @apply ml-auto max-w-[85%];
}

.comment-card:not(.from-right) {
    @apply max-w-[85%];
}
</style> 