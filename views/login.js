export const login = () => {
    return `
    <main>
      <div id="left-card">
        <h1 id="state-plate">Login</h1>
        <form name="registrationData" id="formData">
          <input type="email" id="email" name="email" placeholder="email" required class="form-control">
          <input type="password" id="password" name="password" placeholder="password" required class="form-control">
          <input type="submit" name="submit" value="login" id="submit" class="form-control">
        </form>
      </div>
      <div id="right-card">
        <img id="logo-image" alt="svg image placeholder" src="/leaf-image.jpg"></img>
        <div><button id="switcher">No account yet? Register here!</button></div>
      </div>
    </main>
  `
  }