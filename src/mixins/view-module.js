import Cookies from 'js-cookie'
import qs from 'qs'
export default {
    data() {
        /* eslint-disable */
        return {
            // 设置属性
            mixinViewModuleOptions: {
                createdIsNeed: true, // 此页面是否在创建时，调用查询数据列表接口？
                activatedIsNeed: false, // 此页面是否在激活（进入）时，调用查询数据列表接口？
                getDataListURL: '', // 数据列表接口，API地址
                getDataListIsPage: false, // 数据列表接口，是否需要分页？
                deleteURL: '', // 删除接口，API地址
                deleteIsBatch: false, // 删除接口，是否需要批量？
                deleteIsBatchKey: 'id', // 删除接口，批量状态下由那个key进行标记操作？比如：pid，uid...
                exportURL: '', // 导出接口，API地址
                needCheckRecord: false //是否需要在翻页的时候  记录勾选状态
            },
            // 默认属性
            dataForm: {}, // 查询条件
            dataList: [], // 数据列表
            order: '', // 排序，asc／desc
            orderField: '', // 排序，字段
            page: 1, // 当前页码
            limit: 20, // 每页数
            total: 0, // 总条数
            dataListLoading: false, // 数据列表，loading状态
            dataListSelections: [], // 数据列表，多选项
            addOrUpdateVisible: false, // 新增／更新，弹窗visible状态
            checkList: {} //分页跳转  记录 勾选状态
        }
        /* eslint-enable */
    },
    created() {
        if (this.mixinViewModuleOptions.createdIsNeed) {
            this.query()
        }
    },
    activated() {
        if (this.mixinViewModuleOptions.activatedIsNeed) {
            this.query()
        }
    },
    methods: {
        // 获取数据列表
        query() {
            this.dataListLoading = true
            this.$http.get(
                this.mixinViewModuleOptions.getDataListURL, {
                    params: {
                        page: this.mixinViewModuleOptions.getDataListIsPage ? this.page : null,
                        size: this.limit,
                        ...this.dataForm
                    }
                }
            ).then(res => {
                this.dataListLoading = false
                    // if (res.results.length == 0) {
                    //     this.dataList = []
                    //     this.total = 0
                    //     return this.$message.error(res)
                    // }
                this.dataList = res.results || res.result;
                this.total = res.count;
            }).catch(() => {
                this.dataListLoading = false
            })
        },
        // 表单重置
        resetForm(formName) {
            this.$refs[formName].resetFields();
            // 当存在 el-date-picker && （ type="daterange"||type="datetimerange"）时，将变量定义为daterange
            if (this.daterange) {
                this.daterange = null
            }
            this.page = 1
            this.limit = 20
            this.query()
        },

        // 分页, 每页条数
        pageSizeChangeHandle(val) {
            this.page = 1
            this.limit = val
            this.query()
        },
        // 分页, 当前页
        pageCurrentChangeHandle(val) {
            this.page = val
            this.query()
        },
        // 删除
        deleteHandle(id, type) {
            let url = '';
            if(this.mixinViewModuleOptions.getDataListURL.endsWith('/')){
                url = this.mixinViewModuleOptions.getDataListURL +  `${id}/`;
            }else{
                url = this.mixinViewModuleOptions.getDataListURL +  `/${id}/`;
            }
            console.log(url)
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
        selectionHandle(data){
            this.dataListSelections=data
        },
        // 导出
        exportHandle() {
            var params = qs.stringify({
                'access_token': Cookies.get('access_token'),
                ...this.dataForm
            })
            window.location.href = `${window.SITE_CONFIG['apiURL']}${this.mixinViewModuleOptions.exportURL}?${params}`
        }
    }
}