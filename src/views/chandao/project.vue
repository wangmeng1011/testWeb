<template>
    <div class="host">
        <el-button type="primary" icon="el-icon-plus" @click="addHandle">新增项目</el-button>
        <el-button type="primary" icon="el-icon-plus" @click="downloadEvent('/chandao/excel/down/')">下载用例模版</el-button>
        <el-button type="primary" icon="el-icon-plus" @click="downloadEvent('/chandao/export/case/')">下载测试用例</el-button>
        <el-upload
            class="upload-demo"
            action="/import/case/"
            :limit="1"
            name="excel_file"
            :on-success="handleSuccess"
            :show-file-list="false">
                <el-button type="primary" icon="el-icon-plus" >上传测试用例</el-button>
                    
        </el-upload>
        <el-table
            :data="dataList"
            v-loading="dataListLoading">
            <el-table-column prop="project" label="项目名称"></el-table-column>
            <el-table-column prop="product_person" label="产品负责人"></el-table-column>
            <el-table-column prop="test_person" label="测试负责人"></el-table-column>
            <el-table-column prop="modular_count" label="模块数量"></el-table-column>
            <el-table-column prop="prop" label="操作">
                <template slot-scope="scope">
                    <div>
                        <el-button type="primary" size="mini" @click="editHandle(scope.row)">修改</el-button>
                        <el-button type="warning" size="mini" @click="viewHandle(scope.row)">模块列表</el-button>
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
import addOrUpdate from '@/views/chandao/project-add-or-update'
import viewModule from '@/mixins/view-module'
export default {
    components:{ addOrUpdate},
    mixins:[viewModule],
    data(){
        return {
             mixinViewModuleOptions: {
                createdIsNeed: true, 
                getDataListURL: '/chandao/project/', 
                getDataListIsPage: true, 
            },
            dataList:[],
            projectList:[]
        }
    },
    methods:{
        
        downloadEvent(url){
            window.open(url);
        },
        addHandle(){
            this.$refs['addOrUpdate'].init();
        },
        editHandle(data){
            this.$refs['addOrUpdate'].init(data);
        },
        viewHandle(row){
            this.$router.push({
                name:"chandao-module-list",
                params:{
                    id:row.id
                }
            })
        },
        handleSuccess(response){
            console.log(response);
            this.query()
        }
    }
}
</script>
<style lang="scss" scoped>
    .upload-demo {
        display: inline-block;
        margin-left: 10px;
    }
</style>