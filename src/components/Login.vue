<template>
  <div>
    <h1>Login</h1>
    <form @submit.prevent="login">
      <input v-model="username" placeholder="name" required/>
      <input v-model="password" type="password" placeholder="Password" required/>
      <button type="submit">Login</button>
    </form>
  </div>
</template>

<script>
import router from "@/router/index.js";

export default {
  data() {
    return {
      username: '',
      password: '',
    };
  },
  methods: {
    async login(username, password) {
      fetch('http://127.0.0.1:3000/interaction/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(({
          "username": this.username,
          "password": this.password
        }))
      })  .then(res => res.json())
          .then(data => {
            if (data !== false) {
              localStorage.clear()
              console.log(data)
              localStorage.setItem("user_id",data._id)
              localStorage.setItem("username",data.username)
              router.push({path: 'Home'})
            }
            return false
          });
    },
  },
};
</script>
