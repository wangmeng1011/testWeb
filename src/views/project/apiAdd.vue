<template>
<!--   <el-dialog :title="type ? '新增' : '编辑'" :visible.sync="visible" width="800px" top="5vh"> -->
    <div class="host-add-or-update">


      <el-form
        ref="dataForm"
        :model="dataForm"
        label-width="100px"
        :rules="rules"
      >
     <!--  <el-form-item label="项目" prop="project_id">
          <el-select v-model="dataForm.project_id" disabled placeholder="请选择">
                <el-option v-for="(item,index) in projectList" :key="index" :label="item.label" :value="item.value"></el-option>
              </el-select>
      </el-form-item> -->
        <p>接口</p>
        <el-row>
          <div class="list-item">
            <el-form-item label="接口名" prop="name">
              <el-input v-model="dataForm.name" placeholder="请输入"></el-input>
            </el-form-item>
          </div>
          <div class="list-item">
            <el-form-item label="请求方法" prop="http_method">
              <el-select v-model="dataForm.http_method" placeholder="请选择">
                <el-option label="POST" value="POST"></el-option>
                <el-option label="GET" value="GET"></el-option>
                <el-option label="PUT" value="PUT"></el-option>
                <el-option label="DELETE" value="DELETE"></el-option>
              </el-select>
            </el-form-item>
          </div>
          <div class="list-item">
            <el-form-item label="域名" prop="host_id">
              <el-select v-model="dataForm.host_id" placeholder="请选择">
                <el-option v-for="(item,index) in hostList" :key="index" :label="item.label" :value="item.value"></el-option>
              </el-select>
            </el-form-item>
          </div>
          <div class="list-item">
            <el-form-item label="path" prop="path">
              <el-input v-model="dataForm.path"></el-input>
            </el-form-item>
          </div>
          <!-- <div class="list-item">
            <el-form-item label="请求类型" prop="request_type">
              <el-select v-model="dataForm.request_type" placeholder="请选择">
                  <el-option label="form-data" value="form-data"></el-option>
                  <el-option label="json" value="json"></el-option>
                </el-select>
            </el-form-item>
          </div> -->
          <el-card class="box-card" shadow="never">
            <div slot="header" class="clearfix">
              <span>请求参数</span>
            </div>

            <el-tabs v-model="dataForm.request_type">
              <el-tab-pane label="Params" name="data">
                <el-table :data="paramsData">
                  <el-table-column prop="data" label="参数名" width="230">
                    <template slot-scope="scope">
                      <el-input
                        v-model="scope.row.name"
                        placeholder="请输入"
                      ></el-input>
                    </template>
                  </el-table-column>
                  <el-table-column prop="value" label="参数值">
                    <template slot-scope="scope">
                      <el-input
                        v-model="scope.row.value"
                        placeholder="请输入"
                      ></el-input>
                    </template>
                  </el-table-column>
                  <el-table-column label="操作" width="200px">
                    <template slot-scope="scope">
                      <el-button
                        v-if="scope.$index == 0"
                        type="primary"
                        icon="el-icon-plus"
                        @click="addParams"
                      ></el-button>
                      <el-button
                        type="danger"
                        icon="el-icon-minus"
                        @click="removeParams(scope.$index)"
                      ></el-button>
                    </template>
                  </el-table-column>
                </el-table>
              </el-tab-pane>
              <el-tab-pane label="body" name="json">
                <el-input
                  type="textarea"
                  placeholder="请输入内容"
                  v-model="paramsJsonStr"
                  rows="4"
                  show-word-limit
                />
              </el-tab-pane>
            </el-tabs>
          </el-card>
          <!-- <el-col :span="12">
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
          </el-col> -->
        </el-row>

        <p>全局参数</p>
        <el-table :data="arguments1">
          <el-table-column prop="name" label="参数名" width="230">
            <template slot-scope="scope">
              <el-input v-model="scope.row.name" placeholder="请输入"></el-input>
            </template>
          </el-table-column>
          <el-table-column prop="value" label="参数值">
            <template slot-scope="scope">
               <el-input v-model="scope.row.value" placeholder="请输入"></el-input>
            </template>
          </el-table-column>
          <el-table-column label="操作" width="200px">
              <template slot-scope="scope">
                <el-button v-if="scope.$index==0" type="primary" icon="el-icon-plus" @click="addArguments"></el-button>
                <el-button  type="danger" icon="el-icon-minus" @click="removeArguments(scope.$index)"></el-button>
              </template>
          </el-table-column>
        </el-table>

        <p>请求头</p>
        <el-table :data="headers">
          <el-table-column prop="name" label="Key" width="230">
            <template slot-scope="scope">
              <el-input v-model="scope.row.name" placeholder="请输入"></el-input>
            </template>
          </el-table-column>
          <el-table-column prop="value" label="内容">
            <template slot-scope="scope">
               <el-input v-model="scope.row.value" placeholder="请输入"></el-input>
            </template>
          </el-table-column>
          <el-table-column label="操作" width="200px">
              <template slot-scope="scope">
                <el-button v-if="scope.$index==0" type="primary" icon="el-icon-plus" @click="addHeader"></el-button>
<!--                <el-button type="danger" icon="el-icon-minus" @click="removeHeader(scope.$index)"></el-button>-->
                <el-button v-if="scope.$index!=0" type="danger" icon="el-icon-minus" @click="removeHeader(scope.$index)"></el-button>
              </template>
          </el-table-column>
        </el-table>

         <!-- <p>请求参数</p> -->
        <!-- <el-form-item> -->
          <!-- <el-row :gutter="20" style="margin-left:5px">
            <el-col :span="5">
              <div class="grid-content bg-purple" style="font-size:14px;color:#909399;font-weight:bold;margin:10px 0px">
                参数名
              </div>
            </el-col>
            <el-col :span="14">
              <div class="grid-content bg-purple" style="font-size:14px;color:#909399;font-weight:bold;margin:10px 0px">
                参数值
              </div>
            </el-col>
          </el-row>
          <el-row :gutter="20" style="margin-left:5px">
            <el-col :span="5">
              <div class="grid-content bg-purple" style="margin-letf:50px">
                <el-input v-model="requestData.lv_username" placeholder="请输入"></el-input>
              </div>
            </el-col>
            <el-col :span="15">
              <div class="grid-content bg-purple">
                <el-input v-model="requestData.lv_password" placeholder="请输入"></el-input>
              </div>
            </el-col>
          </el-row> -->
          <!-- <el-table :data="requestData">
          <el-table-column prop="name" label="参数名">
             <template slot-scope="scope">
               <el-input v-model="scope.row.lv_username" placeholder="请输入"></el-input>
            </template>
          </el-table-column>
          <el-table-column prop="value" label="参数值">
            <template slot-scope="scope">
               <el-input v-model="scope.row.lv_password" placeholder="请输入"></el-input>
            </template>
          </el-table-column>
          <el-table-column  label="操作" width="200px">
              <template slot-scope="scope">
                <el-button v-if="scope.$index==0" type="primary" icon="el-icon-plus" @click="addRequest"></el-button>
                <el-button type="danger" icon="el-icon-minus" @click="removeRequest(scope.$index)"></el-button>
              </template>
          </el-table-column>
        </el-table> -->
        <!-- </el-form-item> -->

        <p>期望内容</p>
        <el-table :data="expect_content">
          <el-table-column prop="name" label="实际内容" width="230">
            <template slot-scope="scope">
              <el-input v-model="scope.row.name" placeholder="请输入"></el-input>
            </template>
          </el-table-column>
          <el-table-column prop="value" label="表达式">
            <template slot-scope="scope">
              <el-input v-model="scope.row.value" placeholder="请输入"></el-input>
            </template>
          </el-table-column>
          <el-table-column label="操作" width="200px">
            <template slot-scope="scope">
              <el-button
                v-if="scope.$index == 0"
                type="primary"
                icon="el-icon-plus"
                @click="addExpectContent"
              ></el-button>
              <el-button
                type="danger"
                icon="el-icon-minus"
                @click="removeExpectContent(scope.$index)"
              ></el-button>
            </template>
          </el-table-column>
        </el-table>

        <p>参数提取</p>
        <el-table :data="argumentExtract">
          <el-table-column prop="name" label="参数名" width="230">
             <template slot-scope="scope">
               <el-input v-model="scope.row.name" placeholder="请输入"></el-input>
            </template>
          </el-table-column>
          <el-table-column prop="value" label="参数来源" width="230">
            <template slot-scope="scope">

              <!--  <el-input v-model="scope.row.origin" placeholder="请输入"></el-input> -->
              <el-select v-model="scope.row.origin" placeholder="请选择">
                <el-option label="BODY" value="BODY"></el-option>
                <el-option label="COOKIE" value="COOKIE"></el-option>
                <el-option label="HEADER" value="HEADER"></el-option>
              </el-select>
            </template>
          </el-table-column>
          <el-table-column prop="value" label="参数格式" >
            <template slot-scope="scope">
               <el-input v-model="scope.row.format" placeholder="请输入"></el-input>
            </template>
          </el-table-column>
          <el-table-column  label="操作" width="200px">
              <template slot-scope="scope">
                <el-button v-if="scope.$index==0" type="primary" icon="el-icon-plus" @click="addArgumentExtract"></el-button>
                <el-button type="danger" icon="el-icon-minus" @click="removeArgumentExtract(scope.$index)"></el-button>
              </template>
          </el-table-column>
        </el-table>

        <p>期望结果</p>

         <div class="list-item">
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
         </div>
<!--         <div class="list-item">-->
<!--            <el-form-item label="期望内容" prop="expect_content">-->
<!--              <el-input-->
<!--                type="textarea"-->
<!--                resize="none"-->
<!--                :rows="3"-->
<!--                v-model="dataForm.expect_content"-->
<!--                placeholder="请输入"-->
<!--              ></el-input>-->
<!--            </el-form-item>-->
<!--         </div>-->
         <div class="list-item">
           <el-form-item label="描述" prop="description">
            <el-input
              type="textarea"
              resize="none"
              :rows="3"
              v-model="dataForm.description"
              placeholder="请输入"
            ></el-input>
          </el-form-item>
         </div>


      </el-form>

      <div class="label">
        <!-- <el-button-group> -->
          <el-button @click="$router.push({name: 'api-list'})">取消</el-button>
          <el-button type="primary" @click="submitData">保存</el-button>
        <!-- </el-button-group> -->
      </div>

    </div>
    <!-- <div slot="footer">
      <el-button @click="visible = false">取 消</el-button>
      <el-button type="primary" @click="submitData" v-loading="loading">确 定</el-button>
    </div>
  </el-dialog> -->
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
        request_type: "data", //请求类型1
        description:"",
      },
      hostList:[],
      projectList:[],
      paramsData: [{ name: "", value: "" }], //请求参数1
      paramsJsonStr: "", //请求参数json字符串1
      expect_content: [{ name: "", value: "" }], //期望内容1
      headers:[{name:"",value:""}],
      arguments1:[{name:"",value:""}],
      argumentExtract:[{name:"",origin:"", format: ''}],
      requestData:[{lv_username:"",lv_password:""}],
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
      apiId:this.$route.params.apiId,
    };
  },
  watch:{
    'dataForm.host_id':{
       deep:true,
       handler(val){
          this.dataForm.project_id=this.hostList.filter(item=>item.value==val)[0].project
       }
    },
    '$route.params.apiId':{
      handler(val){
        if(val){
          // 获取api详情 params:{id}
          this.$http({
            url:`/api/api/${this.apiId}/`,
            method:'get'
          }).then(res=>{
            this.init(res.result)
          })
        }
      },
      immediate:true,
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
        console.log('######data')
        console.log(data)
         this.visible=true;
        if(data){
            this.type="put";
            this.dataForm={
              id:data.id,
              project_id:data.project,
              name: data.name,
              http_method: data.http_method,
              host_id: data.host,
              path:data.path,
              expect_code:data.expect_code,
              request_type:data.request_type,
              expect_content:data.expect_content,
              description:data.description
            }


            if (data.expect_content) {
              this.expect_content = [];
              let arr = data.expect_content
                ? eval(data.expect_content)
                : [];

              let dataJsonArr =data.expect_content
                ? eval(data.expect_content)
                : [];
              dataJsonArr.forEach(item => {
                Object.keys(item).forEach(key => {
                  this.expect_content.push({
                    name: key,
                    value: item[key]
                  });
                });
              });

              if(dataJsonArr.length==0){
                this.expect_content.push({
                  name: "",
                  value: ""
                });
              }
            }

            if (data.request_type == "data" && data.data) {
              this.paramsData = [];
              let dataJsonArr = data.data? eval(data.data):[];
              dataJsonArr.forEach(item => {
                Object.keys(item).forEach(key => {
                  this.paramsData.push({
                    name: key,
                    value: item[key]
                  });
                });
              });

              if(dataJsonArr.length==0){
                this.paramsData.push({
                  name: "",
                  value: ""
                });
              }
            }
            if (data.request_type == "json" && data.data) {
              this.paramsJsonStr = data.data;
            }
            // this.requestData = data.data
            let headers = [{name:"",value:""}];
            if(data.headers){
              headers = [];
              JSON.parse(data.headers).forEach(item => {
                for(let key in item){
                  headers.push({name:key, value:item[key]});
                }
              })
            }
            let initData = [{lv_username:"",lv_password:""}];
            if(data.data){
              // initData = [];
              // JSON.parse(data.data).forEach(item => {
              //   for(let key in item){
              //     initData.push({lv_username:key, lv_password:item[key]});
              //   }
              // })
            }
// console.log(data.argumentExtract.length > 0?data.argumentExtract:[{name:"",value:""}])
            this.$set(this,'headers', headers);
            this.$set(this,'requestData', initData);
            console.log('this.arguments1')
            console.log(data.arguments)
            this.$set(this,'arguments1',data.arguments.length >0?data.arguments:[{name:"",value:""}])
            this.$set(this,'argumentExtract',data.argumentExtract.length > 0?data.argumentExtract:[{name:"",origin:"", format: ''}])
        }
        else{
            this.type="post";
            this.dataForm={
              id:'',
              project_id:"",
              name: "",
              http_method: "",
              request_type:"data",
              host_id: "",
              path:"",
              expect_code:"",
              expect_content:"",
              description:"",
            }
            // this.requestData = data.data
            // 重置headers 和 data

            this.$set(this,'headers',[{name:"",value:""}])
            this.$set(this,'requestData',[{lv_username:"",lv_password:""}])
            this.$set(this,'arguments1',[{name:"",value:""}])
            this.$set(this,'argumentExtract',[{name:"",origin:"", format: ''}])
        }
        console.log(this.requestData, "初始化requestData")
         // 清除校验状态
             this.$nextTick(()=>{
              this.$refs['dataForm'].clearValidate();
            })
    },
    // 处理数据
    handleData(obj){
      return obj.filter(item=>{
        const Item = Array.from(new Set(Object.values(item)))
        return Item.length !== 1 || (Item.length === 1 && Item[0] !== "")
      })
    },
     submitData(){
       console.log(this.requestData, 'submitRequestData');
      this.$refs['dataForm'].validate(valid=>{
        if(valid){
          this.loading=true;
          let url=this.type=='post'?'/api/api/':`/api/api/${this.dataForm.id}/`
          // 数据处理
          let submitData = [];
          let submitHeaders = [];
          if(this.requestData.length > 0){
            this.requestData.forEach(item => {
              if(item.lv_username){
                submitData.push({[item.lv_username]:item.lv_password});
              }
            })
          }
          if(this.headers.length > 0){
            this.headers.forEach(item => {
              if(item.name){
                submitHeaders.push({[item.name]:item.value});
              }
            })
          };

          let argumentsss = this.handleData(this.arguments1).length >0 ? this.arguments1 : [];
          let arg = argumentsss.map(item => {
            let {api, ...data} = item;
            return data;
          })
          let extract = this.handleData(this.argumentExtract).length>0 ? this.argumentExtract :[];
          let dataExtract = extract.map(item => {
            let {api, ...data} = item;
            return data;
          })

          let dataArr = this.paramsData.filter(
            (item) => item.name != "" && item.value != ""
          );

          let jsonArr = [];
          if (dataArr.length > 0) {
            dataArr.forEach(item => {
              jsonArr.push({
                [item.name]: item.value
              })
            });
          }


          let data =
            this.dataForm.request_type == "data"
              ? JSON.stringify(jsonArr) : this.paramsJsonStr;


          let expect_contentArr = this.expect_content.filter(
            (item) => item.name != "" && item.value != ""
          );

          let expect_contentJsonArr = [];
          if (expect_contentArr.length > 0) {
            expect_contentArr.forEach(item => {
              expect_contentJsonArr.push({
                [item.name]: item.value
              })
            });
          }


          this.$http({
            url:url,
            method:this.type,
            data:{
              ...this.dataForm,
              headers:submitHeaders.length ? JSON.stringify(submitHeaders) : '',
              data: submitData.length ? JSON.stringify(submitData) :'',
              data,
              expect_content: expect_contentArr.length
              ? JSON.stringify(expect_contentJsonArr)
              : "",
              arguments:arg,
              argumentExtract:dataExtract
            }
          }).then(res=>{
            this.$message.success("操作成功")
            // this.visible = false;
            // this.$parent.query();
            // 跳转列表
            this.$router.push({name: 'api-list'})
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
      if(this.headers.length === 1) {
        return
      }
      this.headers=this.headers.filter((item,index)=>index!=row)
    },
    addArgumentExtract(){
      this.$set(this.argumentExtract,this.argumentExtract.length,{name:"",origin:"", format: ''});
    },
    removeArgumentExtract(row){
      console.log(row)
      if(this.argumentExtract.length === 1) {
        return
      }
      this.argumentExtract=this.argumentExtract.filter((item,index)=>index!=row)
    },
    addArguments(){
      this.$set(this.arguments1,this.arguments1.length,{name:"",value:""});
      this.$set(this.arguments,this.arguments.length,{name:"",value:""});
    },
    removeArguments(row){
      console.log(row)
      if(this.arguments1.length === 1) {
        return
      }
      this.arguments1=this.arguments1.filter((item,index)=>index!=row)
    },
    addRequest(){
      this.$set(this.requestData,this.requestData.length,{lv_username:"",lv_password:""});

    },
    addParams() {
      this.$set(this.paramsData, this.paramsData.length, {
        name: "",
        value: "",
      });
      // this.$set(this.arguments,this.arguments.length,{name:"",value:""});
    },
    removeParams(row) {
      console.log(row);
      if (this.paramsData.length === 1) {
        return;
      }
      this.paramsData = this.paramsData.filter((item, index) => index != row);
    },
    addExpectContent() {
      this.$set(this.expect_content, this.expect_content.length, {
        name: "",
        value: "",
      });
      // this.$set(this.arguments,this.arguments.length,{name:"",value:""});
    },
    removeExpectContent(row) {
      console.log(row);
      if (this.expect_content.length === 1) {
        return;
      }
      this.expect_content = this.expect_content.filter(
        (item, index) => index != row
      );
    },
    removeRequest(row){
      console.log(row)
      if(this.requestData.length === 1) {
        return
      }
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
.list-item{
  display:inline-block;
  width:300px;
  vertical-align:top;
}
.label{
  text-align:right;
}
</style>
