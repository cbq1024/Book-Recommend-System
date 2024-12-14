import type { Comment } from '../types/book'

export const generateComments = (count: number): Comment[] => {
    const comments: Comment[] = []
    const usernames = ['Alex', 'Sarah', 'Mike', 'Emma', 'John', 'Lisa', 'David', 'Anna']
    const avatars = [
        'https://api.dicebear.com/7.x/avataaars/svg?seed=1',
        'https://api.dicebear.com/7.x/avataaars/svg?seed=2',
        'https://api.dicebear.com/7.x/avataaars/svg?seed=3',
        'https://api.dicebear.com/7.x/avataaars/svg?seed=4',
    ]
    const contents = [
        '这本书真的很棒，强烈推荐！',
        '内容深入浅出，适合入门学习。',
        '这是我读过最好的技术书籍之一。',
        '作者的讲解方式很清晰，举例恰当。',
        '虽然内容不错，但是有些地方还是比较难理解。',
        '这本书帮助我解决了很多实际问题。',
        '非常适合想深入学习这个领域的人。',
        '图文并茂，示例丰富，很容易理解。'
    ]

    for (let i = 0; i < count; i++) {
        const date = new Date()
        date.setDate(date.getDate() - Math.floor(Math.random() * 30))

        comments.push({
            id: i + 1,
            username: usernames[Math.floor(Math.random() * usernames.length)],
            avatar: avatars[Math.floor(Math.random() * avatars.length)],
            content: contents[Math.floor(Math.random() * contents.length)],
            date: date.toISOString().split('T')[0],
            expanded: false
        })
    }
    return comments
} 