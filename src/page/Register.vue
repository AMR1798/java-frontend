<template>
    <section class="container mx-auto">
        <div class="w-full lg:w-5/12 px-4 mx-auto pt-10">
            <div
                class="relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded-lg bg-gray-200 border-0">
                <div class="flex-auto px-4 lg:px-10 py-10 pt-5">
                    <Form :validation-schema="schema" @submit="submit">
                        <div class="relative w-full mb-3">
                            <label class="block uppercase text-gray-600 text-xs font-bold mb-2"
                                for="grid-password">Name</label>
                            <Field type="name" name="name"
                                class="border-0 px-3 py-3 placeholder-gray-300 text-gray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                                placeholder="name" />
                            <ErrorMessage name="name"  class="text-red-500 text-sm"/>
                        </div>
                        <div class="relative w-full mb-3">
                            <label class="block uppercase text-gray-600 text-xs font-bold mb-2"
                                for="grid-password">Email</label>
                            <Field type="email" name="email"
                                class="border-0 px-3 py-3 placeholder-gray-300 text-gray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                                placeholder="Email" />
                            <ErrorMessage name="email"  class="text-red-500 text-sm"/>
                        </div>
                        <div class="relative w-full mb-3">
                            <label class="block uppercase text-gray-600 text-xs font-bold mb-2"
                                for="grid-password">Password</label>
                            <Field type="password" name="password"
                                class="border-0 px-3 py-3 placeholder-gray-300 text-gray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                                placeholder="Password" />
                            <ErrorMessage name="password" class="text-red-500 text-sm"/>
                        </div>
                        <div class="relative w-full mb-3">
                            <label class="block uppercase text-gray-600 text-xs font-bold mb-2"
                                for="grid-password">Confirm Password</label>
                            <Field type="password" name="confirmPassword"
                                class="border-0 px-3 py-3 placeholder-gray-300 text-gray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                                placeholder="confirmPassword" />
                            <ErrorMessage name="confirmPassword" class="text-red-500 text-sm"/>
                        </div>
                        <div class="text-center mt-6">
                            <button
                                class="bg-slate-800 text-white active:bg-gray-600 text-sm font-bold uppercase px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 w-full ease-linear transition-all duration-150"
                                type="submit"> Register </button>
                        </div>
                    </Form>
                </div>
            </div>
        </div>
    </section>
</template>
<script setup lang="ts">
import { useAuthStore } from '@/store/auth.store';
import { Field, Form, ErrorMessage } from 'vee-validate';
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import * as yup from 'yup';

// type formObject = {
//     email: string;
//     password: string;
// }

const authStore = useAuthStore();
const router = useRouter();

const schema = yup.object({
    name: yup.string().required(),
    email: yup.string().required().email(),
    password: yup.string().required().min(3),
    confirmPassword: yup
    .string()
    .required('Retype your password')
    .oneOf([yup.ref('password')], 'Your passwords do not match.')
});

// if dont want to use any https://github.com/logaretm/vee-validate/issues/3521
const submit = async (data: any) => {
    const res = await authStore.register(data.name, data.email, data.password, data.confirmPassword);
    if (res) {
        router.push({name: 'login'})
    }
}
</script>

<style scoped></style>