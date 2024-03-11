<template>
    <Form @submit="onSubmit" :validation-schema="schema" class="w-full">
        <label class="block uppercase text-white text-xs font-bold mb-2" for="grid-password">Title</label>
        <Field type="title" name="title" v-model="title"
            class="border-0 px-3 py-3 placeholder-gray-300 text-gray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
            placeholder="Title" />
        <ErrorMessage name="title" class="text-red-500 text-sm" />
        <label class="block uppercase text-white text-xs font-bold mb-2 mt-2" for="grid-password">Content</label>
        <Field type="content" name="content" v-slot="{ field }" placeholder="content" v-model="input">
            <textarea v-bind="field" name="content" ref="textarea" v-model="input"
                class="border-0 px-3 py-3 placeholder-gray-300 text-gray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"></textarea>
        </Field>
        <ErrorMessage name="content" class="text-red-500 text-sm" />
        <div class="flex flex-row-reverse">
            <button
                class="text-center bg-white text-black active:bg-gray-600 text-sm font-bold uppercase  py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mb-1 w-32 ease-linear transition-all duration-150"
                type="submit"> Submit </button>
        </div>
    </Form>
</template>

<script setup lang="ts">
import { Form, Field, ErrorMessage, GenericObject } from 'vee-validate';
import { useTextareaAutosize } from '@vueuse/core'
import * as yup from 'yup';
import { useRouter } from 'vue-router';
import { ref, defineExpose, defineProps, PropType } from 'vue';
import { Note } from '@/types/note/note';

const props = defineProps({
    note: {
        type: Object as PropType<Note>,
        required: false,
    }
})

const emits = defineEmits(['submit']);


const title = ref<string>('');

const schema = yup.object({
    title: yup.string().required().min(5),
    content: yup.string().required().min(5)
})

const { textarea, input } = useTextareaAutosize();


const onSubmit = async (data: GenericObject) => {
    emits('submit', data);
}




// setting the prop value to form value
const setForm = () => {
    title.value = String(props.note?.title),
    input.value = String(props.note?.content)

    console.log(title.value, input.value);
}

defineExpose({
    setForm
})
</script>

<style scoped>
textarea {
    -ms-overflow-style: none;
    scrollbar-width: none;
}

textarea::-webkit-scrollbar {
    display: none;
}
</style>