<template>
    <div class="container mx-auto">
        <div class="card p-5">
            <div class="mb-2">
                <div class="text-lg font-bold">
                    Create Note
                </div>
            </div>
            <Form @submit="create"></Form>
        </div>
    </div>
</template>

<script setup lang="ts">
import Form from '@/components/notes/Form.vue';
import { NoteService } from '@/service/note.service';
import { GenericObject } from 'vee-validate';
import { useRouter } from 'vue-router';

const router = useRouter();

const create = async (data: GenericObject) => {
    const res = await NoteService.createNote(data.title, data.content);
    if (res) {
        router.push({ name: 'home' })
    }
}
</script>

<style scoped>
</style>