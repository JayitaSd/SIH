import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {
  
constructor(private router:Router){}
navigateToPage(page:string){
  this.router.navigate([page]);
}

  
translations :any= {
  en: {
    navCrop: "Enter a crop",
    navAnalysis: "Analysis",
    navProfile: "Profile",
    btnLogin: "Login",
    btnSignup: "Signup",
    heroTitle: "KrushiJantra",
    heroSubtitle: "Where tradition meets intelligence for better harvests!",
    step1: "🪪 Register",
    step2: "🔑 Login",
    step3: "🌱 Enter Your Crop",
    step4: "📊 Get Insights",
    step5: "📈 Track Progress",
    step6: "📶 Grow Smarter",
    step7: "📒 Check your Logs"
  },
  hi: {
    navCrop: "फसल दर्ज करें",
    navAnalysis: "विश्लेषण",
    navProfile: "प्रोफ़ाइल",
    btnLogin: "लॉगिन",
    btnSignup: "साइनअप",
    heroTitle: "कृषिजंत्र",
    heroSubtitle: "जहाँ परंपरा मिलती है बुद्धिमत्ता से बेहतर फसल के लिए!",
    step1: "🪪 पंजीकरण करें",
    step2: "🔑 लॉगिन करें",
    step3: "🌱 अपनी फसल दर्ज करें",
    step4: "📊 जानकारी प्राप्त करें",
    step5: "📈 प्रगति ट्रैक करें",
    step6: "📶 स्मार्ट तरीके से बढ़ें",
    step7: "📒 अपने लॉग देखें"
  },
  mr: {
    navCrop: "पिक प्रविष्ट करा",
    navAnalysis: "विश्लेषण",
    navProfile: "प्रोफाइल",
    btnLogin: "लॉगिन",
    btnSignup: "साइनअप",
    heroTitle: "कृषिजनत्र",
    heroSubtitle: "जिथे परंपरा आणि बुद्धिमत्ता एकत्र येतात चांगल्या पीकासाठी!",
    step1: "🪪 नोंदणी करा",
    step2: "🔑 लॉगिन करा",
    step3: "🌱 आपले पिक प्रविष्ट करा",
    step4: "📊 अंतर्दृष्टी मिळवा",
    step5: "📈 प्रगती ट्रॅक करा",
    step6: "📶 शहाणपणाने वाढवा",
    step7: "📒 आपले लॉग तपासा"
  },
  or: {
    navCrop: "ଶସ୍ୟ ଲେଖନ୍ତୁ",
    navAnalysis: "ବିଶ୍ଳେଷଣ",
    navProfile: "ପ୍ରୋଫାଇଲ୍",
    btnLogin: "ଲଗଇନ୍",
    btnSignup: "ସାଇନ୍ଅପ୍",
    heroTitle: "କୃଷିଜନ୍ତ୍ର",
    heroSubtitle: "ଯେଉଁଠାରେ ପାରମ୍ପରିକତା ଓ ବୁଦ୍ଧିମତା ଏକସାଥିେ ଭଲ ପକାଳ ପାଇଁ!",
    step1: "🪪 ନିବନ୍ଧନ କରନ୍ତୁ",
    step2: "🔑 ଲଗଇନ୍ କରନ୍ତୁ",
    step3: "🌱 ଆପଣଙ୍କର ଶସ୍ୟ ଲେଖନ୍ତୁ",
    step4: "📊 ଅନୁସନ୍ଧାନ ପାଆନ୍ତୁ",
    step5: "📈 ପ୍ରଗତି ଟ୍ରାକ୍ କରନ୍ତୁ",
    step6: "📶 ସ୍ମାର୍ଟଭାବରେ ବୃଦ୍ଧି କରନ୍ତୁ",
    step7: "📒 ଆପଣଙ୍କର ଲଗ୍ସ ଯାଞ୍ଚ କରନ୍ତୁ"
  }
};

 changeLanguage(lang:any) {
  document.querySelectorAll(".translatable").forEach(el => {
    const key = el.getAttribute("data-key");
    if (key && this.translations[lang][key]) {
      (el as HTMLElement).innerText = this.translations[lang][key];
    }
  });

  // Hero text
  const heroTitleEl = document.querySelector(".hero h2");
  if (heroTitleEl) {
    (heroTitleEl as HTMLElement).innerText = this.translations[lang].heroTitle;
  }
  const heroSubtitleEl = document.querySelector(".hero h4");
  if (heroSubtitleEl) {
    (heroSubtitleEl as HTMLElement).innerText = this.translations[lang].heroSubtitle;
  }

  // Guide steps
  const steps = document.querySelectorAll(".z-step h4");
  const stepKeys = ["step1","step2","step3","step4","step5","step6","step7"];
  steps.forEach((step, i) => {
    (step as HTMLElement).innerText = this.translations[lang][stepKeys[i]];
  });
}

// Handle language dropdown click
ngOnInit(): void {
  
  (document.querySelectorAll(".lang-option") as NodeListOf<Element>).forEach(option => {
    option.addEventListener("click", () => {
      const lang = option.getAttribute("data-lang");
      this.changeLanguage(lang);
    });
  });
}


}
