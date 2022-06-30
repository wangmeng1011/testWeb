<template>
  <!-- <el-dialog
    :title="type?'新增':'编辑'"
    :visible.sync="visible"
  > -->
  <div>
    <div class="host-add-or-update">
      <el-form ref="dataForm" :model="dataForm" label-width="80px" :rules="rules">
        <div style="display:flex">
          <el-form-item label="用例类型" prop="case_type">
            <el-select v-model="dataForm.case_type" placeholder="请选择">
              <el-option
                v-for="item in case_type_options"
                :key="item.value"
                :label="item.label"
                :value="item.value">
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="适用阶段" :inline="true" prop="case_stage">
            <el-select
              v-model="dataForm.case_stage"
              collapse-tags
              style="margin-left: 20px;"
              placeholder="请选择"
              popper-class="">
              <el-option
                v-for="item in case_stage_options"
                :key="item.value"
                :label="item.label"
                :value="item.value">
              </el-option>
            </el-select>
          </el-form-item>
        </div>
        
        <el-form-item label="用例标题" prop="title">
          <el-input v-model="dataForm.title"></el-input>
        </el-form-item>
        <el-form-item label="前置条件" prop="preconditions">
          <el-input v-model="dataForm.preconditions"></el-input>
        </el-form-item>
        <el-form-item label="优先级" prop="case_priority">
          <!-- <el-input v-model="dataForm.case_priority"></el-input> -->
          <el-select v-model="dataForm.case_priority" placeholder="请选择">
              <el-option
                v-for="item in case_priority_options"
                :key="item.value"
                :label="item.label"
                :value="item.value">
              </el-option>
            </el-select>
        </el-form-item>

        <div class="form-case">
          <div class="case-step">用例步骤</div>
          <div style="width:85%;align-self:center">
            <el-row :gutter="20">
              <!-- <el-col :span="5"><div class="grid-content bg-purple">步骤</div></el-col> -->
              <el-col :span="10"><div class="grid-content bg-purple">内容</div></el-col>
              <el-col :span="10"><div class="grid-content bg-purple">预期</div></el-col>
              <!-- <el-col :span="5"><div class="grid-content bg-purple">备注</div></el-col> -->
              <el-col :span="4"><div class="grid-content bg-purple" style="text-align:center">操作</div></el-col>
            </el-row>
            <el-row :gutter="0" v-for="(item, index) in dataForm.case" :key="index">
              <el-col :span="10" > 
                  <el-input v-model="item.step"></el-input>
              </el-col>              
              <el-col :span="10">
                  <el-input v-model="item.expect"></el-input>
              </el-col>
              <el-col :span="3" v-if="dataForm.case.length !== 1">
                <div @click="removeEnvironmentForm(item)" style="text-align:center;font-size:1.5rem;line-height:initial">
                  <i class="el-icon-minus"></i>
                </div>
              </el-col>
              <el-col :span="1" >
                <div class="" style="text-align:center;font-size:1.5rem;" @click="addEnvironmentForm">
                  <i class="el-icon-plus"></i>
                </div>
                
              </el-col>
            </el-row>
          </div>  
        </div>

        <el-form-item label="备注" prop="remarks">
          <el-input v-model="dataForm.remarks"></el-input>
        </el-form-item>
        <!-- <el-form-item label="结果" prop="result">
          <el-select v-model="dataForm.result" placeholder="请选择">
              <el-option
                v-for="item in result_options"
                :key="item.value"
                :label="item.label"
                :value="item.value">
              </el-option>
            </el-select>
        </el-form-item> -->
        
      </el-form>
    </div>
    <div slot="footer" style="text-align:center">
      <el-button @click="cancel">取 消</el-button>
      <el-button type="primary" @click="submitData" :loading="loading">确 定</el-button>
    </div>
    </div>
  <!-- </el-dialog> -->
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
        title: "",
        preconditions:"",
        remarks:"",
        result:"",
        case_type:"",
        case_stage:"",
        modular:"",
        case:[{
          step: "",
          expect: "",
          case_result: "unexecuted",
          remarks: ""
        }]
      },
      case_type_options: [{
          value: '功能测试',
          label: '功能测试'
        }, {
          value: '性能测试',
          label: '性能测试'
        },{
          value: '接口测试',
          label: '接口测试'
        }],
      case_stage_options: [{
        value: '功能测试阶段',
        label: '功能测试阶段'
      }, {
        value: '系统测试阶段',
        label: '系统测试阶段'
      }, {
        value: '冒烟测试阶段',
        label: '冒烟测试阶段'
      }],
      case_priority_options:[{
        value: '1',
        label: '1'
      }, {
        value: '2',
        label: '2'
      }, {
        value: '3',
        label: '3'
      }, {
        value: '4',
        label: '4'
      }],
      result_options:[{
        value: 'unexecuted',
        label: 'unexecuted'
      }, {
        value: 'pass',
        label: 'pass'
      }, {
        value: 'fail',
        label: 'fail'
      }],
      projectList:[],
      rules:{
        modular:[{required: true, message:'请输入', trigger: 'blur'}],
      },
      copy:false
    };
  },
  created(){
    let query = this.$route.query;
    let arr = query.case ||[];
    if(arr == 0){
      arr = [{
        step: "",
        expect: "",
        case_result: "unexecuted",
        remarks: ""
      }]
    }
   
    if(query.hasOwnProperty('id')){
      this.dataForm = {
        ...query,
        case: arr
      }
      this.type = 'put';
    }else{
      this.dataForm.modular = query.modular;
    }
    if(query.hasOwnProperty('copy')){
      this.copy = true;
    }
  },
  methods: {
   init(data){
     console.log(data)
        this.visible=true;
        if(data.hasOwnProperty('id')){
            this.type="put";
            this.dataForm=Object.assign({},this.dataForm,data)
             this.$nextTick(()=>{
              this.$refs['dataForm'].clearValidate();
            })
        }
        else{
          console.log("进入post");
            this.type="post";
            console.log(this.data);
            this.dataForm.modular = data.modular,
            this.$nextTick(()=>{
              this.$refs['dataForm'].clearValidate();
            })
        }
    },
     submitData(){
      //  console.log(this.dataForm, this.dataForm.hasOwnProperty("id"))
      //  return false;
      const {pageType = ''} = this.$route.query;
      console.log(pageType);
      this.$refs['dataForm'].validate(valid=>{
        if(valid){
          this.loading=true;
          let url=this.type=='post'?'/chandao/case/':`/chandao/case/${this.dataForm.id}/`
          if(this.copy){
            this.type = 'post'
            url = '/chandao/case/'
          }
          let data = {
            ...this.dataForm
          };
          data.case = this.dataForm.case.map(item=>{
            return {
              step: item.step,
              expect: item.expect,
              case_result: item.case_result,
              remarks: item.remarks
            }
          });
          delete data.id
          if(!data.result){
            data.result = 'unexecuted';
          }
          this.$http({
            url:url,
            method:pageType == 'copy'? 'post':this.type,
            data:data
          }).then(res=>{
            this.$message.success("操作成功")
            this.visible = false;
            this.$router.push({name:'chandao-bug-list'})
          }).finally(()=>{
            this.loading=false
          })
        }
        else{
          return false
        }
      })
    },
    cancel(){
      this.$router.push({name:'chandao-bug-list'})
    },

    //移除表单项事件
		removeEnvironmentForm(item) {   
			var index = this.dataForm.case.indexOf(item)
			if (index !== -1) {
				this.dataForm.case.splice(index, 1)
			}    
		},
		//添加表单项事件
		addEnvironmentForm() {
			this.dataForm.case.push({
          step: "",
          expect: "",
          case_result: "unexecuted",
          remarks: ""
        });
		}
  },
};
</script>
<style lang="scss" scoped>
.host-add-or-update {
  .el-form {

  }
  .el-row {
    margin-left: 0px;
    &:last-child {
      margin-bottom: 0;
    }
  }
  .form-case{
    display: flex;
    // flex-direction: column;
    margin-bottom: 10px;
  }
  .case-step{
    width: 80px;
    text-align: right;
    vertical-align: middle;
    float: left;
    font-size: 14px;
    color: #606266;
    line-height: 40px;
    padding: 0 12px 0 0;
    -webkit-box-sizing: border-box;
    box-sizing: border-box;
    font-weight: 700;
  }
}
</style>
