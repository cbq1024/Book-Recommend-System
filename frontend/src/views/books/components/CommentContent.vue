<template>
    <div>
        <div class="flex justify-between items-center mb-1.5">
            <template v-if="!fromRight">
                <span class="font-medium text-sm text-gray-900 dark:text-gray-100">
                    {{ comment.username }}
                </span>
                <time class="text-xs text-gray-500">{{ comment.date }}</time>
            </template>
            <template v-else>
                <time class="text-xs text-gray-500">{{ comment.date }}</time>
                <span class="font-medium text-sm text-gray-900 dark:text-gray-100">
                    {{ comment.username }}
                </span>
            </template>
        </div>
        
        <p class="text-gray-600 dark:text-gray-400"
           :class="[textClass, { 'text-right': fromRight }]">
            {{ comment.content }}
        </p>
        
        <div class="flex" :class="{ 'justify-end': fromRight }">
            <button v-if="comment.content.length > 100"
                    @click="toggleExpand"
                    class="text-xs text-primary-500 hover:text-primary-600 mt-2 hover:underline">
                {{ comment.expanded ? '收起' : '展开全文' }}
            </button>
        </div>

        <!-- 评论操作按钮 -->
        <div class="flex mt-2 text-xs text-gray-500 gap-4"
             :class="{ 'justify-start': fromRight, 'justify-end': !fromRight }">
            <CommentActions 
                :comment="comment"
                @toggle-like="$emit('toggleLike')"
                @show-reply="$emit('showReply')"
                @toggle-replies="$emit('toggleReplies')"
                @reply-to-user="$emit('replyToUser', $event)"/>
        </div>
    </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import type { Comment } from '../types/book'
import CommentActions from './CommentActions.vue'

const props = defineProps<{
    comment: Comment
    fromRight?: boolean
}>()

const textClass = computed(() => {
    const baseClass = 'transition-all duration-300'
    if (!props.comment.expanded && props.comment.content.length > 100) {
        return `${baseClass} line-clamp-2`
    }
    if (props.comment.content.length < 50) {
        return `${baseClass} text-lg`
    }
    if (props.comment.content.length < 100) {
        return `${baseClass} text-base`
    }
    return `${baseClass} text-sm leading-relaxed`
})

const toggleExpand = () => {
    props.comment.expanded = !props.comment.expanded
}

defineEmits<{
    (e: 'toggleLike'): void
    (e: 'showReply'): void
    (e: 'toggleReplies'): void
    (e: 'replyToUser', username: string): void
}>()
</script> 