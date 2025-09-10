import { Component, Input } from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';

@Component({
  selector: 'app-react-host',
  templateUrl: './react-host.component.html',
  styleUrls: ['./react-host.component.css']
})
export class ReactHostComponent {
 @Input() page = ''; // folder name inside assets/react-pages
  iframeSrc: SafeResourceUrl = '';

  constructor(private sanitizer: DomSanitizer) {}

  ngOnInit() {
    const path = `assets/react/${this.page}/index.html`;
    this.iframeSrc = this.sanitizer.bypassSecurityTrustResourceUrl(path);
  }
}
