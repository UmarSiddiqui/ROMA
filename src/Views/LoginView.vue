<template>
  <v-container class="fill-height" fluid>
    <v-row align="center" justify="center">
      <v-col cols="12" sm="8" md="4">
        <v-card class="elevation-12 custom-card">
          <v-toolbar color="primary" dark flat class="custom-toolbar">
            <v-toolbar-title>Login</v-toolbar-title>
          </v-toolbar>
          <v-card-text>
            <v-form>
              <v-text-field
                label="Email"
                name="email"
                prepend-icon="mdi-account"
                type="text"
                required
                color="primary"
              ></v-text-field>
              <v-text-field
                label="Password"
                name="password"
                prepend-icon="mdi-lock"
                type="password"
                required
                color="primary"
              ></v-text-field>
              <v-btn color="primary" block class="custom-button">Sign In</v-btn>
            </v-form>
            <div class="sign-up-section">
              <p>Don't have an account? <a href="/signup">Create a new Account</a></p>
            </div>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {};
</script>

<style scoped>
.fill-height {
  height: 100vh;
  background-color: #fffafa; /* Lightest color for the background */
}

.custom-card {
  background-color: #D4E7C5; /* Slightly darker for the card */
}

.custom-toolbar {
  background-color: #99BC85 !important; /* Darkest color for the toolbar */
}

.custom-button {
  background-color: #BFD8AF !important; /* Medium color for the button */
}

.v-text-field input {
  background-color: #ffffff !important; /* White for the input fields */
}

.sign-up-section {
  margin-top: 20px;
  text-align: center;
}

.sign-up-section a {
  color: #99BC85;
  text-decoration: none;
}
</style>