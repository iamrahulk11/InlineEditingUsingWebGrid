$(document).ready(function () {

    $('.edit-mode').hide();
    $('.edit-user, .cancel-user').on('click', function () {
        var tr = $(this).parents('tr:first');
        tr.find('.edit-mode, .display-mode').toggle();
    });

   
   /* $('.edit-user').on('click',function () {
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
                Gender = selectedGender[i].value;
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
        


        tr.find("#lblDob").text(DateOfBirth);
        tr.find("#lblAddress").text(Address);
        tr.find("#lblCountry").text(Country);
        tr.find("#lblState").text(State);
        tr.find("#lblHobbies").text(Hobbies);
        // tr.find("#lblImage").text(ImagePath);


    });*/

    $('.save-user').on('click',function () {
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
                break;
            }
        }

        //var Gender = tr.find("#GenderText").val();
        var DateOfBirth = tr.find("#DateOfBirthText").val();
        var Address = tr.find("#AddressText").val();
        var Country = tr.find("#CountryText").val();
        var State = tr.find("#StateText").val();


        var checkboxes =
            document.getElementsByName('Hobbie');

        var result = "";

        for (var i = 0; i < checkboxes.length; i++) {
            if (checkboxes[i].checked) {
                result += checkboxes[i].value
                    + " ";
            }
        } result = result.trim();

        



        var ImagePath = "";
        if ($("#ImageText").val() != "") {
            var extension = tr.find("#ImageText").val().split('.').pop().toUpperCase();
            if (extension != "PNG" && extension != "JPG" && extension != "JPEG") {

                alert('Invalid image file format,File format should be jpg, png, jpeg');
                return false;
            }
            ImagePath = tr.find('#ImageText').get(0).files;
        }
        
        var userdata = new FormData();
        userdata.append('userid', userid)
        userdata.append('User_Name', User_Name);
        userdata.append('Email', Email);
        userdata.append('Contact', Contact);
        userdata.append('Gender', Gender);
        userdata.append('Date_Of_Birth', DateOfBirth);
        userdata.append('Address', Address);
        userdata.append('Country', Country);
        userdata.append('State', State);
        userdata.append('Hobbies', result);
        //userdata.append('Password', $('#PasswordText').val());
        if ($('#ImageText').val() != '') {
            userdata.append('FileName', ImagePath[0]);
        }

        $.ajax({
            url: '/Home/Update',
            type: 'POST',
            data: userdata,           
            dataType: 'json',
            processData: false,
            contentType: false,
            //contentType: 'application/json; charset=utf-8',
            success: function (data) {
                debugger;
                tr.find("#lblName").text(data.User_Name);
                tr.find("#lblEmail").text(data.Email);
                tr.find("#lblContact").text(data.Contact);
                tr.find("#lblGender").text(data.Gender);
                /*let dateOfBirth = new Date(parseInt(data.Date_Of_Birth.substr(6)));
                var getdate = dateOfBirth.getDate();
                var setDate = "";
                if (getdate < 10) {
                    setDate = "0" + getdate;
                } else {
                    setDate = getdate;
                }
                var getmonth = (dateOfBirth.getMonth() + 1);
                var setMonth = "";
                if (getmonth < 10) {
                    setMonth = "0" + getmonth;
                } else {
                    setMonth = getmonth;
                }
                var date = dateOfBirth.getFullYear() + "-" + setMonth + "-" + setDate;*/
                // document.getElementById('DateOfBirthText').value = date;
                tr.find("#lblDob").text(data.Date_Of_Birth);
                tr.find("#lblAddress").text(data.Address);
                tr.find("#lblCountry").text(data.Country);
                tr.find("#lblState").text(data.State);
                tr.find("#lblHobbies").text(data.Hobbies);
                tr.find("#imgUpload").attr("src", data.ImagePath);
                //location.reload();
                tr.find('.edit-mode, .display-mode').toggle();
                alert('Record updated Successfully!!');
            },
            error: function () {
                alert('Failed to save');
            }
        });

    });

});

$('#btnAddRecord').on('click', function () {
    var tr = $(this).parents('tr:first');
    tr.find('.edit-mode, .display-mode').toggle();
     $('#eName').text("");
     $('#eEmail').text("");
     $('#eContact').text("");
     $('#eDob').text("");
     $('#eAddress').text("");
     $('#eCountry').text("");
     $('#eState').text("");
     $('#ePass').text("");
     $('#eImage').text("");
     $('#eHobby').text("");
    $('#AddUserModal').modal('show');
    $('#passForm').show();
    $('#AddimageView').hide();
    $('#AddimgUpload').hide();

    resetResult();
});
   

function hidemodal() {
    $('#AddUserModal').modal('hide');
}

function resetResult() {
    $('#AddNameText').val('');
    $('#AddEmailText').val('');
    $('#AddContactText').val('');

    $('#AddDateOfBirthText').val('');
    $('#AddAddressText').val('');
    $('#AddCountryText').val('--Select--');
    $('#AddStateText').val('--Select--');
   
    $('#AddPasswordText').val('');
    $('#AddImageText').val('');
    $('#AddimgUpload').hide();
    $('#AddimgUpload').attr("src", "");
    var checkboxes =
        document.getElementsByName('AddHobbie');

    for (var i = 0; i < checkboxes.length; i++) {
        if (checkboxes[i].checked) {
            checkboxes[i].checked = false;
        }
    }
}


function Edit(userid) {
    $('#Delete').hide();
    var tr = $(this).parents('tr:first');
    $.ajax({
        url: '/Home/Edit?id=' + userid,
        type: 'Get',
        contentType: 'application/json;charset=utf-8;',
        dataType: 'json',
        success: function (data) {
            
            console.log(data);
            /*var tr = $(this).parents('tr:first');
            tr.find('.edit-mode, .display-mode').toggle();*/
            var userid = tr.find("#userid").html();
            // tr.find("#lblImage").text(ImagePath);
            $("#NameText").val(data.User_Name);

           // $('#UserId').val(data.Userid);
            //$('#NameText').val(data[0].Username);
            $('#EmailText').val(data.Email);
            $('#ContactText').val(data.Contact);

            /*let dateOfBirth = new Date(parseInt(data.Date_Of_Birth.substr(6)));
            var getdate = dateOfBirth.getDate();
            var setDate = "";
            if (getdate < 10) {
                setDate = "0" + getdate;
            } else {
                setDate = getdate;
            }
            var getmonth = (dateOfBirth.getMonth() + 1);
            var setMonth = "";
            if (getmonth < 10) {
                setMonth = "0" + getmonth;
            } else {
                setMonth = getmonth;
            }
            var date = dateOfBirth.getFullYear() + "-" + setMonth + "-" + setDate;*/
            document.getElementById('DateOfBirthText').value = data.Date_Of_Birth;



            var checkboxes =
                document.getElementsByName('Hobbie');

            var userHobby = data.Hobbies.split(" ");


            for (var i = 0; i < userHobby.length; i++) {
                for (var j = i; j < checkboxes.length; j++) {
                    if (checkboxes[j].value == userHobby[i]) {
                        checkboxes[j].checked = true;
                    }
                }
            }

            var selectedGender = document.getElementsByName('Gender');

            for (i = 0; i < selectedGender.length; i++) {
                if (selectedGender[i].value == data.Gender) {
                    selectedGender[i].checked = true;
                    break;
                }
            }

            $('#AddressText').val(data.Address);
            $('#CountryText').val(data.Country);
            $('#StateText').val(data.State);

           

           
            //* var file = data[0].ImagePath.file[0];*//*


            $("#imgUpload").attr("src", data.ImagePath);
            //*var fileImg = $("#imgUpload").get(0).files;
            
            
        },
        error: function () {
            alert('Data not found');
        }
    })
}

function Delete(userid) {

    $.ajax({
        url: '/Home/Delete?id=' + userid,
        success: function () {
            alert('Record Deleted!');
            //location.reload();
            $('#gridContent').reload();
        },
        error: function () {
            alert('Failed to Delete!');
        }
    })
}

function AddUserRecord() {
    debugger;
   
    var Name = $('#AddNameText').val();
    var CEmail = $('#AddEmailText').val();
    var CContact = $('#AddContactText').val();
    var CDOB = $('#AddDateOfBirthText').val();
    var CAddress = $('#AddAddressText').val();
    var CCountry = $('#AddCountryText').val();
    var CState = $('#AddStateText').val();
    var CPassword = $('#AddPasswordText').val();
    var Img = $('#AddImageText').val();

    var checkboxes =
        document.getElementsByName('AddHobbie');

    var result = "";

    for (var i = 0; i < checkboxes.length; i++) {
        if (checkboxes[i].checked) {
            result += checkboxes[i].value
                + " ";
        }
    } result = result.trim();

    if (isValid(Name, CEmail, CContact, CDOB, CAddress, CCountry, CState, CPassword, Img, result) == false) {
        return false;
    }
    var selectedGender = document.getElementsByName('AddGender');
    var gender = "";
    for (i = 0; i < selectedGender.length; i++) {
        if (selectedGender[i].checked) {
            gender = selectedGender[i].value;
        }
    }

    var fileImg = $('#AddImageText').get(0).files;
    var extension = $("#AddImageText").val().split('.').pop().toUpperCase();
    if (extension != "PNG" && extension != "JPG" && extension != "JPEG") {

        alert('Imvalid image file format,File format should be jpg, png, jpeg');
        return false;
    }

    var userdata = new FormData();
    userdata.append('User_Name', $('#AddNameText').val());
    userdata.append('Email', $('#AddEmailText').val());
    userdata.append('Contact', $('#AddContactText').val());
    userdata.append('Gender', gender);
    userdata.append('Date_Of_Birth', $('#AddDateOfBirthText').val());
    userdata.append('Address', $('#AddAddressText').val());
    userdata.append('Country', $('#AddCountryText').val());
    userdata.append('State', $('#AddStateText').val());
    userdata.append('Hobbies', result);
    userdata.append('Password', $('#AddPasswordText').val());
    userdata.append('FileName', fileImg[0]);
    $.ajax({
        async: true,
        url: '/Home/AddUserRecord',
        type: 'Post',
        data: userdata,
        //contentType: 'application/xxx-www-form-urlencoded;charset=utf-8;',
        dataType: 'json',

        processData: false,
        contentType: false,
        success: function () {
            alert('Data Saved');
            resetResult();

            hidemodal();
        },
        error: function () {
            alert('Failed to save');
        }
    });
}

function isValid(Name, CEmail, CContact, CDOB, CAddress, CCountry, CState, CPassword, Img, result) {
        $('#eName').text("");
        $('#eEmail').text("");
        $('#eContact').text("");
        $('#eDob').text("");
        $('#eAddress').text("");
        $('#eCountry').text("");
        $('#eState').text("");
        $('#ePass').text("");
        $('#eImage').text("");
        $('#eHobby').text("");

        if (Name == '' || CEmail == '' || CContact == '' || CContact.length < 10 || CContact.length > 10 || CDOB == '' || CAddress == '' || CCountry == "--Select--" || CState == "--Select--" || CPassword == '' || Img == '' || result == "") {
            if (Name == '') {
                $('#eName').text("*Name is required");
            } else if (Name != /[A - Za - z\\s]/) {
                $('#eName').text("*Name is Invalid");
            }
            if (CEmail == '') {
                $('#eEmail').text("*Email is required");
            } if (CContact == '') {
                $('#eContact').text("*Contact is required");
            } else if (CContact.length > 10 || CContact.length < 10) {
                $('#eContact').text("*Contact is invalid");
            }
            if (CDOB == '') {
                $('#eDob').text("*Date of bith is required");
            } if (CAddress == '') {
                $('#eAddress').text("*Address is required");
            } if (CCountry == '--Select--') {
                $('#eCountry').text("*Country is required");
            } if (CState == '--Select--') {
                $('#eState').text("*State is required");
            } if (CPassword == '') {
                $('#ePass').text("*Password is required");
            } if (Img == '') {
                $('#eImage').text("*Image is required");
            } if (result == '') {
                $('#eHobby').text("*Please select Hobbies");
            }

            return false;
        }
        return true;
}


$('#AddImageText').on('change',function (e) {
    var files = e.target.files;
    $('#AddimgUpload').show();
    $('#AddimgUpload').attr("src", window.URL.createObjectURL(files[0]));
    if (files == '') {
        $('#AddimgUpload').hide();
        $('#AddimgUpload').attr("src", "");
    }
});


function ImgView(userid) {

    $.ajax({
        url: '/Home/ImgView?id=' + userid,
        type: 'Get',
        contentType: 'application/json;charset=utf-8;',
        dataType: 'json',
        success: function (data) {
            debugger;
            $('#AddUserModal').modal('show');
            $('#AddUserRecord').css('display', 'none');
            
            $('#UserHeader').text('Image');
            $('#AddimageView').show();
            $('#myForm').hide();
            // alert(data);
            //  $('#imageView').html('<img src="' + data + '"height="350" width="350">');
            $('#AddimageView').html('<img src="' + data + '" height="200" width="300">');
        },
        error: function () {
            alert('Something went wrong!!');
        }
    })
}
