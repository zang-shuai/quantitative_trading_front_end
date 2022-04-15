<template>
  <div class="container">
    <main>
      <div class="py-5 text-center">
        <img :src="get_userImage()" alt="mdo" width="100" height="100" class="rounded-circle">
        <h2>{{ $store.state.user.user.username }}</h2>
      </div>
      <div class="row g-5">
        <div class="col-md-7 col-lg-8">
          <h4 class="mb-3">您的个人信息</h4>
          <form class="needs-validation" enctype="multipart/form-data" method="post"
                :action="form_action" novalidate="">
            <div class="row g-3">
              <div class="col-12">
                <label for="file" class="form-label">头像 <span class="text-muted"></span></label>
                <input id="file" type="file" name="file" accept="image/*" class="form-control" placeholder="请选择头像">
                <div class="invalid-feedback">
                </div>
              </div>


              <div class="col-12">
                <label for="username" class="form-label">用户名</label>
                <div class="input-group has-validation">
                  <span class="input-group-text">@</span>
                  <input type="text" class="form-control" id="username" name="username" placeholder="请输入个人信息"
                         :value="$store.state.user.user.username"
                         required="">
                  <div class="invalid-feedback">
                    Your username is required.
                  </div>
                </div>
              </div>

              <div class="col-12">
                <label for="email" class="form-label">手机号 <span class="text-muted"></span></label>
                <input type="tel" class="form-control" id="email" name="phone_number" placeholder="请输入您的手机号码"
                       :value="$store.state.user.user.phone_number">
                <div class="invalid-feedback">
                </div>
              </div>


              <div class="col-12">
                <label for="password_old" class="form-label">原密码<span class=""
                                                                      ref="password_old"
                                                                      style="color: red">{{
                    old_password_message
                  }}</span></label>
                <input v-model="old_password" @blur="input_old()" type="password" class="form-control" id="password_old"
                       placeholder="请输入原密码"
                       required="">
                <div class="invalid-feedback">

                </div>
              </div>

              <div class="col-12">
                <label for="password_new" class="form-label">新密码<span class="text-muted"
                                                                      ref="password_new"></span></label>
                <input v-model="new_password" @blur="input_new()" type="password" class="form-control" id="password_new"
                       placeholder="请输入新密码" name="password"
                       required="" :disabled="re">
                <div class="invalid-feedback">

                </div>
              </div>

              <div class="col-12">
                <label for="password_re" class="form-label">确认新密码<span class="" style="color: red">{{
                    re_password_message
                  }}</span></label>
                <input v-model="re_password" @blur="input_new_re()" type="password" class="form-control"
                       id="password_re"
                       placeholder="请再次输入新密码" required="" :disabled="re">
                <div class="invalid-feedback">

                </div>
              </div>
            </div>

<!--            <vueCropper-->
<!--                ref="cropper"-->
<!--                :img="option.img"-->
<!--                :outputSize="option.size"-->
<!--                :outputType="option.outputType"-->
<!--            ></vueCropper>-->


            <hr class="my-4">

            <h4 class="mb-3">选择用户等级</h4>
            <button type="button" class="btn btn-info">自我评估</button>

            <div class="my-3">
              <div class="form-check">
                <input id="credit" name="user_type" value="1" type="radio" class="form-check-input" checked=""
                       required="">
                <label class="form-check-label" for="credit">初级用户（没有编程基础）</label>
              </div>
              <div class="form-check">
                <input id="debit" name="user_type" value="2" type="radio" class="form-check-input" required="">
                <label class="form-check-label" for="debit">中级用户（有编程基础，会python语言）</label>
              </div>
              <div class="form-check">
                <input id="paypal" name="user_type" value="3" type="radio" class="form-check-input" required="">
                <label class="form-check-label" for="paypal">高级用户（有编程基础，并了解深度学习知识）</label>
              </div>
            </div>
            <input name="id" :value="id" type="hidden">
            <hr class="my-4">

            <!--            <button class="w-100 btn btn-primary btn-lg" type="submit" @click="submit_message()" :disabled="sub">点击提交</button>-->
            <button class="w-100 btn btn-primary btn-lg" type="submit" :disabled="sub">点击提交</button>
          </form>
        </div>
      </div>
    </main>

  </div>
</template>

<script>
import {ref} from "vue";
import $store from "@/store";
import {get_userImage} from "@/utils/getData";
// import Tailoring from "@/components/Tailoring";
// import CropperImage from "@/components/CropperImage";
// import 'vue-cropper/dist/index.css'
import VueCropper from 'vue-cropper';

export default {
  name: "setting",
  components: {VueCropper},
  setup() {

    let imgPath = get_userImage()
    let username = $store.state.user.user.username
    let phone_number = $store.state.user.user.phone_number
    let id = $store.state.user.user.id
    let old_password = ref('')
    let new_password = ref('')
    let re_password = ref('')
    let sub = ref(false)
    let re = ref(true)
    let form_action = ref($store.state.global.host + '/modify_user_information')


    let old_password_message = ref('')

    let re_password_message = ref('')


    function input_old() {
      if ($store.state.user.user.password === old_password.value) {
        old_password_message.value = ''
        re.value = false
      } else {
        old_password_message.value = '密码错误'
        if (old_password.value !== '')
          re.value = true
      }
    }

    function input_new() {
      if (new_password.value === re_password.value && re_password.value !== '') {
        re_password_message.value = ''
        sub.value = false
      } else {
        re_password_message.value = '两次密码不同'
        sub.value = true
      }
    }

    function input_new_re() {
      if (new_password.value === re_password.value && re_password.value !== '') {
        re_password_message.value = ''
        sub.value = false
      } else {
        re_password_message.value = '两次密码不同'
        sub.value = true
      }
    }

    function jump() {
      window.location.href = 'http://127.0.0.1:8080/#/home';
    }


    return {
      // VueCropper,
      id,
      imgPath,
      username,
      input_old,
      input_new,
      input_new_re,
      get_userImage,
      // submit_message,
      phone_number,
      form_action,

      old_password,
      new_password,
      re_password,
      old_password_message,
      re_password_message,
      sub,
      re,
      jump
    }
  },

}
</script>

<style scoped>

</style>
















