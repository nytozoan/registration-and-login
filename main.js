import './style.css'

const register = () => {
  return `
  <main>
    <img id="svg-image" alt="svg image placeholder"></img>
    <form name="registrationData" id="formData">
      <img id="logo" alt="logo placeholder">
      <input type="email" id="email" name="email" placeholder="email" required class="form-control">
      <input type="password" id="password" name="password" placeholder="password" required class="form-control">
      <input type="password" id="confirmPassword" name="confirmPassword" placeholder="confirm password" required class="form-control">
      <input type="button" name="submit" value="register" id="submit" class="form-control">
      <p>Have an account? <a id="switcher">Login here!</a>
    </form>
  </main>
  `
}

const login = () => {
  return `
  <main>
    <form name="registrationData" id="formData">
      <img id="logo" alt="logo placeholder" required>
      <input type="email" id="email" name="email" placeholder="email" required class="form-control">
      <input type="password" id="password" name="password" placeholder="password" required class="form-control">
      <input type="button" name="submit" value="login" id="submit" class="form-control">
      <p>No account yet? <a id="switcher">Register here!</a></p>
    </form>
    <img id="svg-image" alt="svg image placeholder"></img>
  </main>
`
}

const loggedInPage = (email) => {
  return `
  <div id="loggedIn">
    <h1>Welcome!</h1>
    <p>You are logged in as ${email}.</p>
    <button id="logout">Logout</button>
  </div>
  `
}

let database = []
const save = (form) => {
  form["isloggedin"] = false
  database.push(form)
  console.log("database", database)
}

const errorChecking = (email, password, confirmPassword) => {
  // Error codes
  // 1 = Password and Confirm Password are not the same
  // 2 = Password is less than minimum
  // 3 = Email already exists
  let output = {}

  if (password != confirmPassword) {
    alert("Password and confirm password do not match.")
    return 1
  }
  if (password.length < 5) {
    alert("Password should be at least 5 characters.")
    return 2
  }
  for (let i = 0; i < database.length; i++) {
    if (database[i].email == email) {
      alert ("Email already exists.")
      return 3
    }
  }
  // Add if email does not end with @*.* return error invalid email

  output["email"] = email
  output["password"] = password
  return output
}

const registrationFunction = () => {
  let formData = document.getElementsByClassName("form-control")
  let email = formData.email.value
  let password = formData.password.value
  let confirmPassword = formData.confirmPassword.value
  let cleaned = errorChecking(email, password, confirmPassword)
  if (typeof(cleaned) == "object") {
    save(cleaned)
    switchState = 0
    main()
  }
}

const loginFunction = () => {
  let formData = document.getElementsByClassName("form-control")
  let email = formData.email.value
  let password = formData.password.value
  for (let i = 0; i < database.length; i++) {
    if (database[i].email == email) {
      if (database[i].password == password) {
        if (database[i].isloggedin == true) if (confirm("It seems you have been logged in from another account. Log out from the other account?")) database[i].isloggedin = true
        database[i].isloggedin = true
        console.log(database)
        document.getElementById("app").innerHTML = loggedInPage(database[i].email)
        document.getElementById("logout").onclick = () => {
        switchState = 0
        database[i].isloggedin = false
        main()
        console.log(database)
      }
      return 0
      } else alert ("Invalid email and/or password.")
    }
    else alert("Invalid email and/or password.")
  }
}


let switchState = 1
const main = () => {
    if (switchState == 0) {
      document.getElementById('app').innerHTML = login()
    } else if (switchState == 1) {
      document.getElementById('app').innerHTML = register()
    }
    document.getElementById("switcher").onclick = () => {
      if (switchState == 0) switchState = 1
      else if (switchState == 1) switchState = 0
      main()
      console.log(switchState)
    }
    document.getElementById("submit").onclick = () => {
      console.log(formData.submit.value)
      if (formData.submit.value == "register") registrationFunction()
      else if (formData.submit.value == "login") loginFunction()
    }
    //debug
    document.getElementById("asd").onclick = () => {
      fetch("save.json")
        .then((res) => res.text())
        .then((text) => {
          text = JSON.parse(text)
          database.push(text)
          console.log(database)
        })
        .catch((e) => console.error(e))
    }
}
main()