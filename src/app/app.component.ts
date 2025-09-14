import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'KrushiJantra';
    ngAfterViewInit(): void {
    // MutationObserver se DOM observe karo
    const observer = new MutationObserver(() => {
      const iframe = document.querySelector('iframe.goog-te-banner-frame');
      if (iframe) {
        iframe.remove();   // iframe delete
      }

      const banner = document.querySelector('.goog-te-banner');
      if (banner) {
        banner.remove();   // banner delete
      }

      // kabhi kabhi Google body pe top:40px set kar deta hai
      document.body.style.top = '0px';
    });

    // poore body ko observe karo changes ke liye
    observer.observe(document.body, { childList: true, subtree: true });
  }
}
