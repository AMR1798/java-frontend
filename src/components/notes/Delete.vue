<template>
    <button @click="visible = true"
        class="bg-white text-black active:bg-gray-600 text-sm font-bold uppercase px-1 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1  w-32 ease-linear transition-all duration-150"
        type="submit"> Delete </button>
    <Dialog v-model:visible="visible" modal header="Header" :style="{ width: '50rem' }"
        :breakpoints="{ '1199px': '75vw', '575px': '90vw' }">
        <p class="text-lg font-bold mb-2">
            Delete note {{ note.title }}?
        </p>
        <template #footer>
            <Button label="Cancel" @click="visible = false" autofocus />
            <Button label="Delete" icon="pi pi-check" @click="deleteNote" autofocus />
        </template>
    </Dialog>
</template>

<script setup lang="ts">
import { PropType, ref } from 'vue';
import Button from 'primevue/button';
import Dialog from 'primevue/dialog';
import { Note } from '@/types/note/note';
import { NoteService } from '@/service/note.service';
const visible = ref<boolean>(false);

const props = defineProps({
    note: {
        type: Object as PropType<Note>,
        required: true,
    }
})

const emits = defineEmits(['delete'])

const deleteNote = async () => {
    const res = await NoteService.deleteNote(props.note.id);
    emits('delete', props.note.id);
    visible.value = false;
}
</script>

<style scoped></style>