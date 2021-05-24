<template>
  <div class="container">
    <div class="posts-container">
      <div class="create-post">
        <label for="create-post">Deixe seu comentário aqui</label>
        <input type="text" class="id create-post" v-model="text">
        <button @click="createPost">Postar</button>
      </div>
      <div class="post" 
        v-bind:item="post" 
        v-bind:index="index" 
        v-bind:key="post._id" 
        @dblclick="deletePost(post._id)"
        v-for="(post,index) in posts">
        
        <div class="created-at">{{`${post.createdAt.getDate()}/${post.createdAt.getMonth()}/${post.createdAt.getFullYear()}`}}</div>
        <p class="text">{{post.text}}</p>
     </div>
   </div>
 </div>
</template>

<script>
import axios from 'axios';

const url = 'http://localhost:5000/api/posts';

export default {
  name: 'PostComponent',
  data: () => {
    return {
      posts: [],
      error: '',
      text: ''
    }
  },
  created(){
    this.getPosts();
  },
  methods: {
    getPosts(){
      axios.get(url)
      .then(response => {
        this.posts = response.data.map(post => ({
          ...post, 
          createdAt: new Date(post.createdAt)
        }));
      })
      .catch(err => (this.error = err.mesage));
    },
    createPost(){
      axios.post(url, {text: this.text});
      this.getPosts();
    },
    deletePost(id){
      axios.delete(url+id);
      this.getPosts();
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
div.container{
  max-width: 800px;
  margin: 0 auto;
}

p.error{
  border: 1px solid #ff5b5f;
  background-color: #ffc5c1;
  padding: 10px;
  margin-bottom: 15px;   
}

div.post{
  position: relative;
  border: 1px solid #5bd658;
  background-color: #bcffb8;
  padding: 10px 10px 30px 10px;
  margin-bottom: 15px;
}

div.created-at{
  position: absolute;
  top: 0;
  left: 0;
  padding: 5px 15px 5px 15px;
  background-color: darkgreen;
  color: white;
  font-size: 13px;
}

p.text {
  font-size: 22px;
  font-weight: 700;
  margin-bottom: 0;
}
</style>
