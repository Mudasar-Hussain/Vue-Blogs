import Vue from 'vue'
import Vuex from 'vuex'
import createPersistedState from 'vuex-persistedstate';

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    posts: [],
    comments: [],
  },
  plugins: [createPersistedState()],
  getters: {
    getSinglePost: (state) => (id) => {
        return state.posts.find(post => post.id == id)
    }
  },
  mutations: {
    getPosts(state , payload){
      state.posts = payload
    },

    getPostComments(state , payload){
      state.comments = payload
    },

    addNewPost(state , payload){
      state.posts.unshift(payload)
    },

    removePost(state , payload){
      state.posts.filter(post => post.id !== payload.id),
      state.posts.splice(post => post.id === payload.id, 1)
    }
    
  },
  actions: {
    async getPosts(context) {
      let url = "https://jsonplaceholder.typicode.com/posts";
      let headers = {
          "Content-Type": "application/json",
          "Accept": "application/json",
      };
      return Vue.axios.get(url, { headers: headers }).then((response) => {
          context.commit('getPosts', response.data);
      }).catch((error) => {
          context.commit('getPosts', error.response.data);
      });
    },

    async getPostComments(context , payload) {
      let url = "https://jsonplaceholder.typicode.com/posts/" + payload.id + '/comments';
      let headers = {
          "Content-Type": "application/json",
          "Accept": "application/json",
      };
      return Vue.axios.get(url, { headers: headers }).then((response) => {
          context.commit('getPostComments', response.data);
      }).catch((error) => {
          context.commit('getPostComments', error.response.data);
      });
    },

    async uploadPost(context , payload) {
      let url = "https://jsonplaceholder.typicode.com/posts";
      let headers = {
          "Content-Type": "application/json",
          "Accept": "application/json",
      };
      return Vue.axios.post(url,payload, { headers: headers }).then((response) => {
        console.log(response)
        context.commit('addNewPost', response);
      }).catch((error) => {
        console.log(error)
      });
    },

    async removePost(context , payload) {
      let url = "https://jsonplaceholder.typicode.com/posts/" + payload.id;
      let headers = {
          "Content-Type": "application/json",
          "Accept": "application/json",
      };
      return Vue.axios.delete(url, { headers: headers }).then((response) => {
        console.log(response)
          context.commit('removePost', { id : payload.id });
      }).catch((error) => {
        console.log(error)
      });
    },

    async updatePost(context , payload) {
      let url = "https://jsonplaceholder.typicode.com/posts/"+payload.postID;
      let headers = {
          "Content-Type": "application/json",
          "Accept": "application/json",
      };
      return Vue.axios.put(url,payload, { headers: headers }).then(() => {
      }).catch((error) => {
        console.log(error)
      });
    },
  },
  modules: {
  }
})
