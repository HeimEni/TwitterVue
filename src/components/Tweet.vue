<script>
import {reactive} from "vue";

export default {
  setup() {
    const tweets = reactive({
      tweets: []
    });
  },
  data() {
    return {
      renderComponent: true,
      filter: false,
      text: "",
      keyUpdate: 0,
      hasClicked: false,
    };
  },
  computed: {
    buttonText() {
      return this.hasClicked ? 'Unclick to Decrement' : 'Click to Increment';
    }
  },
  methods: {
    getTweetById(id) {
      fetch('http://127.0.0.1:3000/tweet/byId?id=' + id, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      })
          .then(res => res.json())
          .then(data => {
            this.tweets = data;
          });
    },
    getAllTweet() {
      fetch('http://127.0.0.1:3000/tweet/all', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      })
          .then(res => res.json())
          .then(data => {
            this.tweets = data;
          });
    },
    likeTweet(tweet_id) {
      fetch('http://127.0.0.1:3000/interaction/like/new', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          tweet_id: tweet_id,
          user_id: "user_id_12345",
        }),
      }).then(() => {
        this.getAllTweet(); // Refresh tweets to get updated likes
      });
    },
    shareTweet(tweet_id) {
      fetch('http://127.0.0.1:3000/interaction/share', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          tweet_id: tweet_id,
          user_id: "user_id_12345",
        }),
      }).then(() => {
        this.getAllTweet(); // Refresh tweets to get updated shares
      });
    },
    reply(tweet_id, text) {
      fetch('http://127.0.0.1:3000/interaction/reply', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          tweet_id: tweet_id,
          user_id: "user_id_12345",
          text: text,
        }),
      }).then(() => {
        this.getAllTweet(); // Refresh tweets to get updated replies
        this.filter = false;
        this.text = "";
      });
    },
    toggleCount() {
      if (this.hasClicked) {
        t.likes.length - 1;
      } else {
        t.likes.length += 1;
      }
      this.hasClicked = !this.hasClicked;
    }
  },
  mounted() {
    this.getTweetById("tweet_id_12345");
  },
};
</script>

<template>
  <div class="col-start-1 col-span-3" v-for="t in tweets">
    <div class="flex sm:w-full bg-opacity-15 bg-blue-300 md:mb-0 p-5 shadow-xl rounded-xl mr-3 ml-3">
      <div class="relative w-full text-left">
        <p class="text-md text-gray-800 text-left leading-normal mb-5 font-lf-normal">
          {{ t.text }}
          <div class="absolute top-0 right-0">
            <p class="text-sm text-gray-600">{{ t.user.username }}</p>
            <p class="text-sm text-gray-400">{{ t.user.name }}</p>
            <img style="max-height: 30px" src="/favicon.ico" class="rounded-md mr-3 h-14 w-14">
          </div>
        </p>
        <div class="inline-flex">
          {{ t.likes.length }}
          <a @click.once="likeTweet(t._id), toggleCount()">
            <img style="height: 30px" src="/like.png">
          </a>
          {{ t.retweets.length }}
          <a @click.once="shareTweet(t._id)">
            <img style="height: 30px" src="/share.png">
          </a>
          {{ t.replies.length }}
          <a @click="filter = !filter">
            <img style="height: 30px" src="/reply.png">
          </a>
        </div>
        <div :key="keyUpdate" class="grid content-between place-items-center">
          <input v-model="text"
                 class="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-blue-500"
                 v-if="filter" type="text" placeholder="reply">
          <button v-if="filter"
                  class="bg-gray-200 appearance-none border-2 border-gray-200 rounded text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-blue-500"
                  @click="reply(t._id, text)">
            reply
          </button>
        </div>
        <div class="grid content-between place-items-center">
          <div v-for="reply in t.replies"
               class="bg-opacity-15 bg-blue-200 flex sm:w-full md:mb-0 p-5 shadow-lg rounded-xl mr-3 ml-3">
            {{ reply.text }}
          </div>
        </div>
        <span class="flex item-center"></span>
      </div>
    </div>
  </div>
</template>

<style scoped>

</style>