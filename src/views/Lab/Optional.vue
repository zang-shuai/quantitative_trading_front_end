<template>
  <div>
    <form method="post" action="/api/count" class="p-4 p-md-5 mb-4 rounded">
      <choose v-for="question,index in questions" :question="index+1+'、'+question.question" :select="question.select" :questionname="question.name"/>
      <button type="submit" class="btn btn-primary">提交</button>
    </form>
  </div>
</template>

<script>
import Choose from "@/components/Choose";
import {reactive} from "vue";

export default {
  name: "Optional",
  components: {Choose},
  setup(){
    let questions = reactive(require('../../../public/json/question.json'))
    return {
      questions
    }
  }
}
</script>

<style scoped>

</style>