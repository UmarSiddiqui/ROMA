<template>
  <v-container>
    <Vue3Lottie
      animation-link="https://lottie.host/24903e1c-1a1f-43a6-bde6-411a44ca44a3/0IA5IxgCeA.json"
      height="30%"
      width="30%"
    />

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

    <v-row>
      <v-col>
        <v-card class="custom-card">
          <v-card-title class="custom-card-title"
            >Cleaning Help Posts</v-card-title
          >
          <v-list>
            <v-list-item
              v-for="(post, index) in cleaningHelpPosts"
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
  components: {},
  name: "ChoresView",
  setup() {
    const ChoresList = ref([]);
    const cleaningHelpPosts = ref([
      {
        title: "How to Clean Almost Anything",
        link: "https://unclutteredsimplicity.com/how-to-clean-almost-anything/",
      },
      {
        title: "Cleaning Tips from Good Housekeeping",
        link: "https://www.goodhousekeeping.com/home/cleaning/",
      },
      {
        title: "The Spruce Cleaning Tips",
        link: "https://www.thespruce.com/cleaning-4127992",
      },
      {
        title: "Martha Stewart Cleaning Tips",
        link: "https://www.marthastewart.com/1504451/cleaning-organizing",
      },
      {
        title: "Better Homes & Gardens Cleaning Tips",
        link: "https://www.bhg.com/homekeeping/house-cleaning/tips/",
      },
      {
        title: "Real Simple Cleaning Tips",
        link: "https://www.realsimple.com/home-organizing/cleaning",
      },
      {
        title: "Apartment Therapy Cleaning Tips",
        link: "https://www.apartmenttherapy.com/cleaning",
      },
    ]);

    const choreHeaders = [
      { text: "Chores ID", value: "choreId" },
      { text: "Chore Name", value: "choreName" },
      { text: "Created By", value: "createdBy" },
    ];

    onMounted(() => {
      axios
        .get(
          "http://ec2-54-206-19-34.ap-southeast-2.compute.amazonaws.com/api/Chores/GetAll"
        )
        .then((response) => {
          ChoresList.value = response.data.value;
        })
        .catch((error) => {
          console.error("Error fetching Chores data:", error);
        });
    });

    return {
      ChoresList,
      choreHeaders,
      cleaningHelpPosts,
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
