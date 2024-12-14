<template>
  <div class="book-list">
    <div class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
      <template v-if="loading">
        <BookCardSkeleton v-for="n in 8" :key="n" />
      </template>
      
      <template v-else-if="books.length">
        <BookCard
          v-for="book in books"
          :key="book.id"
          :book="book"
          interactive
          @click="$emit('select', book)"
        />
      </template>
      
      <template v-else>
        <slot name="empty"></slot>
      </template>
    </div>
    
    <div v-if="hasMore" class="text-center mt-8">
      <button 
        class="btn-primary"
        :disabled="loading"
        @click="$emit('load-more')"
      >
        加载更多
      </button>
    </div>
  </div>
</template> 