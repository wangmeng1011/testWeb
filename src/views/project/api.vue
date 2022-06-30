<template>
    <div class="host">
        <!-- addExample -->
        <el-button type="primary" icon="el-icon-plus" @click="$router.push({name: 'api-add'})">新增API</el-button>
        <!-- <el-button type="warning"  @click="runAll">批量运行</el-button> -->
        <el-table
            :data="dataList"
             v-loading="dataListLoading">
            <!-- <el-table-column  type="selection" label="全选" width="80"></el-table-column> -->
            <el-table-column prop="project_name" label="项目"></el-table-column>
            <el-table-column prop="name" label="名称"></el-table-column>
            <el-table-column prop="path" label="接口路径"></el-table-column>
            <el-table-column prop="http_method" label="请求方法"></el-table-column>
            <el-table-column prop="description" label="描述"></el-table-column>
            <el-table-column prop="prop" label="操作">
                <template slot-scope="scope">
                    <div>
                        <el-button  size="mini" type="primary" @click="runHandle(scope.row.id)">运行</el-button>
                        <el-button  size="mini" type="warning" @click="editExample(scope.row)">编辑</el-button>
                        <el-button  size="mini" type="danger" @click="deleteHandle(scope.row.id)">删除</el-button>
                    </div>
                </template>
            </el-table-column>
        </el-table>
         <el-pagination
            @current-change="pageCurrentChangeHandle"
            :page-count="page"
            :page-size="20"
            layout="total,prev, pager, next"
            :total="total">
        </el-pagination>
        <!-- 新增编辑 -->
        <addOrUpdate ref="addOrUpdate" />
        <!-- 运行结果-->
         <el-dialog
            title="运行结果"
            :visible.sync="runVisible">
            <div class="case-run-result">
                <el-row>
                    <el-col :span="3">api名称：</el-col><el-col :span="21">{{result.name&&result.api.name}}</el-col>
                </el-row>
                <el-row>
                    <el-col :span="3">请求地址：</el-col><el-col :span="21">{{result.url}}</el-col>
                </el-row>
                <el-row>
                    <el-col :span="3">请求方法：</el-col><el-col :span="21">{{result.http_method}}</el-col>
                </el-row>
                <el-row>
                    <el-col :span="3">请求头：</el-col><el-col :span="21">{{result.headers}}</el-col>
                </el-row>
                <el-row>
                    <el-col :span="3">请求参数：</el-col><el-col :span="21">{{result.data}}</el-col>
                </el-row>
                <el-row>
                    <el-col :span="3">响应内容：</el-col><el-col :span="21">{{result.return_content}}</el-col>
                </el-row>
                <el-row>
                    <el-col :span="3">测试结果：</el-col><el-col :span="21">{{result.assert_result}}</el-col>
                </el-row>
            </div>
            <div slot="footer">
                <el-button @click="runVisible = false">取 消</el-button>
                <el-button type="primary" @click="runVisible = false">确 定</el-button>
            </div>
        </el-dialog>
    </div>
</template>
<script>
import addOrUpdate from '@/views/project/api-add-or-update'
import viewModule from '@/mixins/view-module'
export default {
    components:{ addOrUpdate},
    mixins:[viewModule],
    data(){
        return {
             mixinViewModuleOptions: {
                createdIsNeed: true,
                getDataListURL: '/api/api/',
                getDataListIsPage: true,
            },
            dataList:[],
            result:{},
            runVisible:false,
        }
    },
    methods:{
        addExample(){
            this.$refs['addOrUpdate'].init();
        },
        editExample(data){
            const { id } = data;
            this.$router.push({name: 'api-update',params:{apiId:id}},()=>{
                this.$refs['addOrUpdate'].init(data);
            })
        },
        runHandle(id){
            this.$confirm('即将运行API, 是否继续?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {
                this.$http({
                    url:`/api/run/api/${id}/`,
                    method:"post"
                }).then(res=>{
                   this.result=res.result;
                    this.runVisible=true;
                })
            }).catch(() => {})
        },
        runAll(){
            if(this.dataListSelections.length==0){
                return this.$message.warning("请选择要运行的API！")
            }
              this.$confirm('即将批量运行用例, 是否继续?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {
                this.$http({
                    url:`/test/run/api`,
                    method:"post",
                    data:{
                        case_id_list:this.dataListSelections.map(item=>item.id)
                    }
                }).then(res=>{
                   this.result=res.result;
                    this.runVisible=true;
                })
            }).catch(() => {})
        }
    }
}
</script>
<style lang="scss">
    .case-run-result{
    .el-col{
        margin-bottom: 15px;
        &.el-col-3{
            font-weight: bold;
        }
    }
}
</style>
