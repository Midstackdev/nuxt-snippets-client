<template>
    <div class="container mt-16">
        <div class="container mt-16">
            <div class="flex flex-col items-center">
                <h1 class="text-3xl text-gray-700 font-medium mb-10">
                    Create an account
                </h1>

                <form 
                    action="#" 
                    class="bg-white p-8 rounded w-full md:w-8/12 lg:w-7/12 mb-6"
                    @submit.prevent="submit"
                >
                    <div class="mb-6">
                        <label 
                            for="email"
                            class="block text-gray-600 font-medium mb-2" 
                        >
                            Email
                        </label>

                        <input 
                            type="text" 
                            name="email" 
                            id="email"
                            class="border-2 border-gray-400 rounded block w-full p-3"
                            :class="{
                                'border-red-400' : validation.email
                            }"
                            v-model="form.email" 
                        >

                         <div class="text-red-500 mb-4 text-sm mt-1" v-if="validation.email">
                            {{ validation.email[0] }}
                        </div>
                    </div>
                    <div class="flex flex-wrap lg:flex-no-wrap">
                        <div class="lg:mr-6 w-full lg:w-6/12 mb-6">
                            <div class="mb-6">
                                <label 
                                    for="name"
                                    class="block text-gray-600 font-medium mb-2" 
                                >
                                    Name
                                </label>

                                <input 
                                    type="text" 
                                    name="name" 
                                    id="name"
                                    class="border-2 border-gray-400 rounded block w-full p-3"
                                    :class="{
                                        'border-red-400' : validation.name
                                    }"
                                    v-model="form.name" 
                                >

                                <div class="text-red-500 mb-4 text-sm mt-1" v-if="validation.name">
                                    {{ validation.name[0] }}
                                </div>
                            </div>
                        </div>
                        <div class="w-full lg:w-6/12 mb-6">
                            <div class="mb-6">
                                <label 
                                    for="username"
                                    class="block text-gray-600 font-medium mb-2" 
                                >
                                    Username
                                </label>

                                <input 
                                    type="text" 
                                    name="username" 
                                    id="username"
                                    class="border-2 border-gray-400 rounded block w-full p-3"
                                    :class="{
                                        'border-red-400' : validation.username
                                    }"
                                    v-model="form.username" 
                                >

                                <div class="text-red-500 mb-4 text-sm mt-1" v-if="validation.username">
                                    {{ validation.username[0] }}
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="flex flex-wrap lg:flex-no-wrap">
                        <div class="lg:mr-6 w-full lg:w-6/12 mb-6">
                            <div class="mb-6">
                                <label 
                                    for="password"
                                    class="block text-gray-600 font-medium mb-2" 
                                >
                                    Password
                                </label>

                                <input 
                                    type="password" 
                                    name="password" 
                                    id="password"
                                    class="border-2 border-gray-400 rounded block w-full p-3"
                                    :class="{
                                        'border-red-400' : validation.password
                                    }"
                                    v-model="form.password" 
                                >

                                <div class="text-red-500 mb-4 text-sm mt-1" v-if="validation.password">
                                    {{ validation.password[0] }}
                                </div>
                            </div>
                        </div>
                        <div class="w-full lg:w-6/12 mb-6">
                           <div class="mb-6">
                               <label 
                                   for="password_confirmation"
                                   class="block text-gray-600 font-medium mb-2" 
                               >
                                   Confirm password
                               </label>

                               <input 
                                   type="password" 
                                   name="password_confirmation" 
                                   id="password_confirmation"
                                   class="border-2 border-gray-400 rounded block w-full p-3"
                                   :class="{
                                       'border-red-400' : validation.password_confirmation
                                   }"
                                   v-model="form.password_confirmation" 
                               >

                               <div class="text-red-500 mb-4 text-sm mt-1" v-if="validation.password_confirmation">
                                   {{ validation.password_confirmation[0] }}
                               </div>
                           </div> 
                        </div>
                    </div>
                    
                    <div>
                        <button type="submit" class="bg-blue-500 text-white p-4 rounded text-center font-medium block w-full">
                            Sign up
                        </button>
                    </div>
                </form>

                <div class="text-center text-gray-600">
                    Have an account?

                    <nuxt-link
                        :to="{ name: 'auth-signin'}"
                    >
                        Sign in here
                    </nuxt-link>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        data () {
            return {
                form: {
                    email: null,
                    name: null,
                    username: null,
                    password: null,
                    password_confirmation: null
                },

                validation: {}
            }
        },
        methods: {
            async submit () {
                try {
                    await this.$axios.$post(`auth/register`, this.form)
                    await this.$auth.loginWith('local', {
                        data: {
                            email: this.form.email,
                            password: this.form.password
                        }
                    })
                } catch(e) {
                    // statements
                    if (e.response.status === 422) {
                        this.validation = e.response.data.errors
                    }
                    console.log(e);
                }
            }
        }
    }
</script>