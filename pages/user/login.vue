<template>
<v-container>
    <v-form v-model="valid">
    <v-container>
      <v-row>
        <v-col
          cols="12"
          md="4"
        >
          <v-text-field
            v-model="username"
            label="username"
            required
          ></v-text-field>
        </v-col>
      </v-row>
      <v-row>
        <v-col
          cols="12"
          md="4"
        >
          <v-text-field
            v-model="password"
            label="password"
            required
          ></v-text-field>
        </v-col>
      </v-row>
    </v-container>
  </v-form>
<v-btn color="secondary" @click="login">login</v-btn>
</v-container>
</template>

<script setup lang="ts">
import { useUser } from "~~/stores/User";
definePageMeta({
    layout: false
})
let valid = ref(null)
let username = ref(null)
let password = ref(null)
const User = useUser();
const login = async () => {
    

    


    User.setIsLogn(true)
    let UP={
        username:username,
        password:password
    }
    const {data} = await usePost("authority/token",UP)
    console.log(data.value);
    
    // User.setToken("eyJhbGciOiJIUzI1NiJ9.NjA0NzhmNGFhNjk5MGQwYmQwMGUyNTJj.LHSChktNbIzMo8BtdGr7olGIDNbFE3e8A4V9ZhB6GSE")
    // localStorage.setItem("token", "eyJhbGciOiJIUzI1NiJ9.NjA0NzhmNGFhNjk5MGQwYmQwMGUyNTJj.LHSChktNbIzMo8BtdGr7olGIDNbFE3e8A4V9ZhB6GSE");
    // localStorage.setItem("user", "Dwsy");
    // User.setUser("Dwsy")
    // console.log("login");
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

