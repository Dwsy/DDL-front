<template>
    <div>
        <h1>
            <v-btn @click="login">
                login
            </v-btn>

            <v-btn @click="reset">
                clear
            </v-btn>
            <v-list>
                {{ User.user }}
            </v-list>

            <v-btn to='/t/token'>
                goto token test
            </v-btn>
        </h1>
    </div>
</template>

<script setup lang="ts">
import { useUser } from "~~/stores/User";
definePageMeta({
  layout: false
})
const User = useUser();
const login = () => {
    User.setIsLogn(true)
    User.setToken("eyJhbGciOiJIUzI1NiJ9.NjA0NzhmNGFhNjk5MGQwYmQwMGUyNTJj.LHSChktNbIzMo8BtdGr7olGIDNbFE3e8A4V9ZhB6GSE")
    localStorage.setItem("token", "eyJhbGciOiJIUzI1NiJ9.NjA0NzhmNGFhNjk5MGQwYmQwMGUyNTJj.LHSChktNbIzMo8BtdGr7olGIDNbFE3e8A4V9ZhB6GSE");
    localStorage.setItem("user", "Dwsy");
    User.setUser("Dwsy")
    console.log("login");
}
const reset = () => {
    User.$reset()
    localStorage.clear()
    console.log("logout");
}
onMounted(()=>{
  console.log("onMounted11111111111111111111111111111")
})

</script>