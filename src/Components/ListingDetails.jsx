import Helmet from "../Helmet/Helmet";
import { useEffect, useState, useContext } from "react";
import { useParams } from "react-router";
import axios from "axios";
import Swal from "sweetalert2";
import { AuthContext } from "../AuthProvider/AuthProvider";
import { useForm } from "react-hook-form";

const Listingdetails = () => {
    const { id } = useParams();
    const { user } = useContext(AuthContext);
    const [listing, setListing] = useState(null);
    const [modalOpen, setModalOpen] = useState(false);

    const { register, handleSubmit, reset } = useForm();

    // Fetch listing by ID
    useEffect(() => {
        const fetchListing = async () => {
            try {
                const res = await axios.get(`https://b12-a10-paw-mart-server-side.vercel.app/listings/${id}`);
                setListing(res.data);
            } catch (error) {
                console.error(error);
            }
        };
        fetchListing();
    }, [id]);

    console.log(listing);


    // Order form submission
    const onSubmit = async (data) => {
        try {
            const orderData = {
                buyerName: user.displayName,
                buyerEmail: user.email,
                listingId: listing._id,
                listingName: listing.name,
                quantity: listing.category === "Pets" ? 1 : data.quantity,
                price: listing.price,
                address: data.address,
                date: data.date,
                phone: data.phone,
                notes: data.notes,
            };

            await axios.post("https://b12-a10-paw-mart-server-side.vercel.app/orders", orderData);

            Swal.fire("Success!", "Order placed successfully!", "success");
            reset();
            setModalOpen(false);
        } catch (error) {
            console.error(error);
            Swal.fire("Error", "Failed to place order", "error");
        }
    };

    if (!listing) return <p className="text-center mt-20">Loading...</p>;

    return (
        <div className="min-h-screen p-5 bg-gray-50">
            <Helmet title="Listing Details Page" />

            <div className="max-w-4xl mx-auto bg-white rounded-2xl shadow-lg overflow-hidden">
                <img
                    src={listing.image}
                    alt={listing.name}
                    className="w-full h-96 object-cover"
                />
                <div className="p-6">
                    <h1 className="text-3xl font-bold mb-2">{listing.name}</h1>
                    <p className="text-gray-500 mb-1">Category: {listing.category}</p>
                    <p className="text-gray-500 mb-1">Owner: {listing.email}</p>
                    <p className="text-gray-500 mb-1">Location: {listing.location}</p>
                    <p className="text-gray-500 mb-1">Price: ${listing.price}</p>
                    <p className="text-gray-700 mt-4">{listing.description}</p>

                    <button
                        onClick={() => setModalOpen(true)}
                        className="mt-6 px-6 py-2 bg-blue-400 hover:bg-blue-500 text-white font-semibold rounded-xl shadow-md"
                    >
                        Adopt / Order Now
                    </button>
                </div>
            </div>

            {/* Order Modal */}
            {modalOpen && (
                <div className="fixed inset-0 bg-black bg-opacity-40 flex justify-center items-center z-50">
                    <div className="bg-white rounded-2xl shadow-lg p-8 w-full max-w-md relative">
                        <h2 className="text-2xl font-bold mb-4">Place Your Order</h2>
                        <button
                            onClick={() => setModalOpen(false)}
                            className="absolute top-4 right-4 text-gray-500 hover:text-gray-700"
                        >
                            ✕
                        </button>
                        <form onSubmit={handleSubmit(onSubmit)} className="space-y-3">
                            {/* Buyer Name */}
                            <input
                                type="text"
                                value={user.displayName}
                                readOnly
                                {...register("buyerName")}
                                className="w-full px-3 py-2 border rounded-lg bg-gray-100"
                            />
                            {/* Email */}
                            <input
                                type="email"
                                value={user.email}
                                readOnly
                                {...register("buyerEmail")}
                                className="w-full px-3 py-2 border rounded-lg bg-gray-100"
                            />
                            {/* Listing ID */}
                            <input
                                type="text"
                                value={listing._id}
                                readOnly
                                {...register("listingId")}
                                className="w-full px-3 py-2 border rounded-lg bg-gray-100"
                            />
                            {/* Listing Name */}
                            <input
                                type="text"
                                value={listing.name}
                                readOnly
                                {...register("listingName")}
                                className="w-full px-3 py-2 border rounded-lg bg-gray-100"
                            />
                            {/* Quantity */}
                            {listing.category !== "Pets" && (
                                <input
                                    type="number"
                                    {...register("quantity", { required: true, min: 1 })}
                                    placeholder="Quantity"
                                    className="w-full px-3 py-2 border rounded-lg"
                                />
                            )}
                            {/* Price */}
                            <input
                                type="number"
                                value={listing.price}
                                readOnly
                                {...register("price")}
                                className="w-full px-3 py-2 border rounded-lg bg-gray-100"
                            />
                            {/* Address */}
                            <input
                                type="text"
                                {...register("address", { required: true })}
                                placeholder="Address"
                                className="w-full px-3 py-2 border rounded-lg"
                            />
                            {/* Date */}
                            <input
                                type="date"
                                {...register("date", { required: true })}
                                className="w-full px-3 py-2 border rounded-lg"
                            />
                            {/* Phone */}
                            <input
                                type="tel"
                                {...register("phone", { required: true })}
                                placeholder="Phone Number"
                                className="w-full px-3 py-2 border rounded-lg"
                            />
                            {/* Additional Notes */}
                            <textarea
                                {...register("notes")}
                                placeholder="Additional Notes"
                                className="w-full px-3 py-2 border rounded-lg"
                            ></textarea>

                            <button
                                type="submit"
                                className="w-full py-2 mt-2 bg-blue-400 hover:bg-blue-500 text-white font-semibold rounded-lg"
                            >
                                Place Order
                            </button>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Listingdetails;
