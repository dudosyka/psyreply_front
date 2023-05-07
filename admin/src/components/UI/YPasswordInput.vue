<template>
        <div class="row-pass">
            <div class="box__input">
                <y-input :type="checkType"
                         class="box__input"
                         @input="$emit('update:modelValue', $event.target.value)"
                         :value="modelValue"
                />
            </div>
            <div class="eye">
                <button class="swap" @click.prevent="passVisibility">
                    <i class="pass-hidden fa-solid" :class="checkStatus"></i>
                </button>
            </div>
        </div>
</template>

<script>
export default {
    name: "YPasswordInput",
    props: {
        placeholder: {
            type: String,
            default: ''
        },
        type: {
            type: String,
            default: 'text'
        },
        max: {
            default: 0
        },
        min: {
            default: 0
        },
        disabled: {
            default: false,
        },
        modelValue: [String]
    },
    data() {
        return {
            checkStatus: 'fa-eye',
            checkType: 'password'
        }
    },
    methods: {
        passVisibility() {
            if (this.checkStatus === 'fa-eye') {
                this.checkStatus = 'fa-eye-slash'
                this.checkType = 'text'
            }
            else {
                this.checkStatus = 'fa-eye'
                this.checkType = 'password'
            }
        }
    }
}
</script>

<style scoped>
.row-pass {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-evenly ;
    /*max-width: min-content;*/
    width: 25rem;
}

.box__input {
    width: 100%;
}

.pass-hidden {
    display: flex;
    width: 100%;
    height: 100%;
    color: rgba(255, 255, 255, 0.3);
    cursor: pointer;
    transition: 0.3s;
}
.pass-hidden:hover {
    color: rgba(255, 255, 255, 0.65);
}
.swap {
    margin-top: 10px;
    margin-left: -30px;
}

.box__input, .eye {
    display: flex;
    flex-direction: row;
    align-items: center;
}
</style>
