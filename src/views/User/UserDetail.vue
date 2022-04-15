<template>
  <div class="container">
    <main>
      <div class="py-5 text-center">
        <img :src="get_userImage()" alt="mdo" width="100" height="100" class="rounded-circle">
      </div>

      <div class="row mb-2">
        <div class="col-md-6">
          <div class="row g-0 border rounded overflow-hidden flex-md-row mb-4 shadow-sm h-md-250 position-relative">
            <div class="col p-4 d-flex flex-column position-static">
              <div style="font-size: 150%">用户名：{{ user.username }}</div>
            </div>
          </div>
        </div>
        <div class="col-md-6">
          <div class="row g-0 border rounded overflow-hidden flex-md-row mb-4 shadow-sm h-md-250 position-relative">
            <div class="col p-4 d-flex flex-column position-static">
              <div style="font-size: 150%">手机号：{{ user.phone_number }}</div>
            </div>
          </div>
        </div>
        <div class="col-md-6">
          <div class="row g-0 border rounded overflow-hidden flex-md-row mb-4 shadow-sm h-md-250 position-relative">
            <div class="col p-4 d-flex flex-column position-static">
              <div style="font-size: 150%">用户等级:{{ role }}</div>
            </div>
          </div>
        </div>
        <div class="col-md-6">
          <div class="row g-0 border rounded overflow-hidden flex-md-row mb-4 shadow-sm h-md-250 position-relative">
            <div class="col  d-flex flex-column position-static">
              <router-link to="/setting" type="button" class="btn btn-primary btn-lg px-4 gap-3"> 编辑</router-link>
            </div>
          </div>
        </div>
      </div>


    </main>

  </div>
</template>


<script>
import {get_userImage} from "@/utils/getData";
import $store from "@/store";
import {mapGetters, mapState} from "vuex";
import {computed, ref} from "vue";


export default {
  name: "UserDetail",
  computed: {
    ...mapState('user', ['user'])
  },

  setup() {
    let role = ref('')
    if ($store.state.user.user.role === 1) {
      role.value = '初级用户（没有编程基础）'
    } else if ($store.state.user.user.role === 2) {
      role.value = '中级用户（有编程基础，会python语言）'
    } else {
      role.value = '高级用户（有编程基础，并了解深度学习知识）'
    }

    return {
      role,
      get_userImage
    }
  },

}
</script>

<style scoped>

</style>