<template>
    <div class="pt-16">
        <h1 class="text-3xl font-semibold mb-4">Enter your phone number</h1>
        <form v-if="!waitingOnVerification" action="#" @submit.prevent="handleLogin">
            <div class="overflow-hidden shadow sm:rounded-md max-w-sm mx-auto text-left">
                <div class="bg-white px-4 py-5 sm:p-6">
                    <div>
                        <input type="text" v-maska data-maska="###-###-####" v-model="formData.mobile" name="mobile" id="mobile" class="appearance-none mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md placeholder-gray-400 focus:outline-none focus:border-indigo-500 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"/>
                    </div>
                </div>

                <div class="bg-gray-50 px-4 py-3 text-right sm:px-6">
                    <button @submit.prevent="handleLogin" type="submit" class="inline-flex justify-center items-center px-4 py-2 border border-transparent text-base leading-6 font-medium rounded-md text-white bg-black hover:bg-gray-700 focus:outline-none focus:border-gray-700 focus:ring focus:ring-gray-300 focus:ring-opacity-50 transition ease-in-out duration-150">
                        Continue
                    </button>
                </div>
            </div>
        </form>

        <form v-else action="#" @submit.prevent="handleVerification">
            <div class="overflow-hidden shadow sm:rounded-md max-w-sm mx-auto text-left">
                <div class="bg-white px-4 py-5 sm:p-6">
                    <div>
                        <input type="text" v-maska data-maska="######" v-model="formData.login_code" name="login_code" id="login_code" class="appearance-none mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md placeholder-gray-400 focus:outline-none focus:border-indigo-500 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"/>
                    </div>
                </div>

                <div class="bg-gray-50 px-4 py-3 text-right sm:px-6">
                    <button @submit.prevent="handleVerification" type="submit" class="inline-flex justify-center items-center px-4 py-2 border border-transparent text-base leading-6 font-medium rounded-md text-white bg-black hover:bg-gray-700 focus:outline-none focus:border-gray-700 focus:ring focus:ring-gray-300 focus:ring-opacity-50 transition ease-in-out duration-150">
                        Verigy 
                    </button>
                </div>
            </div>
        </form>
    </div>
</template>

<script setup>
    import {vMaska} from 'Maska'
    import { ref, reactive, onMounted } from 'vue';
    import axios from 'axios'
    import { useRoute } from 'vue-router';

    const router = useRoute()

    const formData = reactive({
        mobile : null
    })

    const waitingOnVerification = ref(false)
    onMounted(() => {
        if(localStorage.getItem('token')){
            router.push({
                name : 'landing'
            })
        }
    })

    const formattedFormData = computer (() => {
        return {
            mobile : formData.mobile.replaceAll(' ', '').replace('-','').replace('-',''),
            login_code : formData.login_code
        }
    })
    const handleLogin = () => {
        axios.post('http://127.0.0.1:8000/api/login', formattedFormData)
            .then((response) => {
                console.log(response.data);
                waitingOnVerification.value = true
            })
            .catch((error) => {
                console.log(error);
                alert(error.response.data.message)
            })
    }

    const handleVerification = () => {
        axios.post('http://127.0.0.1:8000/api/login/verify', formattedFormData)
            .then((response) => {
                console.log(response.data); // auth token
                localStorage.setItem('token', response.data)
                router.push({
                    name : 'landing'
                })
            })
            .catch((error) => {
                console.log(error);
                alert(error.response.data.message)
            })
    }
</script>
