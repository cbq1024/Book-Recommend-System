// 创建新文件夹和文件
export interface Book {
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
    showAllComments?: boolean
}

export interface Comment {
    id: number
    username: string
    avatar: string
    content: string
    date: string
    expanded?: boolean
    likes: number
    liked?: boolean
    replies?: Reply[]
    showReplies: boolean
}

export interface Reply {
    id: number
    username: string
    avatar: string
    content: string
    date: string
    likes: number
    liked?: boolean
    replyTo?: string
}

export interface CategoryTag {
    name: string
    count: number
    activeClass: string
    showAll?: boolean
} 