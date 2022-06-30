<template>
    <div>
        <h2>测试报告</h2>
    <div class="main">
        <div class="report">
            <h3>报告汇总</h3>
            <div class="report-content">
                <div class="report-item">
                    <ul>
                        <li>
                            <span>用例名称：</span><el-input v-model="dataForm.caseName"  clearable readonly></el-input>
                        </li>
                         <li>
                            <span>用例总数：</span><el-input v-model="dataForm.case_all"  clearable readonly></el-input>
                        </li>
                         <li>
                            <span>用例通过：</span><el-input v-model="dataForm.case_pass"  clearable readonly></el-input>
                        </li>
                         <li>
                            <span>用例失败：</span><el-input v-model="dataForm.case_fail"  clearable readonly></el-input>
                        </li>
                         <li>
                            <span>用例跳过：</span><el-input v-model="dataForm.jump"  clearable readonly></el-input>
                        </li>
                         <li>
                            <span>开始时间：</span><el-input v-model="dataForm.create_time"  clearable readonly></el-input>
                        </li>
                         <li>
                            <span>运行时间：</span><el-input v-model="dataForm.runtime"  clearable readonly></el-input>
                        </li>
                    </ul>
                </div>
                <div class="report-item" id="echarts">
                    <v-chart :options="pieOptions"/>
                </div>
            </div>
        </div>
        <div class="details">
            <h3>详细数据</h3>
            <div class="details-content">
                <div class="details-header">
                    <span class="title">测试类：</span>
                    <el-select v-model="test" clearable filterable>
                        <el-option  label="全部" value="all"></el-option>
                        <!-- <el-option  label="失败" value="fail"></el-option> -->
                        <!-- <el-option  label="成功" value="pass"></el-option> -->
                    </el-select>
                    <span class="title">结果：</span>
                   <el-select v-model="result" clearable filterable>
                        <el-option  label="全部" value="all"></el-option>
                        <el-option  label="失败" value="fail"></el-option>
                        <el-option  label="成功" value="pass"></el-option>
                    </el-select>
                    <div class="details-summary">
                        <span>用例数：{{dataForm.case_all}}</span>
                        <span style="color:#25c6fc;">成功：{{dataForm.case_pass}}</span>
                        <span style="color:#FF534D;">失败：{{dataForm.case_fail}}</span>
                        <span style="color:#edd0be;">跳过：0</span>
                    </div>
                </div>
                <el-table :data="dataList" border stripe>
                    <!-- <el-table-column    type="expand">
                        <template slot-scope="props">
                            {{ props.row.caseDetails }}
                        </template>
                    </el-table-column> -->
                    
                    <el-table-column type="index"  label="编号" width="80"></el-table-column>
                    <el-table-column prop="testClass" label="测试类"></el-table-column>
                    <el-table-column prop="testMethod" label="测试方法"></el-table-column>
                    <el-table-column prop="caseDescribe" label="用例描述"></el-table-column>
                    <el-table-column prop="result" label="结果">
                         <template slot-scope="scope">
                            <div>
                                <el-tag v-if="scope.row.result=='pass'" type="success">成功</el-tag>
                                <el-tag v-else type="danger">失败</el-tag>
                            </div>
                        </template>
                    </el-table-column>
                    <el-table-column type="expand" label="操作">
                         <template slot-scope="props">
                           <div>
                               <p style="margin:0;" v-for="(item,index) in props.row.caseDetails.split(',')" :key="index">{{item}}</p>
                            </div>
                        </template>
                    </el-table-column>
                </el-table>
                
            </div>
        </div>
    </div>
    </div>
</template>
<script>
import ECharts from 'vue-echarts'
import 'echarts/lib/chart/pie'
import 'echarts/lib/component/tooltip'
import 'echarts/lib/component/title'
export default {
    components: {
    'v-chart': ECharts
    },
    created(){
         let name=this.$route.query.name;
        this.init(name)
    },
    activated(){
        let name=this.$route.query.name;
        this.init(name)
    },
    data() {
        return {
            dataForm:{
                name:"",
                test:"",
                jump:'0',
                runtime:null
            },
            // dataList:[],
            result:'all',
            test:'all',
            dataAllList:[],
        }
    },
    computed:{
        dataList(){
            return this.dataAllList.filter(item=>{
                if(this.result=='all'){
                    return true
                }
                return item.result==this.result
            })
        },
        pieOptions(){
            return {
                 title: {
                    text: '测试用例运行结果',
                    subtext: '',
                    x: 'center',
                    textStyle: {
                        "color": "#555"
                    }
                },
                tooltip: {
                    trigger: 'item',
                    formatter: "{a} <br/>{b} : {c} ({d}%)"
                },
                legend: {
                    orient: 'vertical',
                    y: 'center',
                    x: 'right',
                    data: ['失败', '跳过', '成功']
                },
                series: [{
                    name: '运行结果',
                    type: 'pie',
                    radius: '55%',
                    center: ['50%', '60%'],
                    data: [{
                        value: this.dataForm["case_fail"],
                        name: '失败'
                    }, {
                        value: 0,
                        name: '跳过'
                    }, {
                        value: this.dataForm["case_pass"],
                        name: '成功'
                    }],
                    color: [
                        "#FF534D",
                        "#edd0be",
                        "#25c6fc"
                    ],
                    itemStyle: {
                        emphasis: {
                            shadowBlur: 10,
                            shadowOffsetX: 0,
                            shadowColor: 'rgba(0, 0, 0, 0.5)'
                        }
                    }
                }]
            }
        }
    },
    methods:{
        init(name){
            this.$http({
                url:`/test/report/${name}`,
                method:"get"
            }).then(res=>{
                console.log(res)
                let {data,...dafaForm}=res.result;
                if(Object.prototype.toString.call(data[0])=="[object Array]"){
                    let  arr=[];
                    data.forEach(ele=>{
                        arr=arr.concat(ele)
                    });
                    data=arr
                }
                this.dataForm={
                    ...this.dafaForm,
                    ...dafaForm,
                    jump:0
                };
                this.dataAllList=data;
            })
        }
    }
}
</script>
<style lang="scss" scoped>
    h2 {
    font-size: 25px;
    color: #25c6fc;
    line-height: 80px;
    text-align: center;
    background: #fff;
}

h3 {
    font-size: 16px;
    padding: 0 20px;
    line-height: 3em;
    border-bottom: solid 1px #e7eaec;
}

.main {
    margin: 20px;
    background: #fff;
    color: #666;
}

.report-content {
    display: flex;
    justify-content: space-around;
    align-content: stretch;
}

.report-content .report-item {
    width: 50%;
    margin: 15px;
}

.report-content .report-item ul {
    list-style-type: none;
    margin-left: 100px;
    width: 400px;
}

.report-content .report-item:nth-child(1) {
    box-sizing: border-box;
    border-right: solid 1px #e7eaec;
}

.report-content .report-item ul li {
    display: flex;
    align-content: stretch;
    line-height: 36px;
    font-size: 14px;
    margin-bottom: 15px;
}

.report-content .report-item ul li span {
    width: 100px;
    font-weight: bold;
}

.report-content .report-item ul li input {
    flex: 1;
    outline: none;
    border: solid 1px #e7eaec;
}

.report-content .report-item ul li:nth-child(3) {
    color: #25c6fc;
}

.report-content .report-item ul li:nth-child(4) {
    color: #FF534D;
}

.report-content .report-item ul li:nth-child(5) {
    color: #edd0be;
}

.details .details-content {
    padding: 15px;
}

.details .details-content .details-header {
    background: #25c6fc;
    color: #fff;
    padding: 10px 20px;
    line-height: 30px;
    font-size: 14px;
}

.details .details-content .details-header .title {
    display: inline-block;
    vertical-align: top;
    padding-left: 20px;
}

.details .details-content .details-header select {
    outline: none;
    width: 300px;
    display: inline-block;
    vertical-align: top;
    line-height: 30px;
    height: 30px;
}

.details .details-content .details-header .details-summary {
    float: right;
    padding: 0 20px;
    background: #fff;
    line-height: 30px;
    color: #333;
}

.details .details-content .details-header .details-summary span {
    display: inline-block;
    vertical-align: top;
    padding: 0 10px;
    margin: 8px 0;
    font-weight: bold;
    line-height: 1;
}

.details .details-content .details-header .details-summary span:nth-child(n+2) {
    border-left: solid 1px #666;
}
</style>