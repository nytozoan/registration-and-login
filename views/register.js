export const register = () => {
    return `
    <main>
      <div id="left-card">
        <img id="logo-image" alt="svg image placeholder" src="/leaf-image.jpg"></img>
        <div><button id="switcher">Have an account? Login here!</button></div>
      </div>
      <div id="right-card">
        <h1 id="state-plate">Register</h1>
        <form name="registrationData" id="formData">
          <input type="email" id="email" name="email" placeholder="email" required class="form-control">
          <input type="button" id="check-availability" value="check availability"git>
          <input type="password" id="password" name="password" placeholder="password" required class="form-control">
          <input type="password" id="confirmPassword" name="confirmPassword" placeholder="confirm password" required class="form-control">
          <input type="submit" name="submit" value="register" id="submit" class="form-control">
        </form>
      </div>
    </main>
    `
  }