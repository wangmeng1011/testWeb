<template>
  <el-dialog
    :title="type?'新增':'编辑'"
    :visible.sync="visible"
  >
    <div class="host-add-or-update">
      <el-form ref="dataForm" :model="dataForm" label-width="120px" :rules="rules">
        <el-form-item label="月份" prop="month">
          <!-- <el-input v-model="dataForm.month"></el-input> -->
           <el-date-picker
              value-format="yyyy-MM"
              v-model="dataForm.month"
              type="month"
              placeholder="选择月">
            </el-date-picker>
        </el-form-item>
         <el-form-item label="任务标题" prop="task_name">
          <el-input v-model="dataForm.task_name"></el-input>
        </el-form-item>
         <el-form-item label="测试人员" prop="tester">
          <el-input v-model="dataForm.tester"></el-input>
        </el-form-item>
         <el-form-item label="开发人员" prop="develop">
          <el-input v-model="dataForm.develop"></el-input>
        </el-form-item>
          <el-form-item label="测试开始时间" prop="start_time">
            <el-date-picker
              value-format="yyyy-MM-dd"
              v-model="dataForm.start_time"
              type="date"
              placeholder="选择日期">
            </el-date-picker>
        </el-form-item>
          <el-form-item label="测试结束时间" prop="end_time">
          <el-date-picker
              value-format="yyyy-MM-dd"
              v-model="dataForm.end_time"
              type="date"
              placeholder="选择日期">
            </el-date-picker>
        </el-form-item>
          <el-form-item label="发版时间" prop="publish_time">
           <el-date-picker
              v-model="dataForm.publish_time"
              value-format="yyyy-MM-dd"
              type="date"
              placeholder="选择日期">
            </el-date-picker>
        </el-form-item>
      </el-form>
    </div>
    <div slot="footer">
      <el-button @click="visible = false">取 消</el-button>
      <el-button type="primary" @click="submitData" v-loading="loading">确 定</el-button>
    </div>
  </el-dialog>
</template>
<script>
export default {
  data() {
    return {
      visible:false,
      loading:false,
      type:'post',
      dataForm: {
        id:"",
        month:"",
        task_name:"",
        tester:"",
        develop:"",
        start_time:"",
        end_time:"",
        publish_time:""
      },
      caseList:[],
      rules:{
        month:[{required: true, message:'请输入', trigger: 'blur'}],
        tester:[{required: true, message:'请输入', trigger: 'blur'}],
        develop:[{required: true, message:'请输入', trigger: 'blur'}],
        start_time:[{required: true, message:'请输入', trigger: 'blur'}],
      }
    };
  },
  created(){
    // // 获取项目列表
    //  this.$http({
    //    url:"/test/case",
    //    method:'get',
    //    params:{
    //      page:1,
    //      limit:9999
    //    }
    //  }).then(res=>{
    //    this.caseList=res.result.map(item=>{
    //       return  {
    //         label:item.name,
    //         value:item.id
    //       }
    //    })
    //  })
  },
  methods: {
   init(data){
         this.visible=true;
        if(data){
            this.type="put";
            this.dataForm=Object.assign({},this.dataForm,data)
             this.$nextTick(()=>{
              this.$refs['dataForm'].clearValidate();
            })
        }
        else{
            this.type="post";
            this.dataForm= {
              // id:"",
              month:"",
              task_name:"",
              tester:"",
              develop:"",
              start_time:"",
              end_time:"",
              publish_time:""
            },
            this.$nextTick(()=>{
              this.$refs['dataForm'].clearValidate();
            })
        }
    },
     submitData(){
      this.$refs['dataForm'].validate(valid=>{
        if(valid){
          this.loading=true;
          let url=this.type=='post'?'/task/test/':`/task/test/${this.dataForm.id}/`
          this.$http({
            url:url,
            method:this.type,
            data:{
              ...this.dataForm,
            }
          }).then(res=>{
            this.$message.success("操作成功")
            this.visible = false;
            this.$parent.query();
          }).finally(()=>{
            this.loading=false
          })
        }
        else{
          return false
        }
      })
    }
  },
};
</script>
<style lang="scss" scoped>
.host-add-or-update {
  .el-form {

  }
}
</style>
