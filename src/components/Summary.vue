<template>
  <router-link to="/addproduct" class="mt-auto text-indigo-400 ml-auto">
    Create <i class="fa fa-plus" aria-hidden="true"></i>
  </router-link>
  <table-lite
  style="overflow-x:auto !important"
  @click="formOpen"
    :is-static-mode="true"
    :columns="table.columns"
    :rows="table.rows"
    :total="table.totalRecordCount"
    :sortable="table.sortable"
  ></table-lite>
</template>

<script>
import { defineComponent, reactive, computed } from "vue";
import TableLite from "vue3-table-lite";
export default defineComponent({
  name: "App",
  components: { TableLite },
  methods:{
    formOpen(){
      this.$router.push("/editproduct")
    }
  },
  setup() {
    // Fake data
    const data = reactive([]);
    for (let i = 0; i < 126; i++) {
      data.push({
        id: i,
        name: "TEST" + i,
        email: "test" + i + "@example.com",
        images:"weqwe"
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
          label: "Images",
          field: "images",
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
      rows: data,
      totalRecordCount: computed(() => {
        return table.rows.length;
      }),
      sortable: {
        order: "id",
        sort: "asc",
      },
    });
    return {
      table,
    };
  },
});
</script>