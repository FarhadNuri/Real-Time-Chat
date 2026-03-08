import User from "../models/user.model.js";
import bcrypt from "bcryptjs";
import { generateTokens } from "../utils/generateTokens.util.js";

export async function signup(req, res) {
  const { email, fullname, password } = req.body;

  if (!email || !fullname || !password) {
    return res.status(400).json({ message: "Please fill in all fields" });
  }

  try {
    if (password.length < 6) {
      return res.status(400).json({
        message: "Password must be at least 6 characters long",
      });
    }

    const existingUser = await User.findOne({ email });

    if (existingUser) {
      return res.status(400).json({
        message: "Email already in use",
      });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const user = new User({
      email,
      fullname,
      password: hashedPassword,
    });

    await user.save();

    await generateTokens(user._id, res);

    res.status(201).json({
      message: "User created successfully",
      id: user._id,
      email: user.email,
      fullname: user.fullname,
      profilepic: user.profilepic,
    });
  } catch (error) {
    console.error("Error during signup:", error);
    res.status(500).json({
      message: "Internal server error",
    });
  }
}

export async function login(req, res) {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ message: "Please fill in all fields" });
  }
  try {
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(400).json({
        message: "Invalid email or password",
      });
    }
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({
        message: "Invalid email or password",
      });
    }
    generateTokens(user._id, res);

    res.status(200).json({
      message: "Login successful",
      id: user._id,
      email: user.email,
      fullname: user.fullname,
      profilepic: user.profilepic,
    });
  } catch (error) {
    console.error("Error during login:", error);
    res.status(500).json({
      message: "Internal server error",
    });
  }
}

export async function logout(req, res) {
  try {
    res.cookie("jwt", "", { maxAge: 0 });
    res.status(200).json({
      message: "Logout successful",
    });
  } catch (error) {
    console.error("Error during logout:", error);
    res.status(500).json({
      message: "Internal server error",
    });
  }
}