<template>
    <div class="card p-1">
        <div>
            <DataTable :value="notes" lazy paginator :first="first" :rows="5" ref="dt" dataKey="id"
                :totalRecords="totalRecords" :loading="loading" @page="onPage($event)" :selectAll="selectAll">
                <Column field="id" header="ID">
                </Column>
                <Column field="title" header="Title">
                </Column>
                <Column field="user" header="User">
                    <template #body="{ data }">
                        {{ data.user.name }}
                    </template>
                </Column>
                <Column field="action" header="Action">
                    <template #body="{ data }">
                        <div class="flex flex-row float-right">
                            <Show :note="data"></Show>
                            <Edit :note="data"></Edit>
                            <Delete :note="data" @delete="loadLazyData"></Delete>
                        </div>

                    </template>

                </Column>
            </DataTable>
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { NoteService } from '@/service/note.service';
import DataTable, { DataTablePageEvent } from 'primevue/datatable';
import Column from 'primevue/column';
import { Note, ResponseNote } from '@/types/note/note';
import Show from './Show.vue';
import Edit from './Edit.vue';
import Delete from './Delete.vue';

onMounted(async () => {
    loading.value = true;

    lazyParams.value = {
        first: 0,
        rows: 5
    };

    await loadLazyData();
});

const dt = ref();
const loading = ref<boolean>(false);
const totalRecords = ref<number>(0);
const notes = ref<Note[]>();
const selectAll = ref(false);
const first = ref(0);
const lazyParams = ref<DataTablePageEvent|object>({});

const loadLazyData = async (event?: any) => {
    loading.value = true;
    lazyParams.value = event;

    await NoteService.getNotes(lazyParams.value).then((data: ResponseNote) => {
        notes.value = data.content;
        totalRecords.value = data.totalElements;
        loading.value = false;
    });

};
const onPage = (event: any) => {
    lazyParams.value = event;
    console.log(event);
    loadLazyData(event);
};

</script>
