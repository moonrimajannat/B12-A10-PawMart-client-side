import { useContext, useEffect, useState } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import { AuthContext } from "../AuthProvider/AuthProvider";

export default function MyListings() {
    const { user } = useContext(AuthContext);
    const [listings, setListings] = useState([]);
    const [selectedItem, setSelectedItem] = useState(null);

    useEffect(() => {
        if (!user?.email) return;

        axios
            .get(`http://localhost:5000/my-listings/${user.email}`)
            .then((res) => setListings(res.data))
            .catch((err) => console.error(err));
    }, [user]);

    // --------------------
    // DELETE LISTING
    // --------------------
    const handleDelete = (id) => {
        Swal.fire({
            title: "Are you sure?",
            text: "This listing will be permanently deleted!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#d33",
            cancelButtonColor: "#3085d6",
            confirmButtonText: "Yes, Delete",
        }).then((result) => {
            if (result.isConfirmed) {
                axios
                    .delete(`http://localhost:5000/listings/${id}`)
                    .then((res) => {
                        if (res.data.deletedCount > 0) {
                            Swal.fire("Deleted!", "Listing has been deleted.", "success");

                            setListings(listings.filter((item) => item._id !== id));
                        }
                    })
                    .catch((err) => console.error(err));
            }
        });
    };

    // UPDATE LISTING
    const handleUpdate = (e) => {
        e.preventDefault();

        const form = e.target;
        const updatedData = {
            name: form.name.value,
            category: form.category.value,
            price: form.price.value,
            location: form.location.value,
            image: form.image.value,
        };

        axios
            .put(`http://localhost:5000/listings/${selectedItem._id}`, updatedData)
            .then((res) => {
                if (res.data.modifiedCount > 0) {
                    Swal.fire("Updated!", "Listing updated successfully.", "success");

                    // Update UI instantly
                    setListings((prev) =>
                        prev.map((item) =>
                            item._id === selectedItem._id
                                ? { ...item, ...updatedData }
                                : item
                        )
                    );

                    setSelectedItem(null);
                }
            })
            .catch((err) => console.error(err));
    };

    return (
        <div className="p-5 lg:p-10">
            <h1 className="text-3xl font-bold mb-6 text-center">My Listings</h1>

            {/* TABLE */}
            <div className="overflow-x-auto">
                <table className="table w-full border">
                    <thead className="bg-blue-100">
                        <tr>
                            <th>Image</th>
                            <th>Name</th>
                            <th>Category</th>
                            <th>Price</th>
                            <th>Location</th>
                            <th>Update</th>
                            <th>Delete</th>
                        </tr>
                    </thead>

                    <tbody>
                        {listings.length > 0 ? (
                            listings.map((item) => (
                                <tr key={item._id} className="border-b">
                                    <td>
                                        <img
                                            src={item.image}
                                            alt={item.name}
                                            className="w-16 h-16 object-cover rounded"
                                        />
                                    </td>
                                    <td>{item.name}</td>
                                    <td>{item.category}</td>
                                    <td>${item.price}</td>
                                    <td>{item.location}</td>

                                    {/* UPDATE BUTTON */}
                                    <td>
                                        <button
                                            onClick={() => setSelectedItem(item)}
                                            className="cursor-pointer bg-green-500 text-white px-3 py-1 rounded"
                                        >
                                            Update
                                        </button>
                                    </td>

                                    {/* DELETE BUTTON */}
                                    <td>
                                        <button
                                            onClick={() => handleDelete(item._id)}
                                            className="cursor-pointer bg-red-500 text-white px-3 py-1 rounded"
                                        >
                                            Delete
                                        </button>
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan="7" className="text-center py-8 text-gray-500">
                                    No listings found.
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>

            {/* ---------------- Modal ---------------- */}
            {selectedItem && (
                <div className="fixed inset-0 bg-black bg-opacity-40 flex justify-center items-center z-50">
                    <div className="bg-white p-6 rounded-lg w-96 shadow-lg">

                        <h2 className="text-xl font-bold mb-4 text-center">
                            Update Listing
                        </h2>

                        <form onSubmit={handleUpdate} className="space-y-3">
                            <input
                                type="text"
                                name="name"
                                defaultValue={selectedItem.name}
                                className="w-full p-2 border rounded"
                                placeholder="Name"
                                required
                            />

                            <input
                                type="text"
                                name="category"
                                defaultValue={selectedItem.category}
                                className="w-full p-2 border rounded"
                                placeholder="Category"
                                required
                            />

                            <input
                                type="number"
                                name="price"
                                defaultValue={selectedItem.price}
                                className="w-full p-2 border rounded"
                                placeholder="Price"
                                required
                            />

                            <input
                                type="text"
                                name="location"
                                defaultValue={selectedItem.location}
                                className="w-full p-2 border rounded"
                                placeholder="Location"
                                required
                            />

                            <input
                                type="text"
                                name="image"
                                defaultValue={selectedItem.image}
                                className="w-full p-2 border rounded"
                                placeholder="Image URL"
                                required
                            />

                            <div className="flex justify-between mt-4">
                                <button
                                    type="button"
                                    onClick={() => setSelectedItem(null)}
                                    className="px-4 py-2 bg-gray-400 text-white rounded"
                                >
                                    Cancel
                                </button>

                                <button
                                    type="submit"
                                    className="cursor-pointer px-4 py-2 bg-blue-600 text-white rounded"
                                >
                                    Save Changes
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
}