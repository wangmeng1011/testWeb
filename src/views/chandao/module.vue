<template>
    <div class="host">
        <el-button type="primary" icon="el-icon-plus" @click="addHandle">新增模块</el-button>
        <el-table
            :data="dataList"
            v-loading="dataListLoading">
            <el-table-column prop="modular" label="模块名称"></el-table-column>
            <el-table-column prop="case_count" label="模块总用例"></el-table-column>
            <el-table-column prop="case_pass_count" label="已执行用例"></el-table-column>
            <el-table-column prop="case_unexecuted_count" label="未执行用例"></el-table-column>
            <el-table-column prop="case_fail_count" label="失败行用例"></el-table-column>
            <el-table-column prop="prop" label="操作">
                <template slot-scope="scope">
                    <div>
                        <el-button type="primary" size="mini" @click="editHandle(scope.row)">修改</el-button>
                        <el-button type="warning" size="mini" @click="viewHandle(scope.row)">用例列表</el-button>
                        <el-button type="danger" size="mini" @click="moduleDeleteHandle(scope.row.id)">删除</el-button>
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
import addOrUpdate from '@/views/chandao/module-add-or-update'
import viewModule from '@/mixins/view-module'
export default {
    components:{ addOrUpdate},
    mixins:[viewModule],
    data(){
        return {
             mixinViewModuleOptions: {
                createdIsNeed: true, 
                getDataListURL: `/chandao/project_modular/${this.$route.params.id}/`, 
                getDataListIsPage: true, 
            },
            dataList:[],
            projectList:[]
        }
    },
    methods:{
        addHandle(){
            let projecttId = this.$route.params.id;
            let p = {
                project: projecttId
            }
            this.$refs['addOrUpdate'].init(p);
        },
        editHandle(data){
            this.$refs['addOrUpdate'].init(data);
        },
        viewHandle(row){
            this.$router.push({
                name:"chandao-bug-list",
                params:{
                    id:row.id
                }
            })
        },
        moduleDeleteHandle(id) {
            let url = '/chandao/modular/' + `${id}/`;
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
                    url: url,
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
    }
}
</script>
<style lang="scss" scoped>
    
</style>