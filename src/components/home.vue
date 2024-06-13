<!--<script>-->
<!--import {onMounted, ref} from "vue";-->
<!--export default {-->
<!--  data: () => ({-->
<!--    renderComponent: true,-->
<!--    filter: false,-->
<!--    tweets: ref([]),-->
<!--    texts: "",-->
<!--    keyUpdate: 0-->
<!--  }),-->

<!--  methods: {-->
<!--    getAllTweet() {-->
<!--      fetch('http://127.0.0.1:3000/tweet/all', {-->
<!--        method: 'GET',-->
<!--        headers: {-->
<!--          'Content-Type': 'application/json'-->
<!--        }-->
<!--      }).then(res => res.json())-->
<!--          .then(-->
<!--              (data) => {-->
<!--                this.tweets = data-->
<!--              })-->
<!--    },-->
<!--    likeTweet(tweet_id) {-->
<!--      fetch('http://127.0.0.1:3000/interaction/like/new', {-->
<!--        method: 'POST',-->
<!--        headers: {-->
<!--          'Content-Type': 'application/json'-->
<!--        },-->
<!--        body: JSON.stringify({-->
<!--          tweet_id: tweet_id,-->
<!--          user_id: "user_id_12345"-->
<!--        })-->
<!--      })-->
<!--    },-->
<!--    shareTweet(tweet_id) {-->
<!--      fetch('http://127.0.0.1:3000/interaction/share', {-->
<!--        method: 'POST',-->
<!--        headers: {-->
<!--          'Content-Type': 'application/json'-->
<!--        },-->
<!--        body: JSON.stringify({-->
<!--          tweet_id: tweet_id,-->
<!--          user_id: "user_id_12345"-->
<!--        })-->
<!--      })-->
<!--    },-->
<!--    reply(tweet_id, text) {-->
<!--      fetch('http://127.0.0.1:3000/interaction/reply', {-->
<!--        method: 'POST',-->
<!--        headers: {-->
<!--          'Content-Type': 'application/json'-->
<!--        },-->
<!--        body: JSON.stringify({-->
<!--          tweet_id: tweet_id,-->
<!--          user_id: "user_id_12345",-->
<!--          text: text-->
<!--        })-->
<!--      })-->
<!--    },-->
<!--    updateComponent(){-->
<!--      this.keyUpdate += 1-->
<!--    }-->
<!--  },-->
<!--  mounted() {-->
<!--    this.getAllTweet()-->
<!--  }-->
<!--}-->

<!--</script>-->

<script>
export default {
  data() {
    return {
      renderComponent: true,
      filter: false,
      tweets: [],
      text: "",
      keyUpdate: 0,
    };
  },
  methods: {
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
    updateComponent() {
      this.keyUpdate += 1;
    },
  },
  mounted() {
    this.getAllTweet();
  },
};
</script>
<template>
  <router-link to="/tweet">New Tweet</router-link>
  <div class="grid grid-cols-2 gap-4">
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
            {{t.likes.length}}
            <a @click.once="likeTweet(t._id)">
              <img style="height: 30px" src="/like.png">
            </a>
            {{t.retweets.length}}
            <a @click.once="shareTweet(t._id)">
              <img style="height: 30px" src="/share.png">
            </a>
            {{t.replies.length}}
            <a @click="filter = !filter">
              <img style="height: 30px" src="/reply.png">
            </a>
          </div>
          <div :key="keyUpdate" class="grid content-between place-items-center">
            <input v-model="text" class="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-blue-500" v-if="filter" type="text" placeholder="reply">
            <button v-if="filter" class="bg-gray-200 appearance-none border-2 border-gray-200 rounded text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-blue-500" @click="reply(t._id, text)">
              reply
            </button>
          </div>
          <div class="grid content-between place-items-center">
            <div v-for="reply in t.replies" class="bg-opacity-15 bg-blue-200 flex sm:w-full md:mb-0 p-5 shadow-lg rounded-xl mr-3 ml-3">
              {{ reply.text }}
            </div>
          </div>
          <span class="flex item-center"></span>
        </div>
      </div>
    </div>
  </div>
</template>

<!--<template>-->
<!--  <router-link to="/tweet">New Tweet</router-link>-->
<!--  <div class="grid grid-cols-2 gap-4">-->
<!--    <div class="col-start-1 col-span-3 " v-for="t in tweet" :key="t._id">-->
<!--      <div class=" flex sm:w-full  bg-opacity-15 bg-blue-300  md:mb-0 p-5 shadow-xl rounded-xl mr-3 ml-3">-->
<!--        <div class=" relative w-full text-left">-->
<!--          <p class="text-md text-gray-800 text-left leading-normal mb-5 font-lf-normal">-->
<!--            {{ t.text }}-->
<!--            <div class="absolute top-0 right-0">-->
<!--              <p class="text-sm text-gray-600">{{ t.user.username }} </p>-->
<!--              <p class="text-sm text-gray-400">{{ t.user.name }}</p>-->
<!--              <img style="max-height: 30px" src="/favicon.ico" class="rounded-md mr-3 h-14 w-14">-->
<!--            </div>-->
<!--          </p>-->
<!--          <div class="inline-flex">-->
<!--            {{t.likes.length}}-->
<!--            <a @click.once="likeTweet(t._id), t.likes.length+=1">-->
<!--              <img style="height: 30px" src="/like.png">-->
<!--            </a>-->
<!--            {{t.retweets.length}}-->
<!--            <a @click.once="shareTweet(t._id), t.retweets.length+=1">-->
<!--              <img style="height: 30px" src="/share.png">-->
<!--            </a>-->
<!--            {{t.replies.length}}-->
<!--            <a @click='filter = !filter'>-->
<!--              <img style="height: 30px" src="/reply.png">-->
<!--            </a>-->

<!--          </div>-->
<!--          <div :key="keyUpdate" class="grid content-between place-items-center">-->
<!--            <input :value="text"-->
<!--                   @input="event => text = event.target.value" class="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-blue-500" v-if='filter' type="text" placeholder="reply">-->
<!--            <button v-if='filter' class="bg-gray-200 appearance-none border-2 border-gray-200 rounded text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-blue-500" @click="reply(t._id, text), updateComponent()">-->
<!--              reply-->
<!--            </button>-->
<!--          </div>-->
<!--          <div class="grid content-between place-items-center">-->
<!--            <div v-for="t in t.replies" class="bg-opacity-15 bg-blue-200 flex sm:w-full   md:mb-0 p-5 shadow-lg rounded-xl mr-3 ml-3">-->
<!--              {{ t.text }}-->
<!--            </div>-->
<!--          </div>-->
<!--&lt;!&ndash;          USER PROFIL PHOTO&ndash;&gt;-->
<!--          <span class="flex item-center">-->
<!--        </span>-->
<!--        </div>-->
<!--      </div>-->
<!--    </div>-->
<!--  </div>-->
<!--</template>-->

<style scoped>

</style>