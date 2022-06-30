<template>
  <el-dialog
    :title="type?'新增':'编辑'"
    :visible.sync="visible"
  >
    <div class="host-add-or-update">
      <el-form ref="dataForm" :model="dataForm" label-width="80px" :rules="rules">

        <el-form-item label="业务" prop="modular">
           <el-select v-model="dataForm.modular" placeholder="请选择">
                <el-option v-for="(item,index) in projectList" :key="index" :label="item.label" :value="item.value"></el-option>
              </el-select>
        </el-form-item>
          <el-form-item label="模块" prop="modular_function">
          <el-input v-model="dataForm.modular_function"></el-input>
        </el-form-item>
        <el-form-item label="用例数" prop="modular_function_case">
          <el-input v-model="dataForm.modular_function_case"></el-input>
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
        modular: "",
        modular_function:"",
        modular_function_case:"",
      },
      projectList:[],
      rules:{
        modular:[{required: true, message:'请输入', trigger: 'blur'}],
        modular_function:[{required: true, message:'请输入', trigger: 'blur'}],
        modular_function_case:[{required: true, message:'请输入', trigger: 'blur'}],
      }
    };
  },
  created(){
    // 获取业务列表
     this.$http({
       url:"/test/chanDao/count",
       method:'get'
     }).then(res=>{
       this.projectList=res.result.map(item=>{
          return  {
            label:item.modular,
            value:item.id
          }
       })
     })
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
              id:"",
              modular: "",
              modular_function:"",
              modular_function_case:"",
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
          let url=this.type=='post'?'/test/chanDao/case':`/test/chanDao/case/${this.dataForm.id}`
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
