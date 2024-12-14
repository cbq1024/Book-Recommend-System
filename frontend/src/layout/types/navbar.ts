export interface NavigationLink {
    path: string
    icon: string
    text: string
}

export interface MenuItem extends NavigationLink {}

export type UserRole = 'admin' | 'reader'

export interface UserInfo {
    username: string
    avatar: string
    email: string
    role: UserRole
} 