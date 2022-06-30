<template>
  <el-dialog
    :title="type?'新增':'编辑'"
    :visible.sync="visible"
  >
    <div class="host-add-or-update">
      <el-form ref="dataForm" :model="dataForm" label-width="80px" :rules="rules">
        <el-form-item label="项目名称" prop="name">
          <el-input v-model="dataForm.name"></el-input>
        </el-form-item>
        <el-form-item label="项目类型" prop="type">
          <el-select v-model="dataForm.type" placeholder="请选择">
            <el-option label="web" value="web"></el-option>
            <el-option label="app" value="app"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="创建人">
          <el-input v-model="username" readonly></el-input>
        </el-form-item>
        <el-form-item label="描述" prop="description">
          <el-input type="textarea" resize="none" :rows="4" v-model="dataForm.description" placeholder="请输入"></el-input>
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
  import Cookies from 'js-cookie'
  export default {
    data() {
      return {
        visible:false,
        type:'post',
        loading:false,
        dataForm: {
          id:"",
          name: "",
          type:"",
          description:"",
        },
        rules:{
          name:[{required: true, message:'请输入', trigger: 'blur'}],
          type:[{required: true, message:'请输入', trigger: 'blur'}],
        }
      };
    },
    computed:{
      username(){
        return  Cookies.get("sys_username")
      }
    },
    methods: {
      init(data){
        this.visible=true;
        if(data){
          this.type="put";
          this.dataForm={
            id:data.id,
            name:data.name,
            type:data.type,
            description:data.description,
          }
          this.$nextTick(()=>{
            this.$refs['dataForm'].clearValidate();
          })
        }
        else{
          this.type="post";
          this.$nextTick(()=>{
            this.$refs['dataForm'].resetFields();
          })
        }
      },
      submitData(){
        this.$refs['dataForm'].validate(valid=>{
          if(valid){
            this.loading=true;
            let url=this.type=='post'?'/api/project/':`/api/project/${this.dataForm.id}/`
            this.$http({
              url:url,
              method:this.type,
              data:{
                ...this.dataForm,
                user:Cookies.get("sys_uid")
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
