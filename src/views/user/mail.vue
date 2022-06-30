<!--
 * @Description  : 邮箱设置
 * @Author       : chenLiang
 * @Date         : 2022-05-21 22:03:29
 * @LastEditors  : chenLiang
 * @LastEditTime : 2022-05-21 22:59:19
-->
<template>
  <div class="host">
    <!-- <el-button type="primary" icon="el-icon-plus" @click="addExample">新增用户</el-button> -->

    <div style="float: right">
      <el-button type="primary" icon="el-icon-search" @click="searchHandler">
        搜索
      </el-button>
      <el-button
        type="primary"
        icon="el-icon-search"
        @click="showDialogEvent('add')"
				:loading="loading">
        添加
      </el-button>
    </div>
    <el-table :data="dataList" v-loading="dataListLoading">
      <el-table-column type="index" label="序号"></el-table-column>
      <el-table-column prop="email" label="邮箱"></el-table-column>
      <el-table-column prop="name" label="用户名"></el-table-column>
      <el-table-column prop="status" label="状态">
				<template slot-scope="scope">
					<div>
						<el-switch
							v-model="scope.row.status"
							:active-value="true"
							:inactive-value="false"
							disabled
						></el-switch>
					</div>
				</template>
			</el-table-column>
      <!-- <el-table-column
        prop="is_staff"
        :formatter="staffHandler"
        label="管理员"
      ></el-table-column> -->
      <el-table-column prop="prop" label="操作">
        <template slot-scope="scope">
          <div>
            <el-button
              type="primary"
              size="mini"
              @click="showDialogEvent('update',scope.row)"
            >
              修改
            </el-button>
						<el-button
              type="danger" 
              size="mini"
              @click="delBtnEvent(scope.row)"
            >
              删除
            </el-button>
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
      :total="total"
    >
    </el-pagination>
    <el-dialog title="提示" :visible.sync="dialogVisible" width="600" :close-on-click-modal="false" destroy-on-close>
      <el-form ref="dialogForm" :model="dialogForm" label-width="80px" :rules="rules">
        <el-form-item label="邮箱" prop="email">
          <el-input v-model="dialogForm.email"></el-input>
        </el-form-item>
        <el-form-item label="姓名" prop="name">
          <el-input v-model="dialogForm.name"></el-input>
        </el-form-item>
        <el-form-item label="是否禁用" prop="status">
          <el-switch v-model="dialogForm.status"></el-switch>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="submitEvent" :loading="loading"> 确 定 </el-button>
      </span>
    </el-dialog>
  </div>
</template>
<script>
import viewModule from "@/mixins/view-module";
export default {
  mixins: [viewModule],
  data() {
    return {
      mixinViewModuleOptions: {
        createdIsNeed: true,
        getDataListURL: "/report/email/",
        getDataListIsPage: true,
      },
      dataList: [],
      projectList: [],
      search: "",
			dialogVisible: false,
      dialogType: "",
      dialogForm: {},
			loading: false,
			rules: {
				email: [
					{ required: true, message: "请输入邮箱", trigger: "blur" },
					{ type: "email", message: "请输入正确的邮箱", trigger: "blur" },
				],
				name: [
					{ required: true, message: "请输入姓名", trigger: "blur" },
				],
			}
    };
  },
  created() {},
  methods: {
		updateApi(){
			let type = this.dialogType == 'add' ? 'post' : 'put';
			let url = this.dialogType == 'add' ? '/report/email/' : '/report/email/' + this.dialogForm.id + '/';
			this.loading = true;
			
			this.$http[type](url, this.dialogForm).then(res => {
			this.dialogType = '';
			this.dialogVisible = false;
			this.query();
			}).finally(() => {
				this.loading = false;
			});
		},
		delBtnEvent(item){
			this.$confirm('此操作将永久删除, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(async () => {
					this.$http.get('/report/email/' + item.id + '/').then(res => {
						this.$message({
							type: 'success',
							message: '删除成功!'
						});
						this.query();
					})
          
        })
		},
    addExample() {
      this.$refs["addOrUpdate"].init();
    },
    editExample(data) {
      this.$refs["addOrUpdate"].init(data);
    },
    deleteExample(row) {
      consol.log("删除");
    },
    searchHandler() {
      this.$http({
        url: `/report/email/`,
        method: "get",
      }).then((res) => {
        this.dataList = res.results;
      });
    },
    upgradeHandler(row) {
      this.$http({
        url: `/jurisdiction/${row.mobile}`,
        method: "post",
      }).then((res) => {
        this.$message.success("操作成功");
        this.searchHandler();
      });
    },
    staffHandler(row) {
      return row.is_staff ? "是" : "否";
    },
		showDialogEvent (type, row) {
			this.dialogVisible = true;
			this.dialogType = type;
			if (type === "add") {
				this.dialogForm = {
					email: null,
					name: null,
					status: true,
					is_staff: 0,
				};
			} else if (type === "update") {
				this.dialogForm = {
					email: row.email,
					name: row.name,
					status: row.status,
					is_staff: row.is_staff,
					id: row.id,	
				};
			}
		},
    submitEvent() {
      this.$refs.dialogForm.validate((valid) => {
        if (valid) {
          this.updateApi();
				} else {
					console.log("error submit!!");
					return false;
				}
      });
    },
  },
};
</script>
<style lang="scss" scoped>
</style>