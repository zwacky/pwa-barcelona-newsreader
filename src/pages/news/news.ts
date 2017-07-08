import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Http } from '@angular/http';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';

@IonicPage({
	name: 'news',
	segment: 'news/:newsName',
})
@Component({
	selector: 'page-news',
	templateUrl: 'news.html',
})
export class NewsPage {

	articles: Observable<any>;

	constructor(
		public navCtrl: NavController,
		public navParams: NavParams,
		public http: Http
	) {
		const params = {
			apiKey: '75a30d601eac4cf6a4da05630deab809', // just for demo purposes, plx on abuse 😅
			source: navParams.data.newsName
		};
		this.articles = this.http.get('https://newsapi.org/v1/articles', {params: params})
			.map(res => res.json());
	}

}
