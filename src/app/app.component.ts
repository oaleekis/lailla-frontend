import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import * as _moment from 'moment';
import 'moment/locale/pt-br';

const moment = _moment;
moment.locale('pt-br');

@Component({
  selector: 'app-root',
  imports: [RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'lailla-frontend';
}
