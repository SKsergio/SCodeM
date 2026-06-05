<template>

  <div class="main_login">
        <div class="content__main__login">

            <secction class="sc1__login">
                <img src="@/assets/images/tribe.png" alt="logo" class="logo" />
                <section>
                    <p>Your Academic management system</p>
                </section>
            </secction>

            <secction class="sc2__login">

                <div class="wrapper_login">

                    <h1>Tarbiyat</h1>

                    <form class="form__login" @submit.prevent="handleLogin">

                        <div class="container_inputs">
                            <div class="input__box">
                                <input v-model="form.email" type="email" class="input_file" required autocomplete="new-password" />
                                <span>User</span>
                                <i></i>
                            </div>

                            <div class="input__box">
                                <input v-model="form.password" type="password" class="input_file" required autocomplete="new-password"/>
                                <span>Password</span>
                                <i></i>
                            </div>
                        </div>

                        <div class="butons">
                            <input type="submit" id="loginBtn" value="Login" class="logbtn">
                            <div class="forg">
                                <a id="forgotPassword" href="#">Forgotten password?</a>
                            </div>
                        </div>
                    </form>
                </div>

            </secction>
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

            const mustChangePassword =
                localStorage.getItem('must_change_password') === 'true'

            if (mustChangePassword) {

                router.push('/change-password')

            } else {

                router.push('/')

            }
        }
    } catch (error) {
        alert("Credenciales incorrectas o error de servidor");
    }
};
</script>
