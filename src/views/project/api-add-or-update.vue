<template>
  <el-dialog :title="type ? '新增' : '编辑'" :visible.sync="visible" width="800px" top="5vh">
    <div class="host-add-or-update">
      <el-form
        ref="dataForm"
        :model="dataForm"
        label-width="100px"
        :rules="rules"
      >
      <el-form-item label="项目" prop="project_id">
          <el-select v-model="dataForm.project_id" disabled placeholder="请选择">
                <el-option v-for="(item,index) in projectList" :key="index" :label="item.label" :value="item.value"></el-option>
              </el-select>
      </el-form-item>
        <p>接口</p>
        <el-row>
          <el-col :span="12">
            <el-form-item label="接口名" prop="name">
              <el-input v-model="dataForm.name" placeholder="请输入"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="请求方法" prop="http_method">
              <el-select v-model="dataForm.http_method" placeholder="请选择">
                <el-option label="POST" value="POST"></el-option>
                <el-option label="GET" value="GET"></el-option>
                <el-option label="PUT" value="PUT"></el-option>
                <el-option label="DELETE" value="DELETE"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
           <el-col :span="12">
            <el-form-item label="请求类型" prop="request_type">
              <el-select v-model="dataForm.request_type" placeholder="请选择">
                <el-option label="form-data" value="form-data"></el-option>
                <el-option label="json" value="json"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="域名" prop="host_id">
              <el-select v-model="dataForm.host_id" placeholder="请选择">
                <el-option v-for="(item,index) in hostList" :key="index" :label="item.label" :value="item.value"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="path" prop="path">
              <el-input v-model="dataForm.path"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <p>请求头</p>
        <el-table :data="headers">
          <el-table-column prop="name" label="Key">
            <template slot-scope="scope">
              <el-input v-model="scope.row.name" placeholder="请输入"></el-input>
            </template>
          </el-table-column>
          <el-table-column prop="value" label="内容">
            <template slot-scope="scope">
               <el-input v-model="scope.row.value" placeholder="请输入"></el-input>
            </template>
          </el-table-column>
          <el-table-column label="操作" width="100px">
              <template slot-scope="scope">
                <el-button v-if="scope.$index==0" type="primary" icon="el-icon-plus" @click="addHeader"></el-button>
                <el-button v-if="scope.$index!=0" type="danger" icon="el-icon-minus" @click="removeHeader(scope.$index)"></el-button>
              </template>
          </el-table-column>
        </el-table>

         <p>请求参数</p>
        <el-table :data="requestData">
          <el-table-column prop="name" label="参数名">
             <template slot-scope="scope">
               <el-input v-model="scope.row.name" placeholder="请输入"></el-input>
            </template>
          </el-table-column>
          <el-table-column prop="value" label="参数值">
            <template slot-scope="scope">
               <el-input v-model="scope.row.value" placeholder="请输入"></el-input>
            </template>
          </el-table-column>
          <el-table-column  label="操作" width="100px">
              <template slot-scope="scope">
                <el-button v-if="scope.$index==0" type="primary" icon="el-icon-plus" @click="addRequest"></el-button>
                <el-button v-if="scope.$index!=0" type="danger" icon="el-icon-minus" @click="removeRequest(scope.$index)"></el-button>
              </template>
          </el-table-column>
        </el-table>
         <p>期望结果</p>
          <el-form-item label="状态码" prop="expect_code">
            <el-select v-model="dataForm.expect_code" placeholder="请选择">
               <el-option
                  v-for="item in statusCode"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value">
                </el-option>
            </el-select>
          </el-form-item>
        <el-form-item label="期望内容" prop="expect_content">
          <el-input
            type="textarea"
            resize="none"
            :rows="3"
            v-model="dataForm.expect_content"
            placeholder="请输入"
          ></el-input>
        </el-form-item>
        <el-form-item label="描述" prop="description">
          <el-input
            type="textarea"
            resize="none"
            :rows="3"
            v-model="dataForm.description"
            placeholder="请输入"
          ></el-input>
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
      visible: false,
      loading:false,
      type: "post",
      dataForm: {
        id:'',
        project_id:"",
        name: "",
        http_method: "",
        host_id: "",
        path:"",
        expect_code:"",
        expect_content:"",
        request_type:"form-data",
        description:"",
      },
      hostList:[],
      projectList:[],
      headers:[{name:"",value:""}],
      requestData:[{name:"",value:""}],
      statusCode:[
        { label: "200", value: 200 },
        { label: "201", value: 201 },
        { label: "202", value: 202 },
        { label: "203", value: 203 },
        { label: "204", value: 204 },
        { label: "301", value: 301 },
        { label: "302", value: 302 },
        { label: "401", value: 401 },
        { label: "402", value: 402 },
        { label: "403", value: 403 },
        { label: "404", value: 404 },
        { label: "405", value: 405 },
        { label: "406", value: 406 },
        { label: "407", value: 407 },
        { label: "408", value: 408 },
        { label: "501", value: 501 },
        { label: "502", value: 502 },
      ],
      rules: {
        request_type: [{ required: true, message: "请输入", trigger: "blur" }],
        project_id: [{ required: true, message: "请输入", trigger: "blur" }],
        name: [{ required: true, message: "请输入", trigger: "blur" }],
        http_method: [{ required: true, message: "请输入", trigger: "blur" }],
        host_id: [{ required: true, message: "请输入", trigger: "blur" }],
        path: [{ required: true, message: "请输入", trigger: "blur" }],
        expect_code: [{ required: true, message: "请输入", trigger: "blur" }],
      },
    };
  },
  watch:{
    'dataForm.host_id':{
       deep:true,
       handler(val){
          this.dataForm.project_id=this.hostList.filter(item=>item.value==val)[0].project
       }
    }
  },
  created(){
    // 获取host
    this.$http({
      url:"/api/host/",
      method:"get"
    }).then(res=>{
       this.hostList=res.results.map(item=>{
          return {
            // label:item.host,
            label:item.name,
            value:item.id,
            project:item.project_id
          }
       })
    })
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
            this.type="put";
            this.dataForm={
              id:data.id,
              project_id:data.project,
              name: data.name,
              http_method: data.http_method,
              host_id: data.host.id,
              path:data.path,
              expect_code:data.expect_code,
              request_type:data.request_type,
              expect_content:data.expect_content,
              description:data.description
            }
            this.$set(this,'headers',data.headers?JSON.parse(data.headers):[{name:"",value:""}])
            this.$set(this,'requestData',data.data?JSON.parse(data.data):[{name:"",value:""}])
        }
        else{
            this.type="post";
            this.dataForm={
              id:'',
              project_id:"",
              name: "",
              http_method: "",
              request_type:"form-data",
              host_id: "",
              path:"",
              expect_code:"",
              expect_content:"",
              description:"",
            }
            // 重置headers 和 data
            this.$set(this,'headers',[{name:"",value:""}])
            this.$set(this,'requestData',[{name:"",value:""}])
        }
         // 清除校验状态
             this.$nextTick(()=>{
              this.$refs['dataForm'].clearValidate();
            })
    },
     submitData(){
      this.$refs['dataForm'].validate(valid=>{
        if(valid){
          this.loading=true;
          let url=this.type=='post'?'/api/api':`/api/api/${this.dataForm.id}/`
          this.$http({
            url:url,
            method:this.type,
            data:{
              ...this.dataForm,
              headers:JSON.stringify(this.headers),
              data:JSON.stringify(this.requestData),
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
    },
    addHeader(){
      this.$set(this.headers,this.headers.length,{name:"",value:""});
    },
    removeHeader(row){
      console.log(row)
      this.headers=this.headers.filter((item,index)=>index!=row)
    },
    addRequest(){
      this.$set(this.requestData,this.requestData.length,{name:"",value:""});

    },
    removeRequest(row){
      this.requestData=this.requestData.filter((item,index)=>index!=row)
    }
  },
};
</script>
<style lang="scss" scoped>
.host-add-or-update {
  .el-form {
    .el-select{
      width: 100%;
    }
    p{
      margin: 0;
      font-size: 16px;
      line-height: 2.4em;
    }
  }
}
</style>
