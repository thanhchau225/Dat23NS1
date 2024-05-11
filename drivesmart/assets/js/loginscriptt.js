const forms = document.querySelector(".forms");
const pwShowHide = document.querySelectorAll(".eye-icon");
const links = document.querySelectorAll(".link");

pwShowHide.forEach(eyeIcon => {
    eyeIcon.addEventListener("click", () => {
        let pwFields = eyeIcon.parentElement.parentElement.querySelectorAll(".password");

        pwFields.forEach(password => {
            if (password.type === "password") {
                password.type = "text";
                eyeIcon.classList.replace("bx-hide", "bx-show");
                return;
            }

            password.type = "password";
            eyeIcon.classList.replace("bx-show", "bx-hide");
        });
    });
});

links.forEach(link => {
    link.addEventListener("click", e => {
        e.preventDefault(); // Ngăn chặn việc gửi biểu mẫu
        forms.classList.toggle("show-signup");
    });
});

document.querySelector('.form.signup form').addEventListener("submit", function (e) {
    e.preventDefault(); // Ngăn chặn việc gửi biểu mẫu

    // Thực hiện xác thực đăng ký
    var name = document.getElementById("name").value;
    var email = document.getElementById("signupEmail").value;
    var password = document.getElementById("signupPassword").value;
    var phone_number = document.getElementById("phone_number").value;
    var address = document.getElementById("address").value;

    signup(name, email, password, phone_number, address);
});

function signup(name, email, password, phone_number, address) {
    console.log('Xin chào đăng ký');

    const url = 'http://zunainazam1865.pythonanywhere.com/signup/';
    const data = {
        name: name,
        email: email,
        password: password,
        phone_number: phone_number,
        address: address
    };

    fetch(url, {
        method: 'POST',
        mode: 'cors',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    })
    .then(response => response.json())
    .then(responseData => {
        console.log(responseData);
        if (responseData.token === "201") {
            // Lưu token một cách an toàn (ví dụ, trong cookies hoặc local storage)
            localStorage.setItem('token', responseData.token);
            if(responseData.message === 'Signup Successful'){
                // Hiển thị thông báo đăng ký thành công
                const successMessageElement = document.getElementById('successMessage');
                successMessageElement.textContent = "Đăng ký thành công.";
                
                // Chuyển hướng đến trang đăng nhập
                setTimeout(()=> {
                    window.location.href= "login.html"; // Chuyển hướng đến trang đăng nhập nếu đăng ký thành công
                },10000); // Chuyển hướng sau 10 giây
            }
        } else {
            // Xử lý đăng ký không thành công
            const errorMessageElement = document.getElementById('errorMessage');
            errorMessageElement.textContent = "Đăng ký không thành công. Vui lòng thử lại.";

            // Xóa thông báo lỗi sau một khoảng thời gian nhất định (tùy chọn)
            setTimeout(() => {
                errorMessageElement.textContent = "";
            }, 60000); // Xóa sau 60 giây (có thể điều chỉnh theo nhu cầu)
        }
    })
    .catch(error => {
        console.error('Lỗi:', error);
        // Xử lý bất kỳ lỗi nào xảy ra trong quá trình yêu cầu
    });
}

document.querySelector('.form.login form').addEventListener("submit", function (e) {
    e.preventDefault(); // Ngăn chặn việc gửi biểu mẫu

    // Thực hiện xác thực đăng nhập
    var email = document.getElementById("email").value;
    var password = document.getElementById("password").value;

    login(email, password);
});

function login(email, password) {
    console.log('Xin chào đăng nhập');

    const url = 'http://zunainazam1865.pythonanywhere.com/login/';
    const data = {
        email: email,
        password: password
    };

    fetch(url, {
        method: 'POST',
        mode: 'cors',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    })
    .then(response => response.json())
    .then(responseData => {
        console.log(responseData);
        if (responseData.token) {
            // Lưu token một cách an toàn (ví dụ, trong cookies hoặc local storage)
            localStorage.setItem('token', responseData.token);
            window.location.href = "mainIndex.html"; // Chuyển hướng đến trang chính nếu đăng nhập thành công
        } else {
            // Xử lý đăng nhập không thành công
            console.log("Đăng nhập không thành công");
            const errorMessageElement = document.getElementById('errorMessage');
            errorMessageElement.textContent = "Email hoặc mật khẩu không chính xác.";

            // Xóa thông báo lỗi sau một khoảng thời gian nhất định (tùy chọn)
            setTimeout(() => {
                errorMessageElement.textContent = "";
            }, 60000); // Xóa sau 5 giây (có thể điều chỉnh theo nhu cầu)
        }
    })
    .catch(error => {
        console.error('Lỗi:', error);
        // Xử lý bất kỳ lỗi nào xảy ra trong quá trình yêu cầu
    });
}
