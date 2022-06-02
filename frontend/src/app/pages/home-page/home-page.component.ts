import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

interface Pin {
  top: string;
  left: string;
  delay: number;
  duration: number;
}
@Component({
  selector: 'home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.scss'],
})
export class HomePageComponent implements OnInit {
  testimonials = [
    {
      name: 'Devin Harris',
      comment: `This site rocks! Started my search alone, and found 3 amazing roommates and now lifelong friends!`,
    },
    {
      name: 'Brandon Jones',
      comment: `Was looking for a new place and was impressed with all the options provided. Found a place right next to where I work with some awesome people.`,
    },
    {
      name: 'Sonic the hedgehog',
      comment: `Awesome site! I have a very fast moving life so being able to connect and find roommates on the fly was a huge help.`,
    },
  ];

  pins: Pin[] = [];

  constructor(private router: Router) {}

  ngOnInit(): void {
    this.buildPins();
  }

  buildPins() {
    this.pins = [
      { top: '5%', left: '5%' },
      { top: '5%', left: '15%' },
      { top: '35%', left: '5%' },
      { top: '25%', left: '45%' },
      { top: '85%', left: '40%' },
      { top: '35%', left: '10%' },
      { top: '65%', left: '20%' },
      { top: '35%', left: '35%' },
      { top: '25%', left: '95%' },
      { top: '75%', left: '85%' },
      { top: '45%', left: '75%' },
      { top: '85%', left: '70%' },
      { top: '25%', left: '90%' },
    ]
      .map((p, i) => {
        return {
          ...p,
          duration: this.getAnimationDuration(),
        };
      })
      .map((p, i) => {
        return {
          ...p,
          delay: this.getAnimationDelay(p.duration),
        };
      });
  }

  navigateToSignupPage(): void {
    this.router.navigateByUrl('/signup');
  }

  getRandomArbitrary(min: number, max: number) {
    return Math.random() * (max - min) + min;
  }

  getAnimationDelay(duration: number): number {
    return this.getRandomArbitrary(0, duration);
  }

  getAnimationDuration(): number {
    return this.getRandomArbitrary(2000, 5000);
  }
}
