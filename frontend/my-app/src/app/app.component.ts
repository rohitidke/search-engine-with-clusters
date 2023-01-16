import { Component } from '@angular/core';
import * as Highcharts from 'highcharts';
import HC_more from "highcharts/highcharts-more";
HC_more(Highcharts);

import { SearchengineService } from './searchengine.service';

@Component({
  selector: 'my-app',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = "Hello"
  Highcharts = Highcharts
  chartData = null
  showClusters = false
  updateFlag = false
  showError = false
  oneToOneFlag = false
  loading = false

  constructor(private searchengineService: SearchengineService) { }

  bubblechart: any = {
    chart: {
      type: 'packedbubble'
    },
    series: null,
    plotOptions: {
      packedbubble: {
        layoutAlgorithm: {
          gravitationalConstant: 0.05,
          splitSeries: true,
          seriesInteraction: false,
          dragBetweenSeries: true,
          parentNodeLimit: true
        }
      }
    },
    tooltip: {
      useHTML: true,
      pointFormat: '<b>Title:</b> {point.name}<br><b>Relevance score:</b> {point.value}<br><b>Content:</b> {point.content}'
    },
    title: {
      text: 'Search Result Clusters',
    },
  };

  callPostSearchResultsAPI(searchStr: any) {
    this.loading = true
    this.showClusters = false;
    this.showError = false;
    this.searchengineService.postSearchResults(searchStr)
      .subscribe((data: any) => {
        if (data.length === 0) {
          this.showClusters = false;
          this.showError = true;
          this.loading = false
        }
        else {
          this.loading = false
          this.showClusters = true;
          this.showError = false;
          this.bubblechart.series = data
          console.log(this.bubblechart)
          this.updateFlag = true;
          this.oneToOneFlag = true;
        }
      });
  }

}