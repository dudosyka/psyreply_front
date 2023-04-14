<template>
    <div class="main">
        <y-modal>
            <y-icon class="form__reply__logo"></y-icon>
            <y-form-registration></y-form-registration>
        </y-modal>
    </div>
</template>

<script>
import YFormRegistration from "@/components/UI/YFormRegistration.vue";
import YModal from "@/components/UI/YModal.vue";

export default {
  name: "RegView",
  components: {YModal, YFormRegistration}
}
</script>

<style scoped>
.form__reply__logo {
    margin-bottom: 5%;
}

.main {
    width: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    padding-top: 2rem;
}
</style>