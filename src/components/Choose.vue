<template>

  <div class="bd-callout bd-callout-info" >
    <div class=" px-0">
      <h5>{{ question }}</h5>
      <div class="form-check" v-for="value,key in select">
        <label class="form-check-label">
          <input class="form-check-input" type="radio" :name="questionname" :value="value">
          {{ key }}
        </label>
      </div>
    </div>
    <hr>
  </div>

</template>

<script>
import {reactive, ref} from "vue";

export default {
  name: "Choose",
  props: ['question', 'select', 'questionname'],
  setup() {
    // let name = ref(this.names)
    // return {
    //   name
    // }
  }
}
</script>

<style scoped>

</style>