<template>
    <button @click="visible = true"
        class="bg-white text-black active:bg-gray-600 text-sm font-bold uppercase px-1 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1  w-32 ease-linear transition-all duration-150"
        type="submit"> Show </button>
    <Dialog v-model:visible="visible" modal header="Header" :style="{ width: '50rem' }"
        :breakpoints="{ '1199px': '75vw', '575px': '90vw' }">
        <template #header>
            <div class="inline-flex items-center justify-center gap-2">
                <span class="font-bold whitespace-nowrap	">{{ note.user.name }}</span>
            </div>
        </template>
        <p class="text-lg font-bold mb-2">
            {{ note.title }}
        </p>
        <hr class="my-2">
        <p class="m-0">
            {{ note.content }}
        </p>
        <template #footer>
            <Button label="Ok" icon="pi pi-check" @click="visible = false" autofocus />
        </template>
    </Dialog>
</template>

<script setup lang="ts">
import { PropType, ref } from 'vue';
import Button from 'primevue/button';
import Dialog from 'primevue/dialog';
import { Note } from '@/types/note/note';
const visible = ref<boolean>(false);

defineProps({
    note: {
        type: Object as PropType<Note>,
        required: true,
    }
})
</script>

<style scoped></style>