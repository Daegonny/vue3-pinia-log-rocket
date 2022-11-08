import { defineStore } from 'pinia';
import { ref, computed } from 'vue';
import { usePostStore } from './post'

export const useCommentStore = defineStore('comment', () => {
    const comments = ref([]);

    const getPostComments = computed(() => {
        const postStore = usePostStore()
        return comments.value.filter((comment) => comment.postId === postStore.post.id)
    })

    async function fetchComments() {
        comments.value = await fetch('https://jsonplaceholder.typicode.com/comments')
            .then((response) => response.json())
    }

    return { comments, getPostComments, fetchComments };
});
