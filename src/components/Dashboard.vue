<template>
  <div>
    <h1>Dashboard</h1>
    <p>Welcome, {{ user.email }}!</p>
    <button @click="logout">Logout</button>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';

export default {
  computed: {
    ...mapGetters(['user']),
  },
  methods: {
    ...mapActions(['logout']),
    logout() {
      this.logout();
      this.$router.push('/login');
    },
  },
};
</script>
