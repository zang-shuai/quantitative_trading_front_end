<template>
  <div class="modal fade" id="register" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title" id="exampleModalLabel">注册</h5>
          <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
        </div>
        <div class="modal-body">
          <form>
            <div class="mb-3">
              <label for="register_phone_number" class="col-form-label">手机号码：</label>
              <input type="text" class="form-control" v-model="register_phone_number" id="register_phone_number">
            </div>
            <div class="mb-3">
              <label for="register_password" class="col-form-label">密码：</label>
              <span style="color: red">{{ error }}</span>
              <input type="password" class="form-control" v-model="register_password" id="register_password"/>
            </div>
            <div class="mb-3">
              <label for="confirm_password" class="col-form-label">确认密码：</label>
              <input type="password" class="form-control" v-model="confirm_password" id="confirm_password"/>
            </div>
            <div class="modal-footer">
              <button type="button" class="btn btn-secondary clickme" data-bs-dismiss="modal">取消</button>
              <button type="button" class="btn btn-primary" :disabled="register_disabled" @click="user_register()">注册
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import {ref, watch} from "vue";
import axios from "axios";
import $store from "@/store";

export default {
  name: "Register",
  setup() {
    let error = ref('')
    let confirm_password = ref('')
    let register_password = ref('')
    let register_phone_number = ref('')
    let register_disabled = ref(true)


    function user_register() {
      const params = new URLSearchParams()
      params.append('phone_number', register_phone_number.value)
      params.append('password', register_password.value)

      axios.post('http://127.0.0.1:8080/api/register', params).then(
          function (response) {
            // 如果数据库登录成功
            if (response.data.code === 1000) {


              let ele = document.querySelector('.clickme');
              ele.addEventListener('click', function () {
                // alert('xxxx')
              });
              ele.click()
              alert('注册成功')


            } else {
              error.value = '账号重复'
            }
          }
      ).catch(function (error) {
        console.log(error)
        console.log('请求失败了', error.message)
      })
    }


    // 监听器(num1)
    watch(register_password, () => {
      if (register_password.value !== confirm_password.value) {
        error.value = '两次密码不相同'
        register_disabled.value = true
      } else {
        error.value = ''
        register_disabled.value = false
      }
    })
    watch(confirm_password, () => {
      if (register_password.value !== confirm_password.value) {
        error.value = '两次密码不相同'
        register_disabled.value = true
      } else {
        error.value = ''
        register_disabled.value = false
      }
    })


    return {
      error,
      register_password,
      confirm_password,
      register_phone_number,
      register_disabled,
      user_register
    }
  }
}
</script>

<style scoped>

</style>