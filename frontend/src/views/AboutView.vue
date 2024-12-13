<script setup lang="ts">
import { ref } from 'vue'
const customValue1 = ref('no')
const customValue2 = ref(2)
</script>
<template>
    <Space gap="large">
        <Space vertical align="center">
            <Switch v-model="customValue1" checked-value="on" unchecked-value="off">
                <template #checked>on</template>
                <template #unchecked>off</template>
            </Switch>
            Current Value: {{ customValue1 }}
        </Space>
        <Space vertical align="center">
            <Switch v-model="customValue2" :checked-value="1" :unchecked-value="2">
                <template #checked>yes</template>
                <template #unchecked>no</template>
            </Switch>
            Current Value: {{ customValue2 }}
        </Space>
    </Space>
</template>

<style scoped>

</style>
