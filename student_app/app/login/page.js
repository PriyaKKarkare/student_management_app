export default function LoginPage() {
  return (
    <div>
      <h1>Login</h1>

      <form>
        <div>
          <label>Email</label>
          <input type="email" />
        </div>

        <br />

        <div>
          <label>Password</label>
          <input type="password" />
        </div>

        <br />

        <button type="submit">
          Login
        </button>
      </form>
    </div>
  );
}