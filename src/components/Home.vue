<template>
  <v-container>
    <v-row>
        <div class="text-center col-md-12">
          <h1 class="my-3">All Posts</h1>
        </div>
        <div class="col-md-3 mb-2" v-for="post in allPosts" :key="post.id">
          <v-card class="mx-auto" >
            <router-link :to="{ name: 'PostDetail' , params:{ id:post.id }}">
              <v-card-title>{{ post.title.toUpperCase() | limitCharachter(16) }}</v-card-title>
    
              <v-card-text>
                <div>{{ post.body|limitCharachter(60) }}</div>
              </v-card-text>
            </router-link>
            <v-card-actions class="justify-space-around pb-3">
              <v-btn color="red" dark @click="removePost(post.id)">
                Delete
              </v-btn>
              <v-btn color="primary" dark @click="editPost(post.id)">
                Edit
              </v-btn>
            </v-card-actions>
          </v-card>
        </div>
    </v-row>
  </v-container>
</template>

<script>
  export default {
    name: 'HelloWorld',
    mounted() {
      this.getPosts()
    },

    data: () => ({
    }),
    methods: {
      getPosts(){
        this.$store.dispatch('getPosts')
      },
      async removePost(postID){
        if(postID){
          await this.$store.dispatch('removePost',{ id : postID }).then( () => {
                this.$toastr.s('Post deleted Successfully!','Success')
          });
        }
      },
      editPost(postID){
        if(postID){
          this.$router.push({ name : 'PostForm', params: { id:postID }})
        }
      },

    },
    computed:{
      allPosts(){
        return this.$store.state.posts
      }
    }
  }
</script>
