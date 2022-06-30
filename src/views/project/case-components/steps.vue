<template>
    <div>
        <ul class="case-list">
            <li v-for="(item,index) in value" :key="index">
                <div class="left">
                    <span class="title">{{`第 ${index+1} 步`}}</span>
                    <el-select class="path" v-model="item.api" placeholder="请选择" clearable>
                        <el-option
                        v-for="(item, index) in stepList"
                        :key="index"
                        :label="item.label"
                        :value="item.value">
                        </el-option>
                    </el-select>
                    <el-button size="mini" type="primary" icon="el-icon-plus"  @click="addStep"></el-button>
                    <el-button size="mini" type="info" @click="stepDetail(index, item)">详情</el-button>
                    <el-button size="mini" type="danger" icon="el-icon-delete" @click="removeStep(index)"></el-button>
                </div>
                <!-- <div class="right">
                    <div class="right-item" v-for="(arg,order) in item.arguments" :key="order">
                        <el-input v-model="arg.name" placeholder="参数名称"></el-input>
                        <el-select v-model="arg.origin" placeholder="参数来源" clearable>
                            <el-option label="请求头" value="HEAD"></el-option>
                            <el-option label="COOKIE" value="COOKIE"></el-option>
                            <el-option label="响应" value="BODY"></el-option>
                    </el-select>
                        <el-input v-model="arg.format" placeholder="参数格式"></el-input>
                        <el-button size="mini" type="primary" icon="el-icon-plus" @click="addConfigs(index)"></el-button>
                        <el-button size="mini" type="danger" icon="el-icon-delete" @click="removeConfigs(index,order)"></el-button>
                    </div>
                </div> -->
            </li>
        </ul>
        <stepDetail ref="stepDetail" @func="getMsgFormSon"/>
    </div>
</template>
<script>
import stepDetail from '@/views/project/case-components/step-detail'
export default {
    name:"case-add-steps",
    components:{ stepDetail},
    data() {
        return {
            stepList:[]
        }
    },
    props:{
        value:{
            type:Array,
            default:()=>[]
        }
    },
    created(){
        // 获取API请求接口列表
        this.$http({
            url:"/api/api/",
            method:"get",
            params:{
                size:1000,
                page:1
            }
        }).then(res=>{
            this.stepList=res.results.map(item=>{
                return {
                    value:item.id,
                    label:item.name+item.path
                }
            });
        })
        console.log(this.stepList,"stepList")
    },
    methods:{
        addStep(){
            this.$emit('input',[...this.value,{id:"",arguments:[{name:"",origin:"",format:""}]}])
        },
        removeStep($index){
            if(this.value.length==1){
                return this.$message.warning("仅剩最后一条，无法删除")
            }
            this.$emit('input',this.value.filter((item,i)=>i!=$index))
        },
        addConfigs(index){
            let list=JSON.parse(JSON.stringify(this.value));
            list[index].arguments.push({name:"",origin:"",format:""});
            this.$emit('input',list)
        },
        removeConfigs(index,order){
            let list=JSON.parse(JSON.stringify(this.value));
            let args=list[index].arguments;
             if(args.length==1){
                return this.$message.warning("仅剩最后一条，无法删除")
            }
            list[index].arguments= args.filter((item,i)=>i!=order);
            this.$emit('input',list)
        },
        stepDetail(index, row){
            this.$refs['stepDetail'].init(index, row);
        },
        getMsgFormSon(data){
            let list=JSON.parse(JSON.stringify(this.value));
            console.log(data, "llll")
            list[data.index].reset_data= data.data;
            list[data.index].reset_expect_content= data.reset_expect_content;
            list[data.index].reset_expect_code= data.reset_expect_code;

            this.$emit('input',list)
            
        }
    }
}
</script>
<style lang="scss" scoped>
    .case-list{
        padding: 0;
        margin: 0;
        li{
            display: flex;
            // align-content: center;
            margin-bottom: 20px;
            .el-input,.el-select{
                width: 120px;
                margin-right: 20px;
                &.path{
                    width: 300px;
                }
            }

            &>span{
                flex-shrink: 0;
                white-space: nowrap;
                margin-right: 20px;
            }
            .el-button{
                margin-right: 10px;
            }
            .right{
                .right-item:nth-child(n+2){
                    margin-top: 20px;
                }
            }
        }
    }
</style>
