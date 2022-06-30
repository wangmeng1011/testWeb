<template>
    <div class="host">
        <!-- <el-button type="primary" icon="el-icon-plus" @click="addExample">新增用户</el-button> -->

        <div style="float:right">
        <el-input v-model="search" style="display: inline-block;width: 100px" 
            placeholder="请输入搜索用户姓名">
        </el-input>
        <el-button type="primary" icon="el-icon-search" @click="searchHandler">搜索</el-button>
        </div>
        <el-table
            :data="dataList"
             v-loading="dataListLoading">
            <el-table-column prop="id" label="id"></el-table-column>
            <el-table-column prop="mobile" label="手机号"></el-table-column>
            <el-table-column prop="email" label="邮箱"></el-table-column>
            <el-table-column prop="name" label="姓名"></el-table-column>
            <el-table-column prop="is_staff" :formatter="staffHandler" label="管理员"></el-table-column>
            <el-table-column prop="prop" label="操作">
                <template slot-scope="scope">
                    <div>
                        <el-button type="primary" size="mini" @click="upgradeHandler(scope.row)">升级为管理员</el-button>
                        <!-- <el-button  type="danger" size="mini" @click="deleteExample(scope.row)">删除</el-button> -->
                        <!-- <el-button type="danger" size="mini" @click="viewDetails(scope.row)">查看详情</el-button> -->
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
import addOrUpdate from '@/views/stat/mesh-add-update'
import viewModule from '@/mixins/view-module'
export default {
    components:{ addOrUpdate},
    mixins:[viewModule],
    data(){
        return {
             mixinViewModuleOptions: {
                createdIsNeed: true, 
                getDataListURL: '/register?username=', 
                getDataListIsPage: true, 
            },
            dataList:[],
            projectList:[],
            search:''
        }
    },
    created(){

    },
    methods:{
        addExample(){
            this.$refs['addOrUpdate'].init();
        },
        editExample(data){
            this.$refs['addOrUpdate'].init(data);
        },
        deleteExample(row){
            consol.log("删除")
        },
        searchHandler(){
            this.$http({
            url:`/register?username=${this.search}`,
            method:'get'
            }).then(res=>{
                this.dataList=res.results;
            })
        },
        upgradeHandler(row){
            this.$http({
            url:`/jurisdiction/${row.mobile}`,
            method:'post'
            }).then(res=>{
                this.$message.success("操作成功");
                this.searchHandler();
            })
        },
        staffHandler(row){
            return row.is_staff ? '是':'否';
        }
    }
}
</script>
<style lang="scss" scoped>
    
</style>