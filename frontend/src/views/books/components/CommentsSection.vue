<!-- src/components/CommentsSection.vue -->
<template>
    <div v-if="book" class="h-full flex flex-col bg-white dark:bg-dark-100 rounded-lg shadow-sm">
        <!-- 简介区域 -->
        <div class="summary-section"
            :class="[
                'p-4 border-b dark:border-dark-300 bg-white dark:bg-dark-100',
                isCollapsed ? 'h-[60px]' : 'h-auto'
            ]"
            ref="summarySection">
            <div class="flex flex-col gap-4" :class="{'opacity-50': isCollapsed}">
                <!-- 内容简介卡片 -->
                <div class="bg-gray-50/50 dark:bg-dark-200/50 
                            rounded-lg p-4 hover:bg-gray-50 dark:hover:bg-dark-200 
                            transition-all duration-300">
                    <h4 class="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        📖 内容简介
                    </h4>
                    <!-- 使用固定高度容器包裹内容 -->
                    <div class="relative" 
                         :style="{ height: contentHeight }"
                        :class="{'overflow-hidden': isCollapsed}">
                        <p ref="summaryContent"
                           class="text-sm text-gray-600 dark:text-gray-400 w-full
                                  transition-all duration-300"
                           :class="{'line-clamp-3': !showFullSummary || isCollapsed}">
                            {{ book.summary || '暂无简介' }}
                        </p>
                    </div>
                    <div class="h-[28px]" v-show="!isCollapsed">
                        <button v-if="shouldShowExpandButton"
                                @click="toggleSummary"
                                class="text-xs text-primary-500 hover:text-primary-600 mt-2 
                                       hover:underline transition-all duration-300">
                            {{ showFullSummary ? '收起' : '展开全文' }}
                        </button>
                    </div>
                </div>

                <!-- 标签区域 -->
                <div class="flex flex-wrap gap-2 transition-all duration-300"
                    v-show="!isCollapsed">
                    <span v-for="(tag, index) in bookTags" 
                          :key="index"
                          class="tag-item bg-gray-100/70 dark:bg-dark-300/70
                                 transform transition-all duration-300">
                        {{ tag }}
                    </span>
                </div>
            </div>
            
            <!-- 添加回到顶部按钮 -->
            <button v-if="isCollapsed"
                    @click="scrollToTop"
                    class="absolute right-4 top-1/2 -translate-y-1/2
                           text-primary-500 hover:text-primary-600
                           flex items-center gap-1 text-sm
                           transition-all duration-300 hover:scale-105">
                <UpOutlined class="text-xs"/>
                展开简介
            </button>
        </div>

        <!-- 评论列表区域 -->
        <div class="flex-1 overflow-y-auto custom-scrollbar"
            @scroll="handleScroll"
            ref="commentsContainer">
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
                                       :class="{'line-clamp-2': !comment.expanded && comment.content.length > 100}">
                                        {{ comment.content }}
                                    </p>
                                    <button v-if="comment.content.length > 100"
                                            @click="toggleComment(comment)"
                                            class="text-xs text-primary-500 hover:text-primary-600 mt-2 hover:underline">
                                        {{ comment.expanded ? '收起' : '展开全文' }}
                                    </button>
                                </div>
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
    </div>
    <div v-else class="h-full flex items-center justify-center">
        <div class="text-center text-gray-500 dark:text-gray-400">
            <div class="text-6xl mb-4">📚</div>
            <p>请选择一本书查看详情</p>
        </div>
    </div>
</template>

<script setup lang="ts">
import {ref, computed, onMounted, watch, nextTick} from 'vue'
import { MessageOutlined, UpOutlined } from '@ant-design/icons-vue'
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

const toggleComments = () => {
    showAllComments.value = !showAllComments.value
}

defineEmits(['back'])

// 添加内容简介展开状态控制
const showFullSummary = ref(false)

const showAllComments = ref(false)

// 添加评论大小控制
const getCommentSizeClass = (content: string) => {
    if (content.length < 50) return 'text-sm'
    if (content.length < 100) return 'text-base'
    return 'text-base leading-relaxed'
}

// 添加评论展开/收起控制
const toggleComment = (comment: any) => {
    comment.expanded = !comment.expanded
}

const summaryContent = ref<HTMLElement | null>(null)
const contentHeight = ref('auto')

// 计算是否应该显示展开按钮
const shouldShowExpandButton = computed(() => {
    return props.book?.summary && props.book.summary.length > 100
})

// 计算所有标签
const bookTags = computed(() => {
    if (!props.book) return []
    return [
        props.book.publisher ? `出版：${props.book.publisher}` : null,
        props.book.publishDate,
        props.book.pages ? `${props.book.pages}页` : null,
        props.book.isbn ? `ISBN：${props.book.isbn}` : null
    ].filter(Boolean)
})

// 切换展开/收起状态
const toggleSummary = () => {
    showFullSummary.value = !showFullSummary.value
    updateContentHeight()
}

// 更新内容高度
const updateContentHeight = () => {
    if (!summaryContent.value) return
    
    if (showFullSummary.value) {
        contentHeight.value = `${summaryContent.value.scrollHeight}px`
    } else {
        contentHeight.value = '4.5em' // 3行文本的大约高度
    }
}

// 监听内容变化
watch(() => props.book?.summary, () => {
    showFullSummary.value = false
    nextTick(() => {
        updateContentHeight()
    })
})

// 组件挂载时初始化高度
onMounted(() => {
    updateContentHeight()
})

// 添加折叠状态控制
const isCollapsed = ref(false)
const lastScrollTop = ref(0)
const commentsContainer = ref<HTMLElement | null>(null)
const summarySection = ref<HTMLElement | null>(null)

// 修改处理滚动事件的逻辑
const handleScroll = () => {
    if (!commentsContainer.value) return
    
    const currentScrollTop = commentsContainer.value.scrollTop
    const scrollingDown = currentScrollTop > lastScrollTop.value
    
    // 调整滚动阈值
    if (scrollingDown && currentScrollTop > 50 && !isCollapsed.value) {
        isCollapsed.value = true
    } else if (!scrollingDown && currentScrollTop < 30 && isCollapsed.value) {
        isCollapsed.value = false
    }
    
    lastScrollTop.value = currentScrollTop
}

// 监听折叠状态变化
watch(isCollapsed, (newValue) => {
    if (newValue) {
        showFullSummary.value = false
    }
    nextTick(() => {
        updateContentHeight()
    })
})

// 添加滚动到顶部的方法
const scrollToTop = () => {
    if (!commentsContainer.value) return
    
    commentsContainer.value.scrollTo({
        top: 0,
        behavior: 'smooth'
    })
}
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
    transition: all 0.3s ease;
}

.comment-enter-from,
.comment-leave-to {
    opacity: 0;
    transform: translateY(20px);
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
    @apply ml-8;
}

/* 添加新的过渡效果 */
.line-clamp-3 {
    display: -webkit-box;
    -webkit-line-clamp: 3;
    -webkit-box-orient: vertical;
    overflow: hidden;
    transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}

.hover\:line-clamp-none:hover {
    -webkit-line-clamp: unset;
}

.line-clamp-2 {
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    overflow: hidden;
    transition: all 0.3s ease;
}

.tag-item {
    @apply px-2 py-1 rounded-full text-xs
           transition-all duration-300
           hover:shadow-sm cursor-default;
}

/* 让标签在悬浮时有轻微的放大效果 */
.tag-item:hover {
    transform: scale(1.05);
}

/* 修改简介区域样式 */
.summary-section {
    @apply transition-all duration-300 relative;
    overflow: hidden;
}

/* 评论容器样式 */
.comments-container {
    transition: transform 0.3s ease;
}

/* 自定义滚动条样式 */
.custom-scrollbar {
    @apply scrollbar-thin 
           scrollbar-track-gray-200/50 dark:scrollbar-track-dark-200/50
           scrollbar-thumb-primary-500/70 hover:scrollbar-thumb-primary-600;
}

/* 添加按钮悬停效果 */
button:hover .anticon {
    transform: translateY(-2px);
    transition: transform 0.3s ease;
}
</style>
