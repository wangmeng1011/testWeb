<template>
    <div class="host">
        <el-button type="primary" icon="el-icon-plus" @click="addHandle">新增测试用例</el-button>
        <el-table
            :data="dataList"
            v-loading="dataListLoading">
            <el-table-column prop="modular" label="业务" :formatter="formatterModular"></el-table-column>
            <el-table-column prop="modular_function" label="模块"></el-table-column>
            <el-table-column prop="modular_function_case" label="用例数量"></el-table-column>
            <el-table-column prop="prop" label="操作">
                <template slot-scope="scope">
                    <div>
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
import addOrUpdate from '@/views/project/bugs-list-add'
import viewModule from '@/mixins/view-module'
export default {
    components:{ addOrUpdate},
    mixins:[viewModule],
    data(){
        return {
             mixinViewModuleOptions: {
                createdIsNeed: false, 
                getDataListURL: '/test/chanDao/case/', 
                getDataListIsPage: true, 
            },
            dataList:[],
            projectList:[]
        }
    },
    created(){
        // 获取业务列表
        this.$http({
        url:"/test/chanDao/count",
        method:'get'
        }).then(res=>{
        this.projectList=res.result.map(item=>{
            return  {
                label:item.modular,
                value:item.id
            }
        })
        })
        this.mixinViewModuleOptions.getDataListURL="/test/chanDao/case/"+this.$route.params.id;
        this.query()
    },
    methods:{
        addHandle(){
            this.$refs['addOrUpdate'].init();
        },
        editHandle(data){
            this.$refs['addOrUpdate'].init(data);
        },
         // 删除 单独写 mixins
        deleteHandle(id, type) {
            if (!id) {
                return this.$message({
                    message: '请选择要删除的条目',
                    type: 'warning',
                    duration: 500
                })
            }
            this.$confirm('此操作将永久删除, 是否继续?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {
                this.$http({
                    method: 'delete',
                    url: `/test/chanDao/case/${id}`,
                }).then(res => {
                    this.$message({
                        type: "success",
                        message: "删除成功",
                        onClose: () => {
                            if (this.dataList.length === 1 && this.page > 1) {
                                --this.page
                            }
                            this.query()
                        }
                    })
                })
            }).catch(() => {})
        },
        formatterModular(row){
            return this.projectList.filter(item=>item.value==row.modular)[0].label
        }
    }
}
</script>
<style lang="scss" scoped>
    
</style>