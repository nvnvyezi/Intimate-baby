<template>
  <div class="mv">
    <header class="mv-sort">
      <div class="mv-containe">
        <section id="artist" class="mc-tag">
          <ul class="t-ul">
            <li @click="mvSel" v-if="index == 0" class="t-li liG li1" v-for="(item, index) in list" :key="index" :val="item.val">{{item.text}}</li>
            <li @click="mvSel" v-if="index != 0" class="t-li li1" v-for="(item, index) in list" :key="index" :val="item.val">{{item.text}}</li>
          </ul>
        </section>
        <section id="artist" class="mc-tag">
          <ul class="t-ul">
            <li @click="mvSel1" v-if="index == 0" class="t-li liG li2" v-for="(item, index) in opt1" :key="index" :val="item.val">{{item.text}}</li>
            <li @click="mvSel1" v-if="index != 0" class="t-li li2" v-for="(item, index) in opt1" :key="index" :val="item.val">{{item.text}}</li>
          </ul>
        </section>
        <section id="version" class="mc-tag">
          <ul class="t-ul">
            <li @click="mvSel2" v-if="index == 0" class="t-li liG li3" v-for="(item, index) in opt2" :key="index" :val="item.val">{{item.text}}</li>
            <li @click="mvSel2" v-if="index != 0" class="t-li li3" v-for="(item, index) in opt2" :key="index" :val="item.val">{{item.text}}</li>
          </ul>
        </section>
        <section id="definition" class="mc-tag">
          <ul class="t-ul">
            <li @click="mvSel3" v-if="index == 0" class="t-li liG li4" v-for="(item, index) in opt3" :key="index" :val="item.val">{{item.text}}</li>
            <li @click="mvSel3" v-if="index != 0" class="t-li li4" v-for="(item, index) in opt3" :key="index" :val="item.val">{{item.text}}</li>
          </ul>
        </section>
      </div>
    </header>
    <div class="mv-container">
      <router-link to="mvplay" tag="section" class="mv-list" v-for="(item, index) in mvArr" :key="index" :data-name="item.name" :data-url="item.mvUrl" @click.native="mvPlay">
        <div class="mv-show">
          <div class="header">
            <div class="mv-img">
              <img class="img" src="" v-lazyLoad="item.imgUrl" :alt="item.name">
            </div>
          </div>
          <div class="update-time">
            <span class="u-name">{{ item.name }}</span>
            <span class="u-time"><time>{{ item.time }}</time></span>
            <span class="u-readers">{{ item.readers }}</span>
          </div>
        </div>
      </router-link>
    </div>
  </div>
</template>

<script>
import { musicMvList, musicMList } from "../../../api/api";
export default {
  name: "musicMv",
  data() {
    return {
      mvArr: [],
      opt1: [],
      opt2: [],
      opt3: [],
      sel: '',
      sel1: '',
      sel2: '',
      sel3: '',
      list: [
        {
          val: 'mlmv',
          text: '内地MV'
        },
        {
          val: 'htmv',
          text: '港台MV'
        },
        {
          val: 'usmv',
          text: '欧美MV'
        },
        {
          val: 'krmv',
          text: '韩语MV'
        },
        {
          val: 'jpmv',
          text: '日语MV'
        },
        {
          val: 'acg',
          text: '动漫MV'
        },
        {
          val: 'other',
          text: '综艺MV'
        }
      ]
    };
  },
  mounted() {
    musicMvList('mlmv', '', res => {
      // console.log(res)
      if (!res.err) {
        this.mvArr = res.result;
      }
      this.$toast(res.data);
    });
    musicMList(res => {
      if (!res.err) {
        // console.log(res)
        this.opt1 = res.result.opt1;
        this.opt2 = res.result.opt2;
        this.opt3 = res.result.opt3;
      }
      // this.$toast(res.data);
    });
  },
  methods: {
    mvPlay(e) {
      let url = e.currentTarget.getAttribute("data-url");
      let name = e.currentTarget.getAttribute("data-name");
      this.$store.commit("changeMvName", name);
      localStorage["mvName"] = name;
      this.$store.commit("changeMvUrl", url);
      localStorage["mvUrl"] = url;
    },
    mvSel (e) {
      let val = e.currentTarget.getAttribute('val');
      let li = document.getElementsByClassName('li1');
      for (let i = 0, len = li.length; i < len; i++) {
        li[i].classList.remove('liG');
      }
      e.currentTarget.classList.add('liG');
      if (val != 'all') {
        this.sel = val;
      } else {
        this.sel = '';
      }
      this.getmv();
    },
    mvSel1 (e) {
      let val = e.currentTarget.getAttribute('val');
      let li = document.getElementsByClassName('li2');
      for (let i = 0, len = li.length; i < len; i++) {
        li[i].classList.remove('liG');
      }
      e.currentTarget.classList.add('liG');
      if (val != 'all') {
        this.sel1 = val;
      } else {
        this.sel1 = '';
      }
      this.getmv();
    },
    mvSel2 (e) {
      let val = e.currentTarget.getAttribute('val');
      let li = document.getElementsByClassName('li3');
      for (let i = 0, len = li.length; i < len; i++) {
        li[i].classList.remove('liG');
      }
      e.currentTarget.classList.add('liG');
      if (val != 'all') {
        this.sel2 = val;
      } else {
        this.sel2 = '';
      }
      this.getmv();
    },
    mvSel3 (e) {
      let val = e.currentTarget.getAttribute('val');
      let li = document.getElementsByClassName('li4');
      for (let i = 0, len = li.length; i < len; i++) {
        li[i].classList.remove('liG');
      }
      e.currentTarget.classList.add('liG');
      if (val != 'all') {
        this.sel3 = val;
      } else {
        this.sel3 = '';
      }
      this.getmv();
    },
    getmv () {
      let tags = '';
      if (this.sel1 != '') {
        tags += this.sel1;
      }
      if (this.sel2 != '' && tags == '') {
        tags += this.sel2;
      } else if(this.sel2 != '' && tags != ''){
        tags += `+${this.sel2}`;
      }
      if (this.sel3 != '' && tags == '') {
        tags += this.sel3;
      } else if(this.sel3 != '' && tags != ''){
        tags += `+${this.sel3}`;
      }
      // console.log(tags)
      musicMvList(this.sel, tags, res => {
        if (!res.err) {
          this.mvArr = res.result;
        }
        this.$toast(res.data);
      });
    }
  }
};
</script>

<style lang="less" scoped>
.liG {
  color: rgb(8, 143, 233) !important;
}
.mv {
  width: 100%;
  height: auto;
  position: relative;
  background: #eee;
  .mv-sort {
    width: 96%;
    // height: 3rem;
    padding: 1rem 0;
    margin: 0 auto;
    .mv-containe {
      width: 100%;
      height: auto;
      .mc-tag {
        width: 100%;
        height: auto;
        border-bottom: .1rem solid rgb(214, 214, 214);
        padding: .5rem 0;
        &:last-child {
          border-bottom: none;
        }
        .t-ul {
          list-style: none;
          .t-li {
            display: inline-block;
            font: 500 1.4rem "微软雅黑";
            color: #333;
            padding: 0 .5rem .5rem .5rem;
          }
        }
      }
    }
  }
  .mv-container {
    width: 100%;
    height: auto;
    display: flex;
    // margin: 0 auto;
    justify-content: space-around;
    align-items: center;
    flex-wrap: wrap;
    .mv-list {
      width: 42%;
      height: auto;
      padding-bottom: 1rem;
      .mv-show {
        width: 100%;
        .header {
          width: 100%;
          height: auto;
          .mv-img {
            width: 100%;
            height: auto;
            .img {
              width: 100%;
              height: 100%;
            }
          }
        }
        .update-time {
          width: 100%;
          height: auto;
          color: #999;
          text-align: left;
          .u-name {
            width: 100%;
            display: inline-block;
            overflow: hidden;
            white-space: nowrap;
            text-overflow: ellipsis;
            color: rgb(78, 78, 78);
            font: 400 1.4rem "微软雅黑";
          }
          .u-time {
            height: 2rem;
            font: 400 1.3rem "微软雅黑";
            display: inline-block;
            &::before {
              content: "";
              display: inline-block;
              width: 2rem;
              height: 2rem;
              background: url("../../../assets/iconfont-日期.svg") no-repeat center
                left;
              background-size: 1.8rem 1.8rem;
              vertical-align: middle;
            }
          }
        }
      }
    }
  }
}
</style>
