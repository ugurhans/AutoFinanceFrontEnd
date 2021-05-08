import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  constructor(private aurhService:AuthService) { }

  ngOnInit(): void {
  }

  checkSign(){
    var result = localStorage.getItem("token");
    if (result!=null) {
      return true;
    }
    else{
      return false
    }
  }
}
