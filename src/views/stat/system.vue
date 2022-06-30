<template>
    <div class="host">
        <el-button type="primary" icon="el-icon-plus" @click="addExample">新增问题</el-button>
        <el-table
            :data="dataList"
             v-loading="dataListLoading">
            <el-table-column prop="project" label="所属项目" :formatter="fomatterProject"></el-table-column>
            <el-table-column prop="question" label="问题"></el-table-column>
            <el-table-column prop="prop" label="操作">
                <template slot-scope="scope">
                    <div>
                        <el-button type="warning" size="mini" @click="editExample(scope.row)">编辑</el-button>
                    
                        <el-button type="danger" size="mini" @click="deleteHandle(scope.row.id)">删除</el-button>
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
import addOrUpdate from '@/views/stat/system-add-update'
import viewModule from '@/mixins/view-module'
export default {
    components:{ addOrUpdate},
    mixins:[viewModule],
    data(){
        return {
             mixinViewModuleOptions: {
                createdIsNeed: true, 
                getDataListURL: '/question/', 
                getDataListIsPage: true, 
            },
            dataList:[],
            projectList:[]
        }
    },
    created(){
        // 获取项目列表
        this.$http({
        url:"/api/project/",
        method:'get'
        }).then(res=>{
        this.projectList=res.results.map(item=>{
            return  {
                label:item.name,
                value:item.id
            }
        })
        })
    },
    methods:{
        addExample(){
            this.$refs['addOrUpdate'].init();
        },
        editExample(data){
            this.$refs['addOrUpdate'].init(data);
        },
        fomatterProject(row){
            return this.projectList.filter(item=>item.value==row.project)[0].label
        }
    }
}
</script>
<style lang="scss" scoped>
    
</style>