<template>
   
    <v-container class="fill-height" fluid>


        <v-row align="center" justify="center">
            <v-col cols="12" sm="8" md="4">
                <v-card class="elevation-12 custom-card">
                    <v-toolbar color="primary" dark flat class="custom-toolbar">
                        <v-toolbar-title>Sign Up</v-toolbar-title>
                    </v-toolbar>
                    <v-card-text>
                        <v-form @submit.prevent="submitForm">
                            <v-text-field
                                v-model="name"
                                label="Name"
                                required
                                color="primary"
                            ></v-text-field>
                            <v-text-field
                                v-model="email"
                                label="Email"
                                type="email"
                                required
                                color="primary"
                            ></v-text-field>
                            <v-text-field
                                v-model="password"
                                label="Password"
                                type="password"
                                required
                                color="primary"
                            ></v-text-field>
                            <v-btn type="submit" color="primary" block class="custom-button">Sign Up</v-btn>
                        </v-form>
                        <v-divider class="my-4"></v-divider>
                        <div class="text-center">
                            <span>Already have an account? <a href="/login">Log In</a></span>
                        </div>
                    </v-card-text>
                </v-card>
            </v-col>
        </v-row>
    </v-container>
</template>

<script>
export default {
    data() {
        return {
            name: '',
            email: '',
            password: ''
        };
    },
    methods: {
        submitForm() {
            console.log('Form submitted:', this.name, this.email, this.password);
        }
    }
};
</script>

<style scoped>
.fill-height {
  height: 100vh;
  background-color: #fffafa;
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