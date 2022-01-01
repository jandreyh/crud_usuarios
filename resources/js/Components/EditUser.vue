<template>
    <div>
        <h2>Edit User</h2>
        <form @submit.prevent="updateUser">
            <div>
                <label for="name">Name:</label>
                <input type="text" v-model="user.name" id="name" />
            </div>
            <div>
                <label for="email">Email:</label>
                <input type="email" v-model="user.email" id="email" />
            </div>
            <button type="submit">Save</button>
        </form>
    </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { useRoute } from 'vue-router';
import axios from 'axios';

const route = useRoute();
const user = ref({});

onMounted(async () => {
    try {
        const response = await axios.get(`/api/users/${route.params.user}`);
        user.value = response.data;
    } catch (error) {
        console.error('Error fetching user:', error);
    }
});

const updateUser = async () => {
    try {
        await axios.put(`/api/users/${user.value.id}`, user.value);
        // Redirige a la lista de usuarios después de guardar
    } catch (error) {
        console.error('Error updating user:', error);
    }
};
</script>
