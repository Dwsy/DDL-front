<template>
  <title>
    文章未找到
  </title>
  <section class="flex items-center h-full p-16 dark:bg-gray-900 dark:text-gray-100">
    <div class="container flex flex-col items-center justify-center px-5 mx-auto my-8">
      <div class="max-w-md text-center">
        <h2 class="mb-8 font-extrabold text-9xl dark:text-gray-600">
          <span class="sr-only">Error</span>404
        </h2>
        <p class="text-2xl font-semibold md:text-3xl">文章不存在.</p>
        <p class="mt-4 mb-8 dark:text-gray-400">
          不过别担心，你可以在我们的主页上找到很多其他的东西。.
        </p>
        <a
          rel="noopener noreferrer"
          href="/article"
          class="px-8 py-3 font-semibold rounded dark:bg-violet-400 dark:text-gray-900"
          >回到主页</a
        >
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { definePageMeta } from '#imports'

definePageMeta({
  layout: false,
})
</script>
<style>
.main {
  height: 1000px;
}

.emoji-404 {
  position: relative;
  animation: mymove 2.5s infinite;
}

@keyframes mymove {
  33% {
    top: 0px;
  }
  66% {
    top: 20px;
  }
  100% {
    top: 0px;
  }
}
</style>
