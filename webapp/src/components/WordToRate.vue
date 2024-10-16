<script setup lang="ts">
import { onMounted, ref } from 'vue'
import LoadingComponent from './LoadingComponent.vue'
import { apiClient } from '@/services/api'
import type { WordWithScore } from 'shared/types'

const word = ref<string | null>(null)
const note = ref<number | null>(null)
const leaderboard = ref<WordWithScore[]>([])

async function fetchWord() {
  word.value = null
  const response = await apiClient.post<{ word: string }>('/word/daily')
  word.value = response.word
}
async function voteAndRefresh() {
  if (note.value === null) return
  await apiClient.post('/word/daily/vote', { word: word.value, note: note.value })
  fetchWord()
}

async function fetchLeaderboard() {
  const response = await apiClient.post<WordWithScore[]>('/word/leaderboard')
  leaderboard.value = response
}

onMounted(() => {
  fetchWord()
  fetchLeaderboard()

  const eventSource = new EventSource(import.meta.env.VITE_EXPRESS_URL + '/word/events', {
    withCredentials: true
  })

  eventSource.onmessage = (event) => {
    const data = JSON.parse(event.data)
    console.log('Notification reçue:', data)
  }

  eventSource.onerror = (error) => {
    console.error('Erreur avec SSE', error)
  }
})
</script>

<template>
  <div>
    <LoadingComponent small v-if="!word" />
    <div v-else>
      <h1>{{ word }}</h1>
      <input type="number" v-model="note" />
      <button @click="voteAndRefresh">Voter</button>

      <h1>leaderboard</h1>
      <ul>
        <li v-for="entry in leaderboard" :key="entry.word">
          {{ entry.word }}: {{ entry.total_score }}
        </li>
      </ul>
    </div>
  </div>
</template>
