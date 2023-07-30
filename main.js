import './style.css'

const register = () => {
  return `
  <main>
    <img id="svg-image" alt="svg image placeholder"></img>
    <form name="registrationData" id="formData">
      <img id="logo" alt="logo placeholder">
      <input type="email" id="email" name="email" placeholder="email" required>
      <input type="password" id="password" name="password" placeholder="password" required>
      <input type="password" id="confirmPassword" name="confirmPassword" placeholder="confirm password" required>
      <input type="button" name="submit" value="register" id="submit">
      <p>Have an account? <a id="switcher">Login here!</a>
    </form>
  </main>
  `
}

const login = () => {
  return `
  <main>
    <img id="svg-image" alt="svg image placeholder"></img>
    <form name="registrationData" id="formData">
      <img id="logo" alt="logo placeholder" required>
      <input type="email" id="email" name="email" placeholder="email" required>
      <input type="password" id="password" name="password" placeholder="password" required>
      <input type="button" name="submit" value="login" id="submit">
      <p>No account yet? <a id="switcher">Register here!</a></p>
    </form>
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

const errorChecking = (form) => {
  // Error codes
  // 1 = Password and Confirm Password are not the same
  // 2 = Password is less than minimum
  // 3 = Email already exists
  let output = {}

  if (form.password != form.confirmPassword) return 1
  if (form.password.length < 5) return 2
  for (let i = 0; i < database.length; i++) {
    if (database[i].email == form.email) return 3
  }
  // Add if email does not end with @*.* return error invalid email

  output["email"] = form.email
  output["password"] = form.password
  return output
}

const errorMessage = (errorCode) => {
  if (errorCode == 1) alert ("Password and confirm password do not match.")
  if (errorCode == 2) alert ("Password should be at least 5 characters.")
  if (errorCode == 3) alert ("Email already exists.")
}

const registrationFunction = (form) => {
  let cleaned = errorChecking(form)
  console.log("The type of cleaned is:", typeof(cleaned))
  if (typeof(cleaned) == "object") save(cleaned)
  else if (typeof(cleaned) == "number") errorMessage(cleaned)
}

const loginFunction = (form) => {
  for (let i = 0; i < database.length; i++) {
    if (database[i].email == form.email) {
      if (database[i].password == form.password) {
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
    else console.log("Invalid email and/or password.")
  }
}


let switchState = 0
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
      let formLength = document.getElementById("formData").elements.length
      let formArray = []
      for (let i = 0; i < formLength; i++) {
        let property = document.getElementById("formData").elements[i].name
        let value = document.getElementById("formData").elements[i].value
        formArray[property] = value
      }
      if (formArray.submit == "register") registrationFunction(formArray)
      if (formArray.submit == "login") loginFunction(formArray)
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