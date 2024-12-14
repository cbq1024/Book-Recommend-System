<template>
    <div v-if="book" 
         class="bg-white dark:bg-dark-200 rounded-lg shadow-sm 
                border border-gray-100 dark:border-dark-300 flex-shrink-0
                transition-all duration-300 overflow-hidden"
         :class="[isCollapsed ? 'h-0 opacity-0 m-0 p-0 border-0' : 'h-auto opacity-100']">
        <div class="p-4">
            <!-- 内容简介 -->
            <div class="bg-gray-50/50 dark:bg-dark-200/50 rounded-lg p-3
                        hover:bg-gray-50 dark:hover:bg-dark-200 
                        transition-all duration-300">
                <h4 class="text-xs font-medium text-gray-700 dark:text-gray-300 mb-2
                           flex items-center gap-1.5">
                    <BookOutlined class="text-primary-500"/>
                    内容简介
                </h4>
                <div class="relative" 
                     :style="{ height: contentHeight }"
                     :class="{'overflow-hidden': isCollapsed}">
                    <p ref="summaryContent"
                       class="text-sm text-gray-600 dark:text-gray-400 w-full
                              transition-all duration-300"
                       :class="{'line-clamp-2': !showFullSummary || isCollapsed}">
                        {{ book.summary || '暂无简介' }}
                    </p>
                </div>
                <div class="h-[24px]" v-show="!isCollapsed">
                    <button v-if="shouldShowExpandButton"
                            @click="toggleSummary"
                            class="text-xs text-primary-500 hover:text-primary-600 mt-1
                                   hover:underline transition-all duration-300">
                        {{ showFullSummary ? '收起' : '展开全文' }}
                    </button>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref, computed, watch, nextTick } from 'vue'
import { BookOutlined, UpOutlined } from '@ant-design/icons-vue'
import type { Book } from '../types/book'

const props = defineProps<{
    book: Book | null
    isCollapsed?: boolean
}>()

const emit = defineEmits(['expand'])

const showFullSummary = ref(false)
const summaryContent = ref<HTMLElement | null>(null)
const contentHeight = ref('auto')

// 计算是否应该显示展开按钮
const shouldShowExpandButton = computed(() => {
    return props.book?.summary && props.book.summary.length > 100
})

// 切换展开/收起状态
const toggleSummary = () => {
    showFullSummary.value = !showFullSummary.value
    updateContentHeight()
}

// 更新内容高度
const updateContentHeight = () => {
    if (!summaryContent.value) return
    if (showFullSummary.value && !props.isCollapsed) {
        contentHeight.value = `${summaryContent.value.scrollHeight}px`
    } else {
        contentHeight.value = '3em'
    }
}

// 监听内容变化
watch(() => props.book?.summary, () => {
    showFullSummary.value = false
    nextTick(() => {
        updateContentHeight()
    })
})

// 监听折叠状态
watch(() => props.isCollapsed, () => {
    if (props.isCollapsed) {
        showFullSummary.value = false
    }
    nextTick(() => {
        updateContentHeight()
    })
})
</script> 