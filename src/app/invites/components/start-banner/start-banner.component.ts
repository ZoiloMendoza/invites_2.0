import { Component, Input, OnInit } from '@angular/core';
import { signal } from '@angular/core';

interface ConfigInput {
  title: string;
  dateAndPlace: string;
  date: string;
  backgroundImage: string;
  // Agrega otras propiedades según sea necesario
}
interface StyleInput {
  title: string;
  dateAndPlace: string;
  countdown: string;
  textContainer: string;
  containCountdown: string;
  // Agrega otras propiedades según sea necesario
}
type countdownType = {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
};

@Component({
  selector: 'app-start-banner',
  standalone: true,
  imports: [],
  templateUrl: './start-banner.component.html',
  styleUrl: './start-banner.component.css',
})
export class StartBannerComponent implements OnInit {
  @Input({ required: true }) config!: ConfigInput;
  @Input({ required: true }) styles!: StyleInput;

  countdown = signal<countdownType>({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  constructor() {}

  date: string = '';
  place: string = '';

  ngOnInit() {
    this.calculateTimeLeft(this.config);
    this.initCountDown();
    this.date = this.config.dateAndPlace.split(',')[0].trim();
    this.place = this.config.dateAndPlace.split(',')[1].trim();
  }

  initCountDown() {
    setInterval(() => {
      this.calculateTimeLeft(this.config);
    }, 1000);
  }

  calculateTimeLeft(config: ConfigInput): void {
    const parseDate = new Date(config.date).getTime();
    const now = new Date().getTime();
    const difference = parseDate - now;

    if (difference <= 0) {
      this.countdown.set({ days: 0, hours: 0, minutes: 0, seconds: 0 });
    }

    const days = Math.floor(difference / (1000 * 60 * 60 * 24));
    const hours = Math.floor(
      (difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60),
    );

    const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((difference % (1000 * 60)) / 1000);

    this.countdown.set({ days, hours, minutes, seconds });
  }
}
