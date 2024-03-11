<template>
    <div class="container mx-auto">
        <div class="card p-5">
            <div class="flex flex-row-reverse">
                <RouterLink :to="{name: 'create-note'}"
                    class="text-center bg-white text-black active:bg-gray-600 text-sm font-bold uppercase  py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mb-1 w-32 ease-linear transition-all duration-150"
                    type="button"> Create </RouterLink>
            </div>
            <div>
                <Table></Table>
            </div>
        </div>

    </div>
</template>

<script setup lang="ts">
import { RouterLink } from 'vue-router';
import Table from '@/components/notes/Table.vue';
</script>

<style scoped></style>