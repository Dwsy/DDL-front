<template>
    <div>
        <!-- <Header /> -->
        <slot />
    </div>
</template>
<script setup lang="ts">
import { use } from 'h3';
import { useUser } from '~~/stores/User';
// if(typeof window === 'undefined'){
//     console.log(1);
    
// }else{
//     console.log(2);

// }
let user = useUser()
if (typeof window !== 'undefined') {
    let localToken = window.localStorage.getItem("token")
    if (localToken !== null&&localToken !=='') {
        user.setToken(localToken)
        user.setUser(window.localStorage.getItem("user"))
        user.setIsLogn(true)
        // 后端接口判断
    }
    console.log("browser");
    
}else{
    console.log("NODE");
}

</script>