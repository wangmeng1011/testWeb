<template>
  <el-dialog
    :title="type?'新增':'编辑'"
    :visible.sync="visible"
  >
    <div class="host-add-or-update">
      <el-form ref="dataForm" :model="dataForm" label-width="80px" :rules="rules">

        <el-form-item label="名称" prop="name">
          <el-input v-model="dataForm.name"></el-input>
        </el-form-item>
         <el-form-item label="表达式" prop="expr">
          <el-input v-model="dataForm.expr"></el-input>
        </el-form-item>
         <el-form-item label="用例集" prop="casroutere_id">
            <el-select v-model="dataForm.case_id" multiple value-key="id" placeholder="请选择">
            <el-option v-for="(item,index) in caseList" :key="index" :label="item.label" :value="item.value"></el-option>
          </el-select>
        </el-form-item>
<!--         <el-form-item label="状态" prop="status">-->
<!--            <el-radio v-model="dataForm.status" :label="1">启用</el-radio>-->
<!--            <el-radio v-model="dataForm.status" :label="2">禁用</el-radio>-->
<!--        </el-form-item>-->
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
        name:"",
        expr:"",
        case_id:"",
      },
      caseList:[],
      rules:{
        modular:[{required: true, message:'请输入', trigger: 'blur'}],
        // modular_function:[{required: true, message:'请输入', trigger: 'blur'}],
        // modular_function_case:[{required: true, message:'请输入', trigger: 'blur'}],
      }
    };
  },
  created(){
    // // 获取项目列表
     this.$http({
       url:"/case/case/",
       // url:"/generate/run",
       method:'get',
       params:{
         page:1,
         size:9999
       }
     }).then(res=>{
       this.caseList=res.results.map(item=>{
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
            this.type="put";
            data.case_id = JSON.parse(data.case_id);
            this.dataForm=data
            console.log(data)
             this.$nextTick(()=>{
              this.$refs['dataForm'].clearValidate();
            })
        }
        else{
            this.type="post";
            this.dataForm= {
              name:"",
              expr:"",
              case_id:"",
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
          let url=this.type=='post'?'/task/crontab/':`/task/crontab//${this.dataForm.id}/`
          let dataForm = {
            expr:this.dataForm.expr,
            name:this.dataForm.name,
            case_id:JSON.stringify(this.dataForm.case_id)
          };
          this.$http({
            url:url,
            method:this.type,
            data:{
              ...dataForm,
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
