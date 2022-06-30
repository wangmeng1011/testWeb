<template>
  <div class="dashboard-container">
        <el-row class="home-tips">
          <el-col>
            <i class="el-icon-s-cooperation"></i>
            <h4>总项目数</h4>
            <p>{{total.project_count}}</p>
          </el-col>
          <el-col>
            <i class="el-icon-s-platform"></i>
            <h4>总环境数</h4>
            <p>{{total.host_count}}</p>
          </el-col>
          <el-col>
            <i class="el-icon-s-operation"></i>
            <h4>总接口数</h4>
            <p>{{total.api_count}}</p>
          </el-col>
          <el-col>
            <i class="el-icon-s-data"></i>
            <h4>总用例数</h4>
            <p>{{total.case_count}}</p>
          </el-col>
        </el-row>
       <ul class="home-container">
         <li><v-chart :options="barOptionsProject" :autoresize="true"></v-chart></li>
         <li><v-chart :options="barOptions" :autoresize="true"></v-chart></li>
       </ul>
  </div>
</template>

<script>
import ECharts from "vue-echarts";
import "echarts/lib/chart/bar";
import "echarts/lib/chart/pie";
import "echarts/lib/component/tooltip";
import "echarts/lib/component/legend";
import "echarts/lib/component/title";
import {getHomeData} from '@/api/home'
export default {
  name: 'Dashboard',
  components: {
    "v-chart": ECharts
  },
  created(){
    getHomeData().then(res=>{
      const { api_write_list,case_write_list,...total}=res.result;
      this.total=total;
      // 用例统计
      this.barOptions.xAxis.data=case_write_list.map(item=>item.time);
      this.barOptions.series[0].data=case_write_list.map(item=>item.case_count);
      // api统计
      this.barOptionsProject.xAxis.data=api_write_list.map(item=>item.time);
      this.barOptionsProject.series[0].data=api_write_list.map(item=>item.api_count);
    })
  },
  data(){
    return {
      total:{
        project_count:0,
        host_count:0,
        api_count:0,
        case_count:0
      },
      barOptions:{
        color:['#2EC7C9','#B6A2DD','#5AB1F1','#FEB980'],
        title: {
          text: '近五天用例数量',
          left: 'center'
        },
        tooltip: {
            trigger: 'item',
            formatter: '时间：{b}<br>数量：{c}'
        },
        xAxis: {
          type: 'category',
          data: []
        },
        yAxis: {
            type: 'value',
            minInterval:1
        },
        series: [{
            data: [],
            type: 'bar'
        }]
      },
      barOptionsProject:{
        color:['#2EC7C9','#B6A2DD','#5AB1F1','#FEB980'],
        title: {
          text: '近五天接口数量',
          left: 'center'
        },
        tooltip: {
            trigger: 'item',
            formatter: '时间：{b}<br>数量：{c}'
        },
        xAxis: {
          type: 'category',
          data: []
        },
        yAxis: {
            type: 'value',
            minInterval:1
        },
        series: [{
            data: [],
            type: 'bar'
        }]
      }
     }
  }
}
</script>

<style lang="scss" scoped>
@import '@/styles/variables.scss';

.dashboard-container{
  .home-tips{
    display: flex;
    justify-content: space-between;
    align-content: stretch;
    .el-col{
      text-align: right;
      box-sizing: border-box;
      padding: 0 20px;
      border-radius: 4px;
      border: solid 1px $menuHover;
      color: $menuHover;
      width: 25%;
      &:nth-child(n+2){
        margin-left: 20px;
      }
      i{
        font-size: 40px;
        line-height: 100px;
        vertical-align: top;
        float: left;
      }
      h4{
        font-size: 18px;
        line-height: 60px;
        margin: 0;
      }
      p{
        font-size: 18px;
        line-height: 40px;
        margin: 0;
      }
    }
  }
  .home-container{
    display: flex;
    justify-content: space-between;
    align-content: stretch;
    list-style-type: none;
    margin: 30px 0 0;
    padding: 0;
    li{
      width: 50%;
      height: calc(100vh - 230px);
      border:  solid 1px $menuHover;
      padding: 20px;
      border-radius: 4px;
      .echarts {
        width: 100%;
        height: 100%;
      }
      &:nth-child(2){
        margin-left: 20px;
      }
    }
  }
}
</style>
