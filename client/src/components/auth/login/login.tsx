import './login.scss'


const Login = () => {
    return (
        <div className="login bg-white">
            <h1>Welcome Back</h1>
            <form className="form">
                <div className="form-group">
                    <label htmlFor="email">Email</label>
                    <input type="email" id="email" name="email"/>
                </div>
                <div className="form-group">
                    <label htmlFor="password">Password</label>
                    <input type="password" id="password" name="password"/>
                </div>
                <button type="submit">Login</button>
            </form>
            <p>Don't have an account? <a href="signup">Signup</a></p>
        </div>
    )
}

export default Login
