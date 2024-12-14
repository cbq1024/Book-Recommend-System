import { ref } from 'vue'
import type { Comment, Reply } from '../types/book'

export function useComments() {
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
        comment.showReplies = true
        
        replyContent.value = ''
        replyToUsername.value = null
        activeReplyId.value = null
    }

    // 切换回复列表的显示状态
    const toggleReplies = (comment: Comment) => {
        comment.showReplies = !comment.showReplies
    }

    // 回复指定用户
    const replyToUser = (username: string, comment: Comment) => {
        replyToUsername.value = username
        activeReplyId.value = comment.id
        replyContent.value = ''
    }

    return {
        activeReplyId,
        replyContent,
        replyToUsername,
        toggleLike,
        showReplyInput,
        submitReply,
        toggleReplies,
        replyToUser
    }
} 