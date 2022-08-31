<template>

    <div>
        <v-form v-model="valid">
            <v-container>
                <v-row>
                    <v-col cols="12" md="4">
                        <v-text-field v-model="username" label="username" required></v-text-field>
                    </v-col>
                </v-row>
                <v-row>
                    <v-col cols="12" md="4">
                        <v-text-field v-model="password" label="password" required></v-text-field>
                    </v-col>
                </v-row>
            </v-container>
        </v-form>
        <v-btn color="secondary" @click="login">login</v-btn>
        <div>
            1
            {{  payload  }}
        </div>
    </div>
</template>

<script setup lang="ts">
import { FetchResult } from "#app";
import { useUser } from "~~/stores/user";
// import tool from "~~/utils/tool"
import CryptoJS from 'crypto-js';
definePageMeta({
    layout: false
})
let valid = ref(null)
let username = ref("dwsy")
let password = ref(123)
let payload = ref(null)
let t = ref<string>()
const User = useUser();
let Router=  useRouter()
const login = async () => {
    User.setIsLogn(true)
    let up = {
        username: username.value,
        password: password.value
    }
    const r = await usePost("au/authority/token", up)
    const publicKey = await useGet("au/authority/rsa-pks")
    // const r = await useGet("/au/")
    // const r = await fetch(url, {
    //     method: 'POST',
    //     headers: {
    //         'Content-Type': 'application/json'
    //         // 'Content-Type': 'application/x-www-form-urlencoded',
    //     }
    // });
    t.value = r.data["token"]
    console.log(t.value);
    
    let token=t.value
    console.log(token.split(".")[1]);

    payload.value = JSON.parse(CryptoJS.enc.Base64.parse(token.split(".")[1]).toString(CryptoJS.enc.Utf8))
    console.log(payload);

    console.log(publicKey.data['data'] || null);

    User.setToken(token)
    localStorage.setItem("token", token);
    localStorage.setItem("user", token.split(".")[1]);
    User.setUser(token.split(".")[1])
    console.log("login");
    Router.push('/')
}
const reset = () => {
    User.$reset()
    localStorage.clear()
    console.log("logout");
}
onMounted(() => {
})
</script>

