<template>
  <v-container>
    <v-row>
      <v-col>
        <v-card class="custom-card">
          <v-card-title class="custom-card-title">
            Chores
            <v-btn
              color="primary"
              @click="showDialog = true"
              class="float-right"
              >Add Chore</v-btn
            >
          </v-card-title>

          <v-data-table
            :headers="choreHeaders"
            :items="ChoresList"
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
            chore.choreId === 0 ? "Create Chore" : "Edit Chore"
          }}</span>
        </v-card-title>
        <v-card-text>
          <v-container>
            <v-row>
              <v-col cols="12">
                <v-text-field
                  v-model="chore.choreName"
                  label="Chore Name"
                  required
                ></v-text-field>
              </v-col>
              <v-col cols="12">
                <v-text-field
                  v-model="chore.createdBy"
                  label="Created By"
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
          <v-btn color="blue darken-1" text @click="saveChore">Save</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

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
import axios from "axios";

export default {
  data() {
    return {
      ChoresList: [],
      choreHeaders: [
        { text: "Chores ID", value: "choreId" },
        { text: "Chore Name", value: "choreName" },
        { text: "Created By", value: "createdBy" },
      ],
      chore: {
        choreId: 0,
        choreName: "",
        createdBy: "",
      },
      showDialog: false,
      cleaningHelpPosts: [
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
      ],
    };
  },
  methods: {
    loadChores() {
      axios
        .get(
          "http://ec2-54-206-19-34.ap-southeast-2.compute.amazonaws.com/api/Chores/GetAll"
        )
        .then((response) => {
          if (response.data && Array.isArray(response.data.value)) {
            this.ChoresList = response.data.value;
          } else {
            console.error("Expected an array but got:", response.data);
            this.ChoresList = []; // Set to empty array if response is not an array
          }
        })
        .catch((error) => {
          console.error("Error fetching Chores data:", error);
          this.ChoresList = []; // Set to empty array in case of error
        });
    },
    saveChore() {
      axios
        .post(
          "http://ec2-54-206-19-34.ap-southeast-2.compute.amazonaws.com/api/Chores/CreateEdit",
          this.chore
        )
        .then(() => {
          this.showDialog = false;
          this.loadChores();
          this.resetChore();
        })
        .catch((error) => {
          console.error("Error saving the chore:", error);
        });
    },
    resetChore() {
      this.chore = { choreId: 0, choreName: "", createdBy: "" };
    },
  },
  mounted() {
    this.loadChores();
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

.float-right {
  float: right;
}
</style>
