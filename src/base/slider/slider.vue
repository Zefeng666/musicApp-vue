<template>
  <div class="slider" ref="slider">
    <div class="slider-group" ref="sliderGroup">
      <slot>
      </slot>
    </div>
    <div class="dots">
        <span class="dot" v-for="(item, index) in dots" :class="{active: currentPageIndex === index}"></span>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
    import BScroll from "better-scroll"
    import { addClass } from "common/js/dom";

    export default {
        data () {
            return {
                dots: [],
                currentPageIndex: 0
            }
        },
        props: {
            loop: {
                type: Boolean,
                default: true
            },
            autoPlay: {
                type: Boolean,
                default: true
            },
            interval: {
                type: Number,
                default: 4000
            }
        },
        mounted () {
            setTimeout(() => {
                this._setSliderWidth()
                this._initDots()
                this._initSlider()

                if(this.autoPlay) {
                    this._play()
                }
            }, 20)
            // 监听窗口大小变化，重新获取宽度
            window.addEventListener('resize', () => {
                if(!this.slider) {
                    return
                }
                // 如果是重新获取宽度，不需要再加两倍sliderWidth，传入true
                this._setSliderWidth(true)
                this.slider.refresh()
            })
        },
        methods: {
            _setSliderWidth(isResize) {
                this.children = this.$refs.sliderGroup.children

                let width = 0
                let sliderWidth = this.$refs.slider.clientWidth
                for (let i = 0; i < this.children.length; i++) {
                    let child = this.children[i]
                    addClass(child, 'slider-item')
                    child.style.width = sliderWidth + 'px'
                    width += sliderWidth
                }
                // 如果重新获取宽度就不会走这个
                if(this.loop && !isResize) {
                    width += 2 * sliderWidth 
                }
                this.$refs.sliderGroup.style.width = width + 'px'
            },
            _initDots() {
                this.dots = new Array(this.children.length)
                // console.log(this.dots)

            },
            _initSlider() {
                this.slider = new BScroll(this.$refs.slider, {
                    scrollX: true,
                    scrollY: false,
                    momentum: false,
                    snap: true,
                    snapLoop: this.loop,
                    snapThreshold: 0.3,
                    snapSpeed: 400
                })

                this.slider.on('scrollEnd', () => {
                    let pageIndex = this.slider.getCurrentPage().pageX
                    // 轮播图初始化无缝滚动时前后多两个slider,所以index需要-1
                    if(this.loop) {
                        pageIndex -= 1
                    }
                    // console.log(pageIndex)
                    this.currentPageIndex = pageIndex

                    // 解决手拖图片自动轮播问题
                    if (this.autoPlay) {
                        clearTimeout(this.timer)
                        this._play()
                    }
                })
            },
            _play() {
                let pageIndex = this.currentPageIndex + 1
                if(this.loop) {
                    pageIndex += 1
                }
                this.timer = setTimeout(() => {
                    this.slider.goToPage(pageIndex, 0, 400)
                }, this.interval)

            }
        },
        destroyed () {
            // 如果有定时器，最好在destroyed中清掉，比较好的编程习惯，释放内存
            clearTimeout(this.timer)
        }
    }
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  @import "~common/stylus/variable"

  .slider
    min-height: 1px
    .slider-group
      position: relative
      overflow: hidden
      white-space: nowrap
      .slider-item
        float: left
        box-sizing: border-box
        overflow: hidden
        text-align: center
        a
          display: block
          width: 100%
          overflow: hidden
          text-decoration: none
        img
          display: block
          width: 100%
    .dots
      position: absolute
      right: 0
      left: 0
      bottom: 12px
      text-align: center
      font-size: 0
      .dot
        display: inline-block
        margin: 0 4px
        width: 8px
        height: 8px
        border-radius: 50%
        background: $color-text-l
        &.active
          width: 20px
          border-radius: 5px
          background: $color-text-ll
</style>