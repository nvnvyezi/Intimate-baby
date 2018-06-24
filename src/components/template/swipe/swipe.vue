<template>
  <div class="swipe" id="s">
    <div class="swipe-container" id="sw">
      <section class="sc-img" v-for="(item, index) in swipeData" :key="index">
        <img class="img" :src="item.imgUrl" :alt="item.linkText">
      </section>
    </div>
    <button @click="previous">L</button>
    <button @click="next">R</button>
  </div>
</template>

<script>
export default {
  name: 'swipe',
  data () {
    return {
      // imgUrl: [require('../../../assets/swipe.jpg'),require('../../../assets/swipe2.jpg'),require('../../../assets/swipe3.jpg')],
      time: 2000,
      sh: 200,
      move: 200,
      flag: 0,
      endJudge: true,
      lrJudge: true,
      imgU: [],
      test: this.swipeData
    }
  },
  props: {
    swipeData: {
      type: Array,
      required: true
    }
  },
  created () {
    console.log(this.swipeData, this.swipeData[0])
    // let a = this.swipeData[this.swipeData.length - 1];
    // let b = this.swipeData[0];
    // let arr = [];
    // arr = this.swipeData.slice(0);
    // arr.push(b);
    // arr.unshift(a);
    let arr = this.swipeData[0]
    console.log(arr);
    this.imgU = arr;
  },
  // computed: {
  //   imgU () {
  //     let a = this.swipeData[this.swipeData.length - 1];
  //     let b = this.swipeData[0];
  //     let arr = [];
  //     arr = this.swipeData.slice(0);
  //     arr.push(b);
  //     arr.unshift(a);
  //     console.log(arr)
  //     return arr;
  //   }
  // },
  updated () {
    console.log(this.swipeData[0], this.test, this.test[0])
  },
  mounted () {
    console.log(this.swipeData[0], this.test, this.test[0])
    // let s = document.getElementById('s');
    let sw = document.getElementById('sw');
    let scImg = document.getElementsByClassName('sc-img');
    // s.setAttribute('style', `width: ${this.sw}px`);
    sw.setAttribute('style', `height: ${this.sh}px; width: ${(this.swipeData.length + 2) * 100}%;`);
    for (let i = 0, len = scImg.length; i < len; i++) {
      scImg[i].setAttribute('width', `100%`);
    }
    // this.auto(this.sw);
  },
  methods: {
    // auto (addN) {
    //   let sw = document.getElementById('sw');
    //   setTimeout(() => {
    //     sw.style.left = `${-this.sw}px`;
    //     // sw.style.transition = `all 2s ease`;
    //     this.sw += addN;
    //     // console.log(this.sw, this.swipeData.length * addN)
    //     if (this.sw >= (this.swipeData.length + 2) * addN) {
    //       this.sw = 0;
    //     }
    //     this.auto(addN);
    //   }, this.time);
    // },
    next () {
    //   if (this.lrJudge) {
    //     this.lrJudge = false;
    //     this.move += this.sw;
    //     this.flag++;
    //     let sw = document.getElementById('sw');
    //     let img = document.getElementsByClassName('sc-img')[0];
    //     sw.style.transform = `translate(${-this.move}px)`;
    //     sw.style.transition = `all 2s ease`;
    //     if (this.endJudge) {
    //       this.endJudge = false;
    //       sw.addEventListener('transitionend', () => {
    //         this.lrJudge = true;
    //         if (this.flag == this.swipeData.length) {
    //           this.flag = 0;
    //           this.move = this.sw;
    //           sw.style.transition = `all 0s ease`;
    //           sw.style.transform = `translate(${-this.move}px)`;
    //         }
    //         if (this.flag == -1) {
    //           this.flag = this.swipeData.length;
    //           this.move = (this.swipeData + 1) * this.sw;
    //           sw.style.transition = `all 0s ease`;
    //           sw.style.transform = `translate(${-this.move}px)`;
    //         }
    //       })
    //     }
    //   }
    },
    previous () {
    //   if (this.lrJudge) {
    //     this.lrJudge = false;
    //     this.move -= this.sw;
    //     this.flag--;
    //     let sw = document.getElementById('sw');
    //     let img = document.getElementsByClassName('sc-img')[0];
    //     sw.style.transform = `translate(${-this.move}px)`;
    //     sw.style.transition = `all 2s ease`;
    //     if (this.endJudge) {
    //       this.endJudge = false;
    //       sw.addEventListener('transitionend', () => {
    //         this.lrJudge = true;
    //         if (this.flag == this.swipeData.length) {
    //           this.flag = 0;
    //           this.move = this.sw;
    //           sw.style.transition = `all 0s ease`;
    //           sw.style.transform = `translate(${-this.move}px)`;
    //         }
    //         if (this.flag == -1) {
    //           this.flag = this.swipeData.length;
    //           this.move = (this.swipeData.length) * this.sw;
    //           // console.log(this.move)
    //           sw.style.transition = `all 0s ease`;
    //           sw.style.transform = `translate(${-this.move}px)`;
    //         }
    //       })
    //     }
    //   }
    }
  }
}
</script>

<style lang="less" scoped>
.swipe {
  width: 100%;
  height: auto;
  margin: 0 auto;
  overflow: hidden;
  position: relative;
  .swipe-container {
    position: relative;
    top: 0;
    z-index: 2;
    display: flex;
    justify-content: flex-start;
    .sc-img {
      // width: 100%;
      height: 100%;
      .img {
        width: 100%;
        height: 100%;
      }
    }
  }
}
</style>
