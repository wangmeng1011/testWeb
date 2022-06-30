<template>
  <el-dialog
    :title="type?'新增':'编辑'"
    :visible.sync="visible"
  >
    <div class="host-add-or-update">
      <el-form ref="dataForm" :model="dataForm" label-width="80px" :rules="rules">
        <el-form-item label="所属项目" prop="project">
           <el-select v-model="dataForm.project" placeholder="请选择">
            <el-option v-for="(item,index) in projectList" :key="index" :label="item.label" :value="item.value"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="问题" prop="question">
          <el-input type="textarea" autosize v-model="dataForm.question"></el-input>
        </el-form-item>
        <el-form-item label="原因" prop="reason">
          <el-input type="textarea" resize="none" :rows="4" v-model="dataForm.reason" placeholder="请输入"></el-input>
        </el-form-item>
        <el-form-item label="发现人" prop="discoverer">
          <el-input v-model="dataForm.discoverer"></el-input>
        </el-form-item>
        <el-form-item label="解决时间" prop="solve_time">
          <el-date-picker
          v-model="dataForm.solve_time"
          type="datetime"
          placeholder="选择日期时间">
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
        project: "",
        question:"",
        reason:"",
        discoverer:"",
        solve_time:null,
      },
      projectList:[],
      rules:{
        name:[{required: true, message:'请输入', trigger: 'blur'}],
        host:[{required: true, message:'请输入', trigger: 'blur'}],
      }
    };
  },
  created(){
    // 获取项目列表
     this.$http({
       url:"/api/project/",
       method:'get'
     }).then(res=>{
       this.projectList=res.results.map(item=>{
          return  {
            label:item.name,
            value:item.id
          }
       })
     })
  },
  methods: {
   init(data){
         this.visible=true;
        if(data){
          console.log(data)
            this.type="put";
            this.dataForm=Object.assign(this.dataForm,data)
             this.$nextTick(()=>{
              this.$refs['dataForm'].clearValidate();
            })
        }
        else{
            this.type="post";
            this.dataForm= {
              project: "",
              question:"",
              reason:"",
              discoverer:"",
              solve_time:null,
            },
            this.$nextTick(()=>{
              this.$refs['dataForm'].resetFields();
            })
        }
    },
     submitData(){
      this.$refs['dataForm'].validate(valid=>{
        if(valid){
          this.loading=true;
          let url=this.type=='post'?'/question/bug/':`/question/bug/${this.dataForm.id}/`
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