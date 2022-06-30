<template>
    <div class="host">
        <el-button type="primary" icon="el-icon-plus" @click="addHandle">新增业务</el-button>
        <el-table
            :data="dataList"
            v-loading="dataListLoading">
            <el-table-column prop="modular" label="业务"></el-table-column>
            <el-table-column prop="modular_function_case" label="用例总数"></el-table-column>
            <el-table-column prop="prop" label="操作">
                <template slot-scope="scope">
                    <div>
                        <el-button type="primary" size="mini" @click="viewHandle(scope.row)">详情</el-button>
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
import addOrUpdate from '@/views/project/bugs-add-or-update'
import viewModule from '@/mixins/view-module'
export default {
    components:{ addOrUpdate},
    mixins:[viewModule],
    data(){
        return {
             mixinViewModuleOptions: {
                createdIsNeed: true, 
                getDataListURL: '/test/chanDao/count', 
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
    }
}
</script>
<style lang="scss" scoped>
    
</style>