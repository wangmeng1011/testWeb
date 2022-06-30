<template>
    <div class="test-example">
        <el-button type="primary" icon="el-icon-plus" @click="addHandle">新增用例</el-button>
        <el-button type="warning"  @click="runAll">批量运行</el-button>
        <el-table
            :data="dataList"
             @selection-change="selectionHandle"
             v-loading="dataListLoading">
            <el-table-column  type="selection" label="全选" width="80"></el-table-column>
            <el-table-column prop="name" label="名称"></el-table-column>
            <el-table-column prop="description" label="描述"></el-table-column>
            <el-table-column prop="create_time" label="创建时间" :formatter="timeFormatter"></el-table-column>
            <el-table-column  label="操作">
                <template slot-scope="scope">
                    <div>
                        <el-button type="primary"  size="mini" @click="runHandle(scope.row.id)">运行</el-button>
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
    </div>
</template>
<script>
import viewModule from '@/mixins/view-module'
export default {
    name:"case",
    mixins:[viewModule],
    data(){
        return {
            mixinViewModuleOptions: {
                createdIsNeed: true,
                getDataListURL: '/case/case/',
                getDataListIsPage: true,
            },
            dataList:[],
        }
    },
    methods:{
        addHandle(){
            this.$router.push({name:"case-add"})
        },
        editHandle(row){
            // 本地存储
            let data=window.localStorage.getItem('case_data');
            if(data){
                data=JSON.parse(data);
            }
            else{
                data={};
            }
            data['case'+row.id]=row;
            window.localStorage.setItem('case_data',JSON.stringify(data));
            // 跳转
            this.$router.push({
                name:"case-add",
                query:{
                    id:row.id
                }
            })
        },
      timeFormatter(row){
        return row.create_time.substr(0,19).replace("T"," ")
      },
        runHandle(id){
            this.$confirm('即将运行用例, 是否继续?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {
                this.$http({
                    url:`/case/run/${id}/`,
                    method:"post"
                }).then(res=>{
                    this.$confirm('测试用例运行成功，已生成测试报告，报告详情请点击“确定”按钮跳转“报告汇总”页面进行查看', '提示信息', {
                        confirmButtonText: '确定',
                        cancelButtonText: '取消',
                        type: 'info'
                    }).then(res=>{
                        this.$router.push({name: 'report-total'})
                    }).catch(()=>{})
                }).catch(() => {})
            })
        },
        runAll(){
            if(this.dataListSelections.length==0){
                return this.$message.warning("请选择要运行的测试用例！")
            }
              this.$confirm('即将批量运行用例, 是否继续?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {
                this.$http({
                    url:`/case/runList/`,
                    method:"post",
                    data:{
                        case_id_list:this.dataListSelections.map(item=>item.id)
                    }
                }).then(res=>{
                    // this.$message.success("运行成功！")
                    this.$confirm('测试用例运行成功，已生成测试报告，报告详情请点击“确定”按钮跳转“报告汇总”页面进行查看', '提示信息', {
                        confirmButtonText: '确定',
                        cancelButtonText: '取消',
                        type: 'info'
                    }).then(res=>{
                        this.$router.push({name: 'report-total'})
                    }).catch(()=>{})
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
