<script setup lang="ts">
import { useUserStore } from '@/stores/userStore'
import WordToRate from '@/components/WordToRate.vue'
const { getUser } = useUserStore()
</script>

<template>
  <main>
    {{ getUser() }}
    <WordToRate />
  </main>
</template>
