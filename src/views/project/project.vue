<template>
    <div class="project">
        <el-button type="primary" icon="el-icon-plus" @click="addExample">新增项目</el-button>
        <el-table :data="dataList" v-loading="dataListLoading">
            <el-table-column prop="name" label="项目名称"></el-table-column>
            <el-table-column prop="type" label="项目类型"></el-table-column>
<!--            <el-table-column  label="创建人">-->
<!--                <template slot-scope="scope">-->
<!--                    <div>-->
<!--                        {{scope.row.user&&scope.row.user.username}}-->
<!--                    </div>-->
<!--                </template>-->
<!--            </el-table-column>-->
            <el-table-column prop="description" label="描述"></el-table-column>
            <el-table-column  label="操作">
                <template slot-scope="scope">
                    <div>
                        <el-button type="warning" size="mini" @click="editExample(scope.row)">编辑</el-button>
                        <el-button type="danger" size="mini" @click="deleteHandle(scope.row.id)">删除</el-button>
                    </div>
                </template>
            </el-table-column>
        </el-table>
        <el-pagination
            @current-change="pageCurrentChangeHandle"
            :page-size="20"
            :page-count="page"
            layout="total,prev, pager, next"
            :total="total">
        </el-pagination>
        <addOrUpdate ref="addOrUpdate" />
    </div>
</template>
<script>
import addOrUpdate from '@/views/project/project-add-or-update'
import viewModule from '@/mixins/view-module'
export default {
    components:{ addOrUpdate},
    mixins:[viewModule],
    data(){
        return {
            mixinViewModuleOptions: {
                createdIsNeed: true,
                getDataListURL: '/api/project/',
                getDataListIsPage: true,
            },
            dataList:[]
        }
    },
    methods:{
        addExample(){
            this.$refs['addOrUpdate'].init();
        },
        editExample(data){
            this.$refs['addOrUpdate'].init(data);
        }
    }
}
</script>
<style lang="scss" scoped>

</style>
