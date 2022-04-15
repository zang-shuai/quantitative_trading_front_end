<template>
  <span>
  <span class="col-md-3 text-end">
    <button data-bs-toggle="modal" data-bs-target="#login" data-bs-whatever="@mdo"
            type="button" class="btn btn-light me-2">登录
    </button>
    <button data-bs-toggle="modal" data-bs-target="#register" type="button" class="btn btn-dark">注册</button>
  </span>
  <Login/>
  <Register/>
  </span>
</template>

<script>

import Register from "@/components/Register";
import Login from "@/components/Login";

export default {
  name: "LoginAndRegister",
  setup(){
    function try01() {
      alert('xxxxxx')
    }
    return{
      try01
    }
  },
  components: {Register, Login},
}
</script>

<style scoped>

</style>