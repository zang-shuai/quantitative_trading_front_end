<template>
  <MyHeader/>
  <router-view/>
  <MyFooter/>
</template>

<script>
import MyFooter from "@/views/MyFooter";
import {mapGetters} from "vuex";
import MyHeader from "@/components/MyHeader";
import axios from "axios";
import {useCookies} from "vue3-cookies"
import $store from "@/store";
import {get_stocks} from "@/utils/getData";

export default {
  name: 'App',
  components: {MyHeader, MyFooter},
  computed: {
    ...mapGetters('user', ['isLogin'])
  },
  setup() {
    const {cookies} = useCookies()
    return {
      cookies,
    }
  },
  created() {
    let userToken = this.cookies.get("usertoken");
    axios.get('http://127.0.0.1:8080/api/loginByToken', {
      params: {
        token: userToken
      }
    }).then(
        function (response) {
          // 如果数据库登录成功
          if (response.data.code === 1000) {
            $store.dispatch('user/login', response.data)
          }
        }
    ).catch({
      function(error) {
      }
    })
    get_stocks()
  }
}

</script>


<style>
</style>
