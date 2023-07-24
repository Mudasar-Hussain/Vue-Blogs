<template>
    <v-container>
      <v-row>
          <div class="text-center col-md-12" v-if="post">
            <h1 class="my-3">{{ post.title.toUpperCase() }}</h1>
            <p class="text-justify"> {{ post.body }}</p>
          </div>
          <div class="text-center col-md-12" v-if="post">
            <h1 class="my-3">Comments ({{ comments.length }})</h1>
            <div class="card" v-for="comment in comments" :key="comment.id">
                <div class="card-body">
                    <div class="d-flex flex-start align-items-center">
                        <img class="rounded-circle shadow-1-strong me-3" src="@/assets/avatar.png" alt="avatar"/>
                        <div>
                        <h4 class="fw-bold text-primary mb-1">{{ comment.name }}</h4>
                        </div>
                    </div>
                        <p class="mt-3 mb-4 pb-2"> {{ comment.body }} </p>
                    </div>
                </div>
          </div>
      </v-row>
    </v-container>
  </template>
  
  <script>
    export default {
      name: 'PostDetail',
      mounted() {
        this.postID = this.$route.params.id
        this.getPostComments()
      },
  
      data: () => ({
        postID : null
      }),
      methods: {
        getPostComments(){
          this.$store.dispatch('getPostComments',{ id : this.postID })
        }
      },
      computed:{
        post(){
          return this.$store.getters.getSinglePost(this.postID)
        },
        comments(){
            return this.$store.state.comments
        }
      }
    }
  </script>
  