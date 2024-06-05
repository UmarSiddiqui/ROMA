<template>
  <v-container>
    <Vue3Lottie animation-link="https://lottie.host/6af885a0-16d5-4ff8-a55d-82ddda9dbf6b/BYXtEzbmmr.json" height="30%" width="30%" />
    <v-row>
      <v-col>
        <v-card class="custom-card">
          <v-card-title>Chores</v-card-title>
          <v-data-table
            :headers="choreHeaders"
            :items="ChoresList"
            :items-per-page="5"
            class="elevation-1"
          ></v-data-table>
        </v-card>
      </v-col>
      <v-col>
        <v-card class="custom-card">
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
    <v-row>
      <v-col>
        <v-card class="custom-card">
          <v-card-title>Reminders</v-card-title>
          <v-data-table
            :headers="rentHeaders"
            :items="rentList"
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
    const rentList = ref([]);

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

    const rentHeaders = [
      { text: 'Rent ID', value: 'rentId' },
      { text: 'Rent Amount', value: 'rentAmount' },
      { text: 'Due Date', value: 'dueDate' }
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

      axios
        .get('http://ec2-54-206-19-34.ap-southeast-2.compute.amazonaws.com/api/Rent/GetAll')
        .then((response) => {
          rentList.value = response.data.value;
        })
        .catch((error) => {
          console.error('Error fetching Rent data:', error);
        });
    });

    return {
      ChoresList,
      expenseList,
      rentList,
      choreHeaders,
      expenseHeaders,
      rentHeaders
    };
  },
};
</script>

<style scoped>
.fill-height {
  height: 100vh;
  background-color: #E1F0DA;
}

.custom-card {
  background-color: #D4E7C5;
}

.custom-toolbar {
  background-color: #99BC85 !important;
}

.custom-button {
  background-color: #BFD8AF !important;
}

.my-4 {
  margin-top: 1rem;
  margin-bottom: 1rem;
}
</style>