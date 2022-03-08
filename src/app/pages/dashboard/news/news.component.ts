import { Component, OnInit } from '@angular/core';
import { NewsService } from 'app/_services/news.service';

@Component({
  selector: 'ngx-news',
  templateUrl: './news.component.html',
  styleUrls: ['./news.component.scss']
})
export class NewsComponent implements OnInit {
  news: any[] = [];
  constructor(private newsService: NewsService) { }

  ngOnInit(): void {
    this.getNews();
  }
  getNews() {
  this.newsService.getNwes().subscribe((item)=>{
    this.news = item
  })
  }

}
