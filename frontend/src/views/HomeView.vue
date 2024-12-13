<script setup lang="ts">
import { SearchOutlined, DownloadOutlined } from '@ant-design/icons-vue'
</script>
<template>
    <Space gap="small" vertical>
        <GradientText type="info" :size="36" :weight="500">Live Forever</GradientText>
        <GradientText type="error" :size="36" :weight="600">Live Forever</GradientText>
        <GradientText type="warning" :size="24" :weight="700">Married with Children</GradientText>
        <GradientText type="success" :size="24" :weight="800">Back in the USSR</GradientText>
    </Space>
    <Space>
        <Button type="primary" ghost>Primary Ghost Button</Button>
        <Button type="danger" ghost>Danger Ghost Button</Button>
        <Button type="primary" ghost shape="circle">
            <template #icon>
                <SearchOutlined />
            </template>
        </Button>
        <Button type="primary" ghost shape="round">
            <template #icon>
                <SearchOutlined />
            </template>
            Search
        </Button>
        <Button type="primary" ghost shape="round">
            <template #icon>
                <SearchOutlined />
            </template>
        </Button>
        <Button type="danger" ghost shape="circle">
            <template #icon>
                <DownloadOutlined />
            </template>
        </Button>
        <Button type="danger" ghost shape="round">
            <template #icon>
                <DownloadOutlined />
            </template>
            Download
        </Button>
        <Button type="danger" ghost shape="round">
            <template #icon>
                <DownloadOutlined />
            </template>
        </Button>
    </Space>
</template>

<style scoped>

</style>
