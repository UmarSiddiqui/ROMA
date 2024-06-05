<template>
  <v-container>
    <Vue3Lottie animation-link="https://lottie.host/50c1ea38-cecb-468e-8819-493632ab839b/ScUpNtZAGJ.json" height="30%" width="30%" />

    <v-row>
      <v-col>
        <v-card class="custom-card">
          <v-card-title class="custom-card-title">Expenses</v-card-title>
          <v-data-table
            :headers="expenseHeaders"
            :items="expenseList"
            :items-per-page="5"
            class="elevation-1 custom-data-table"
          ></v-data-table>
        </v-card>
      </v-col>
    </v-row>

    <v-row>
      <v-col>
        <v-card class="custom-card">
          <v-card-title class="custom-card-title">Expense Management Posts</v-card-title>
          <v-list>
            <v-list-item v-for="(post, index) in expenseManagementPosts" :key="index" class="custom-list-item">
              <v-list-item-content>
                <v-list-item-title>
                  <a :href="post.link" target="_blank" class="custom-link">{{ post.title }}</a>
                </v-list-item-title>
              </v-list-item-content>
            </v-list-item>
          </v-list>
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
    const expenseManagementPosts = ref([
      { title: 'How to Manage Your Expenses', link: 'https://www.example.com/manage-expenses' },
      { title: '10 Tips for Better Expense Management', link: 'https://www.example.com/expense-tips' },
      { title: 'Expense Management Strategies', link: 'https://www.example.com/expense-strategies' },
      { title: 'Budgeting and Expense Tracking', link: 'https://www.example.com/budgeting' },
      { title: 'Effective Expense Management', link: 'https://www.example.com/effective-management' }
    ]);

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
      expenseHeaders,
      expenseManagementPosts
    };
  },
};
</script>

<style scoped>
.custom-card {
  background-color: #E1F0DA; /* Lightest green */
}

.custom-card-title {
  color: #000; /* Darker text for contrast */
}

.custom-data-table {
  background-color: #D4E7C5; /* Light green */
  color: #000; /* Dark text for contrast */
}

.v-data-table-header {
  background-color: #BFD8AF; /* Medium green */
  color: #000; /* Dark text for contrast */
}

.v-data-table__wrapper {
  background-color: #99BC85; /* Darkest green */
  color: #fff; /* Light text for contrast */
}

.custom-list-item {
  background-color: #F5F5F5; /* Light grey */
  margin-bottom: 10px;
  border-radius: 8px;
  transition: background-color 0.3s;
}

.custom-list-item:hover {
  background-color: #E0E0E0; /* Slightly darker grey on hover */
}

.custom-link {
  color: #3B5998; /* Facebook blue */
  text-decoration: none;
  font-weight: bold;
}

.custom-link:hover {
  text-decoration: underline;
}
</style>
