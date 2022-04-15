<template>
<!--  <a-transfer-->
<!--    v-model:target-keys="targetKeys"-->
<!--    :data-source="mockData"-->
<!--    show-search-->
<!--    :list-style="{-->
<!--      width: '200px',-->
<!--      height: '800px',-->
<!--    }"-->
<!--    :operations="['to right', 'to left']"-->
<!--    :render="item => `${item.title}-${item.description}`"-->
<!--    @change="handleChange"-->
<!--  >-->
<!--    <template #footer="{ direction }">-->
<!--      <a-button-->
<!--        v-if="direction === 'left'"-->
<!--        size="small"-->
<!--        style="float: left; margin: 5px"-->
<!--        @click="getMock"-->
<!--      >-->
<!--        left reload-->
<!--      </a-button>-->
<!--      <a-button-->
<!--        v-else-if="direction === 'right'"-->
<!--        size="small"-->
<!--        style="float: right; margin: 5px"-->
<!--        @click="getMock"-->
<!--      >-->
<!--        right reload-->
<!--      </a-button>-->
<!--    </template>-->
<!--    <template #notFoundContent>-->
<!--      <span>没数据</span>-->
<!--    </template>-->
<!--  </a-transfer>-->
    <a-transfer
    v-model:target-keys="targetKeys"
    :data-source="mockData"
    show-search
    :list-style="{
      width: '200px',
      height: '800px',
    }"
    :operations="['to right']"
    :render="item => `${item.title}-${item.description}`"
    @change="handleChange"
  >
<!--    <template #footer="{ direction }">-->
<!--      <a-button-->
<!--        v-if="direction === 'left'"-->
<!--        size="small"-->
<!--        style="float: left; margin: 5px"-->
<!--        @click="getMock"-->
<!--      >-->
<!--        left reload-->
<!--      </a-button>-->
<!--      <a-button-->
<!--        v-else-if="direction === 'right'"-->
<!--        size="small"-->
<!--        style="float: right; margin: 5px"-->
<!--        @click="getMock"-->
<!--      >-->
<!--        right reload-->
<!--      </a-button>-->
<!--    </template>-->
<!--    <template #notFoundContent>-->
<!--      <span>没数据</span>-->
<!--    </template>-->
  </a-transfer>

</template>
<script>
import { defineComponent, ref, onMounted } from 'vue';
export default defineComponent({
  setup() {
    const mockData = ref([]);
    const targetKeys = ref([]);
    onMounted(() => {
      getMock();
    });

    const getMock = () => {
      const keys = [];
      const mData = [];

      for (let i = 0; i < 20; i++) {
        const data = {
          key: i.toString(),
          title: `content${i + 1}`,
          description: `description of content${i + 1}`,
          chosen: Math.random() * 2 > 1,
        };

        if (data.chosen) {
          keys.push(data.key);
        }

        mData.push(data);
      }

      mockData.value = mData;
      targetKeys.value = keys;
    };

    const handleChange = (keys, direction, moveKeys) => {
      console.log(keys, direction, moveKeys);
    };

    return {
      mockData,
      targetKeys,
      handleChange,
      getMock,
    };
  },

});
</script>