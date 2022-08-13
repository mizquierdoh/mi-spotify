import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { SpotifyService } from 'src/app/services/spotify.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  loginURL: string;

  constructor(private spotifyService: SpotifyService,
    private route: ActivatedRoute,
    private router: Router) { }

  ngOnInit() {
    if (this.spotifyService.autorizado) {
      this.router.navigateByUrl("/library");
    }
    this.route.queryParams
      .subscribe(params => {
        console.log(params);
        if (!params['code']) {
          this.loginURL = this.spotifyService.loginUrl();
        } else {
          this.spotifyService.setToken(params['code'])
            .then(token => {
              this.router.navigateByUrl('/library');
            })
            .catch(err => {
              console.error("Ha habido un error: ", err);
              this.router.navigateByUrl('/login');
            });
        }
      }
      );
  }

}
