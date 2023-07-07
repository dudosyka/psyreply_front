<template>
    <router-view></router-view>
    <transition name="popup">
        <y-popup-error/>
    </transition>
    <transition name="popup">
        <y-popup/>
    </transition>
    <transition name="popup">
        <y-popup-warn/>
    </transition>
</template>

<script>
import YPopupWarn from "@/components/UI/YPopupWarn.vue";
import YPopup from "@/components/UI/YPopup.vue";
import YPopupError from "@/components/UI/YPopupError.vue";

export default {
    components: {YPopupError, YPopup, YPopupWarn}
}

</script>


<style>

</style>
