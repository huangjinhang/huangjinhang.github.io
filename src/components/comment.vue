<template>
  <div class="cmt-container">
    <h4>发表评论</h4>
    <textarea placeholder="请输入需要评论的内容" v-model="msg"></textarea>

    <mt-button type="primary" size="large" @click="publish">发表评论</mt-button>

    <div class="cmt-list">
      <div class="cmt-item" v-for="(item,i) in commentList" :key="item.add_time">
        <div class="cmt-title">
          第{{i+1}}楼 &nbsp; &nbsp; 用户：{{item.user_name}} &nbsp; &nbsp; 发表时间：{{item.add_time | dateFormat}}
        </div>
        <div class="cmt-body">
          {{item.content === (''||'undefined') ? '此用户很懒，什么都没留下':item.content}}
        </div>
      </div>
    </div>
    <mt-button type="danger" size="large" plain @click="more">加载更多</mt-button>
  </div>

</template>

<script>
    import {Toast} from 'mint-ui';

    export default {
        name: "comment",
        data() {
            return {
                commentList: [],
                pageIndex: 1,  //默认展示第一页数据
                msg: ''
            }
        },
        props: ['parentID'],
        created() {
            this.getComments()
        },
        methods: {
            publish() {
                if (this.msg.trim().length === 0) {
                    return Toast('评论内容不能为空！')
                }
                //trim()的作用是清除空格
                this.$http.post('api/postcomment/' + this.parentID, {content: this.msg.trim()}).then(result => {
                    if (result.body.status === 0) {
                        var cmt = {user_name: '匿名用户',
                            add_time: Date.now(),
                            content: this.msg.trim()}
                        this.commentList.unshift(cmt)
                        this.msg=''
                    } else {
                        Toast('连接失败')
                    }
                })
            },
            more() {
                this.pageIndex++;
                this.getComments()
            },
            getComments() {
                this.$http.get('api/getcomments/' + this.parentID + '?pageindex=' + this.pageIndex).then(result => {
                    if (result.body.status === 0) {
                        //每当数据获取新内容时，不要把数据清空，应该把新数据拼接到老数据中，所以用concat
                        this.commentList = this.commentList.concat(result.body.message);
                    } else {
                        Toast('连接失败')
                    }
                })
            }
        }
    }
</script>

<style scoped>
  .cmt-container textarea {
    font-size: 14px;
    height: 85px;
    margin-bottom: 0;
  }

  .cmt-item {
    font-size: 13px;
    margin-top: 5px;
  }

  .cmt-title {
    line-height: 30px;
    background-color: #ccc;
  }

  .cmt-body {
    line-height: 35px;
    text-indent: 2em;
  }
</style>
