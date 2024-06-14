<script>
import router from "@/router/index.js";

export default {
  data() {
    return {
      "text" : '',
      "user": localStorage.getItem("user")
    };
  },
  methods: {
    async tweet(text, user_id) {
      fetch('http://127.0.0.1:3000/tweet/new', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(({
          "text": text,
          "id_user": localStorage.getItem("user_id")
        }))
      })  .then(res => res.json())
          .then(data => {
            if (data !== false) {
              localStorage.clear()
              localStorage.setItem("user",data)
              router.push({path: 'home'})
            }
            return false
          });
    },
  },
};
</script>

<template>
    <div class="col-start-1 col-span-3">
      <div class="flex sm:w-full bg-opacity-15 bg-blue-300 md:mb-0 p-5 shadow-xl rounded-xl mr-3 ml-3">
        <div class="relative w-full text-left">
          <p class="text-md text-gray-800 text-left leading-normal mb-5 font-lf-normal">
              <input v-model="text" type="text">
            <button @click="tweet(this.text)" class="bg-blue-400">Tweet</button>
          </p>
          <div class="inline-flex">

          </div>
          </div>
          <div class="grid content-between place-items-center">
          </div>
          <span class="flex item-center"></span>
        </div>
      </div>

</template>

<style scoped>

</style>