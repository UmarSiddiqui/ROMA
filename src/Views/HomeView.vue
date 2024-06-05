<template>
  <v-container>
    <v-row>
      <v-col>
        <v-card>
          <v-card-title>DashBoard</v-card-title>
          <v-data-table
            :headers="choreHeaders"
            :items="ChoresList"
            :items-per-page="5"
            class="elevation-1"
          ></v-data-table>
        </v-card>
      </v-col>
      <v-col>
        <v-card>
          <v-card-title>Expenses</v-card-title>
          <v-data-table
            :headers="expenseHeaders"
            :items="expenseList"
            :items-per-page="5"
            class="elevation-1"
          ></v-data-table>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import { onMounted, ref } from 'vue';
import axios from 'axios';

export default {
  name: "HomeView",
  setup() {
    const ChoresList = ref([]);
    const expenseList = ref([]);

    const choreHeaders = [
      { text: 'Chores ID', value: 'choreId' },
      { text: 'Chore Name', value: 'choreName' },
      { text: 'Created By', value: 'createdBy' }
    ];

    const expenseHeaders = [
      { text: 'Expense ID', value: 'ExpenseId' },
      { text: 'Name', value: 'ExpenseName' },
      { text: 'Description', value: 'ExpenseDescription' },
      { text: 'Amount', value: 'ExpenseAmount' }
    ];

    onMounted(() => {
      axios
        .get('http://ec2-54-206-19-34.ap-southeast-2.compute.amazonaws.com/api/Chores/GetAll')
        .then((response) => {
          ChoresList.value = response.data.value;
        })
        .catch((error) => {
          console.error('Error fetching Chores data:', error);
        });

      axios
        .get('http://ec2-54-206-19-34.ap-southeast-2.compute.amazonaws.com/api/Expense/GetAll')
        .then((response) => {
          expenseList.value = response.data.value;
        })
        .catch((error) => {
          console.error('Error fetching Expenses data:', error);
        });
    });

    return {
      ChoresList,
      expenseList,
      choreHeaders,
      expenseHeaders
    };
  },
};
</script>

<style scoped>
</style>