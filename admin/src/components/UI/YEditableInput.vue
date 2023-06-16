<template>
    <h3 @click="edit" v-if="show" class="header">{{ this.metricValue }}</h3>
    <div class="inputBlock" v-if="!show">
        <y-input class="input"
                 :placeholder="placeholder"
                 v-model="this.inputData"
                 @input="$emit('update:modelValue', $event.target.value)"
        />
        <img src="@/assets/img/tick.svg" alt="tick" class="tick" @click.prevent="editData">
    </div>
</template>

<script>

import YInput from "@/components/UI/YInput.vue";

export default {
    name: "YEditableInput",
    components: {YInput},
    props: {
        metricValue: {
            type: Number,
            default: null
        },
        placeholder: '',
        error: ''
    },
    data() {
        return {
            show: {
                type: Boolean,
                default: false
            },
            inputData: null
        }
    },
    methods: {
        edit() {
            this.show = !this.show
            // console.log(this.show)
            // console.log(this.inputData)
        },
        editData() {
            if (this.inputData !== '') {
                this.show = !this.show
                this.$emit('update', {
                    newData: this.inputData
                })
            }
            else {
                this.inputData = this.metricValue
                alert(this.error)
            }
        }
    },
    created() {
        this.inputData = this.metricValue
        // alert(this.inputData)
    },
    updated() {
        // alert('kk')
    }
}
</script>

<style scoped>
.inputBlock {
    display: flex;
    justify-content: flex-start;
    align-items: center;
    margin: 0 0 0 .5rem;
}

.input, .header{
    margin: 0 0 0 1rem;
    width: 12rem;
    align-items: center;
    text-align: center;
}

.tick {
    margin: 0 0 0 -25px;
    height: 1.2rem;
    width: 1.2rem;
    padding: .15rem;
    border: .05rem solid transparent;
    border-radius: .1rem;
    transition-duration: .5s;
}

.tick:hover {
    padding: .15rem;
    border: .05rem solid var(--active-color);
    border-radius: .1rem;
    transition-duration: .5s;
}
</style>
