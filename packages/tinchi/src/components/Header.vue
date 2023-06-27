<script lang="ts" setup>
import externalLinkIcon from '../assets/external-link-icon.svg';
</script>

<template>
    <header class="mt-12 mb-4 text-center">
        <h1 class="text-3xl">
            <a href="/" class="uppercase">KMA TINCHI</a>
        </h1>
        <p class="inline-flex gap-2 mt-2">
            <a href="https://www.facebook.com/kitclubKMA" target="_blank" rel="noreferrer" class="underline">
                KIT CLUB
                <img :src="externalLinkIcon" class="inline-block w-3 h-3 mb-4" alt="https://www.facebook.com/kitclubKMA" />
            </a>
            <!-- |
            <a href="https://github.com/ngosangns/tin-chi/issues" target="_blank" rel="noreferrer" class="underline">
                ISSUES
                <img :src="externalLinkIcon" class="inline-block w-3 h-3 mb-4" alt="https://www.facebook.com/kitclubKMA" />
            </a> -->
        </p>
        <p class="mt-2 m-0 p-0">
            Trang web chỉ hỗ trợ xếp lịch, không hỗ trợ đăng ký môn học trên web của trường.
        </p>
        <p class="mt-2 m-0 p-0">
            Sử dụng trình duyệt trên PC/Laptop để có trải nghiệm tốt nhất!
        </p>
    </header>
</template>

<style>
header {
    width: 100%;
    min-width: 60rem;
}
</style>
