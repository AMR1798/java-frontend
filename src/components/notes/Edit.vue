<template>
    <button @click="show"
        class="bg-white text-black active:bg-gray-600 text-sm font-bold uppercase px-1 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1  w-32 ease-linear transition-all duration-150"
        type="submit"> Edit </button>
    <Dialog v-model:visible="visible" modal header="Header" :style="{ width: '50vw' }"
        :breakpoints="{ '1199px': '75vw', '575px': '90vw' }">
        <template #header>
            <div class="inline-flex items-center justify-center gap-2">
                <span class="font-bold whitespace-nowrap	">{{ note.user.name }}</span>
            </div>
        </template>
        <Form :note="note" ref="editFormRef" @submit="update"></Form>
    </Dialog>
</template>

<script setup lang="ts">
import { PropType, nextTick, ref, watch } from 'vue';
import Button from 'primevue/button';
import Dialog from 'primevue/dialog';
import { Note } from '@/types/note/note';
import Form from './Form.vue';
import { GenericObject } from 'vee-validate';
import { NoteService } from '@/service/note.service';
const visible = ref<boolean>(false);
const editFormRef = ref(null);

const props = defineProps({
    note: {
        type: Object as PropType<Note>,
        required: true,
    }
})

const show = () => {
    visible.value = true
    nextTick(() => {
        (editFormRef.value as any).setForm();
    })
    
}

const update = async (data: GenericObject) => {
    const res = await NoteService.updateNote(props.note.id, data.title, data.content);
    props.note.title = String(res?.data.title);
    props.note.content = String(res?.data.title);
    visible.value = false;
}
</script>

<style scoped></style>