import './style.css'
import { register } from './views/register.js'
import { login } from './views/login.js'
import { loggedInPage } from './views/loggedInPage'

const database = []
const save = (form) => {
  form["isloggedin"] = false
  database.push(form)
  console.log("database", database)
}

let emailPattern = new RegExp(/^(("[\w-\s]+")|([\w-]+(?:\.[\w-]+)*)|("[\w-\s]+")([\w-]+(?:\.[\w-]+)*))(@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$)|(@\[?((25[0-5]\.|2[0-4][0-9]\.|1[0-9]{2}\.|[0-9]{1,2}\.))((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\.){2}(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\]?$)/i) // Copy-pasted regex code that somehow works
const errorChecking = (email, password, confirmPassword) => {
  let output = {}

  if (password != confirmPassword) {
    alert("Password and confirm password do not match.")
    return 1
  }
  if (password.length < 5) {
    alert("Password should be at least 5 characters.")
    return 2
  }
  if (!emailPattern.test(email)) {
    alert("Invalid email")
    return 3
  }
  let mapOut
  database.map((account) => {
    if (account.email == email) {
      alert ("Email already exists.")
      mapOut = 4
    }
  })
  if (mapOut == 4) return 4
  output["email"] = email
  output["password"] = password
  return output
}

const registrationFunction = () => {
  let formData = document.getElementsByClassName("form-control")
  let cleaned = errorChecking(formData.email.value, formData.password.value, formData.confirmPassword.value)
  if (typeof(cleaned) != "number") {
    save(cleaned)
    switchState = 0
    main()
  }
}

const loginFunction = () => {
  let formData = document.getElementsByClassName("form-control")
  let email = formData.email.value
  let password = formData.password.value
  database.map((account) => {
    if (account.email == email) {
      if (account.password == password) {
        if (account.isloggedin == true) if (confirm("It seems you have been logged in from another device. Log out from the other device to log in here")) {
          account.isloggedin = false
        } else return
        account.isloggedin = true
        document.getElementById("app").innerHTML = loggedInPage(account.email)
        document.getElementById("logout").onclick = () => {
          switchState = 0
          account.isloggedin = false
          main()
        }
      } else alert("Invalid email and/or password.")
    }
  })
}

let switchState = 1
const main = () => {
    if (switchState == 0) {
      document.getElementById('app').innerHTML = login()
    } else if (switchState == 1) {
      document.getElementById('app').innerHTML = register()
      // register-specific functions
      document.getElementById("check-availability").onclick = () => {
        for (let i = 0; i < database.length; i++) {
          if (formData.email.value == database[i].email) alert("That email is already associated with an account. Please try another.")
          else if (formData.email.value == "") alert("Write something first ffs!")
          else if (!emailPattern.test(formData.email.value)) alert("Invalid email.")
          else alert("Email is available.")
        }
      }
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
}
main()
fetch("save.json")
  .then((res) => res.text())
  .then((text) => {
    text = JSON.parse(text)
    database.push(text)
    console.table(database)
  })
  .catch((e) => console.error(e))