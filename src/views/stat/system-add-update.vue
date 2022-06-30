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
        <el-form-item label="解决方案" prop="handle">
          <el-input type="textarea" v-model="dataForm.handle"></el-input>
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
        handle:"",
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
              handle:"",
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
          let url=this.type=='post'?'/question/':`/question/${this.dataForm.id}/`
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
