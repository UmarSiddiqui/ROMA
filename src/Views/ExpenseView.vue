<template>
  <v-container>
    <Vue3Lottie
      animation-link="https://lottie.host/50c1ea38-cecb-468e-8819-493632ab839b/ScUpNtZAGJ.json"
      height="30%"
      width="30%"
    />

    <v-row>
      <v-col>
        <v-card class="custom-card">
          <v-card-title class="custom-card-title">
            Expenses
            <v-btn
              color="primary"
              @click="showDialog = true"
              class="float-right"
              >Add Expense</v-btn
            >
          </v-card-title>
          <v-data-table
            :headers="expenseHeaders"
            :items="expenseList"
            :items-per-page="5"
            class="elevation-1 custom-data-table"
          ></v-data-table>
        </v-card>
      </v-col>
    </v-row>

    <v-dialog v-model="showDialog" persistent max-width="600px">
      <v-card>
        <v-card-title>
          <span class="text-h5">{{
            expense.expenseId === 0 ? "Create Expense" : "Edit Expense"
          }}</span>
        </v-card-title>
        <v-card-text>
          <v-container>
            <v-row>
              <v-col cols="12">
                <v-text-field
                  v-model="expense.expenseName"
                  label="Expense Name"
                  required
                ></v-text-field>
              </v-col>
              <v-col cols="12">
                <v-text-field
                  v-model="expense.expenseDescription"
                  label="Description"
                  required
                ></v-text-field>
              </v-col>
              <v-col cols="12">
                <v-text-field
                  v-model="expense.amount"
                  label="Amount"
                  required
                ></v-text-field>
              </v-col>
            </v-row>
          </v-container>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="blue darken-1" text @click="showDialog = false"
            >Close</v-btn
          >
          <v-btn color="blue darken-1" text @click="saveExpense">Save</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

    <v-row>
      <v-col>
        <v-card class="custom-card">
          <v-card-title class="custom-card-title"
            >Expense Management Posts</v-card-title
          >
          <v-list>
            <v-list-item
              v-for="(post, index) in expenseManagementPosts"
              :key="index"
              class="custom-list-item"
            >
              <v-list-item-content>
                <v-list-item-title>
                  <a :href="post.link" target="_blank" class="custom-link">{{
                    post.title
                  }}</a>
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
import { onMounted, ref } from "vue";
import axios from "axios";

export default {
  name: "ExpenseView",
  setup() {
    const expenseList = ref([]);
    const expenseHeaders = [
      { text: "Expense ID", value: "expenseId" },
      { text: "Name", value: "expenseName" },
      { text: "Description", value: "expenseDescription" },
      { text: "Amount", value: "expenseAmount" },
    ];
    const expense = ref({
      expenseId: 0,
      expenseName: "",
      expenseDescription: "",
      amount: 0,
    });
    const showDialog = ref(false);

    const loadExpenses = async () => {
      try {
        const response = await axios.get(
          "http://ec2-54-206-19-34.ap-southeast-2.compute.amazonaws.com/api/Expense/GetAll"
        );
        expenseList.value = response.data.value;
      } catch (error) {
        console.error("Error fetching Expenses data:", error);
      }
    };

    const saveExpense = async () => {
      console.log("Saving expense:", expense.value); // Debugging output
      try {
        const payload = {
          ...expense.value,
          amount: parseFloat(expense.value.amount), // Ensure amount is sent as a float
        };
        console.log("Payload sent to server:", payload); // Debugging output
        const response = await axios.post(
          "http://ec2-54-206-19-34.ap-southeast-2.compute.amazonaws.com/api/Expense/CreateEdit",
          payload
        );
        console.log("Server response:", response.data); // Log server response
        showDialog.value = false;
        await loadExpenses();
        expense.value = {
          expenseId: 0,
          expenseName: "",
          expenseDescription: "",
          amount: 0,
        };
      } catch (error) {
        console.error("Error saving the expense:", error);
      }
    };

    onMounted(() => {
      loadExpenses();
    });

    return {
      expenseList,
      expenseHeaders,
      expense,
      showDialog,
      loadExpenses,
      saveExpense,
    };
  },
};
</script>

<style scoped>
.custom-card {
  background-color: #e1f0da; /* Lightest green */
}

.custom-card-title {
  color: #000; /* Darker text for contrast */
}

.custom-data-table {
  background-color: #d4e7c5; /* Light green */
  color: #000; /* Dark text for contrast */
}

.v-data-table-header {
  background-color: #bfd8af; /* Medium green */
  color: #000; /* Dark text for contrast */
}

.v-data-table__wrapper {
  background-color: #99bc85; /* Darkest green */
  color: #fff; /* Light text for contrast */
}

.custom-list-item {
  background-color: #f5f5f5; /* Light grey */
  margin-bottom: 10px;
  border-radius: 8px;
  transition: background-color 0.3s;
}

.custom-list-item:hover {
  background-color: #e0e0e0; /* Slightly darker grey on hover */
}

.custom-link {
  color: #000000; /* Facebook blue */
  text-decoration: none;
  font-weight: bold;
}

.custom-link:hover {
  text-decoration: underline;
}
</style>
