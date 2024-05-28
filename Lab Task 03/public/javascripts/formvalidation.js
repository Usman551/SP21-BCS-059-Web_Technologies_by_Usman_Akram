$(document).ready(function(){
    $("#reservationForm").validate({
        rules: {
            name: {
                required: true,
    
            },
            phone: {
                required: true,
                digits: true,
                minlength: 11,
                maxlength: 11,
    
            },
            reservationdate: {
                required: true,
                date: true
    
            },
            message: {
                required: true,
    
            }
    
        },
        messages: {
            name: {
                required: "Please Enter Your Name",
    
            },
            phone: {
                required: "Please Enter Your Phone Number",
                digits: "Please Enter Digits Only",
                minlength: "Please Enter Valid Phone Number",
                minlength: "Please Enter Valid Phone Number",
            },
            reservationdate: {
                required: "Please Select Date",
            },
            message: {
                required: "Please Enter Your Message"
            }
    
        },
    
    
        submitHandler: function (form) {
    
            form.reset();
            alert("Form submitted successfully!");
    
        },
    });
    $("#emailsubmitform").validate({
        rules:{
            emailaddress:{
                required: true,
                email: true
            }
        },
        messages: {
            emailaddress:{
                required:"Please Enter Your Email",
                email:"Please Enter Valid Email"
            }
            
        },
        submitHandler: function(form){
            form.reset();
            alert("Email Submitted successfully!");
        }

    })
})
