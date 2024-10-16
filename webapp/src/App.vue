<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router'
import HelloWorld from './components/HelloWorld.vue'
import { useUserStore } from './stores/userStore'
import { storeToRefs } from 'pinia'
const { user } = storeToRefs(useUserStore())
</script>

<template>
  <v-app>
    <v-app-bar :elevation="2">
      <!-- <template v-slot:prepend>
        <v-app-bar-nav-icon></v-app-bar-nav-icon>
      </template> -->

      <v-app-bar-title>Motches</v-app-bar-title>

      <template v-slot:append>
        <v-btn class="text-none text-subtitle-1">
          Mon compte
          <v-avatar v-if="user">
            <v-img alt="Vue logo" :src="user.google_photo_url" />
          </v-avatar>
          <v-avatar v-else>
            <v-icon icon="mdi-account-circle"></v-icon>
          </v-avatar>
        </v-btn>
      </template>
    </v-app-bar>
    {{ user }}
  </v-app>
  <header>
    <div class="wrapper">
      <HelloWorld msg="You did it!" />

      <nav>
        <RouterLink to="/">Home</RouterLink>
        <RouterLink to="/about">About</RouterLink>
      </nav>
    </div>
  </header>

  <RouterView />
</template>
