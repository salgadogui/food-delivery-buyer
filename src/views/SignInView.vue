<template>
    <!DOCTYPE html>
    <html lang="en">
        <head>
            <meta charset="UTF-8">
            <meta http-equiv="X-UA-Compatible" content="IE=edge">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/normalize/8.0.1/normalize.min.css">
            <link rel="stylesheet" href="./login.css">
            <title>Document</title>
        </head>
        <body>
            <section class="login">
                <div class="login_container">
                    <div class="block_left-side">
                        <SignInForm/>
                    </div>
                </div>
            </section>            
        </body>
    </html>
</template>

<script setup lang="ts">
    import { useRouter } from 'vue-router';
    import { ref } from 'vue';
    import SignInForm from '@/components/SignInForm.vue'
</script>