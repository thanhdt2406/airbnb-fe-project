import { Component, OnInit } from '@angular/core';
import {ApartmentService} from '../../service/apartment/apartment.service';
import {ImageService} from '../../service/image/image.service';
import {AngularFireStorage} from '@angular/fire/storage';
import {Ward} from '../../model/ward';

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.css']
})
export class CreateComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }
}
