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
                                         class="w-8 h-8 rounded-full ring-2 ring-primary-100 dark:ring-primary-900"/>
                                    <div class="flex-1">
                                        <div class="flex justify-between items-center mb-1.5">
                                            <span class="font-medium text-sm text-gray-900 dark:text-gray-100">
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
                                        <div class="flex justify-end gap-4 mt-2 text-xs text-gray-500">
                                            <button @click="toggleLike(comment)"
                                                    class="flex items-center gap-1.5 hover:text-primary-500 
                                                           transition-all duration-300 group
                                                           px-2 py-1 rounded-full hover:bg-primary-50 
                                                           dark:hover:bg-primary-900/20"
                                                    :class="{'text-primary-500': comment.liked}">
                                                <LikeOutlined v-if="!comment.liked" 
                                                              class="transition-transform duration-300 
                                                                     group-hover:scale-110"/>
                                                <LikeFilled v-else 
                                                              class="transition-transform duration-300 
                                                                     group-hover:scale-110 animate-like"/>
                                                <span class="transition-all duration-300 
                                                                 group-hover:font-medium">
                                                    {{ comment.likes }}
                                                </span>
                                            </button>
                                            
                                            <button @click="showReplyInput(comment)"
                                                    class="flex items-center gap-1.5 hover:text-primary-500 
                                                           transition-all duration-300 group
                                                           px-2 py-1 rounded-full hover:bg-primary-50 
                                                           dark:hover:bg-primary-900/20">
                                                <CommentOutlined class="transition-transform duration-300 
                                                                       group-hover:scale-110"/>
                                                <span class="transition-all duration-300 
                                                                     group-hover:font-medium">回复</span>
                                            </button>

                                            <button v-if="comment.replies?.length"
                                                    @click="toggleReplies(comment)"
                                                    class="flex items-center gap-1.5 hover:text-primary-500 
                                                           transition-all duration-300 group
                                                           px-2 py-1 rounded-full hover:bg-primary-50 
                                                           dark:hover:bg-primary-900/20">
                                                <CaretRightOutlined :class="{'rotate-90': comment.showReplies}"
                                                                   class="transition-transform duration-300"/>
                                                <span>{{ comment.showReplies ? '收起回复' : `查看回复(${comment.replies.length})` }}</span>
                                            </button>
                                        </div>
                                        <div v-if="activeReplyId === comment.id" 
                                             class="mt-3 animate-fade-in">
                                            <div class="flex gap-2">
                                                <input v-model="replyContent"
                                                       type="text"
                                                       :placeholder="replyToUsername ? `回复 ${replyToUsername}` : '写下你的回复...'"
                                                       class="flex-1 px-4 py-2 text-sm rounded-full
                                                              border border-gray-200 dark:border-dark-300
                                                              focus:border-primary-500 dark:focus:border-primary-500
                                                              focus:ring-2 focus:ring-primary-500/20
                                                              bg-transparent outline-none
                                                              transition-all duration-300"/>
                                                <button @click="submitReply(comment)"
                                                        :disabled="!replyContent.trim()"
                                                        class="px-4 py-2 text-sm rounded-full
                                                               bg-gradient-to-r from-primary-500 to-primary-600
                                                               text-white hover:shadow-lg hover:scale-105
                                                               disabled:opacity-50 disabled:cursor-not-allowed
                                                               transition-all duration-300">
                                                    发送
                                                </button>
                                            </div>
                                        </div>
                                        <div v-if="comment.replies?.length" class="mt-3">
                                            <div v-if="comment.showReplies" class="space-y-3">
                                                <TransitionGroup name="reply">
                                                    <div v-for="reply in comment.replies"
                                                         :key="reply.id"
                                                         class="reply-card from-right">
                                                        <div class="flex items-start gap-2">
                                                            <img :src="reply.avatar"
                                                                 :alt="reply.username"
                                                                 class="w-6 h-6 rounded-full"/>
                                                            <div class="flex-1">
                                                                <div class="flex items-center gap-2 flex-wrap">
                                                                    <span class="font-medium text-sm">{{ reply.username }}</span>
                                                                    <span v-if="reply.replyTo" 
                                                                          class="text-xs px-2 py-0.5 rounded-full
                                                                                 bg-primary-50 dark:bg-primary-900/20
                                                                                 text-primary-600 dark:text-primary-400">
                                                                        回复 @{{ reply.replyTo }}
                                                                    </span>
                                                                </div>
                                                                <p class="text-sm text-gray-600 dark:text-gray-400 mt-1">
                                                                    {{ reply.content }}
                                                                </p>
                                                                <div class="flex justify-end gap-4 mt-2 text-xs text-gray-500">
                                                                    <button @click="toggleLike(reply)"
                                                                            class="flex items-center gap-1.5 hover:text-primary-500 
                                                                                   transition-all duration-300">
                                                                        <LikeOutlined v-if="!reply.liked"/>
                                                                        <LikeFilled v-else class="animate-like"/>
                                                                        <span>{{ reply.likes }}</span>
                                                                    </button>
                                                                    <button @click="replyToUser(reply.username, comment)"
                                                                            class="flex items-center gap-1.5 hover:text-primary-500 
                                                                                   transition-all duration-300">
                                                                        <CommentOutlined/>
                                                                        <span>回复</span>
                                                                    </button>
                                                                    <time class="text-gray-400">{{ reply.date }}</time>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </TransitionGroup>
                                            </div>
                                        </div>
                                    </div>
                                </template>
                                <template v-else>
                                    <div class="flex-1">
                                        <div class="flex justify-between items-center mb-1.5">
                                            <time class="text-xs text-gray-500">{{ comment.date }}</time>
                                            <span class="font-medium text-sm text-gray-900 dark:text-gray-100">
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
                                        <div class="flex justify-start gap-4 mt-3 text-xs text-gray-500">
                                            <button @click="toggleLike(comment)"
                                                    class="flex items-center gap-1.5 hover:text-primary-500 
                                                           transition-all duration-300 group
                                                           px-2 py-1 rounded-full hover:bg-primary-50 
                                                           dark:hover:bg-primary-900/20"
                                                    :class="{'text-primary-500': comment.liked}">
                                                <LikeOutlined v-if="!comment.liked" 
                                                               class="transition-transform duration-300 
                                                                      group-hover:scale-110"/>
                                                <LikeFilled v-else 
                                                               class="transition-transform duration-300 
                                                                      group-hover:scale-110 animate-like"/>
                                                <span>{{ comment.likes }}</span>
                                            </button>
                                            
                                            <button @click="showReplyInput(comment)"
                                                    class="flex items-center gap-1.5 hover:text-primary-500 
                                                           transition-all duration-300 group
                                                           px-2 py-1 rounded-full hover:bg-primary-50 
                                                           dark:hover:bg-primary-900/20">
                                                <CommentOutlined class="transition-transform duration-300 
                                                                       group-hover:scale-110"/>
                                                <span>回复</span>
                                            </button>

                                            <button v-if="comment.replies?.length"
                                                    @click="toggleReplies(comment)"
                                                    class="flex items-center gap-1.5 hover:text-primary-500 
                                                           transition-all duration-300 group
                                                           px-2 py-1 rounded-full hover:bg-primary-50 
                                                           dark:hover:bg-primary-900/20">
                                                <CaretRightOutlined :class="{'rotate-90': comment.showReplies}"
                                                                   class="transition-transform duration-300"/>
                                                <span>{{ comment.showReplies ? '收起回复' : `查看回复(${comment.replies.length})` }}</span>
                                            </button>
                                        </div>
                                        <div v-if="activeReplyId === comment.id" 
                                             class="mt-3 animate-fade-in">
                                            <div class="flex flex-row-reverse gap-2">
                                                <input v-model="replyContent"
                                                       type="text"
                                                       placeholder="写下你的回复..."
                                                       class="flex-1 px-4 py-2 text-sm rounded-full
                                                              border border-gray-200 dark:border-dark-300
                                                              focus:border-primary-500 dark:focus:border-primary-500
                                                              focus:ring-2 focus:ring-primary-500/20
                                                              bg-transparent outline-none
                                                              transition-all duration-300"/>
                                                <button @click="submitReply(comment)"
                                                        :disabled="!replyContent.trim()"
                                                        class="px-4 py-2 text-sm rounded-full
                                                               bg-gradient-to-r from-primary-500 to-primary-600
                                                               text-white
                                                               hover:shadow-lg hover:scale-105
                                                               disabled:opacity-50 disabled:cursor-not-allowed
                                                               disabled:hover:scale-100 disabled:hover:shadow-none
                                                               transition-all duration-300">
                                                    发送
                                                </button>
                                            </div>
                                        </div>
                                        <div v-if="comment.replies?.length" 
                                             class="mt-3">
                                            <div v-if="comment.showReplies" class="space-y-3">
                                                <TransitionGroup v-show="comment.showReplies"
                                                                name="reply" 
                                                                class="space-y-3">
                                                    <div v-for="reply in comment.replies"
                                                         :key="reply.id"
                                                         class="reply-card from-right">
                                                        <div class="flex items-start gap-2">
                                                            <img :src="reply.avatar"
                                                                 :alt="reply.username"
                                                                 class="w-6 h-6 rounded-full"/>
                                                            <div class="flex-1">
                                                                <div class="flex items-center gap-2 flex-wrap">
                                                                    <span class="font-medium text-sm">{{ reply.username }}</span>
                                                                    <span v-if="reply.replyTo" 
                                                                          class="text-xs px-2 py-0.5 rounded-full
                                                                                 bg-primary-50 dark:bg-primary-900/20
                                                                                 text-primary-600 dark:text-primary-400">
                                                                        回复 @{{ reply.replyTo }}
                                                                    </span>
                                                                </div>
                                                                <p class="text-sm text-gray-600 dark:text-gray-400 mt-1">
                                                                    {{ reply.content }}
                                                                </p>
                                                                <div class="flex justify-end gap-4 mt-2 text-xs text-gray-500">
                                                                    <button @click="toggleLike(reply)"
                                                                            class="flex items-center gap-1.5 hover:text-primary-500 
                                                                                   transition-all duration-300">
                                                                        <LikeOutlined v-if="!reply.liked"/>
                                                                        <LikeFilled v-else class="animate-like"/>
                                                                        <span>{{ reply.likes }}</span>
                                                                    </button>
                                                                    <button @click="replyToUser(reply.username, comment)"
                                                                            class="flex items-center gap-1.5 hover:text-primary-500 
                                                                                   transition-all duration-300">
                                                                        <CommentOutlined/>
                                                                        <span>回复</span>
                                                                    </button>
                                                                    <time class="text-gray-400">{{ reply.date }}</time>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </TransitionGroup>
                                            </div>
                                        </div>
                                    </div>
                                    <img :src="comment.avatar" 
                                         :alt="comment.username" 
                                         class="w-8 h-8 rounded-full ring-2 ring-primary-100 dark:ring-primary-900"/>
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

        <!-- 修改回到顶部按钮 -->
        <Transition name="fade">
            <button v-show="showBackToTop"
                    @click="scrollToTop"
                    class="absolute bottom-4 right-1/2 translate-x-1/2 p-2 rounded-full 
                           bg-primary-500/80 hover:bg-primary-500
                           text-white shadow-md hover:shadow-lg
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
import { ref, computed, nextTick } from 'vue'
import { MessageOutlined, VerticalAlignTopOutlined, LikeOutlined, LikeFilled, CommentOutlined, CaretRightOutlined } from '@ant-design/icons-vue'
import { useIntersectionObserver } from '@vueuse/core'
import type { Book, Comment, Reply } from '@/views/books/types/book'

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

// 添加互动相关的状态
const activeReplyId = ref<number | null>(null)
const replyContent = ref('')
const replyToUsername = ref<string | null>(null)

// 点赞功能
const toggleLike = (item: Comment | Reply) => {
    item.liked = !item.liked
    item.likes = (item.likes || 0) + (item.liked ? 1 : -1)
}

// 显示回复输入框
const showReplyInput = (comment: Comment) => {
    activeReplyId.value = activeReplyId.value === comment.id ? null : comment.id
    replyContent.value = ''
}

// 提交回复
const submitReply = (comment: Comment) => {
    if (!replyContent.value.trim()) return
    
    const newReply: Reply = {
        id: Date.now(),
        username: '当前用户',
        avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=current-user',
        content: replyContent.value,
        date: new Date().toISOString().split('T')[0],
        likes: 0,
        liked: false,
        replyTo: replyToUsername.value || comment.username
    }
    
    if (!comment.replies) {
        comment.replies = []
    }
    comment.replies.push(newReply)
    comment.showReplies = true // 确保回复列表展开
    
    replyContent.value = ''
    replyToUsername.value = null
    activeReplyId.value = null
}

// 切换回复列表的折叠状态
const toggleReplies = async (comment: Comment) => {
    comment.showReplies = !comment.showReplies
    await nextTick()
}

// 回复到指定用户
const replyToUser = (username: string, comment: Comment) => {
    replyToUsername.value = username
    activeReplyId.value = comment.id
    replyContent.value = ''
}

// 清除回复到指定用户
const clearReplyTo = () => {
    replyToUsername.value = null
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

/* 添加回复动画 */
.reply-enter-active,
.reply-leave-active {
    transition: all 0.3s ease-in-out;
    max-height: 500px; /* 设置一个足够大的最大高度 */
    overflow: hidden;
}

.reply-enter-from,
.reply-leave-to {
    max-height: 0;
    opacity: 0;
    transform: translateY(-10px);
}

.reply-enter-to,
.reply-leave-from {
    max-height: 500px;
    opacity: 1;
    transform: translateY(0);
}

/* 添加点赞动画 */
@keyframes like {
    0%, 100% { transform: scale(1); }
    50% { transform: scale(1.3); }
}

.animate-like {
    animation: like 0.4s cubic-bezier(0.4, 0, 0.2, 1);
}

/* 优化回复动画 */
.reply-enter-active,
.reply-leave-active {
    transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
}

.reply-enter-from,
.reply-leave-to {
    opacity: 0;
    transform: translateX(-20px);
}

/* 添加渐入动画 */
@keyframes fadeIn {
    from {
        opacity: 0;
        transform: translateY(10px);
    }
    to {
        opacity: 1;
        transform: translateY(0);
    }
}

.animate-fade-in {
    animation: fadeIn 0.3s ease-out forwards;
}

/* 优化回到顶部按钮动画 */
.fade-enter-active,
.fade-leave-active {
    transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
}

.fade-enter-from,
.fade-leave-to {
    opacity: 0;
    transform: translateX(-30px) scale(0.9);
}

/* 添加悬浮卡片效果 */
.comment-card {
    @apply bg-white dark:bg-dark-100 rounded-lg p-4
           transition-all duration-300
           border border-gray-100 dark:border-dark-300
           hover:border-primary-100 dark:hover:border-primary-900
           hover:shadow-lg hover:shadow-primary-500/5
           hover:-translate-y-0.5;
}

/* 更新回复卡片样式 */
.reply-card {
    @apply bg-gray-50 dark:bg-dark-200 rounded-lg p-3
           transition-all duration-300
           border border-gray-100 dark:border-dark-300
           hover:border-primary-100 dark:hover:border-primary-900
           w-[85%];
}

.reply-card.from-right {
    @apply ml-auto;
}

.reply-card:not(.from-right) {
    @apply ml-8;
}

/* 优化回复动画 */
.reply-enter-active,
.reply-leave-active {
    transition: all 0.3s ease-in-out;
    max-height: 500px;
    overflow: hidden;
}

.reply-enter-from,
.reply-leave-to {
    max-height: 0;
    opacity: 0;
    transform: translateY(-10px);
}

.reply-enter-to,
.reply-leave-from {
    max-height: 500px;
    opacity: 1;
    transform: translateY(0);
}
</style>
