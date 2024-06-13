<template>
  <div>
    <h1>Register</h1>
    <form @submit.prevent="register">
      <input v-model="username" placeholder="Username" required/>
      <input v-model="password" type="password" placeholder="Password" required/>
      <button type="submit">Register</button>
    </form>
  </div>
</template>

<script>
import {mapActions} from 'vuex';
import router from "@/router/index.js";

export default {
  data() {
    return {
      username: '',
      password: '',
    };
  },
  methods: {
    async register() {
      try {
        fetch('http://127.0.0.1:3000/interaction/register', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(({
            "username": this.username,
            "password": this.password
          }))
        }).then(res => res.json())
            .then(data => {
              if (data !== false) {
                router.push({path: 'home'})
              }
              return false
            });
      } catch (error) {
        console.error(error);
      }
    },
  },
};
</script>
