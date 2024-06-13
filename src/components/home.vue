<script>
import {onMounted, ref} from "vue";
export default {
  data: () => ({
    renderComponent: true,
    filter: false,
    tweet: ref([]),
    text: ""
  }),

  methods: {
    async forceRerender() {
      // Remove MyComponent from the DOM
      this.renderComponent = false;

      // Wait for the change to get flushed to the DOM
      await this.$nextTick();

      // Add the component back in
      this.renderComponent = true;
    },
    getAllTweet() {
      this.forceRerender()
      fetch('http://127.0.0.1:3000/tweet/all', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json'
        }
      }).then(res => res.json())
          .then(
              (data) => {
                this.tweet = data
              })
    },
    likeTweet(tweet_id) {
      this.forceRerender()
      fetch('http://127.0.0.1:3000/interaction/like/new', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          tweet_id: tweet_id,
          user_id: "user_id_12345"
        })
      })
    },
    shareTweet(tweet_id) {
      this.forceRerender()
      fetch('http://127.0.0.1:3000/interaction/share', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          tweet_id: tweet_id,
          user_id: "user_id_12345"
        })
      })
    },
    reply(tweet_id, text) {
      this.forceRerender()
      fetch('http://127.0.0.1:3000/interaction/reply', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          tweet_id: tweet_id,
          user_id: "user_id_12345",
          text: text
        })
      })
    },
  },
  mounted() {
    this.getAllTweet()
  }
}

</script>

<template>
  <router-link to="/tweet">New Tweet</router-link>
<!--<a style="text-decoration: none" href="/tweet">-->
<!--  <button class="group flex items-center disabled:opacity-50 disabled:hover:opacity-50 hover:opacity-95 justify-center ring-none rounded-lg shadow-lg font-semibold py-2 px-4 font-dm focus:outline-none focus-visible:outline-2 focus-visible:outline-offset-2 bg-blue-500 border-b-blue-700 disabled:border-0 disabled:bg-blue-500 disabled:text-white ring-white text-white border-b-4 hover:border-0 active:border-0 hover:text-gray-100 active:bg-blue-800 active:text-gray-300 focus-visible:outline-blue-500 text-sm sm:text-base dark:bg-gray-700 dark:border-gray-700 dark:border-b-gray-900" value="tweet">-->
<!--    tweet-->
<!--  </button>-->
<!--</a>-->
  <div class="grid grid-cols-2 gap-4">
    <div class="col-start-1 col-span-3 " v-for="t in tweet" :key="t._id">
      <div class=" flex sm:w-full  bg-opacity-15 bg-blue-300  md:mb-0 p-5 shadow-xl rounded-xl mr-3 ml-3">
        <div class=" relative w-full text-left">
          <p class="text-md text-gray-800 text-left leading-normal mb-5 font-lf-normal">
            {{ t.text }}
            <div class="absolute top-0 right-0">
              <p class="text-sm text-gray-600">{{ t.user.username }} </p>
              <p class="text-sm text-gray-400">{{ t.user.name }}</p>
              <img style="max-height: 30px" src="/favicon.ico" class="rounded-md mr-3 h-14 w-14">
            </div>
          </p>
          <div class="inline-flex">
            {{t.likes.length}}
            <a @click="likeTweet(t._id)">
              <img style="height: 30px" src="/like.png">
            </a>
            {{t.retweets.length}}
            <a @click="shareTweet(t._id)">
              <img style="height: 30px" src="/share.png">
            </a>
            {{t.replies.length}}
            <a @click='filter = !filter'>
              <img style="height: 30px" src="/reply.png">
            </a>

          </div>
          <div class="grid content-between place-items-center">
            <input :value="text"
                   @input="event => text = event.target.value" class="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-blue-500" v-if='filter' type="text" placeholder="reply">
            <button v-if='filter' class="bg-gray-200 appearance-none border-2 border-gray-200 rounded text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-blue-500" @click="reply(t._id, text)">
              reply
            </button>
          </div>
          <div class="grid content-between place-items-center">
            <div v-for="t in t.replies" class="bg-opacity-15 bg-blue-200 flex sm:w-full   md:mb-0 p-5 shadow-lg rounded-xl mr-3 ml-3">
              {{ t.text }}
            </div>
          </div>
<!--          USER PROFIL PHOTO-->
          <span class="flex item-center">
        </span>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>

</style>