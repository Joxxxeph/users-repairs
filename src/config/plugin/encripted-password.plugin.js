import bcrypt from 'bcryptjs'

export const encryptedPassword = (password) => {
  const salt = bcrypt.genSaltSync(12)
  return bcrypt.hashSync(password, salt)
}

export const verifyPassword = (bodyPassword, userPassword) => {
  return bcrypt.compareSync(bodyPassword, userPassword)
}