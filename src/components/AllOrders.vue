<template>
<div class="flex w-full justify-between">
    <div style="text-align: left" class="mb-2 mt-5">
    <label>SearchBy:</label><input class="ml-2 pl-8 pr-2 text-sm text-gray-700 placeholder-gray-600 bg-gray-100 border-0 rounded-md dark:placeholder-gray-500 dark:focus:shadow-outline-gray dark:focus:placeholder-gray-600 dark:bg-gray-700 dark:text-gray-200 focus:placeholder-gray-500 focus:bg-white focus:border-purple-300 focus:outline-none focus:shadow-outline-purple form-input" v-model="searchTerm" />
  </div>
  <router-link to="/addproduct" class="mt-auto text-indigo-400">
    Create <i class="fa fa-plus" aria-hidden="true"></i>
  </router-link>
</div>
  <table-lite
  :do-search="true"
    :is-static-mode="true"
    :columns="table.columns"
    :rows="table.rows"
    :total="table.totalRecordCount"
    :sortable="table.sortable"
    :has-checkbox="true"
  ></table-lite>
</template>

<script>
import { defineComponent, reactive, ref, computed } from "vue";
import TableLite from 'vue3-table-lite'
export default defineComponent({
  components: { TableLite },
  setup() {
    const searchTerm = ref("");
    // Fake data
    const data = reactive([]);
    for (let i = 0; i < 126; i++) {
      data.push({
        id: i,
        name: "TEST" + i,
        email: "test" + i + "@example.com",
      });
    }
    // Table config
    const table = reactive({
      columns: [
        {
          label: "ID",
          field: "id",
          width: "3%",
          sortable: true,
          isKey: true,
        },
        {
          label: "Name",
          field: "name",
          width: "10%",
          sortable: true,
        },
        {
          label: "Name",
          field: "name",
          width: "10%",
          sortable: true,
        },
        {
          label: "Email",
          field: "email",
          width: "15%",
          sortable: true,
        },
        {
          label: "Email",
          field: "email",
          width: "15%",
          sortable: true,
        },
        {
          label: "Email",
          field: "email",
          width: "15%",
          sortable: true,
        },
      ],
      rows: computed(() => {
        return data.filter(
          (x) =>
            x.email.toLowerCase().includes(searchTerm.value.toLowerCase()) ||
            x.name.toLowerCase().includes(searchTerm.value.toLowerCase())
        );
      }),
            totalRecordCount: computed(() => {
        return table.rows.length;
      }),
      sortable: {
        order: "id",
        sort: "asc",
      },
    });
    return {
      searchTerm,
      table,
    };
  },
});
</script>