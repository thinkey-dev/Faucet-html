<template>
  <div class="con">
    <div class="header" style="display: flex">
      <div class="header_pad">
        <span class="logo"></span>
      </div>
      <div class="tab_select_1" style="display: inline-block;width: 120px;margin-top: 23px;font-size: 18px">
        <el-dropdown trigger="click" style="position: relative;left: 20px;width: 120px;font-size: 18px">
          <span class="el-dropdown-link">
        {{language}}<i class="el-icon-arrow-down el-icon--right"></i>
          </span>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item @click.native="switch_language('zh')">中文</el-dropdown-item>
            <el-dropdown-item @click.native="switch_language('en')">English</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
      </div>
    </div>
    <div class="content">
      <div class="con_title">
        {{ $t('test_net_faucet')}}
      </div>
      <div class="con_bo">
        <div class="con_input">
          <el-input v-model="address" style="width: 60%;margin-right: 2%;height: 60px"
                    :placeholder="$t('tishi')"></el-input>
          <el-select v-model="value" :placeholder="$t('tishi1')" style="width: 13%" @change="choose_token()">
            <el-option
              v-for="item in options"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
        </div>
        <div class="con_sure">
          <el-button type="primary" @click="get_tokens()">{{ $t('get_test_tokens')}}</el-button>
        </div>
        <div class="description">
          <span class="de_text">
          {{ $t('say_6')}}<br>
          {{ $t('say_1')}}<br>
          </span>
          <span class="de_text">
            {{ $t('say_2')}}<br>
            {{ $t('say_3')}}
          </span>
          <span class="de_text">
              {{ $t('say_4')}}<br>
            {{ $t('say_5')}}
          </span>

        </div>
      </div>

    </div>
  </div>
</template>

<script>
  import {
    getalltokeninfo,
    test,
  } from '../api/interface'

  export default {
    name: "index",
    data() {
      return {
        options: [],
        value: '',
        address: ''
      }
    },
    methods: {
      /*选择后的代币种类*/
      choose_token() {
        console.log(this.value)
      },
      /*初始化数据*/
      initialization_data() {
        getalltokeninfo().then(response => {
          this.value = "THK"
          this.options.push({"lable": 0, "value": 'THK'})
          response.forEach((item, index, self) => {
            this.options.push({"lable": index + 1, "value": item.name})
          })
        })
      },
      /*确认获取代币*/
      get_tokens() {
        if (this.address == '' || this.address == undefined) {
          this.$message({
            showClose: true,
            message: '测试账户地址不能为空！',
            type: 'error'
          });
        } else {
          let data = {
            "address": this.address,
            "name": this.value
          }
          test(data).then(response => {
            console.log(response.eCode)
            if (response.eCode == 409) {
              this.$message({
                showClose: true,
                message: '同一种代币的CD为10分钟！请求过于频繁请稍后重试！',
                type: 'error'
              });
            } else if (response.eCode == 410) {
              this.$message({
                showClose: true,
                message: '测试账户地址有误！请检查后重试！',
                type: 'error'
              });
            } else if (response.eCode == undefined) {
              this.$message({
                showClose: true,
                message: '获取测试代币成功',
                type: 'success'
              });
            } else {
              this.$message({
                showClose: true,
                message: '获取测试代币失败！',
                type: 'error'
              });
            }
          })
        }
      },
      switch_language(e) {
        this.$i18n.locale = e
        console.log(this.$i18n.locale)
        this.$store.dispatch('app/setLanguage', e)
      },
      language_is() {
        if (this.$i18n.locale === 'en') {
          this.language = 'English'
        } else {
          this.language = '中文'
        }
      },
    },
    created() {
      this.initialization_data()
      this.language_is()
    },
    computed: {
      language_change() {
        return this.$i18n.locale;
      }
    },
    watch: {
      language_change(e) {
        this.language_is()
      }
    }
  }
</script>
<style>
  .el-input__inner {
    height: 60px;
  }
</style>
<style scoped>
  .el-dropdown-link {
    cursor: pointer;
    color: #800080;
    user-select: none;
  }

  .de_text {
    display: inline-block;
    margin-top: 20px;
  }

  .description {
    width: 100%;
    margin-left: 0%;
    line-height: 2;
  }

  .con_sure {
    margin-top: 50px;
    text-align: center;
  }

  .con_input {
    text-align: center;
  }

  .con {
    width: 100%;
  }

  .header_pad {
    padding: 0 80px;
  }

  .logo {
    display: inline-block;
    width: 100px;
    height: 50px;
    position: relative;
    top: 8px;
    background: url("../assets/images/logo_1.png") no-repeat;
  }

  .con_title {
    height: 25px;
    width: 100%;
    text-align: center;
    font-size: 20px;
    color: #800080;
    font-weight: bold;
  }

  .con_bo {
    margin-top: 50px;
    width: 70%;
    margin-left: 15%;
  }
</style>
