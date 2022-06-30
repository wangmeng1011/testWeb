<template>
    <el-dialog title="详情" :visible.sync="visible" width="800px" top="5vh">
        <div class="step-detail">
            <el-form
                ref="dataForm"
                :model="dataForm"
                label-width="100px"
                :rules="rules"
            >
                <p>请求参数</p>
                <div v-for="(item,index) in requestData" :key="index">
                    <el-row :gutter="20" style="margin-left:5px">
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
                            <el-input v-model="item.lv_username" placeholder="请输入"></el-input>
                        </div>
                        </el-col>
                        <el-col :span="10">
                        <div class="grid-content bg-purple">
                            <el-input v-model="item.lv_password" placeholder="请输入"></el-input>
                        </div>
                        </el-col>
                        <el-col :span="5">
                            <el-button v-if="index==0" type="primary" icon="el-icon-plus" @click="addRequest"></el-button>
                            <el-button type="danger" icon="el-icon-minus" @click="removeRequest(index)"></el-button>
                        </el-col>
                    </el-row>
                </div>
        
                <p>期望结果</p>
                <div class="list-item">
                    <el-form-item label="状态码" prop="expect_code">
                    <el-select v-model="dataForm.reset_expect_code" placeholder="请选择">
                    <el-option
                        v-for="item in statusCode"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value">
                        </el-option>
                    </el-select>
                </el-form-item>
                </div>
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
            requestData:[{lv_username:"",lv_password:""}],
            dataForm:{
                reset_expect_content:'',
                reset_expect_code:'',
                index:0
            },
            rules:{
                // name:[{required: true, message:'请输入', trigger: 'blur'}],
                // host:[{required: true, message:'请输入', trigger: 'blur'}],
            }
        }
    },
    created(){
        // 获取API请求接口列表
        
    },
    methods:{
        init(data, row){
            this.visible = true;
            this.dataForm.index = data;
            row.data
            if(row.reset_data){
                let resetData = JSON.parse(row.reset_data);
                this.requestData = [];
                resetData.forEach(item => {
                    for(let k in item){
                        this.requestData.push({lv_username:k,lv_password:item[k]})
                    }
                });
            }
            this.dataForm.reset_expect_content = row.reset_expect_content;
            this.dataForm.reset_expect_code = row.reset_expect_code;
        },
        submitData(){
            this.visible = false;
            let resetData = [];
            this.requestData.forEach(item => {
                if(item.lv_username != ""){
                    resetData.push({[item.lv_username]:item.lv_password})
                }
            })
            let data = {...this.dataForm,data:resetData.length>0 ? JSON.stringify(resetData) : ''}
            console.log(data);
            this.$emit('func',data)
            // this.dataForm = {
            //     reset_expect_content:'',
            //     reset_expect_code:'',
            //     lv_username:"",
            //     lv_password:"",
            //     index:0
            // }
        },
        addRequest(){
            this.$set(this.requestData,this.requestData.length,{lv_username:"",lv_password:""});
        },
        removeRequest(row){
            console.log(row)
            if(this.requestData.length === 1) {
                return
            }
            this.requestData=this.requestData.filter((item,index)=>index!=row)
        }
    }
}
</script>
<style lang="scss" scoped>
.list-item{
  display:inline-block;
  width:300px;
  vertical-align:top;
}
.label{
  text-align:right;
}
</style>
