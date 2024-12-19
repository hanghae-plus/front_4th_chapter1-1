import Router from "./router";

class Login {
    constructor(form, fields) {
        this.form = form;
        this.fields = fields;
        this.validateOnSubmit();
    }

    validateOnSubmit() {
        this.form.addEventListener("submit", (e) => {
            e.preventDefault();

            let error = 0;
            const router = new Router();

            let usernameValue = "";
            let passwordValue = "";

            this.fields.forEach((field) => {
                const input = document.querySelector(`#${field}`);

                if (field === "username") {
                    usernameValue = input?.value.trim();
                } else if (field === "password") {
                    passwordValue = input?.value.trim();
                }
            })
            
            if (!usernameValue) {
                alert("아이디를 입력해주세요");
                error++;
            }

            // if (!passwordValue) {
            //     alert("비밀번호를 입력해주세요.");
            //     error++;
            // }
            
            if (error === 0) {
                localStorage.setItem("user", JSON.stringify({username: usernameValue, email: "", bio: ""}));
                if(localStorage.getItem("user")) router.navigateTo("/profile");
                
            }
        })
    }
}

export default Login