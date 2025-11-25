import { useForm } from "react-hook-form";
import { AuthContext } from "../AuthProvider/AuthProvider";
import { useContext } from "react";
import Swal from "sweetalert2";
import axios from "axios";
import { MdError } from "react-icons/md";

// ImgBB
const img_hosting_key = import.meta.env.VITE_IMAGE_HOSTING_KEY;
const img_hosting_api = `https://api.imgbb.com/1/upload?key=${img_hosting_key}`;

export default function AddListing() {
    const { user } = useContext(AuthContext);
    const { register, handleSubmit, watch, reset, formState: { errors } } = useForm();

    const selectedCategory = watch("category");

    const onSubmit = async (data) => {
        try {
            const { name, category, price, location, description, image, date } = data;

            // Upload Image to ImgBB
            const formData = new FormData();
            formData.append("image", image[0]);

            const imgResponse = await axios.post(img_hosting_api, formData, {
                headers: { "content-type": "multipart/form-data" },
            });

            if (!imgResponse.data.success) {
                throw new Error("Image upload failed");
            }

            const imageUrl = imgResponse.data.data.display_url;

            const listingData = {
                name,
                category,
                price: category === "Pets" ? 0 : parseFloat(price),
                location,
                description,
                image: imageUrl,
                date,
                email: user?.email,
            };

            const res = await axios.post("http://localhost:5000/listings", listingData);

            console.log(res.data);
            Swal.fire("Success!", "Listing added successfully!", "success");
            reset();

        } catch (error) {
            console.error(error);
            Swal.fire("Error", error.message, "error");
        }
    };

    return (
        <div>
            <div className="flex justify-center items-center my-16">
                <div className="rounded-2xl border-2 border-blue-400 w-full md:w-[600px] p-8">
                    <h1 className="text-4xl font-bold text-center mb-5">Add Listing</h1>

                    <form onSubmit={handleSubmit(onSubmit)}>

                        {/* Product/Pet Name */}
                        <div>
                            <label>Pet Name</label>
                            <input
                                type="text"
                                {...register("name", { required: true })}
                                className="border-2 px-3 py-2 w-full border-blue-300 rounded-lg my-2"
                                placeholder="Product or Pet Name"
                            />
                            {errors.name && <span className="text-sm text-red-500"><MdError className="inline" /> Name is required.</span>}
                        </div>

                        {/* Category */}
                        <div>
                            <label>Category</label>
                            <select
                                {...register("category", { required: true })}
                                className="border-2 px-3 py-2 w-full border-blue-300 rounded-lg my-2"
                            >
                                <option value="">Select Category</option>
                                <option value="Pets">Pets</option>
                                <option value="Food">Food</option>
                                <option value="Accessories">Accessories</option>
                                <option value="Care Products">Care Products</option>
                            </select>
                            {errors.category && <span className="text-sm text-red-500"><MdError className="inline" /> Category is required.</span>}
                        </div>

                        {/* Price (Auto 0 if Pets selected) */}
                        <div>
                            <label>Price</label>
                            <input
                                type="number"
                                {...register("price", { required: selectedCategory !== "Pets" })}
                                disabled={selectedCategory === "Pets"}
                                value={selectedCategory === "Pets" ? 0 : undefined}
                                className="border-2 px-3 py-2 w-full border-blue-300 rounded-lg my-2 disabled:bg-gray-100"
                                placeholder="Price"
                            />
                            {errors.price && <span className="text-sm text-red-500"><MdError className="inline" /> Price is required unless category is Pets.</span>}
                        </div>

                        {/* Location */}
                        <div>
                            <label>Location</label>
                            <input
                                type="text"
                                {...register("location", { required: true })}
                                className="border-2 px-3 py-2 w-full border-blue-300 rounded-lg my-2"
                                placeholder="Location"
                            />
                            {errors.location && <span className="text-sm text-red-500"><MdError className="inline" /> Location is required.</span>}
                        </div>

                        {/* Description */}
                        <div>
                            <label>Description</label>
                            <textarea
                                {...register("description", { required: true })}
                                className="border-2 px-3 py-2 w-full border-blue-300 rounded-lg my-2 h-28"
                                placeholder="Write details..."
                            ></textarea>
                            {errors.description && <span className="text-sm text-red-500"><MdError className="inline" /> Description is required.</span>}
                        </div>

                        {/* Image Upload */}
                        <div>
                            <label>Image</label>
                            <input
                                type="file"
                                {...register("image", { required: true })}
                                className="border-2 px-3 py-2 w-full border-blue-300 rounded-lg my-2"
                            />
                            {errors.image && <span className="text-sm text-red-500"><MdError className="inline" /> Image is required.</span>}
                        </div>

                        {/* Pickup Date */}
                        <div>
                            <label>Pick Up Date</label>
                            <input
                                type="date"
                                {...register("date", { required: true })}
                                className="border-2 px-3 py-2 w-full border-blue-300 rounded-lg my-2"
                            />
                            {errors.date && <span className="text-sm text-red-500"><MdError className="inline" /> Date is required.</span>}
                        </div>

                        {/* Email Readonly */}
                        <div>
                            <label>Email</label>
                            <input
                                type="email"
                                value={user?.email}
                                readOnly
                                {...register("email")}
                                className="border-2 px-3 py-2 w-full border-blue-300 rounded-lg my-2 bg-gray-100"
                            />
                        </div>

                        <button
                            type="submit"
                            className="cursor-pointer w-full py-2 mt-5 text-white font-medium rounded-xl shadow-lg bg-blue-400 hover:bg-blue-500"
                        >
                            Add Listing
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
}