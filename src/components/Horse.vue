<template>
  <div class="horse" :style="horseStyle"></div>
</template>

<script>
import { defineComponent } from 'vue'
import horseSheet from 'src/assets/horse-sheet.png'

export default defineComponent({
  name: 'HorseComponent',
  props: {
    scale: {
      type: Number,
      default: 1,
    },
    isRunning: {
      type: Boolean,
      default: true,
    },
  },
  data() {
    return {
      x: 0,
      y: 0,
      sheetWidth: 0,
      sheetHeight: 0,
      frameWidth: 108,
      frameHeight: 87,
      padding: 20,
    }
  },
  computed: {
    horseStyle() {
      return {
        backgroundImage: `url(${horseSheet})`,
        width: '108px',
        height: '100px',
        backgroundRepeat: 'no-repeat',
        transform: `scale(${this.scale})`,
        backgroundPosition: `-${this.x}px -${this.y}px`,
        willChange: 'background-position',
      }
    },
  },
  mounted() {
    this.init()
  },
  watch: {
    isRunning(newVal) {
      if (newVal) {
        this.startRunning()
      } else {
        this.stopRunning()
      }
    },
  },
  methods: {
    init() {
      // get sheet width
      console.log(horseSheet)
      const sheet = new Image()
      sheet.src = horseSheet
      sheet.onload = () => {
        this.sheetWidth = sheet.width
        this.sheetHeight = sheet.height
      }
    },
    startRunning() {
      this.interval = setInterval(() => {
        if (this.x + this.frameWidth >= this.sheetWidth - this.padding) {
          this.x = 0

          if (this.y + this.frameHeight >= this.sheetHeight - this.padding) {
            this.y = 0
          } else {
            this.y += this.frameHeight
          }
        } else {
          this.x += this.frameWidth
        }
      }, 75)
    },
    stopRunning() {
      clearInterval(this.interval)
    },
  },
})
</script>

<style scoped></style>
