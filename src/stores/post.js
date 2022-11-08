import { defineStore } from 'pinia';
import { ref, computed } from 'vue';

export const usePostStore = defineStore('post', () => {
  const posts = ref([]);
  const post = ref(null);
  const loading = ref(false);
  const error = ref(null);

  const getPostsPerAuthor = computed(() => {
    return (authorId) => posts.value.filter((post) => post.userId === authorId)
  })

  async function fetchPosts() {
    posts.value = []
    loading.value = true
    try {
      posts.value = await fetch('https://jsonplaceholder.typicode.com/posts')
        .then((response) => response.json())
    } catch (err) {
      error.value = err
    } finally {
      loading.value = false
    }
  }

  async function fetchPost(id) {
    post.value = null
    loading.value = true
    try {
      post.value = await fetch(`https://jsonplaceholder.typicode.com/posts/${id}`)
        .then((response) => response.json())
    } catch (err) {
      error.value = err
    } finally {
      loading.value = false
    }
  }

  return { posts, post, loading, error, getPostsPerAuthor, fetchPosts, fetchPost };
});