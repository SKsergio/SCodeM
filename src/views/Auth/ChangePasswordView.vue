<template>
    <div class="login-container">

        <div class="overlay"></div>

        <div class="login-card">

            <div class="login-header">

                <img
                    src="@/assets/images/tribe.png"
                    alt="logo"
                    class="logo"
                />

                <h1>Cambiar contraseña</h1>

                <p>
                    Debes actualizar tu contraseña para continuar
                </p>

            </div>

            <div class="input-group">

                <label>Nueva contraseña</label>

                <input
                    v-model="password"
                    type="password"
                    placeholder="********"
                />

            </div>

            <button
                class="login-btn"
                @click="changePassword"
            >
                Guardar contraseña
            </button>

        </div>

    </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { httPost } from '@/services/api'

const router = useRouter()

const password = ref('')

const changePassword = async () => {

    try {

        await fetch(
            'http://127.0.0.1:8080/api/auth/change-password',
            {
                method:'POST',

                headers:{
                    'Content-Type':'application/json',
                    Authorization:`Bearer ${localStorage.getItem('auth_token')}`
                },

                body: JSON.stringify({
                    newPassword: password.value
                })
            }
        )

        localStorage.setItem(
            'must_change_password',
            'false'
        )

        router.push('/dashboard/home')

    } catch (error) {

        alert('No se pudo actualizar la contraseña')

        console.error(error)
    }
}
</script>

<style scoped>

.login-container{
    position: fixed;

    top: 0;
    left: 0;

    width: 100vw;
    height: 100vh;

    display: flex;
    justify-content: center;
    align-items: center;

    background-image: url('https://images.unsplash.com/photo-1524995997946-a1c2e315a42f');

    background-size: cover;
    background-position: center;

    overflow: hidden;
}

.overlay{
    position: absolute;
    inset: 0;

    background: rgba(0,0,0,0.55);

    backdrop-filter: blur(4px);
}

.login-card{
    position: relative;
    z-index: 2;

    width: 400px;
    max-width: 90%;

    padding: 40px;

    border-radius: 24px;

    background: rgba(255,255,255,0.12);

    backdrop-filter: blur(15px);

    border: 1px solid rgba(255,255,255,0.2);

    box-shadow:
        0 8px 32px rgba(0,0,0,0.3);

    color: white;

    display: flex;
    flex-direction: column;
    justify-content: center;
}

.login-header{
    text-align: center;
    margin-bottom: 30px;
}

.logo{
    width: 160px;
    max-width: 100%;

    margin: 0 auto 20px auto;

    display: block;

    object-fit: contain;
}

.login-header h1{
    font-size: 32px;
    font-weight: bold;
    margin-bottom: 8px;
}

.login-header p{
    opacity: 0.85;
    font-size: 14px;
}

.input-group{
    display: flex;
    flex-direction: column;
    margin-bottom: 20px;
}

.input-group label{
    margin-bottom: 8px;
    font-size: 14px;
    font-weight: 500;
}

.input-group input{
    padding: 14px;

    border-radius: 12px;

    border: none;
    outline: none;

    background: rgba(255,255,255,0.18);

    color: white;

    font-size: 14px;

    transition: 0.3s;
}

.input-group input::placeholder{
    color: rgba(255,255,255,0.7);
}

.input-group input:focus{
    background: rgba(255,255,255,0.25);
    transform: scale(1.01);
}

.login-btn{
    width: 100%;

    padding: 14px;

    border: none;
    border-radius: 14px;

    background: linear-gradient(
        135deg,
        #3b82f6,
        #2563eb
    );

    color: white;

    font-size: 15px;
    font-weight: bold;

    cursor: pointer;

    transition: 0.3s;
}

.login-btn:hover{
    transform: translateY(-2px);
    opacity: 0.9;
}

</style>