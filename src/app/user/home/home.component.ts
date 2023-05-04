import {Component, OnInit} from '@angular/core';
import {Router} from "@angular/router";
import {ToastrService} from "ngx-toastr";


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit{

  start: Date | null = null
  end: Date | null = null

  constructor(private router: Router, private toast: ToastrService) {
  }

  ngOnInit(): void {
    localStorage.removeItem('start')
    localStorage.removeItem('end')
  }

  search() {
    if (this.start == null) {
      this.toast.error("You must enter start date")
    }

    if (this.end == null) {
      this.toast.error("You must enter end date")
    }

    if (this.start != null && this.end != null) {
      // @ts-ignore
      localStorage.setItem('start',this.start)
      // @ts-ignore
      localStorage.setItem('end',this.end)

      this.router.navigate(['/cars'])
    }

  }
}
