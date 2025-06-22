<template>
  <div class="login-container">
    <div class="logo">
      <h2>LOGO</h2>
    </div>
    <div class="title">
      <h2>UrbanSystem</h2>
    </div>
    <form @submit.prevent="handleLogin">
      <input type="text" v-model="username" placeholder="Username" />
      <input type="password" v-model="password" placeholder="Password" />
      <button type="submit">Login</button>
    </form>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const username = ref('')
const password = ref('')

function handleLogin() {
  alert(`用户名：${username.value}\n密码：${password.value}`)
}
</script>

<style scoped lang="scss">
.login-container {
  max-width: 300px;
  position: absolute;
  top: 350px;
  right: 150px;
  padding: 20px;
  border: 1px solid #00B4D8;
  border-radius: 8px;

  &_logo{
    text-align: center;
  }

  &_title{
    text-align: center;
  }

}

input {
  display: block;
  width: 100%;
  margin: 10px 0;
  padding: 8px;
  border: 1px solid #00B4D8;
  border-radius: 20px;
}

button {
  width: 100%;
  padding: 8px;
  background-color: #00B4D8;
  color: white;
  border: none;
  cursor: pointer;
}
</style>
