<template>
  <el-dialog
    :title="type?'新增':'编辑'"
    :visible.sync="visible"
  >
    <div class="host-add-or-update">
      <el-form ref="dataForm" :model="dataForm" label-width="80px" :rules="rules">

        <el-form-item label="模块名称" prop="modular">
          <el-input v-model="dataForm.modular"></el-input>
        </el-form-item>
        <!-- <el-form-item label="用例数" prop="modular_function_case">
          <el-input v-model="dataForm.modular_function_case"></el-input>
        </el-form-item> -->
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
        // modular_function:"",
        // modular_function_case:"",
      },
      projectList:[],
      rules:{
        modular:[{required: true, message:'请输入', trigger: 'blur'}],
        // modular_function:[{required: true, message:'请输入', trigger: 'blur'}],
        // modular_function_case:[{required: true, message:'请输入', trigger: 'blur'}],
      }
    };
  },
  created(){
    // // 获取项目列表
    //  this.$http({
    //    url:"/test/project",
    //    method:'get'
    //  }).then(res=>{
    //    this.projectList=res.results.map(item=>{
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
        if(data.id){
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
              project:data.project
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
          let url=this.type=='post'?'/chandao/modular/':`/chandao/modular/${this.dataForm.id}/`
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
