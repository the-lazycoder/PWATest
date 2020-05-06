import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NavController } from '@ionic/angular';


@Component({
  selector: 'app-folder',
  templateUrl: './folder.page.html',
  styleUrls: ['./folder.page.scss'],
})
export class FolderPage implements OnInit {
  public folder: string;
    
    public url;
    constructor(private router: Router, private navCtrl: NavController,private activatedRoute: ActivatedRoute) {
      this.url = this.router.url;
      console.log("homepath=", window.location.pathname);
      console.log('homeurl=', this.url);
      if (this.router.url.includes('?res=')) {
        console.log('has/=', this.url.split('?res=')[1].includes('%2F'));
        if (this.url.split('?res=')[1].includes('%2F')) {
          this.navCtrl.navigateRoot('/test/' + this.url.split('?res=')[1].split('%2F')[1])
        } else {
          this.navCtrl.navigateRoot('/test/' + this.url.split('?res=')[1]);
        }
      }
    }

   

  ngOnInit() {
    this.folder = this.activatedRoute.snapshot.paramMap.get('id');
  }

}
