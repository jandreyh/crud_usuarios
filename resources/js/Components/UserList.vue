<template>
    <div>
        <h2 class="text-2xl font-semibold mb-4">User List</h2>
        <table class="min-w-full bg-white">
            <thead class="bg-gray-800 text-white">
                <tr>
                    <th class="w-1/3 px-4 py-2">ID</th>
                    <th class="w-1/3 px-4 py-2">Name</th>
                    <th class="w-1/3 px-4 py-2">Email</th>
                    <th class="w-1/3 px-4 py-2">Actions</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="user in users" :key="user.id" class="text-gray-700">
                    <td class="border px-4 py-2">{{ user.id }}</td>
                    <td class="border px-4 py-2">{{ user.name }}</td>
                    <td class="border px-4 py-2">{{ user.email }}</td>
                    <td class="border px-4 py-2">
                        <button @click="editUser(user)"
                            class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
                            Update
                        </button>
                        <button @click="deleteUser(user.id)"
                            class="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded ml-2">
                            Delete
                        </button>
                    </td>
                </tr>
            </tbody>
        </table>

        <!-- Edit User Modal -->
        <div v-if="showEditModal">
            <div class="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-75">
                <div class="bg-white p-6 rounded shadow-lg">
                    <h2 class="text-xl font-semibold mb-4">Edit User</h2>
                    <form @submit.prevent="updateUser">
                        <div>
                            <label for="name">Name:</label>
                            <input type="text" v-model="editUserForm.name" id="name" />
                        </div>
                        <div>
                            <label for="email">Email:</label>
                            <input type="email" v-model="editUserForm.email" id="email" />
                        </div>
                        <button type="submit" class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-4">Save</button>
                        <button @click="cancelEdit" class="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded mt-4 ml-2">Cancel</button>
                    </form>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref } from 'vue';
import axios from 'axios';

const users = ref([]);
const editUserForm = ref({
    id: null,
    name: '',
    email: ''
});
const showEditModal = ref(false);

const fetchUsers = async () => {
    try {
        const response = await axios.get('/api/users');
        users.value = response.data;
    } catch (error) {
        console.error('Error fetching users:', error);
    }
};

const editUser = (user) => {
    editUserForm.value.id = user.id;
    editUserForm.value.name = user.name;
    editUserForm.value.email = user.email;
    showEditModal.value = true;
};

const updateUser = async () => {
    try {
        await axios.put(`/api/users/${editUserForm.value.id}`, {
            name: editUserForm.value.name,
            email: editUserForm.value.email
        });
        // Actualizar lista de usuarios después de guardar
        fetchUsers();
        showEditModal.value = false;
    } catch (error) {
        console.error('Error updating user:', error);
    }
};

const cancelEdit = () => {
    editUserForm.value.id = null;
    editUserForm.value.name = '';
    editUserForm.value.email = '';
    showEditModal.value = false;
};

const deleteUser = async (id) => {
    try {
        await axios.delete(`/api/users/${id}`);
        fetchUsers();
    } catch (error) {
        console.error('Error deleting user:', error);
    }
};

fetchUsers();
</script>

<style scoped>
/* Estilos para la tabla */
.table {
    width: 100%;
    border-collapse: collapse;
}

.th,
.td {
    border: 1px solid #ddd;
    padding: 8px;
}

.th {
    background-color: #f2f2f2;
}

/* Estilos para el modal */
.fixed {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    z-index: 9999;
    display: flex;
    justify-content: center;
    align-items: center;
}

.bg-opacity-75 {
    background-color: rgba(0, 0, 0, 0.75);
}
</style>
