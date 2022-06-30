<template>
  <el-dialog
    :title="type == 'post'?'新增':'编辑'"
    :visible.sync="visible"
  >
    <div class="host-add-or-update">
      <el-form ref="dataForm" :model="dataForm" label-width="150px" :rules="rules">

        <el-form-item label="项目名称" prop="project">
          <el-input v-model="dataForm.project"></el-input>
        </el-form-item>
        <el-form-item label="产品负责人" prop="product_person">
          <el-input v-model="dataForm.product_person"></el-input>
        </el-form-item>
        <el-form-item label="测试负责人" prop="test_person">
          <el-input v-model="dataForm.test_person"></el-input>
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
        project: "", // 项目名称
        product_person:"",// 产品负责人
        test_person:"", // 测试负责人
        // modular_function:"",
        // modular_function_case:"",
      },
      projectList:[],
      rules:{
        project:[{required: true, message:'请输入', trigger: 'blur'}],
        product_person:[{required: true, message:'请输入', trigger: 'blur'}],
        test_person:[{required: true, message:'请输入', trigger: 'blur'}],
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
              project: "",
              product_person:"",
              test_person:"",
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
          let url=this.type=='post'?'/chandao/project/':`/chandao/project/${this.dataForm.id}/`
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
