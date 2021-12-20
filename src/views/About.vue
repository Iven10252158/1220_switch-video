/* eslint-disable vue/no-dupe-keys */
<template>
  <div class="about">
    <h1>This is an about page</h1>
    <!-- <youtube :video-id="videoId" ref="youtube" @playing="playing" :player-vars="playerVars"></youtube> -->
     <YouTube
        :src= "isDefault? 'https://www.youtube.com/embed/pvYMUF-PMnc?wmode=opaque&autohide=1&autoplay=1&mute=1' : 'https://www.youtube.com/embed/2mCSYvcfhtc?wmode=opaque&autohide=1&autoplay=1&mute=1'"
        @ready="onReady"
        :player-vars="playerVars"
        ref="youtube" />
  </div>
</template>

<script>
export default {
  props: {
    playerVars: {
      type: Object,
      default () {
        return {
          autoplay: 1
        }
      }
    }
  },
  data () {
    return {
      player: null,
      playerTime: '',
      arVideo: null,
      liveVideo: null,
      isDefault: false
    }
  },
  methods: {
    onReady () {
      console.log(this.$refs.youtube)
      this.player = this.$refs.youtube.playVideo()
    },
    changeTime () {
      const date = Date.now()
      const hours = new Date().getHours(date)
      const mins = new Date().getMinutes(date)
      // 轉成字串，如果低於10，前面加上'0'
      const hourString = (hours < 10) ? ('0' + hours) : ('' + hours)
      const minString = (mins < 10) ? ('0' + mins) : ('' + mins)
      this.setTimeHour = `${hourString}`
      this.setTimeMins = `${minString}`

      const timeZero = '50'
      // const timeTwo = '56'

      if (this.setTimeHour >= 8 && this.setTimeHour <= 20) {
        this.liveVideo = this.$refs.youtube.getDuration()
        console.log('if', this.liveVideo)
        this.isDefault = false // 撥放TVBS
        if (this.setTimeMins === timeZero) {
          this.isDefault = true // 播放蜘蛛人
          this.arVideo = this.$refs.youtube.getDuration()
          console.log('蜘蛛人1', this.arVideo)
          console.log('直播', this.liveVideo)
          if (this.arVideo) {
            this.isDefault = true
            console.log('繼續播放蜘蛛人')
          } else {
            this.isDefault = false // 撥放TVBS
            console.log('else')
          }
        } else {
          console.log(' this.isDefault = false')
          this.isDefault = false // 撥放TVBS
        }
      }
    }
  },
  mounted () {
    setInterval(() => {
      this.changeTime()
    }, 1000)
  }
}
</script>
