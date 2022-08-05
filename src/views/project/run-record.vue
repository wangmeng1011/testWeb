<template>
    <div class="host">
         <el-tabs v-model="activeName" @tab-click="handleClick">
            <el-tab-pane label="API" name="API">
                <el-table
                    :data="dataList"
                    v-loading="dataListLoading">
                    <el-table-column prop="modular_function_case" label="项目名称">
                      <template slot-scope="scope">
                        <div>
                          {{scope.row.api&&scope.row.project_name}}
                        </div>
                      </template>
                    </el-table-column>
                    <el-table-column prop="modular" label="api名称">
                        <template slot-scope="scope">
                            <div>
                                {{scope.row.api&&scope.row.name}}
                            </div>
                        </template>
                    </el-table-column>
                      <el-table-column prop="modular_function_case" label="运行时间">
                        <template slot-scope="scope">
                            <div>
                                {{(scope.row.api&&scope.row.create_time) | formatDate}}
                            </div>
                        </template>
                    </el-table-column>
                    <el-table-column prop="modular_function_case" label="路径">
                        <template slot-scope="scope">
                            <div>
                                {{scope.row.api&&scope.row.url}}
                            </div>
                        </template>
                    </el-table-column>
                    <el-table-column prop="modular_function_case" label="结果">
                        <template slot-scope="scope">
                            <div>
                                <el-tag v-if="scope.row.assert_result=='pass'" type="success">成功</el-tag>
                                <el-tag v-else type="danger">失败</el-tag>
                            </div>
                        </template>
                    </el-table-column>
                    <el-table-column prop="prop" label="操作" width="200">
                        <template slot-scope="scope">
                            <div>
                                <el-button type="primary" size="mini" @click="viewHandle(scope.row)">查看详情</el-button>
                            </div>
                        </template>
                    </el-table-column>
                </el-table>
            </el-tab-pane>
            <!-- <el-tab-pane label="CASE" name="CASE">
                 <el-table
                    :data="dataList"
                    v-loading="dataListLoading">
                    <el-table-column prop="name" label="用例名称"></el-table-column>
                    <el-table-column prop="modular_function_case" label="结果"></el-table-column>
                    <el-table-column prop="prop" label="操作" width="200">
                        <template slot-scope="scope">
                            <div>
                                <el-button type="primary" size="mini">详情</el-button>
                            </div>
                        </template>
                    </el-table-column>
                </el-table>
            </el-tab-pane> -->
        </el-tabs>

          <el-pagination
            @current-change="pageCurrentChangeHandle"
            :page-count="page"
            :page-size="20"
            layout="total,prev, pager, next"
            :total="total">
        </el-pagination>
        <addOrUpdate ref="addOrUpdate" />
        <el-dialog
            title="运行结果"
            :visible.sync="runVisible">
            <div class="case-run-result">
                <el-row>
                    <el-col :span="3">api名称：</el-col><el-col :span="21">{{result.api&&result.name}}</el-col>
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
import addOrUpdate from '@/views/project/bugs-add-or-update'
import viewModule from '@/mixins/view-module'
import dayjs from 'dayjs'
export default {
    components:{ addOrUpdate},
    mixins:[viewModule],
    data(){
        return {
             mixinViewModuleOptions: {
                createdIsNeed: true,
                getDataListURL: '/case/record',
                getDataListIsPage: true,
            },
            dataForm:{
                type:'api'
            },
            result:{},
            dataList:[],
            projectList:[],
            activeName:'API',
            runVisible:false
        }
    },
    filters:{
        formatDate(value){
            return dayjs(value).format('YYYY-MM-DD HH:mm:ss')
        }
    },
    methods:{
        addHandle(){
            this.$refs['addOrUpdate'].init();
        },
        editHandle(data){
            this.$refs['addOrUpdate'].init(data);
        },
        viewHandle(row){
            this.result=row;
            this.runVisible=true;
        },
        handleClick(tab,event){
            if(tab.name=='API'){
                this.dataForm.type="api";
                this.query();
            }
            else{
               this.dataList=[];
            }

        },
    }
}
</script>
<style lang="scss" scoped>
     .el-col{
        margin-bottom: 15px;
        &.el-col-3{
            font-weight: bold;
        }
    }
</style>
