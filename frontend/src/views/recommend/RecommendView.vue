<template>
  <div class="recommend-view">
    <BookList
      :books="recommendedBooks"
      :loading="loading"
      @load-more="loadMore"
    >
      <template #empty>
        <EmptyState
          message="暂无推荐书籍"
          icon="book-open"
        />
      </template>
    </BookList>
  </div>
</template> 