import axios from "axios";

//https://reffect.co.jp/react/react-firebase-auth
export const SignUp = () => {
    const url = "http://127.0.0.1:8000/users/";
    const handleSubmit = (event) => {
        event.preventDefault();
        const { email, username, password } = event.target.elements;
        axios.post(url, {
            email: email.value,
            username: username.value,
            password: password.value
        }).then(res=>{
            alert("登録完了");
        }).catch(error=>{
            alert("すでにemailアドレスは登録されています")
        })
        console.log(email.value, username.value, password.value);
        console.log('登録');
    };

    return (
        <div>
            <h1>ユーザ登録</h1>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>メールアドレス</label>
                    <input name="email" type="email" placeholder="email" />
                </div>
                <div>
                    <label>ユーザーネーム</label>
                    <input name="username" type="username" placeholder="username" />
                </div>
                <div>
                    <label>パスワード</label>
                    <input name="password" type="password" placeholder="password" />
                </div>
                <div>
                    <button>登録</button>
                </div>
            </form>
        </div>
    );
};

export default SignUp;