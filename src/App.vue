<template>
  <div class="card">
    <Menubar :model="items" />
  </div>
  <RouterView></RouterView>
</template>

<script setup lang="ts">
import Menubar from 'primevue/menubar';
import { MenuItem } from 'primevue/menuitem';
import { useAuthStore } from './store/auth.store';
import { useRouter } from 'vue-router';

const authStore = useAuthStore();
const router = useRouter();

const items: MenuItem[] = [
  {
    label: 'Home',
    icon: 'pi pi-home',
    command: () => router.push({name: 'home'})
  },
  {
    label: 'Login',
    command: () => router.push({name: 'login'}),
    visible: () => !authStore.isLoggedIn()
  },
  {
    label: 'Register',
    command: () => router.push({name: 'register'}),
    visible: () => !authStore.isLoggedIn()
  },
  {
    label: 'Logout',
    visible: () => authStore.isLoggedIn(),
    command: () => authStore.logout() 
  }
]
</script>

<style scoped>
.logo {
  height: 6em;
  padding: 1.5em;
  will-change: filter;
  transition: filter 300ms;
}

.logo:hover {
  filter: drop-shadow(0 0 2em #646cffaa);
}

.logo.vue:hover {
  filter: drop-shadow(0 0 2em #42b883aa);
}
</style>./components/page/Login.vue
