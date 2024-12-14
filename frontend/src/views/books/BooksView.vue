<template>
    <div class="container mx-auto px-4 py-6 h-screen flex flex-col gap-4">
        <!-- 分类标签区域 -->
        <div class="bg-white dark:bg-dark-100 p-4 rounded-lg shadow-sm">
            <div class="flex flex-wrap gap-2">
                <Tag v-for="tag in categoryTags"
                     :key="tag.name"
                     :active-class="tag.activeClass"
                     :count="tag.count">
                    {{ tag.name }}
                </Tag>
            </div>
        </div>

        <!-- 主要内容区域 -->
        <div class="flex gap-6 flex-1 overflow-hidden">
            <!-- 左侧书籍列表区域 - 调整比例 -->
            <div :class="{'w-2/5': !selectedBook, 'w-1/4': selectedBook}" 
                 class="transition-all duration-300 overflow-y-auto custom-scrollbar">
                <div class="space-y-4">
                    <template v-for="category in groupedBooks" :key="category.name">
                        <!-- 分类标题 -->
                        <div v-if="isShowingAll" class="flex items-center gap-2 mb-4">
                            <div class="flex-1 h-px bg-gray-200 dark:bg-gray-700"></div>
                            <h3 class="text-sm font-medium text-gray-700 dark:text-gray-300 px-4">
                                {{ category.name }}
                            </h3>
                            <div class="flex-1 h-px bg-gray-200 dark:bg-gray-700"></div>
                        </div>

                        <!-- 书籍列表 -->
                        <div class="grid gap-4">
                            <TransitionGroup name="book-list">
                                <div v-for="book in (category.showAll ? category.books : category.books.slice(0, 5))"
                                     :key="book.id"
                                     @click="selectBook(book)"
                                     class="book-card"
                                     :class="getBookCardClasses(book)">
                                    <div class="flex gap-3" :class="{'compact': selectedBook}">
                                        <img :src="book.cover" :alt="book.title"
                                             class="transition-all duration-300 rounded-lg"
                                             :class="selectedBook ? 'w-12 h-16' : 'w-16 h-24'"/>
                                        <div class="flex-1">
                                            <h3 class="text-base font-bold truncate">{{ book.title }}</h3>
                                            <p v-if="!selectedBook" class="text-sm text-gray-600 dark:text-gray-400">
                                                {{ book.author }}
                                            </p>
                                            <div class="flex items-center">
                                                <StarFilled class="text-yellow-400 text-xs mr-1"/>
                                                <span class="text-xs">{{ book.rating }}</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </TransitionGroup>

                            <button v-if="category.books.length > 5"
                                    @click="toggleCategoryExpand(category)"
                                    class="text-primary-500 text-sm hover:text-primary-600">
                                {{ category.showAll ? '收起' : `显示更多 (${category.books.length - 5})` }}
                            </button>
                        </div>
                    </template>
                </div>
            </div>

            <!-- 右侧评论区域 - 调整比例 -->
            <div :class="{'w-3/5': !selectedBook, 'w-3/4': selectedBook}"
                 class="transition-all duration-300">
                <CommentsSection 
                    :book="selectedBook"
                    @back="unselectBook"/>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import { StarFilled } from '@ant-design/icons-vue'
import CommentsSection from "./components/CommentsSection.vue"
import Tag from '@/components/common/Tag.vue'
import { generateComments } from './utils/mockData'
import type { Book, Comment, CategoryTag } from './types/book'

// 1. 首先定义类型
interface Book {
    id: number
    title: string
    author: string
    cover: string
    rating: number
    tags: string[]
    category: string
    summary: string
    comments: Comment[]
    publisher: string
    publishDate: string
    pages: number
    isbn: string
}

interface Comment {
    id: number
    username: string
    avatar: string
    content: string
    date: string
    expanded?: boolean
}

// 简化标签类型
interface CategoryTag {
    name: string
    count: number
    activeClass: string
}

// 定义标签颜色函数
const getTagColor = (category: string): string => {
    const colors: Record<string, string> = {
        // 主要分类
        '编程': 'bg-blue-500',
        '设计': 'bg-purple-500',
        '数据科学': 'bg-green-500',
        '人工智能': 'bg-indigo-500',
        
        // 技术栈
        'JavaScript': 'bg-yellow-500',
        'Python': 'bg-blue-400',
        'Web开发': 'bg-pink-500',
        '机器学习': 'bg-violet-500',
        
        // 专业领域
        '系统编程': 'bg-red-500',
        '数据分析': 'bg-teal-500',
        '设计模式': 'bg-orange-500',
        'UI/UX': 'bg-cyan-500',
        
        // 其他分类
        '文学': 'bg-yellow-500',
        '历史': 'bg-red-500'
    }
    return colors[category] || 'bg-gray-500'
}

// 3. 定义图书数据
const books = ref<Book[]>([
    {
        id: 1,
        title: '深入理解计算机系统',
        author: 'Randal E. Bryant',
        cover: 'https://picsum.photos/200/300?random=1',
        rating: 4.9,
        tags: ['计算机科学', '系统编程'],
        category: '编程',
        summary: '本书深入讲解计算机系统的基本概念，涵盖了程序性能优化、内存层次结构、链接、异常控制流、虚拟内存和并发编程等重要主题。通过实例详细阐述这些概念如何影响程序的正确性和性能。',
        comments: generateComments(12),
        publisher: '机械工业出版社',
        publishDate: '2016-11',
        pages: 732,
        isbn: '9787111544937'
    },
    {
        id: 2,
        title: 'JavaScript高级程序设计',
        author: 'Nicholas C. Zakas',
        cover: 'https://picsum.photos/200/300?random=2',
        rating: 4.8,
        tags: ['编程', 'JavaScript'],
        category: '编程',
        summary: '这本经典的JavaScript教程全面介绍了JavaScript编程的各个方面，包括核心语言特性、DOM编程、事件处理、Ajax技术等。书中包含大量实用示例，是JavaScript开发者的必备参考。',
        comments: generateComments(8),
        publisher: '人民邮电出版社',
        publishDate: '2019-12',
        pages: 880,
        isbn: '9787115545381'
    },
    {
        id: 3,
        title: '设计模式：可复用面向对象软件的基础',
        author: 'Erich Gamma',
        cover: 'https://picsum.photos/200/300?random=3',
        rating: 4.7,
        tags: ['设计', '编程'],
        category: '设计',
        summary: '本书从程序员的视角详细阐述计算机系统的本质概念，并展示这些概念如何实实在在地影响应用程序的正确性、性能和实用性。全书以程序员关心的问题作为出发点，致力于解释程序是如何映射到系统上，以及程序是如何执行的。',
        comments: generateComments(15),
        publisher: '机械工业出版社',
        publishDate: '2016-11',
        pages: 732,
        isbn: '9787111544937'
    },
    {
        id: 4,
        title: '数据科学入门',
        author: 'Joel Grus',
        cover: 'https://picsum.photos/200/300?random=4',
        rating: 4.5,
        tags: ['数据科学', 'Python'],
        category: '数据科学',
        summary: '本书从程序员的视角详细阐述计算机系统的本质概念，并展示这些概念如何实实在在地影响应用程序的正确性、性能和实用性。全书以程序员关心的问题作为出发点，致力于解释程序是如何映射到系统上，以及程序是如何执行的。',
        comments: generateComments(10),
        publisher: '机械工业出版社',
        publishDate: '2016-11',
        pages: 732,
        isbn: '9787111544937'
    },
    {
        id: 5,
        title: '人工智能：一种现代方法',
        author: 'Stuart Russell',
        cover: 'https://picsum.photos/200/300?random=5',
        rating: 4.9,
        tags: ['人工智能', '计算机科学'],
        category: '人工智能',
        summary: '本书从程序员的视角详细阐述计算机系统的本质概念，并展示这些概念如何实实在在地影响应用程序的正确性、性能和实用性。全书以程序员关心的问题作为出发点，致力于解释程序是如何映射到系统上，以及程序是如何执行的。',
        comments: generateComments(20),
        publisher: '机械工业出版社',
        publishDate: '2016-11',
        pages: 732,
        isbn: '9787111544937'
    },
    {
        id: 6,
        title: '百年孤独',
        author: '加西亚·马尔克斯',
        cover: 'https://picsum.photos/200/300?random=6',
        rating: 4.9,
        tags: ['文学', '魔幻现实主义'],
        category: '文学',
        summary: '本书从程序员的视角详细阐述计算机系统的本质概念，并展示这些概念如何实实在在地影响应用程序的正确性、性能和实用性。全书以程序员关心的问题作为出发点，致力于解释程序是如何映射到系统上，以及程序是如何执行的。',
        comments: generateComments(25),
        publisher: '机械工业出版社',
        publishDate: '2016-11',
        pages: 732,
        isbn: '9787111544937'
    },
    {
        id: 7,
        title: '人类简史',
        author: '尤瓦尔·赫拉利',
        cover: 'https://picsum.photos/200/300?random=7',
        rating: 4.8,
        tags: ['历史', '人类学'],
        category: '历史',
        summary: '本书从程序员的视角详细阐述计算机系统的本质概念，并展示这些概念如何实实在在地影响应用程序的正确性、性能和实用性。全书以程序员关心的问题作为出发点，致力于解释程序是如何映射到系统上，以及程序是如何执行的。',
        comments: generateComments(18),
        publisher: '机械工业出版社',
        publishDate: '2016-11',
        pages: 732,
        isbn: '9787111544937'
    },
    {
        id: 8,
        title: 'Python数据分析',
        author: 'Wes McKinney',
        cover: 'https://picsum.photos/200/300?random=8',
        rating: 4.7,
        tags: ['数据科学', 'Python'],
        category: '数据科学',
        summary: '本书从程序员的视角详细阐述计算机系统的本质概念，并展示这些概念如何实实在在地影响应用程序的正确性、性能和实用性。全书以程序员关心的问题作为出发点，致力于解释程序是如何映射到系统上，以及程序是如何执行的。',
        comments: generateComments(14),
        publisher: '机械工业出版社',
        publishDate: '2016-11',
        pages: 732,
        isbn: '9787111544937'
    },
    {
        id: 9,
        title: 'UI设计心理学',
        author: 'Susan Weinschenk',
        cover: 'https://picsum.photos/200/300?random=9',
        rating: 4.6,
        tags: ['设计', 'UI/UX'],
        category: '设计',
        summary: '本书从程序员的视角详细阐述计算机系统的本质概念，并展示这些概念如何实实在在地影响应用程序的正确性、性能和实用性。全书以程序员关心的问题作为出发点，致力于解释程序是如何映射到系统上，以及程序是如何执行的。',
        comments: generateComments(16),
        publisher: '机械工业出版社',
        publishDate: '2016-11',
        pages: 732,
        isbn: '9787111544937'
    },
    {
        id: 10,
        title: '机器学习实战',
        author: 'Aurélien Géron',
        cover: 'https://picsum.photos/200/300?random=10',
        rating: 4.8,
        tags: ['人工智能', '机器学习'],
        category: '人工智能',
        summary: '本书从程序员的视角详细阐述计算机系统的本质概念，并展示这些概念如何实实在地影响应用程序的正确性、性能和实用性。全书以程序员关心的问题作为出发点，致力于解释程序是如何映射到系统上，以及程序是如何执行的。',
        comments: generateComments(22),
        publisher: '机械工业出版社',
        publishDate: '2016-11',
        pages: 732,
        isbn: '9787111544937'
    }
])

// 5. 定义一标签计算属性
const uniqueTags = computed(() => {
    const tagSet = new Set<string>()
    books.value.forEach(book => {
        tagSet.add(book.category)
        book.tags.forEach(tag => tagSet.add(tag))
    })
    return Array.from(tagSet)
})

// 6. 简化分类标签计算属性
const categoryTags = computed(() => {
    // 按分类统计书籍数量
    const categoryCount = new Map<string, number>()
    books.value.forEach(book => {
        const count = categoryCount.get(book.category) || 0
        categoryCount.set(book.category, count + 1)
    })

    // 转换为标签数组
    return Array.from(categoryCount.entries())
        .map(([category, count]) => ({
            name: category,
            count,
            activeClass: getTagColor(category)
        }))
        .sort((a, b) => b.count - a.count)
})

// 7. 简化分组图书计算属性
const groupedBooks = computed(() => {
    // 按分类分组
    const groupedByCategory = new Map<string, Book[]>()
    books.value.forEach(book => {
        if (!groupedByCategory.has(book.category)) {
            groupedByCategory.set(book.category, [])
        }
        groupedByCategory.get(book.category)?.push(book)
    })

    // 转换为数组格式并按评分排序
    return Array.from(groupedByCategory.entries())
        .map(([category, books]) => ({
            name: category,
            books: books.sort((a, b) => b.rating - a.rating),
            showAll: false
        }))
        .sort((a, b) => b.books.length - a.books.length)
})

// 8. 其他方法和计算属性
const selectedBook = ref<Book | null>(null)

const selectBook = (book: Book) => {
    selectedBook.value = book
}

// 添加展开/收起控制
const toggleCategoryExpand = (category: { showAll: boolean }) => {
    category.showAll = !category.showAll
}

// 添加取消选择书籍的方法
const unselectBook = () => {
    selectedBook.value = null
}

// 添加一个计算属性来判断是否显示分类标题
const isShowingAll = computed(() => {
    return true // 现在总是显示分类标题，因为我们移除了标签筛选功能
})

// 展开/收起评论
const toggleComments = (book: any) => {
    book.showAllComments = !book.showAllComments
}

// 显示评论
const displayedComments = (book: any) => {
    return book.showAllComments ? book.comments : book.comments.slice(0, 5)
}

// 在组件挂载时默认选中第一本书
onMounted(() => {
    if (books.value.length > 0) {
        selectedBook.value = books.value[0]
    }
})

// 添加选中图书的动画样式
const getBookCardClasses = (book: Book) => ({
    'selected': selectedBook.value?.id === book.id,
    'transform transition-all duration-300': true,
    'hover:scale-[1.02]': true,
    'scale-[1.03] shadow-lg': selectedBook.value?.id === book.id
})

</script>

<style scoped>
/* 优化滚动条样式 */
.custom-scrollbar {
    @apply scrollbar-thin 
           scrollbar-track-gray-200/50 dark:scrollbar-track-dark-200/50
           scrollbar-thumb-primary-500/70 hover:scrollbar-thumb-primary-600;
}

/* 为 Webkit 浏览器添加圆角 */
.custom-scrollbar::-webkit-scrollbar {
    width: 6px;
}

.custom-scrollbar::-webkit-scrollbar-track {
    border-radius: 9999px;
}

.custom-scrollbar::-webkit-scrollbar-thumb {
    border-radius: 9999px;
}

/* 更新图书卡片动画效果 */
.book-card {
    @apply bg-white dark:bg-dark-100 rounded-lg p-3
           transition-all duration-300 cursor-pointer
           border border-transparent
           hover:border-primary-100 dark:hover:border-primary-900/30
           hover:shadow-lg
           relative
           animate-fade-in;
}

/* 添加渐入动画 */
@keyframes fade-in {
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
    animation: fade-in 0.3s ease-out;
}

/* 优化选中状态 */
.book-card.selected {
    @apply border-primary-500/30 dark:border-primary-500/30
           bg-gradient-to-br from-primary-50/90 via-primary-50/50 to-white
           dark:from-primary-900/20 dark:via-primary-900/10 dark:to-dark-100
           shadow-lg shadow-primary-500/10
           transform -translate-y-1 scale-[1.02]
           ring-1 ring-primary-500/20 ring-offset-2 ring-offset-white 
           dark:ring-offset-dark-100;
}

/* 添加选中时的左侧装饰 */
.book-card.selected::before {
    content: '';
    @apply absolute left-0 top-2 bottom-2 w-1
           bg-primary-500/50 rounded-full
           shadow-sm shadow-primary-500/30;
}

/* 添加选中时的光晕效果 */
.book-card.selected::after {
    content: '';
    @apply absolute inset-0 rounded-lg
           bg-gradient-to-r from-primary-500/5 to-transparent
           opacity-0 transition-opacity duration-300;
}

.book-card.selected:hover::after {
    @apply opacity-100;
}

/* 标签动画效果 */
.tag-item {
    @apply px-3 py-1.5 rounded-full text-sm cursor-pointer
           transition-all duration-300
           hover:scale-105 active:scale-95
           hover:shadow-md
           transform origin-center
           animate-tag-pop
           flex items-center gap-1.5;
}

.tag-count {
    @apply text-xs px-1.5 py-0.5 rounded-full
           bg-black/10 dark:bg-white/10
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

/* 添加禁用状态的标签样式 */
.tag-item.cursor-not-allowed {
    @apply hover:scale-100 hover:shadow-none;
}

/* 添加标签数量样式 */
.tag-item span {
    @apply inline-flex items-center justify-center
           min-w-[1.2em] h-[1.2em]
           rounded-full;
}
</style>
