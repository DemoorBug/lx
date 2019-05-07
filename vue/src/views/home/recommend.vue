<template>
  <div class="recommend" >
    <h3 class="recommend-title">热卖推荐</h3>
    <div class="loading-container" v-if="!recommends.length">
      <me-loading inline/>
    </div>
    <ul class="recommend-list" v-else>
      <li class="recommend-item"
        v-for="(item, index) in recommends"
        :key="index"
      >
        <router-link
          :to="{ name: 'home-product', params: { id: item.baseinfo.itemId } }"
        >
          <p class="recommend-pic"><img v-lazy="item.baseinfo.picUrlNew" alt="" class="recommend-img"></p>
          <p class="recommend-name">{{ item.name.shortName }}</p>
          <p class="recommend-origPrice"><del>￥{{ item.price.origPrice }}</del></p>
          <p class="recommend-info">
            <span class="recommend-price">￥<strong class="recommend-price-num">{{ item.price.actPrice }}</strong></span>
            <span class="recommend-count">{{ item.remind.soldCount }}件已售</span>
          </p>
        </router-link>
      </li>
    </ul>
  </div>
</template>

<script>
import { getHomeRecommend } from 'api/home'
import MeLoading from 'base/loading'

export default {
  name: 'HomeRecommend',
  data () {
    return {
      recommends: [],
      curPage: 1,
      totalPage: 1
    }
  },
  created () {
    this.getRecommend()
  },
  components: {
    MeLoading
  },
  methods: {
    getRecommend () {
      // 获取第几条，总共有多少条，如果获取的条数大于总共条目，则停止请求
      if (this.curPage > this.totalPage) {
        return
      }
      getHomeRecommend(this.curPage).then(data => {
        if (data) {
          this.curPage++
          this.totalPage = data.totalPage
          // this.recommends = this.recommends.concat(data.itemList)
          this.recommends = [ ...this.recommends, ...data.itemList ]
          this.$emit('loading', this.recommends)
        }
      })
    }
  }
}
</script>

<style lang="less" scoped>
@import '~assets/less/_mixins.less';

.recommend {
  &-title {
    position: relative;
    width: 100%;
    padding: 10px 0;
    font-size: @font-size-l;
    text-align: center;

    &::before,
    &::after {
      content: ' ';
      position: absolute;
      top: 50%;
      width: 40%;
      height: 1px;
      background-color: #ddd;
    }
    &::before {
      left: 0;
    }
    &::after {
      right: 0;
    }
  }
  &-list {
    display: flex;
    justify-content: space-between;
    flex-wrap: wrap;
  }
  &-item {
    width: 49%;
    background-color: #fff;
    box-shadow: 0 1px 1px 0 rgba(0, 0, 0,.12);
    margin-bottom: 8px;
  }
  &-link {
    display: block;
  }
  &-pic {
    position: relative;
    width: 100%;
    padding-top: 100%;
    margin-bottom: 5px;
  }
  &-img {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
  }
  &-name {
    height: 72/@r;
    padding: 0 5px;
    margin-bottom: 8px;
    line-height: 1.5;
    .multiline-ellipsis();
  }
  &-origPrice {
    padding: 0 5px;
    margin-bottom: 8px;
    color: #ccc;
  }
  &-info {
    display: flex;
    justify-content: space-between;
    padding: 0 5px;
    margin-bottom: 8px;
  }
  &-price {
    color: #e61414;
  }
  &-price-num {
    font-size: 20px;
  }
  &-count {
    color: #999;
  }
  .loading-container {
    padding-top: 50/@r;
  }
  img[lazy=error],
  img[lazy=loading] {
    /*your style here*/
    width: auto;
    height: auto;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
  }

}

</style>
