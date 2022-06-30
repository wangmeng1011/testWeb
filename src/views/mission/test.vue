<template>
    <div class="host">
        <el-button type="primary" icon="el-icon-plus" @click="addHandle">新增</el-button>
        <el-table
            :data="dataList"
            v-loading="dataListLoading">

            <el-table-column prop="month" label="月份"></el-table-column>
            <el-table-column prop="task_name" label="任务标题"></el-table-column>
            <el-table-column prop="develop" label="开发人员"></el-table-column>
            <el-table-column prop="tester" label="测试人员"></el-table-column>
            <el-table-column prop="start_time" label="测试开始时间"></el-table-column>
            <el-table-column prop="end_time" label="测试结束时间"></el-table-column>
            <el-table-column prop="publish_time" label="发版时间"></el-table-column>
            <el-table-column prop="prop" label="操作" width="240">
                <template slot-scope="scope">
                    <div>
                        <!-- <el-button type="primary" size="mini" @click="viewHandle(scope.row)">详情</el-button> -->
                        <el-button type="warning" size="mini" @click="editHandle(scope.row)">编辑</el-button>
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
        <addOrUpdate ref="addOrUpdate" />
    </div>
</template>
<script>
import addOrUpdate from './test-add'
import viewModule from '@/mixins/view-module'
export default {
    components:{ addOrUpdate},
    mixins:[viewModule],
    data(){
        return {
             mixinViewModuleOptions: {
                createdIsNeed: true,
                getDataListURL: '/task/test/',
                getDataListIsPage: true,
            },
            dataList:[],
            projectList:[]
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
            this.$router.push({
                name:"chandao-list",
                params:{
                    id:row.id
                }
            })
        }
    }
}
</script>
<style lang="scss" scoped>

</style>
