// Сделать форму логина. Она состоит из поля для ввода почты, поля для ввода пароля и кнопки “отправить”. 

// Кнопка “отправить” показывает введенные данные в формате JSON и очищает поля для ввода. Кнопка заблокирована (disabled) если введены невалидные данные.

// Почта считается валидной если в ней есть символ @ и точка
// задание со “звездочкой” - использовать регулярное выражение для валидации почты
// Пароль считается валидным если в нем:
// минимум 8 символов
// есть хотя бы одна цифра
// есть хотя бы один из перечисленных символов: @$#!?&
// Если пользователь ввел невалидные данные, поле для ввода должно выделиться красным цветом.

function validate(email) {
    var reg = /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/;
    if(reg.test(String(email).toLowerCase()) == false) {
       return false
    }else{
        return true
    }
};
function validatePass(pass) {
    const mustHave = ["@", "$", "#", "!", "?", "&"];
    const re = /\d/g;
    if (pass.length < 8) return false;
    if (!re.test(pass)) return false;
    for (let i of pass) {
        if (mustHave.includes(i)) return true;
    }
    return false;
}


function createInputField(title, type){
    const container = document.createElement("div");
    container.className = "input-field";

    const span = document.createElement("span");
    span.innerHTML = title;

    const input = document.createElement("input");
    input.type = type;
    input.className = "validate";

    container.appendChild(span);
    container.appendChild(input);

    return {container, input}

};

function createButton(title, type){
    const button = document.createElement('button');
    button.innerText = title;
    button.type = type;
    return button;
};

function createForm(){
    const form = document.createElement("form");
    form.className = "login-form";

    const emailElement = createInputField("E-mail", "text");
    const passwordElement = createInputField("Password", "password");

    const togglePasswordButton = createButton("Show Password","button");
    togglePasswordButton.addEventListener("click", function() {
        togglePasswordButton.innerText = passwordElement.input.type === "password" ? "Hide password" : "Show Password";
        passwordElement.input.type = passwordElement.input.type === "password" ? "text" : "password";
    });

    const loginButton = createButton("Log In", "submit")
    loginButton.setAttribute("disabled", "disabled");
    loginButton.className = "login_button"
    loginButton.addEventListener("click", (event) => {
        event.preventDefault();
        const values = document.querySelectorAll('input');
        const json = {"email":values[0].value,"pass":values[1].value};
        console.log(json)
        values.forEach(e => {
            e.value = "";
            e.removeAttribute("class")
        })
    })

    form.addEventListener("input", ()=>{
        const values = document.querySelectorAll('input');
        const submit = document.querySelector('.login_button');

        if(validate(values[0].value) && validatePass(values[1].value)){
            submit.removeAttribute("disabled")
        }else{
            submit.setAttribute("disabled","disabled")
        }
        validate(values[0].value) ? values[0].className = "valid" : values[0].className = "notvalid"
        validatePass(values[1].value) ? values[1].className = "valid" : values[1].className = "notvalid"
        
    })
    

    form.appendChild(emailElement.container);
    form.appendChild(passwordElement.container);
    form.appendChild(togglePasswordButton);
    form.appendChild(loginButton);

    return form
};

let form = createForm();

document.body.appendChild(form)