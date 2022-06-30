<template>
    <div class="host">
        <el-button type="primary" icon="el-icon-plus" @click="addHandle">新增用例</el-button>
        <el-table
            :data="dataList"
            v-loading="dataListLoading">
            <el-table-column prop="title" label="用1例标题"></el-table-column>
            <el-table-column prop="case_type" label="用例类型"></el-table-column>
            <el-table-column prop="result" :formatter="resultOptions" label="执行结果"></el-table-column>
            <el-table-column prop="case_priority" label="优先级"></el-table-column>
            <el-table-column prop="prop" label="操作">
                <template slot-scope="scope">
                    <div>
                        <el-button type="primary" size="mini" @click="runHandler(scope.row)">执行用例</el-button>
                        <el-button type="primary" size="mini" @click="editHandle(scope.row)">修改</el-button>
                        <el-button type="danger" size="mini" @click="copyHande(scope.row, scope.$index)">复制用例</el-button>
                        <el-button type="danger" size="mini" @click="bugsDeleteHandle(scope.row.id)">删除</el-button></el-button>
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
        <runView ref="runView" />
    </div>
</template>
<script>
import runView from '@/views/chandao/bugs-run'
import viewModule from '@/mixins/view-module'
export default {
    components:{ runView},
    mixins:[viewModule],
    data(){
        return {
             mixinViewModuleOptions: {
                createdIsNeed: true, 
                getDataListURL: `/chandao/modular_case/${this.$route.params.id}/`, 
                getDataListIsPage: true, 
            },
            dataList:[{
                id:1,
                title:"你好啊",
                preconditions:"你好山东省",
                case_stage:"功能测试阶段",
                case_type:"功能测试",
                case_priority:2,
                result:"unexecuted"
            }],
            projectList:[],
            result_options:{
                unexecuted:'未执行',
                pass : '成功',
                fail : '失败'
            }
        }
    },
    methods:{
        addHandle(){
            let moduleId = this.$route.params.id;
            let m = {
                modular: moduleId
            }
            this.$router.push({name:'chandao-bug-add',query:m})
            // this.$refs['addOrUpdate'].init(m);
        },
        editHandle(data){
            this.$router.push({name:'chandao-bug-add',query:data})
            // this.$refs['addOrUpdate'].init(data);
        },
        performHandle(){},
        copyHande(row, index){
            console.log(row, index)
            // 调用修改用例接口
            // this.loading=true;
            // let url=`/chandao/case/`
            // this.$http({
            //     url:url,
            //     method:'post',
            //     data:{
            //     ...this.dataList[index],
            //     }
            // }).then(res=>{
            //     this.$message.success("操作成功")
            //     this.visible = false;
            // }).finally(()=>{
            //     this.loading=false
            // })
            let data = this.dataList[index]
            this.$router.push({name:'chandao-bug-add',query:{...data, pageType:'copy'}})
        },
        resultOptions(row, column){
            let key = row.result
            switch(key){
                case "unexecuted":
                    return '未执行';
                 break
                case 'pass':
                return '通过';
                break
                case 'fail':
                return '失败';
                break
            }
            return '未执行';
        },
        runHandler(data){
            this.$refs['runView'].init(data);
        },
        bugsDeleteHandle(id) {
            let url = '/chandao/case/' + `${id}/`;
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
        }
    },
}
</script>
<style lang="scss" scoped>
    
</style>