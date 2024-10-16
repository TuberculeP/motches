<script setup lang="ts">
import { apiClient } from '@/services/api'

const currentEnv = import.meta.env
</script>
<template>
  <div>
    <button @click="apiClient.login">connexion avec google</button>
    {{ currentEnv }}
  </div>
</template>
