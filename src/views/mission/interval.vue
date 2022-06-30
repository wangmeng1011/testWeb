<template>
    <div class="host">
        <el-button type="primary" icon="el-icon-plus" @click="addHandle">新增</el-button>
        <el-table
            :data="dataList"
            v-loading="dataListLoading">
            <el-table-column prop="name" label="名称"></el-table-column>
            <el-table-column prop="id" label="用例集">
                <template slot-scope="scope">
                    <div>
                        {{scope.row.case_id}}
                    </div>
                </template>
            </el-table-column>
            <el-table-column prop="expr" label="表达式"></el-table-column>
            <el-table-column prop="status" label="状态">
                <template slot-scope="scope">
                    <div>
                        <el-tag v-if="scope.row.status==1" type="success">启用</el-tag>
                        <el-tag v-else type="danger">禁用</el-tag>
                    </div>
                </template>
            </el-table-column>
            <el-table-column prop="prop" label="操作" width="300">
                <template slot-scope="scope">
                    <div>
<!--                        <el-button type="primary" size="mini" @click="viewHandle(scope.row)">详情</el-button>-->
                        <el-button type="warning" size="mini" @click="editHandle(scope.row)">编辑</el-button>
                        <el-button type="danger" size="mini" @click="deleteHandle(scope.row.id)">删除</el-button>
                        <el-button v-if="scope.row.status==2" type="success" size="mini" @click="updateStatus(scope.row,1)">启用</el-button>
                        <el-button v-else type="danger" size="mini" @click="updateStatus(scope.row,2)">禁用</el-button>
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
import addOrUpdate from './interval-add'
import viewModule from '@/mixins/view-module'
export default {
    components:{ addOrUpdate},
    mixins:[viewModule],
    data(){
        return {
             mixinViewModuleOptions: {
                createdIsNeed: true,
                getDataListURL: '/task/crontab/',
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
        },
        updateStatus(row,status){
            this.$http({
                url:`/task/startStop/${row.id}/${status}`,
                method:"post"
            }).then(res=>{
                this.query()
                this.$message.success("操作成功")
            })
        }
    }
}
</script>
<style lang="scss" scoped>

</style>
