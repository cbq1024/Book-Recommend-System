<!-- src/components/CommentsSection.vue -->
<template>
    <div v-if="book" class="h-full flex flex-col bg-white dark:bg-dark-100 rounded-lg shadow-sm relative">
        <!-- 评论列表区域 -->
        <div class="flex-1 overflow-y-auto custom-scrollbar"
             ref="commentsContainer"
             @scroll="(event) => {
                 handleScroll(event);
                 $emit('scroll', event);
             }">
            <div class="p-4">
                <h4 class="text-sm font-medium text-gray-700 dark:text-gray-300 mb-4 
                          flex items-center gap-2 sticky top-0 bg-white dark:bg-dark-100 
                          py-2 z-20 backdrop-blur-sm">
                    <MessageOutlined class="text-primary-500"/>
                    读者评论 ({{ book.comments.length }})
                </h4>
                <div class="space-y-4">
                    <TransitionGroup name="comment">
                        <div v-for="(comment, index) in visibleComments"
                             :key="comment.id"
                             class="comment-card"
                             :class="[
                                 {'from-right': index % 2 === 1},
                                 getCommentSizeClass(comment.content)
                             ]">
                            <div class="flex items-start gap-3">
                                <template v-if="index % 2 === 0">
                                    <img :src="comment.avatar" 
                                         :alt="comment.username" 
                                         class="w-10 h-10 rounded-full ring-2 ring-primary-100 dark:ring-primary-900"/>
                                    <div class="flex-1">
                                        <div class="flex justify-between items-center mb-2">
                                            <span class="font-medium text-gray-900 dark:text-gray-100">
                                                {{ comment.username }}
                                            </span>
                                            <time class="text-xs text-gray-500">{{ comment.date }}</time>
                                        </div>
                                        <p class="text-gray-600 dark:text-gray-400"
                                           :class="getCommentTextClass(comment)">
                                            {{ comment.content }}
                                        </p>
                                        <button v-if="comment.content.length > 100"
                                                @click="toggleComment(comment)"
                                                class="text-xs text-primary-500 hover:text-primary-600 mt-2 hover:underline">
                                            {{ comment.expanded ? '收起' : '展开全文' }}
                                        </button>
                                    </div>
                                </template>
                                <template v-else>
                                    <div class="flex-1">
                                        <div class="flex justify-between items-center mb-2">
                                            <time class="text-xs text-gray-500">{{ comment.date }}</time>
                                            <span class="font-medium text-gray-900 dark:text-gray-100">
                                                {{ comment.username }}
                                            </span>
                                        </div>
                                        <p class="text-gray-600 dark:text-gray-400 text-right"
                                           :class="getCommentTextClass(comment)">
                                            {{ comment.content }}
                                        </p>
                                        <div class="flex justify-end">
                                            <button v-if="comment.content.length > 100"
                                                    @click="toggleComment(comment)"
                                                    class="text-xs text-primary-500 hover:text-primary-600 mt-2 hover:underline">
                                                {{ comment.expanded ? '收起' : '展开全文' }}
                                            </button>
                                        </div>
                                    </div>
                                    <img :src="comment.avatar" 
                                         :alt="comment.username" 
                                         class="w-10 h-10 rounded-full ring-2 ring-primary-100 dark:ring-primary-900"/>
                                </template>
                            </div>
                        </div>
                    </TransitionGroup>

                    <!-- 加载更多触发器 -->
                    <div v-if="hasMoreComments" 
                         ref="loadMoreTrigger"
                         class="text-center py-4">
                        <div class="animate-pulse text-gray-400">
                            加载更多评论...
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <!-- 回到顶部按钮 -->
        <Transition name="fade">
            <button v-show="showBackToTop"
                    @click="scrollToTop"
                    class="fixed bottom-6 right-6 p-2 rounded-full 
                           bg-primary-500/90 hover:bg-primary-600 
                           text-white shadow-lg hover:shadow-xl
                           transform transition-all duration-300
                           hover:scale-110 active:scale-95
                           backdrop-blur-sm">
                <VerticalAlignTopOutlined class="text-lg"/>
            </button>
        </Transition>
    </div>
    <div v-else class="h-full flex items-center justify-center">
        <div class="text-center text-gray-500 dark:text-gray-400">
            <div class="text-6xl mb-4">📚</div>
            <p>请选择一本书查看详情</p>
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { MessageOutlined, VerticalAlignTopOutlined } from '@ant-design/icons-vue'
import { useIntersectionObserver } from '@vueuse/core'
import type { Book } from '@/views/books/types/book'

const props = defineProps<{
    book: Book | null
}>()

// 改用无限滚动加载评论
const pageSize = 5
const currentPage = ref(1)

const visibleComments = computed(() => {
    if (!props.book) return []
    return props.book.comments.slice(0, currentPage.value * pageSize)
})

const hasMoreComments = computed(() => {
    if (!props.book) return false
    return visibleComments.value.length < props.book.comments.length
})

const loadMoreTrigger = ref<HTMLElement | null>(null)
const { stop } = useIntersectionObserver(
    loadMoreTrigger,
    ([{ isIntersecting }]) => {
        if (isIntersecting && hasMoreComments.value) {
            currentPage.value++
        }
    }
)

// 根据评论内容长度返回不同的样式
const getCommentTextClass = (comment: any) => {
    const baseClass = 'transition-all duration-300'
    if (!comment.expanded && comment.content.length > 100) {
        return `${baseClass} line-clamp-2`
    }
    if (comment.content.length < 50) {
        return `${baseClass} text-lg`
    }
    if (comment.content.length < 100) {
        return `${baseClass} text-base`
    }
    return `${baseClass} text-sm leading-relaxed`
}

// 根据评论内容长度返回卡片样式
const getCommentSizeClass = (content: string) => {
    const length = content.length
    if (length < 50) {
        return 'w-2/3'
    }
    if (length < 100) {
        return 'w-3/4'
    }
    return 'w-full'
}

// 添加评论展开/收起控制
const toggleComment = (comment: any) => {
    comment.expanded = !comment.expanded
}

// 添加回到顶部相关的状态和方法
const commentsContainer = ref<HTMLElement | null>(null)
const showBackToTop = ref(false)

// 更新处理滚动事件的方法
const handleScroll = (event: Event) => {
    const target = event.target as HTMLElement
    // 当滚动超过 300px 时显示回到顶部按钮
    showBackToTop.value = target.scrollTop > 300
}

// 添加滚动到顶部的方法
const scrollToTop = () => {
    if (!commentsContainer.value) return
    
    commentsContainer.value.scrollTo({
        top: 0,
        behavior: 'smooth'
    })
}

defineEmits(['back', 'scroll'])
</script>

<style scoped>
/* 添加滚动文字动画 */
@keyframes scroll {
    0% { transform: translateX(100%); }
    100% { transform: translateX(-100%); }
}

.animate-scroll {
    animation: scroll 20s linear infinite;
}

.hover\:pause:hover {
    animation-play-state: paused;
}

.comment-enter-active,
.comment-leave-active {
    transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
}

.comment-enter-from,
.comment-leave-to {
    opacity: 0;
    transform: translateY(20px);
}

.comment-card:hover {
    transform: translateY(-2px);
}

/* 自定义滚动条样式 */
.custom-scrollbar {
    @apply scrollbar-thin 
           scrollbar-track-gray-200/50 dark:scrollbar-track-dark-200/50
           scrollbar-thumb-primary-500/70 hover:scrollbar-thumb-primary-600;
}

/* 评论卡片样式 */
.comment-card {
    @apply bg-white dark:bg-dark-100 rounded-lg p-4 shadow-sm
           hover:shadow-md transition-all duration-300
           border border-gray-100 dark:border-dark-300
           hover:bg-gray-50/50 dark:hover:bg-dark-200/50;
}

.comment-card.from-right {
    @apply ml-auto;
}

/* 添加淡入淡出动画 */
.fade-enter-active,
.fade-leave-active {
    transition: opacity 0.3s ease, transform 0.3s ease;
}

.fade-enter-from,
.fade-leave-to {
    opacity: 0;
    transform: translateY(20px) scale(0.9);
}
</style>
