<template>
  <div style="float:left;width:45%;">
    <v-ace-editor
        v-model:value="$store.state.trade.ai_code"
        @init="editorInit"
        lang="python"
        style="height: 800px"
    />
  </div>
</template>

<script>
import {ref} from "vue";
import {VAceEditor} from 'vue3-ace-editor';

import $store from "@/store";
// 引入全局实例
import ace from 'ace-builds'
// 主题风格，引入主题后还需要在 options 中指定主题才会生效
import clouds from 'ace-builds/src-min-noconflict/theme-clouds'
// 支持代码格式， 需要引入具体的语法高亮库才会有对应的语法高亮效果
import 'ace-builds/src-min-noconflict/mode-javascript'
import 'ace-builds/src-min-noconflict/mode-json'
import 'ace-builds/src-min-noconflict/mode-python'
import 'ace-builds/src-min-noconflict/mode-css'
import 'ace-builds/src-min-noconflict/ext-language_tools'
import jsWorkerUrl from 'file-loader!ace-builds/src-noconflict/worker-javascript'
import jsonWorkerUrl from 'file-loader!ace-builds/src-noconflict/worker-json'
import cssWorkerUrl from 'file-loader!ace-builds/src-noconflict/worker-css'


import 'ace-builds/src-noconflict/mode-text';
import 'ace-builds/src-noconflict/theme-chrome';

ace.config.setModuleUrl('ace/mode/javascript_worker', jsWorkerUrl)
ace.config.setModuleUrl('ace/mode/json_worker', jsonWorkerUrl)
ace.config.setModuleUrl('ace/mode/css_worker', cssWorkerUrl)
// ace.config.setModuleUrl('ace/mode/php_worker', phpWorkerUrl)
ace.config.setModuleUrl(
    'ace/snippets/javascript',
    require('file-loader!ace-builds/src-noconflict/snippets/javascript.js')
)
ace.config.setModuleUrl('ace/snippets/css', require('file-loader!ace-builds/src-noconflict/snippets/css.js'))

export default {
  name: "AiEditor",
  components: {VAceEditor},
  setup() {
    function editorInit(editor) {
      editor.setOptions({
        enableLiveAutocompletion: true,
        enableBasicAutocompletion: true,
        enableSnippets: true,
        highlightPending: true,
      })
      editor.setTheme(clouds)
    }

    return {
      editorInit
    }
  }
}
</script>

<style scoped>

</style>