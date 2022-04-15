<template>
  <div class="dropdown text-end">
    <a class="d-block link-dark text-decoration-none dropdown-toggle" id="dropdownUser"
       data-bs-toggle="dropdown" aria-expanded="false">
      <img :src="get_userImage()" alt="mdo" width="36" height="36" class="rounded-circle">
    </a>
    <ul class="dropdown-menu text-small" aria-labelledby="dropdownUser">
      <li>
        <router-link class="dropdown-item" to="/user_detail">个人信息</router-link>
      </li>
      <li>
        <router-link to="/setting" class="dropdown-item">设置</router-link>
      </li>
      <li><a class="dropdown-item" href="#">工作记录</a></li>
      <li>
        <hr class="dropdown-divider">
      </li>
      <li><a class="dropdown-item" @click="logout()">登出</a></li>
    </ul>
  </div>
</template>

<script>

import $store from "../store"
import {get_userImage} from "@/utils/getData";

export default {
  name: "User",
  setup() {
    function logout() {
      $store.dispatch('user/logout')
    }

    return {
      logout,
      get_userImage
    }
  },
  beforeCreate() {

  }
}
</script>

<style scoped>

</style>