$(document).ready(function () {

    $('.edit-mode').hide();
    $('.edit-user, .cancel-user').on('click', function () {
        var tr = $(this).parents('tr:first');
        tr.find('.edit-mode, .display-mode').toggle();
    });
    

    $('.edit-user').on('click', function () {
        debugger;
        var tr = $(this).parents('tr:first');
        var userid = tr.find("#userid").html();
        var User_Name = tr.find("#NameText").val();
        var Email = tr.find("#EmailText").val();
        var Contact = tr.find("#ContactText").val();

        var Gender = "";
        var selectedGender = document.getElementsByName('Gender');
        
        for (i = 0; i < selectedGender.length; i++) {
            if (selectedGender[i].value == tr.find("#lblGender").text()) {
                 Gender= selectedGender[i].value ;
                selectedGender[i].checked = true;
            }
        }
        
        var Address = tr.find("#AddressText").val();
        var DateOfBirth = tr.find("#DateOfBirthText").val();
        var Country = tr.find("#CountryText").val();
        var State = tr.find("#StateText").val();
        var Hobbies = tr.find("#HobbiesText").val();
       // var ImagePath = tr.find("#ImagePath").val();

        tr.find("#lblName").text(User_Name);
        tr.find("#lblEmail").text(Email);
        tr.find("#lblContact").text(Contact);
        tr.find("#lblGender").text(Gender);
       
        
        tr.find("#lblDob").text(DateOfBirth);
        tr.find("#lblAddress").text(Address);
        tr.find("#lblCountry").text(Country);
        tr.find("#lblState").text(State);
        tr.find("#lblHobbies").text(Hobbies);
       // tr.find("#lblImage").text(ImagePath);
        

    });

    $('.save-user').on('click', function () {
        debugger;
        var tr = $(this).parents('tr:first');

        var userid = tr.find("#userid").html();

        var User_Name = tr.find("#NameText").val();
        var Email = tr.find("#EmailText").val();
        var Contact = tr.find("#ContactText").val();

        var selectedGender = document.getElementsByName('Gender');
        var Gender = "";
        for (i = 0; i < selectedGender.length; i++) {
            if (selectedGender[i].checked) {
                Gender = selectedGender[i].value;
            }
        }

        //var Gender = tr.find("#GenderText").val();
        var DateOfBirth = tr.find("#DateOfBirthText").val();
        var Address = tr.find("#AddressText").val();
        var Country = tr.find("#CountryText").val();
        var State = tr.find("#StateText").val();
        var Hobbies = tr.find("#HobbiesText").val();



        var ImagePath = "";
        if ($("#ImageText").val() != "") {
            var extension = tr.find("#ImageText").val().split('.').pop().toUpperCase();
            if (extension != "PNG" && extension != "JPG" && extension != "JPEG") {

                alert('Imvalid image file format,File format should be jpg, png, jpeg');
                return false;
            }
            ImagePath = tr.find('#ImageText').get(0).files;
        }
        var file = ImagePath[0];
        var UserModel = "";

        if ($("#ImageText").val() != "") {
            UserModel =
            {
                "userid": userid,
                "User_Name": User_Name,
                "Email": Email,
                "Contact": Contact,
                "Gender": Gender,
                "Date_Of_Birth": DateOfBirth,
                "Address": Address,
                "Country": Country,
                "State": State,
                "Hobbies": Hobbies,
                "FileName": file
            };
        } else {
            UserModel =
            {
                "userid": userid,
                "User_Name": User_Name,
                "Email": Email,
                "Contact": Contact,
                "Gender": Gender,
                "Date_Of_Birth": DateOfBirth,
                "Address": Address,
                "Country": Country,
                "State": State,
                "Hobbies": Hobbies,

            };
        }

        $.ajax({
            url: '/Home/Update',
            data: JSON.stringify(UserModel),
            type: 'POST',
            contentType: 'application/json; charset=utf-8',
            success: function (data) {
                tr.find('.edit-mode, .display-mode').toggle();
                alert('Record updated Successfully!!');
            },
            error: function () {
                alert('Failed to save');
            }
        });

    });
});


