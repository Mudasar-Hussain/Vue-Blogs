<template>
    <v-container>
      <v-row class="d-block">
        <v-form @submit.prevent="submitHandle">
          <div class="col-md-12 text-center mt-3">
              <h2>Add Post</h2>
          </div>
          <div class="col-md-12">
              <v-text-field label="Post title" :rules="titleRules" hide-details="auto" v-model="title"></v-text-field>
          </div>
          <div class="col-md-12">
              <v-text-field label="Post Body" :rules="bodyRules" hide-details="auto" v-model="body"></v-text-field>
          </div>
          <div class="col-md-12 mt-2 text-right">
              <v-btn depressed color="error" large @click="emptyForm()"> 
                  Cancel 
                  <v-icon right dark>
                      mdi-cancel
                  </v-icon>
              </v-btn>

              <v-btn type="submit" color="blue-grey" class="ma-2 white--text" large>
                  Upload
                  <v-icon right dark>
                      mdi-cloud-upload
                  </v-icon>
              </v-btn>
          </div>
        </v-form>
      </v-row>
    </v-container>
</template>

<script>
    export default {
      data: () => ({
        titleRules: [
          value => !!value || 'Required.',
          value => (value || '').length > 20 || 'Max 20 characters',
        ],
        bodyRules: [
          value => !!value || 'Required.',
          value => (value || '').length > 100 || 'Max 100 characters',
        ],
        
        title:'',
        body:'',
        userId:12563,
        postID: null
      }),

      methods:{
        async submitHandle(){
            var postOBJ = {
                title  : this.title,
                body   : this.body,
                userId : this.userId,
                postID : this.postID,
            }
            if(this.postID){
                await this.$store.dispatch('updatePost',postOBJ).then( () => {
                  this.$toastr.s('Post updated Successfully!','Success')
                  this.$router.push({ name : 'Home'})
              });
            } else {
                await this.$store.dispatch('uploadPost',postOBJ).then( () => {
                  this.$toastr.s('Post uploaded Successfully!','Success')
                  this.$router.push({ name : 'Home'})
              });
            }

        },

        emptyForm(){
          this.title = this.body = ''
        }
      },
      mounted() {
        if(this.$route.params.id){
            let post = this.$store.getters.getSinglePost(this.$route.params.id)
            this.title  = post.title
            this.body   = post.body
            this.userId = post.userId
            this.postID = post.id
        }
      },
      
    }
</script>