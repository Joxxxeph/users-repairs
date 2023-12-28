import { AppError } from "../../common/error/appError.js";
import { catchAsync } from "../../common/error/catchAsync.js";
import { verifyPassword } from "../../config/plugin/encripted-password.plugin.js";
import generateJWT from "../../config/plugin/generate-jwt.plugin.js";
import { UserService } from "./user.service.js";
import { validateLogin, validateUser } from "./users.schema.js";


export const login = catchAsync(async(req, res, next) => {
  const { hasError, errorMessages, userData } = validateLogin(req.body)

  if (hasError) {
    return res.status(422).json({
      status: 'error',
      message: 'error de validacion', 
      errorMessages,
    });
  }

  const user = await UserService.findOneMyEmail(userData.email)

  if(!user) {
    return next(new AppError('User not found', 404))
  }

  const iscorrectPassword = await verifyPassword(userData.password, user.password)
  if(!iscorrectPassword){
    return next(new AppError('Invalid credentials', 401))
  }

  const token = await generateJWT(user.id)

  return res.status(200).json({
    token,
    user: {
      id:user.id,
      name: user.name
    }
  })
})

export const findAllUsers = catchAsync(async (req, res) => {
  const users = await UserService.findAll();
  return res.status(200).json(users);
});

export const createUser = catchAsync(async (req, res) => {
  const { hasError, errorMessages, userData } = validateUser(req.body);

  if (hasError) {
    return res.status(422).json({
      status: "error",
      message: errorMessages,
    });
  }

  const user = await UserService.create(userData);
  const token = await generateJWT(user.id);
  return res.status(201).json({
    token,
    user: {
      id: user.id,
      name: user.name,
      email: user.email,
      role: user.role,
    },
  });
});

export const findOneUser = catchAsync( async (req, res) => {
    const { user } = req

    return res.status(200).json(user);

});

export const updateUser = catchAsync(async (req, res) => {
    const { name, email } = req.body;
    const {user} = req;

    const userUpdated = await UserService.update(user, { name, email });

    return res.status(200).json(userUpdated);
});

export const deleteUser = catchAsync( async (req, res) => {

    const { user } = req
    await UserService.delete(user);
    return res.status(204).json(null);
 
});
