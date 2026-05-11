<template>
  <div class="login-container flex justify-center items-center h-screen bg-gray-100">
    <div class="card p-8 bg-white shadow-lg rounded-lg w-96">
      <h2 class="text-2xl font-bold mb-6 text-center">Iniciar Sesión</h2>
      
      <form @submit.prevent="handleLogin">
        <div class="mb-4">
          <label class="block mb-2 text-sm font-medium">Correo Electrónico</label>
          <input v-model="form.email" type="email" class="w-full border p-2 rounded" required />
        </div>
        
        <div class="mb-6">
          <label class="block mb-2 text-sm font-medium">Contraseña</label>
          <input v-model="form.password" type="password" class="w-full border p-2 rounded" required />
        </div>
        
        <button type="submit" class="w-full bg-blue-600 text-white p-2 rounded hover:bg-blue-700">
          Entrar
        </button>
      </form>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { useAuth } from '@/composables/useAuth'; // Ajusta la ruta

const router = useRouter();
const { login } = useAuth();

// Ahora el ref coincide con LoginRequest
const form = ref({
    email: '', 
    password: ''
});

const handleLogin = async () => {
    try {
        const success = await login(form.value);
        if (success) {
            // ¡Login exitoso! Lo mandamos a la ruta principal
            router.push('/'); 
        }
    } catch (error) {
        alert("Credenciales incorrectas o error de servidor");
    }
};
</script>