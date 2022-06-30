<template>
  <el-dialog
    :title="detail.title"
    :visible.sync="visible"
  >
    <el-row>
        <el-col :span="24">
            <div class="">
                {{detail.title}}
            </div>
        </el-col>
    </el-row>
    <div class="table-body">
        <el-row>
            <el-col :span="24">
                <div class="table-title">
                    <span>前置条件</span><br>
                    {{detail.preconditions}}
                </div>
            </el-col>
        </el-row>
        <el-row>
            <el-col :span="4">
                <div class="table-step table-header">
                    编号
                </div>
            </el-col>
            <el-col :span="5">
                <div class="table-step table-header">
                    步骤
                </div>
            </el-col>
            <el-col :span="5">
                <div class="table-step table-header">
                    预期
                </div>
            </el-col>
            <el-col :span="5">
                <div class="table-step table-header">
                    测试结果
                </div>
            </el-col>
            <el-col :span="5">
                <div class="table-step table-header">
                    实际情况
                </div>
            </el-col>
        </el-row>
        <!-- v-for="item in case_type_options"
                :key="item.value"
                :label="item.label"
                :value="item.value"> -->
        <el-row v-for="(item, i) in detail.case" :key="i">
            <el-col :span="4">
                <div class="table-step table-case">
                    {{i+1}}
                </div>
            </el-col>
            <el-col :span="5">
                <div class="table-step table-case">
                    {{item.step}}
                </div>
            </el-col>
            <el-col :span="5">
                <div class="table-step table-case">
                    {{item.expect}}
                </div>
            </el-col>
            <el-col :span="5">
                <div class="table-step table-case">
                    <el-select v-model="item.case_result" placeholder="请选择" @change="dataChange($event, item)">
                      <el-option
                        v-for="o in result_options"
                        :key="o.value"
                        :label="o.label"
                        :value="o.value"
                        :disabled="o.disabled">
                      </el-option>
                    </el-select>
                </div>
            </el-col>
            <el-col :span="5">
                <div class="table-step table-case">
                    <el-input v-model="item.remarks" type="textarea" autosize placeholder=""></el-input>
                </div>
            </el-col>
        </el-row>
        <el-row>
            <el-col :span="24">
              <div style="text-align:center">
                <el-button type="primary" @click="submitRun">保存</el-button>
              </div>
            </el-col>
        </el-row>
    </div>
  </el-dialog>
</template>
<script>
export default {
  data() {
    return {
      visible:false,
      loading:false,
      detail:{},
      result_options:[{
        value: 'unexecuted',
        label: 'unexecuted'
      }, {
        value: 'pass',
        label: 'pass'
      }, {
        value: 'fail',
        label: 'fail'
      }]
    };
  },
  created(){
  },
  methods: {
   init(data){
        this.visible=true;
        this.title="post";
        this.detail = data,
        console.log(data, "数据初始化")
        this.$nextTick(()=>{
        })
    },
    dataChange(event, item){
      console.log(event, 'event');
      console.log(item, 'item');
      this.detail.case.forEach(element => {
        if(element.id == item.id){
          element.case_result = event;
        }
      });
      console.log(this.detail, "改变的数据");
    },
    submitRun(){
      console.log("Dasd")
      // 调用修改用例接口
      this.loading=true;
      let url=`/chandao/case/result/${this.detail.id}/`
      let data = this.detail;
      data.case.forEach(item => {
        delete item.case;
      })

      this.$http({
        url:url,
        method:'put',
        data:this.detail.case
      }).then(res=>{
        this.$message.success("操作成功")
        this.visible = false;
        this.$parent.query();
      }).finally(()=>{
        this.loading=false
      })
    }
  },
};
</script>
<style lang="scss" scoped>
  .el-row {
    margin-left: 0px;
    &:last-child {
      margin-bottom: 0;
    }
  }
  .table-step{
    border: 1px solid #cbd0db;
  }
  .table-case{
    height: 60px;
  }
  .table-body{
    border: 1px solid #cbd0db;
    margin-bottom: 10px;
    .table-title{
      margin: 10px 0px 10px 0px;
    }
    .table-header{
      text-align: center;
      font-weight: bold;
      padding: 5px 0px;
    }
  }
</style>
