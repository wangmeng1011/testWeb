<template>
    <div class="test-add-or-update">
      <el-form ref="dataForm" :model="dataForm" label-width="80px" :rules="rules">
        <el-form-item label="用例名称" prop="name">
          <el-input v-model="dataForm.name"></el-input>
        </el-form-item>
        <!-- <el-form-item label="用例参数">
             <el-table :data="configs" >
                <el-table-column prop="name" label="key" width="200px">
                  <template slot-scope="scope">
                    <el-input v-model="scope.row.name" placeholder="请输入"></el-input>
                  </template>
                </el-table-column>
                <el-table-column prop="value" label="value"  width="200px">
                  <template slot-scope="scope">
                    <el-input v-model="scope.row.value" placeholder="请输入"></el-input>
                  </template>
                </el-table-column>
                <el-table-column label="操作" width="200px">
                    <template slot-scope="scope">
                      <el-button type="primary" icon="el-icon-plus" @click="addHeader"></el-button>
                      <el-button type="danger" icon="el-icon-minus" @click="removeHeader(scope.$index)"></el-button>
                    </template>
                </el-table-column>
              </el-table>
        </el-form-item> -->
        <el-form-item>
          <el-row :gutter="24">
            <el-col :span="12">
              <div class="grid-content bg-purple">
                <case-list v-model="apiList"></case-list>
              </div>
            </el-col>
            <!-- <el-col :span="10"><el-form-item label="请求参数" prop="expect_content">
              <el-table :data="requestData" :show-header="false" :highlight-current-row="false" row-class-name="rowSty">
                <el-table-column prop="name" width="230">
                  <template slot-scope="scope">
                    <el-input v-model="scope.row.name" placeholder="参数名"></el-input>
                  </template>
                </el-table-column>
                <el-table-column prop="value">
                  <template slot-scope="scope">
                    <el-input v-model="scope.row.value" placeholder="参数值"></el-input>
                  </template>
                </el-table-column>
                <el-table-column>
                    <template slot-scope="scope">
                      <el-button v-if="scope.$index==0" type="primary" size="mini"  icon="el-icon-plus" @click="addRequest"></el-button>
                      <el-button type="danger" icon="el-icon-minus" size="mini"  @click="removeRequest(scope.$index)"></el-button>
                    </template>
                  </el-table-column>
              </el-table>
            </el-form-item></el-col> -->
            <!-- <el-col :span="6">
              <div class="list-item">
                <el-form-item label="期望内容" prop="reset_expect_content">
                  <el-input
                    type="textarea"
                    resize="none"
                    :rows="3"
                    v-model="dataForm.reset_expect_content"
                    placeholder="请输入"
                  ></el-input>
                </el-form-item>
             </div>
            </el-col> -->
          </el-row>
        </el-form-item>
        <el-form-item label="用例描述" prop="description">
          <el-input type="textarea" resize="none" :rows="4" v-model="dataForm.description" placeholder="请输入"></el-input>
        </el-form-item>
      </el-form>
        <div class="footer" style="text-align:right">
          <el-button @click="$router.push({name:'case-list'})">取 消</el-button>
          <el-button v-loading="loading" type="primary" @click="submitData">确 定</el-button>
        </div>
    </div>

</template>
<script>
import Cookies from 'js-cookie'
import caseList from '@/views/project/case-components/steps'
export default {
    name:"case-add",
  components:{ caseList },
  data() {
    return {
      loading:false,
      type:'post',
      id:0,
      dataForm: {
        name: "",
        description:"",
      },
      rules:{
        name:[{required: true, message:'请输入', trigger: 'blur'}]
      },
      apiList:[
        {
          id:'',
          arguments:[{name:"",origin:"",format:""}]
        }
      ],
      configs:[{name:"",value:""}],
      requestData:[{name:"",value:""}],
    };
  },
  created() {
    let id=this.$route.query.id;
    this.type='post';
    if(id){
      this.id = id;
      let data=window.localStorage.getItem('case_data');
      data=JSON.parse(data);
      data=data['case'+id];
      this.dataForm={
        name:data.name,
        description:data.description,
      }
      this.apiList=data.api_list;
      this.configs=data.arguments;
      this.type='put'
    }
  },
  methods: {
    addHeader(){
      this.$set(this.configs,this.configs.length,{name:"",value:""});
    },
    removeHeader(row){
      if(this.configs.length==1){
        return this.$message.warning("仅剩最后一条，无法删除")
      }
      this.configs=this.configs.filter((item,index)=>index!=row)
    },
        // 处理数据
    handleData(obj){
      return obj.filter(item=>{
        const Item = Array.from(new Set(Object.values(item)))
        return Item.length !== 1 || (Item.length === 1 && Item[0] !== "")
      })
    },
    submitData(){
      this.$refs['dataForm'].validate(valid=>{
        if(valid){
          this.loading=true;
          let url=this.type=='post'?'/case/case/':`/case/case/${this.id}/`
          const params = this.apiList.map((item,index)=>{
            return {
              // api:item.api,
              index:index,
              reset_data:item.reset_data ?? '',
              reset_expect_content:item.reset_expect_content ?? '',
              reset_expect_code:item.reset_expect_code ?? '',
              api:item.api
            }
          })
          this.$http({
            url:url,
            method:this.type,
            data:{
              ...this.dataForm,
              api_list:params,
            }
          }).then(res=>{
            this.$message.success("操作成功")
            this.$router.push({name:"case-list"})
          }).finally(()=>{
            this.loading=false
          })
        }
        else{
          return false
        }
      })
    },
    addRequest(){
      this.$set(this.requestData,this.requestData.length,{name:"",value:""});

    },
    removeRequest(row){
      if(this.requestData.length === 1) {
        return this.$message.warning("仅剩最后一条，无法删除")
      }
      this.requestData=this.requestData.filter((item,index)=>index!=row)
    }
  },
};
</script>
<style lang="scss" scoped>
.el-form {
  .el-form-item{
    .el-input{
      max-width: 240px;
    }
  }
}
/deep/ .el-table td, .el-table th{
  padding:  0 0 20px 0;
}
/deep/ .el-table tbody tr:hover>td {
    background-color:#ffffff!important
}
.rowSty{
  background: red;
}
</style>
