<template>
    <transition name="slide">
        <div class="singer-detail"></div>
    </transition>
</template>

<script type="text/ecmascript-6">
    import { mapGetters } from "vuex"

    export default {
        computed: {
            ...mapGetters([
                'singer'
            ])
        },
        created () {
            console.log(this.singer)
        }
    }
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  .slide-enter-active, .slide-leave-active
    transition: all 0.3s

  .slide-enter, .slide-leave-to
    transform: translate3d(100%, 0, 0)
</style>