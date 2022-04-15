<template>
  <div class="modal fade" id="login" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title" id="exampleModalLabel">登录</h5>
          <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
        </div>
        <div class="modal-body">
          <form>
            <div class="mb-3">
              <label for="login_phone_number" class="col-form-label">手机号码：<span
                  style="color: red">{{ error }}</span></label>
              <input type="text" v-model="phone_number" class="form-control" id="login_phone_number"
                     name="phone_number">
            </div>
            <div class="mb-3">
              <label for="message-text" class="col-form-label">密码：</label>
              <input type="password" v-model="password" class="form-control" id="message-text" name="password"/>
            </div>
            <div class="modal-footer">
              <button type="button" class="btn btn-secondary clickMe" data-bs-dismiss="modal">关闭</button>
              <button type="button" class="btn btn-primary" @click="login()">登录</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  </div>

</template>

<script>
import {reactive, ref} from "vue";
import axios from 'axios'
import {useCookies} from "vue3-cookies"
import $store from "../store"
export default {
  name: "Login",
  setup() {
    let phone_number = ref('')
    let password = ref('')
    let error = ref('')
    const {cookies} = useCookies()


    function login() {
      const params = new URLSearchParams()
      params.append('phone_number', phone_number.value)
      params.append('password', password.value)
      axios.post('http://127.0.0.1:8080/api/login', params).then(
          function (response) {
            // 如果数据库登录成功
            if (response.data.code === 1000) {
              // 提交到vuex
              $store.dispatch('user/login', response.data)
              // 设置cookie
              cookies.set("usertoken", response.data.token);
              cookies.set("userimage", response.data.img);

              let ele = document.querySelector('.clickMe');
              ele.addEventListener('click', function () {

              });
              ele.click();

            } else {
              error.value = '账号或密码错误'
            }
          }
      ).catch(function (error) {
        console.log(error)
        console.log('请求失败了', error.message)
      })
    }

    function initLogin() {
      error.value = ''
    }


    return {
      phone_number,
      password,
      error,
      login,
      initLogin,
      // login_action,
      cookies,
    }

  },
}
</script>

<style>

</style>