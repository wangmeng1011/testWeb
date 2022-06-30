<template>
    <div class="host">
        <!-- <el-button type="primary" icon="el-icon-plus" @click="addHandle">新增报告</el-button> -->
        <el-table
            :data="dataList"
            v-loading="dataListLoading">
            <el-table-column prop="project_name" label="报告名称"></el-table-column>
            <el-table-column prop="project_host" label="测试环境">
                <template>
                    <div>
                        staging
                    </div>
                </template>
            </el-table-column>
            <el-table-column prop="case_all" label="用例总数"></el-table-column>
            <el-table-column prop="case_pass" label="成功数量"></el-table-column>
            <el-table-column prop="case_fail" label="失败数量"></el-table-column>
            <el-table-column prop="prop" label="操作">
                <template slot-scope="scope">
                    <div>
                        <el-button type="primary" size="mini" @click="gotoDetails(scope.row)">详情</el-button>
                        <el-button type="primary" size="mini" @click="sendEvent(scope.row)">发送邮箱</el-button>
                        <el-button type="danger" size="mini" @click="deleteHandle(scope.row.id)">删除</el-button>
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
    </div>
</template>
<script>
import viewModule from '@/mixins/view-module'
export default {
    mixins:[viewModule],
    data(){
        return {
             mixinViewModuleOptions: {
                createdIsNeed: true,
                getDataListURL: '/report/list/',
                getDataListIsPage: true,
            },
            dataList:[],
            projectList:[]
        }
    },
    methods:{
        gotoDetails(row){
            window.location.href = row.report_details
            // this.$router.push({
            //     name:"report-details",
            //     query:{
            //         name:row.name
            //     }
            // })
        },
        sendEvent(item){
            item.loading = true;
            this.$http({
                url:`/report/send/meail/${item.project_name}`,
                method:'post'
                }).then(res=>{
                this.$message({
                    message:'操作成功',
                    type:'success'
                })
            }).finally(()=>{
                item.loading = false;
            })
        }
    }
}
</script>
<style lang="scss" scoped>

</style>
