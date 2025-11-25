import { use, useState } from "react";
import { useForm } from "react-hook-form";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";
import { MdError } from "react-icons/md";
import { Link, useNavigate } from "react-router";
import { AuthContext } from "../AuthProvider/AuthProvider";
import Swal from "sweetalert2";
import { updateProfile } from "firebase/auth";
import axios from "axios";
import Helmet from "../Helmet/Helmet";

//img upload
const img_hosting_key = import.meta.env.VITE_IMAGE_HOSTING_KEY;
const img_hosting_api = `https://api.imgbb.com/1/upload?key=${img_hosting_key}`;

const Register = () => {
    const [showPassword, setShowPassword] = useState(false);
    const { register, handleSubmit, formState: { errors }, reset } = useForm();
    const { createUser, signInWithGoogle } = use(AuthContext);

    const navigate = useNavigate();

    const onSubmit = async (data) => {
        try {
            const { name, email, password, image } = data;

            // Upload image to ImgBB
            const formData = new FormData();
            formData.append("image", image[0]);

            const imgResponse = await axios.post(img_hosting_api, formData, {
                headers: { "content-type": "multipart/form-data" },
            });

            if (!imgResponse.data.success) {
                throw new Error("Image upload failed");
            }

            const imageUrl = imgResponse.data.data.display_url;

            const result = await createUser(email, password);
            await updateProfile(result.user, {
                displayName: name,
                photoURL: imageUrl,
            });

            Swal.fire("Great!", "Registration successful", "success");
            navigate("/");

            reset();

        } catch (error) {
            console.error("Sign-up error:", error);
            Swal.fire("Oops!", error.message, "error");
        }
    };

    const handleGoogleSignIn = () => {
        signInWithGoogle()
            .then(result => {
                // console.log(result.user);
                Swal.fire("Great!", "Registration successful", "success");
                navigate("/")
            })
            .catch(error => {
                console.log(error)
            })
    }

    return (
        <div className="flex items-center gap-16 my-20 justify-center mb-16 p-5 lg:p-0">
             <Helmet title="Register Page"/>
            <div className="rounded-2xl border-2 border-blue-400 w-full md:w-[500px]">
                <h1 className="text-4xl text-black text-center font-bold my-5">Register</h1>

                <p className="text-sm font-medium text-center my-2">Already Have an Account ? <Link to="/login"><span className="header text-base">Please Login</span></Link></p>

                {/* continue with google */}
                <div className="flex items-center">
                    <div className="flex items-center px-10 md:px-0 md:w-[70%] lg:w-[60%] justify-center mx-auto mt-4 bg-[#F4F4F4] py-2 text-gray-500 hover:text-blue-500 font-semibold shadow-md rounded-3xl hover:scale-105">
                        <button onClick={handleGoogleSignIn} className="cursor-pointer text-base"><FcGoogle className="inline text-2xl mr-2"></FcGoogle>Continue with google</button>
                    </div>
                </div>

                {/* form */}
                <form onSubmit={handleSubmit(onSubmit)} className="card-body px-5 md:px-10 mt-8">
                    <div>
                        <div>
                            <label>
                                <span>Name</span>
                            </label>
                            <div>
                                <input type="text" {...register("name", { required: true })}
                                    name="name" placeholder="your name" className="border-2 px-3 py-2 w-full border-blue-300 rounded-lg my-2 focus:outline-none " />
                                {errors.name && <span className="text-sm text-red-500"><MdError className="mb-0.5 inline" /> Name field is required.</span>}
                            </div>
                        </div>

                        <div>
                            <label>
                                <span>Email</span>
                            </label>
                            <div>
                                <input type="email" {...register("email", { required: true })} name="email" placeholder="your email" className="border-2 px-3 py-2 w-full border-blue-300 rounded-lg my-2 focus:outline-none " />
                                {errors.email && <span className="text-sm text-red-500"><MdError className="mb-0.5 inline" /> Email address is required.</span>}
                            </div>
                        </div>

                        <div>
                            <label>
                                <span>Photo URL</span>
                            </label>
                            <div>
                                <input type="file" {...register("image", { required: true })} name="image" placeholder="your photo url" className="border-2 px-3 py-2 w-full border-blue-300 rounded-lg my-2 focus:outline-none " />
                                {errors.image && <span className="text-sm text-red-500"><MdError className="mb-0.5 inline" /> Image field is required.</span>}
                            </div>
                        </div>

                        <div>
                            <label>
                                <span>Password</span>
                            </label>
                            <div className="relative">
                                <input
                                    type={showPassword ? "text" : "password"}
                                    {...register("password", { required: true, minLength: 6, maxLength: 20, pattern: /^(?=.*[a-z])(?=.*[A-Z]).*$/ })}
                                    name="password" placeholder="Password" className="border-2 px-3 py-2 w-full border-blue-300 rounded-lg my-2 focus:outline-none" />
                                {errors.password?.type === "required" && <p className="text-sm text-red-500"><MdError className="mb-0.5 inline" /> Password is required.</p>}
                                {errors.password?.type === "minLength" && <p className="text-sm text-red-500"><MdError className="mb-0.5 inline" /> Password must be 6 characters.</p>}
                                {errors.password?.type === "maxLength" && <p className="text-sm text-red-500"><MdError className="mb-0.5 inline" /> Password must be less than 20 characters.</p>}
                                {errors.password?.type === "pattern" && <p className="text-sm text-red-500"><MdError className="mb-0.5 inline" /> Password must have one Uppercase and one Lowercase.</p>}

                                <span className="absolute top-5 right-4" onClick={() => setShowPassword(!showPassword)}>
                                    {
                                        showPassword ? <FaEye></FaEye> : <FaEyeSlash></FaEyeSlash>
                                    }
                                </span>
                            </div>
                        </div>
                    </div>

                    <div className="mt-6">
                        <button type="submit" className="cursor-pointer w-full py-2 text-white font-medium rounded-xl mb-8 shadow-lg bg-blue-400 hover:bg-blue-500">Register</button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default Register;