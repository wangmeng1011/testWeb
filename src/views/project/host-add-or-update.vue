<template>
  <el-dialog
    :title="type?'新增':'编辑'"
    :visible.sync="visible"
  >
    <div class="host-add-or-update">
      <el-form ref="dataForm" :model="dataForm" label-width="120px" :rules="rules">
        <el-form-item label="HOST名称" prop="name">
          <el-input v-model="dataForm.name"></el-input>
        </el-form-item>
       <el-form-item label="HOST地址" prop="host">
          <el-input v-model="dataForm.host"></el-input>
        </el-form-item>
         <el-form-item label="所属项目" prop="project_id">
          <el-select v-model="dataForm.project_id" placeholder="请选择">
            <el-option v-for="(item,index) in projectList" :key="index" :label="item.label" :value="item.value"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="HOST描述" prop="description">
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
export default {
  data() {
    return {
      visible:false,
      loading:false,
      type:'post',
      projectList:[],
      dataForm: {
        id:'',
        name: "",
        host:"",
        project_id: '',
        description:"",
      },
      rules:{
        name:[{required: true, message:'请输入', trigger: 'blur'}],
        host:[{required: true, message:'请输入', trigger: 'blur'}],
        project_id:[{required: true, message:'请输入', trigger: 'blur'}],
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
          console.log(333,data)
        if(data){

            this.type="put";
            this.dataForm={
              id:data.id,
              name:data.name,
              host:data.host,
              project_id:data.project_id,
              description:data.description,
            }
             this.$nextTick(()=>{
              this.$refs['dataForm'].clearValidate();
            })
        }
        else{
           this.dataForm.project_id = this.projectList[0].value
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
          let url=this.type=='post'?'/api/host/':`/api/host/${this.dataForm.id}/`
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
