import { defineStore } from 'pinia';
import { ref, computed } from 'vue';
import { usePostStore } from './post'

export const useAuthorStore = defineStore('author', () => {
    const authors = ref([]);

    const getPostAuthor = computed(() => {
        const postStore = usePostStore()
        return authors.value.filter((author) => author.postId === postStore.post.userId)
    })

    async function fetchAuthors() {
        authors.value = await fetch('https://jsonplaceholder.typicode.com/users')
            .then((response) => response.json())
    }


    return { authors, getPostAuthor, fetchAuthors };
});
