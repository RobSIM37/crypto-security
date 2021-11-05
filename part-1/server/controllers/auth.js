const users = []
const encrypt = require('bcryptjs');

module.exports = {
    login: (req, res) => {
      const { username, password } = req.body;
      let found = false;
      let i = 0;

      while (!found && i < users.length) {

        const isPasswordValid = encrypt.compareSync(password, users[i].password)

        if (users[i].username === username && isPasswordValid) {
          found = true
        } else {
          i++;
        }
      }

      if (found) {
        res.status(200).send(users[i])
      } else {
        res.status(400).send("User not found.")
      }
      
    },
    register: (req, res) => {
        const newUser = req.body;
        newUser.password = encrypt.hashSync(newUser.password);
        users.push(req.body)
        res.status(200).send(req.body)
    }
}