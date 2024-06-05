<template>
  <v-container>
    <Vue3Lottie animation-link="https://lottie.host/6af885a0-16d5-4ff8-a55d-82ddda9dbf6b/BYXtEzbmmr.json" height="30%" width="30%" />

    <v-row>
      <v-col>
        <v-card class="custom-card">
          <v-card-title class="custom-card-title">Chores</v-card-title>
          <v-data-table
            :headers="choreHeaders"
            :items="ChoresList"
            :items-per-page="5"
            class="elevation-1 custom-data-table"
          ></v-data-table>
        </v-card>
      </v-col>
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
          <v-card-title class="custom-card-title">Notice Board</v-card-title>
          <v-list>
            <v-list-item v-for="(notice, index) in notices" :key="index" class="custom-list-item">
              <v-row align="center" justify="space-between" class="w-100">
                <v-col>
                  <v-text-field
                    v-model="notices[index]"
                    @blur="updateNotice(index)"
                    hide-details
                    class="custom-text-field"
                  ></v-text-field>
                </v-col>
                <v-col cols="auto">
                  <v-btn icon @click="deleteNotice(index)" class="delete-btn">
                    <v-icon>mdi-delete</v-icon>
                  </v-btn>
                </v-col>
              </v-row>
            </v-list-item>
          </v-list>
          <v-btn @click="addNotice" class="add-notice-btn">Add Notice</v-btn>
        </v-card>
      </v-col>
    </v-row>

    <v-row>
      <v-col>
        <v-card class="custom-card">
          <v-card-title class="custom-card-title">Home Management Posts</v-card-title>
          <v-list>
            <v-list-item v-for="(post, index) in homeManagementPosts" :key="index" class="custom-list-item">
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
  name: "HomeView",
  setup() {
    const ChoresList = ref([]);
    const expenseList = ref([]);
    const homeManagementPosts = ref([
      { title: 'Home Maintenance Checklist', link: 'https://www.bhg.com/home-improvement/advice/maintenance-repair/home-maintenance-checklist/' },
      { title: 'Effective Home Cleaning Strategies', link: 'https://www.goodhousekeeping.com/home/cleaning/tips/a24885/make-at-home-cleaners/' },
      { title: 'Budgeting for Home Expenses', link: 'https://www.nerdwallet.com/article/finance/how-to-budget' },
      { title: 'Top Apps for Managing a Houseshare', link: 'https://www.buzzfeed.com/chelseypippin/houseshare-apps' }
    ]);
    const notices = ref([
      'Rent is Due on Wednesday, Every fortnight',
      'Ashim\'s Birthday party this Saturday Night !',
      'Eid Dinner on 16th June'
    ]);

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

    const addNotice = () => {
      notices.value.push('New Notice');
    };

    const deleteNotice = (index) => {
      notices.value.splice(index, 1);
    };

    const updateNotice = (index) => {
      // Logic to update the notice, e.g., save to a server
      console.log(`Notice ${index} updated: ${notices.value[index]}`);
    };

    return {
      ChoresList,
      expenseList,
      choreHeaders,
      expenseHeaders,
      homeManagementPosts,
      notices,
      addNotice,
      deleteNotice,
      updateNotice
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

.delete-btn {
  color: #FF5252; /* Red color for delete button */
}

.add-notice-btn {
  margin-top: 10px;
  background-color: #4CAF50; /* Green color for add button */
  color: white;
}

.custom-text-field {
  background-color: #D4E7C5; /* Light green */
  color: #000; /* Dark text for contrast */
  border-radius: 4px;
}

.custom-text-field .v-input__control {
  background-color: #D4E7C5; /* Light green */
}

.custom-text-field .v-input__slot {
  color: #000; /* Dark text for contrast */
}
</style>