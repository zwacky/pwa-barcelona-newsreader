import { Location } from '@angular/common';
import { Component, ViewChild } from '@angular/core';
import { Nav, Platform, NavParams } from 'ionic-angular';

import { Http } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/filter';
import { NewsPage } from "../pages/news/news";

@Component({
	templateUrl: 'app.html'
})
export class MyApp {
	@ViewChild(Nav) nav: Nav;

	sources$: Observable<any>;
	newsName: string;

	constructor(
		public platform: Platform,
		public http: Http,
		public location: Location
	) {
		this.initializeApp();
	}

	initializeApp() {
		this.platform.ready().then(() => {
			// Okay, so the platform is ready and our plugins are available.
			this.sources$ = this.http.get('https://newsapi.org/v1/sources')
				.map(res => res.json());

			this.sources$
				.map(result => result.sources)
				.filter(sources => !this.location.path())
				.subscribe(sources => {
					const randomIndex = Math.floor(Math.random() * sources.length);
					this.selectSource(sources[randomIndex]);
				});
		});
	}

	selectSource(source) {
		this.newsName = source.id;
		this.nav.setRoot('news', {
			newsName: source.id
		});
	}

}
