import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, useForm } from '@inertiajs/react';
import { useRef } from 'react';

export default function AddCafe() {

    const fileInput = useRef(null);

    const { data, setData, post, processing, errors } = useForm({
        name: '',
        type: '',
        price_range: '',
        location: '',
        feedback: '',
        image: null,
        amenities: [],
        coffees: [],
        foods: [],
    });


    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setData('image', file);
        }
    };

    const handleCheckboxChange = (category, value) => {
        const currentValues = data[category];
        if (currentValues.includes(value)) {
            setData(category, currentValues.filter(item => item !== value));
        } else {
            setData(category, [...currentValues, value]);
        }
    };

    const submit = (e) => {
        e.preventDefault();
        post(route('cafes.store'), {
            forceFormData: true,
            onSuccess: () => {

            },
        });
    };

    return (
        <AuthenticatedLayout
            header={<h2 className="font-semibold text-xl text-gray-800">Add Cafe</h2>}
        >
            <Head title="Add Cafe" />

            <div className="max-w-2xl mx-auto bg-white p-8 rounded-xl shadow-lg border border-gray-100">
                <div className="mb-8 text-center">
                    <h2 className="text-2xl font-bold text-gray-800">Add New Coffee Shop</h2>
                    <p className="text-gray-500 text-sm">Fill in the details below to list the spot.</p>
                </div>


                <form onSubmit={submit} className="space-y-6">


                    <div className="md:col-span-2 mb-6">
                        <label className="block text-sm font-semibold text-gray-700 mb-1">Upload Cafe Photo</label>
                        <div
                            onClick={() => fileInput.current.click()}
                            className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-lg hover:border-slate-400 hover:bg-slate-50 transition-all cursor-pointer"
                        >
                            <div className="space-y-1 text-center">
                                {data.image && data.image instanceof File ? (
                                    <div className="mb-3">
                                        <img src={URL.createObjectURL(data.image)} className="mx-auto h-32 w-32 object-cover rounded-lg shadow-md" alt="Preview" />
                                        <p className="mt-2 text-xs text-slate-500 font-medium">{data.image.name}</p>
                                    </div>
                                ) : (
                                    <div className="flex flex-col items-center">
                                        <svg className="mx-auto h-12 w-12 text-gray-400" stroke="currentColor" fill="none" viewBox="0 0 48 48">
                                            <path d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                        </svg>
                                        <p className="mt-2 text-sm text-gray-600 font-semibold">Click to upload</p>
                                    </div>
                                )}
                                <input type="file" ref={fileInput} className="hidden" accept="image/*" onChange={handleFileChange} />
                            </div>
                        </div>
                        {errors.image && <div className="text-red-500 text-xs mt-1">{errors.image}</div>}
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-4">
                        <div className="md:col-span-2">
                            <label className="block text-sm font-semibold text-gray-700 mb-1">Coffee Shop Name</label>
                            <input
                                type="text"
                                value={data.name}
                                onChange={e => setData('name', e.target.value)}
                                placeholder="Enter Cafe Name"
                                className="block w-full p-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-slate-500 outline-none"
                                required
                            />
                            {errors.name && <div className="text-red-500 text-xs mt-1">{errors.name}</div>}
                        </div>

                        <div>
                            <label className="block text-sm font-semibold text-gray-700 mb-1">Type</label>
                            <select
                                value={data.type}
                                onChange={e => setData('type', e.target.value)}
                                className="block w-full p-2.5 border border-gray-300 rounded-lg bg-white"
                                required
                            >
                                <option value="">Select Type</option>
                                <option value="Work-Friendly">Work-Friendly</option>
                                <option value="Aesthetic">Aesthetic</option>
                                <option value="Modern">Modern</option>
                                <option value="Meeting-Space">Meeting-Space</option>
                            </select>
                        </div>

                        <div>
                            <label className="block text-sm font-semibold text-gray-700 mb-1">Price Range</label>
                            <select
                                value={data.price_range}
                                onChange={e => setData('price_range', e.target.value)}
                                className="block w-full p-2.5 border border-gray-300 rounded-lg bg-white"
                                required
                            >
                                <option value="">Select Price Range</option>
                                <option value="100-150">100 - 150</option>
                                <option value="150-200">150 - 200</option>
                                <option value="200-300">200 - 300</option>
                                <option value="300+">Above 300</option>
                            </select>
                        </div>

                        <div className="md:col-span-2">
                            <label className="block text-sm font-semibold text-gray-700 mb-1">Location</label>
                            <input
                                type="text"
                                value={data.location}
                                onChange={e => setData('location', e.target.value)}
                                placeholder="Enter Full Address"
                                className="block w-full p-2.5 border border-gray-300 rounded-lg"
                                required
                            />
                        </div>

                        {/* --- AMENITIES --- */}
                        <div className="md:col-span-2">
                            <label className="block text-sm font-semibold text-gray-700 mb-2">Amenities</label>
                            <div className="flex flex-wrap gap-3">
                                {['WiFi', 'Outlets', 'Outdoor Seating', 'Pet Friendly', 'Aircon'].map((item) => (
                                    <label key={item} className={`px-4 py-2 rounded-full border cursor-pointer transition-all ${data.amenities.includes(item) ? 'bg-slate-900 text-white border-slate-900' : 'bg-white text-gray-600 border-gray-300 hover:border-slate-400'}`}>
                                        <input type="checkbox" className="hidden" onChange={() => handleCheckboxChange('amenities', item)} />
                                        {item}
                                    </label>
                                ))}
                            </div>
                        </div>


                        <div className="md:col-span-2">
                            <label className="block text-sm font-semibold text-gray-700 mb-2">Coffee Selection</label>
                            <div className="flex flex-wrap gap-3">
                                {['Espresso', 'Latte', 'Cappuccino', 'Americano', 'Cold Brew', 'Matcha'].map((item) => (
                                    <label key={item} className={`px-4 py-2 rounded-full border cursor-pointer transition-all ${data.coffees.includes(item) ? 'bg-orange-100 border-orange-500 text-orange-700' : 'bg-white text-gray-600 border-gray-300 hover:border-orange-200'}`}>
                                        <input type="checkbox" className="hidden" onChange={() => handleCheckboxChange('coffees', item)} />
                                        {item}
                                    </label>
                                ))}
                            </div>
                        </div>

                        <div className="md:col-span-2">
                            <label className="block text-sm font-semibold text-gray-700 mb-2">Food & Pastries</label>
                            <div className="flex flex-wrap gap-3">
                                {['Croissant', 'Cakes', 'Sandwiches', 'Pasta', 'Cookies'].map((item) => (
                                    <label key={item} className={`px-4 py-2 rounded-full border cursor-pointer transition-all ${data.foods.includes(item) ? 'bg-green-100 border-green-500 text-green-700' : 'bg-white text-gray-600 border-gray-300 hover:border-green-200'}`}>
                                        <input type="checkbox" className="hidden" onChange={() => handleCheckboxChange('foods', item)} />
                                        {item}
                                    </label>
                                ))}
                            </div>
                        </div>

                        <div className="md:col-span-2 mt-4">
                            <label className="block text-sm font-medium text-gray-700">Initial Feedback / Notes</label>
                            <textarea
                                value={data.feedback}
                                onChange={(e) => setData('feedback', e.target.value)}
                                placeholder="Add some initial notes..."
                                className="mt-1 block w-full border-gray-300 rounded-md shadow-sm sm:text-sm"
                                rows="3"
                            />
                        </div>
                    </div>

                    <div className="pt-6 flex items-center justify-end gap-3 border-t border-gray-100">
                        <button type="button" className="px-6 py-2.5 text-sm font-medium text-gray-600 hover:text-gray-900">
                            Cancel
                        </button>
                        <button
                            type="submit"
                            disabled={processing}
                            className="bg-slate-900 text-white px-10 py-2.5 rounded-lg font-bold shadow-md hover:bg-slate-800 active:scale-95 transition-all disabled:opacity-50"
                        >
                            {processing ? 'Saving...' : 'Save Shop'}
                        </button>
                    </div>
                </form>
            </div>
        </AuthenticatedLayout>
    );
}