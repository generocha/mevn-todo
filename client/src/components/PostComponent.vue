<template>
  <div class="container">
    <h1>Latest ToDo</h1>
    <div class="create-post">
      <label for="create-post"> Add a ToDo </label>
      <input type="text" id="create-post" v-model="text" placeholder="Create a todo">
      <button v-on:click="createPost">Add</button>
    </div>
    <hr>
    <p class="error" v-if="error">{{ error }}</p>
    <div class="posts-container">
      <div class="post"
        v-for="(post, index) in posts"
        v-bind:item="post"
        v-bind:index="index"
        v-bind:key="post._id"
        v-on:dblclick="deletePost(post._id)"
      >
      {{ `${post.createdAt.getMonth() + 1}/${post.createdAt.getDate()}/${post.createdAt.getFullYear()}` }}
      <p class="text">{{ post.text }}</p>
      </div>
    </div>
  </div>
</template>

<script>
import PostSerivce from '../PostService'
export default {
  name: 'PostComponent',
  data() {
    return {
      posts: [],
      error: '',
      text: ''
    }
  },
  async created() {
    try {
      this.posts = await PostSerivce.getPosts();
    }catch(err){
      this.error = err.message;
    }
  },
  methods: {
    async createPost() {
      await PostSerivce.insertPost(this.text);
      this.posts = await PostSerivce.getPosts();
    },
    async deletePost(id) {
      await PostSerivce.deletePost(id);
      this.posts = await PostSerivce.getPosts();
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
div.container { max-width: 800px; margin: 0 auto; }

p.error { border: 1px solid #ff5b5f; background-color: #ffc5c1; padding: 10px; margin-bottom: 15px; }

div.post { position: relative; border: 1px solid #5bd658; background-color: 3bcffb8; padding: 10px 10px 30px 10px; margin-bottom: 15px; }

div.created-at { position: absolute; top: 0; left: 0; padding: 5px 15px 5px 15px; background-color: darkgreen; }

p.text { font-size: 22px; font-weight: 700; margin-bottom: 0; }

input { padding:1em 2em; font-size: .8em; margin: 1em }

button { padding: 1em 2em; }

</style>
