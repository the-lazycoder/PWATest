import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { WindowRef } from '../WindowRef';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
  providers: [ WindowRef ],
})
export class HomePage implements OnInit {

  public title: string;
  public longitude: number = 0;
  public latitude: number = 0;

  constructor(private activatedRoute:ActivatedRoute
    , private winRef:WindowRef
    ) { }

  payWithRazorpay() {
    var options:any = {
      description: 'Credits towards consultation',
      image: 'https://i.imgur.com/3g7nmJC.png',
      currency: "INR", // your 3 letter currency code
      key: "rzp_test_1DP5mmOlF5G5ag", // your Key Id from Razorpay dashboard
      amount: 100, // Payment amount in smallest denomiation e.g. cents for USD
      name: 'Razorpay',
      prefill: {
        email: 'test@razorpay.com',
        contact: '9990009991',
        name: 'Razorpay'
      },
      theme: {
        color: '#F37254'
      },
      modal: {
        ondismiss: function () {
          alert('dismissed')
        }
      }
    };

    
    options.handler = ((response) => {
      console.log('handler:',response.razorpay_payment_id);
      options['payment_response_id'] = response.razorpay_payment_id;
      // this.paymentService.payWithRazor({cart: finalObj, payment: options});
    });
    
    var rzp1 = new this.winRef.nativeWindow.Razorpay(options);

    rzp1.open();
  }

  getLocation(){
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition((position)=>{
          this.longitude = position.coords.longitude;
          this.latitude = position.coords.latitude;
          console.log(this.longitude + ' ' + this.latitude);
        });
    } else {
       console.log("No support for geolocation");
    }
  }

  // callApi(Longitude: number, Latitude: number){
  //   const url = `https://api-adresse.data.gouv.fr/reverse/?lon=${Longitude}&lat=${Latitude}`
  //   //Call API
  // }

  
  ngOnInit() {
    this.title = this.activatedRoute.snapshot.paramMap.get('id');
    this.getLocation();
  }

}
