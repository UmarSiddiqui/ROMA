<template>
  <v-container>

    <Vue3Lottie animation-link="https://lottie.host/24903e1c-1a1f-43a6-bde6-411a44ca44a3/0IA5IxgCeA.json" height="30%" width="30%" />
   
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
    </v-row>
  </v-container>
</template>

<script>
import { onMounted, ref } from 'vue';
import axios from 'axios';


export default {

    components: {
        
    },
  name: "ChoresView",
  setup() {
    const ChoresList = ref([]);

    const choreHeaders = [
      { text: 'Chores ID', value: 'choreId' },
      { text: 'Chore Name', value: 'choreName' },
      { text: 'Created By', value: 'createdBy' }
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
    });

    return {
      ChoresList,
      choreHeaders
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

.lottie-container {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
}

</style>
