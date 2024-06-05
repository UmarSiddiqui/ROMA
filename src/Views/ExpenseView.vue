<template>
    <v-container>
        <Vue3Lottie animation-link="https://lottie.host/50c1ea38-cecb-468e-8819-493632ab839b/ScUpNtZAGJ.json" height="30%" width="30%" />
      <v-row>
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
    name: "ExpenseView",
    setup() {
      const expenseList = ref([]);
  
      const expenseHeaders = [
        { text: 'Expense ID', value: 'ExpenseId' },
        { text: 'Name', value: 'ExpenseName' },
        { text: 'Description', value: 'ExpenseDescription' },
        { text: 'Amount', value: 'ExpenseAmount' }
      ];
  
      onMounted(() => {
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
        expenseList,
        expenseHeaders
      };
    },
  };
  </script>
  
  <style scoped>
  </style>
