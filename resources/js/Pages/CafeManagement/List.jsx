import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link, router } from '@inertiajs/react';

export default function List({ auth, cafes = [] }) {

    const handleDelete = (id) => {
        if (confirm('Are you sure you want to delete this cafe?')) {
            router.delete(route('cafes.destroy', id));
        }
    };

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={
                <h2 className="font-black text-2xl text-slate-800 tracking-tight">
                    List of Cafe in Bacoor
                </h2>
            }
        >
            <Head title="Cafe List" />

            <div className="py-12 bg-slate-50/50 min-h-screen">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    {/* Table Container */}
                    <div className="bg-white shadow-md ring-1 ring-slate-200 sm:rounded-3xl overflow-hidden">
                        <table className="w-full text-left border-separate border-spacing-0">
                            <thead>
                                <tr className="bg-slate-50/80">
                                    <th className="px-8 py-6 text-[13px] font-bold text-slate-500 uppercase tracking-widest">Preview</th>
                                    <th className="px-8 py-6 text-[13px] font-bold text-slate-500 uppercase tracking-widest">Cafe Identity</th>
                                    <th className="px-8 py-6 text-[13px] font-bold text-slate-500 uppercase tracking-widest">Location</th>
                                    <th className="px-8 py-6 text-[13px] font-bold text-slate-500 uppercase tracking-widest text-center">Amenities</th>
                                    <th className="px-8 py-6 text-[13px] font-bold text-slate-500 uppercase tracking-widest text-right">Actions</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-slate-100">
                                {cafes.map((cafe) => {
                                    const amenities = typeof cafe.amenities === 'string' ? JSON.parse(cafe.amenities) : (cafe.amenities || []);

                                    return (
                                        <tr key={cafe.id} className="hover:bg-slate-50/50 transition-all group">
                                            {/* 1. Larger Image (h-20 instead of h-14) */}
                                            <td className="px-8 py-8">
                                                <img
                                                    className="h-20 w-20 rounded-2xl object-cover ring-4 ring-slate-100 group-hover:ring-white transition-all shadow-md"
                                                    src={cafe.image ? `/storage/${cafe.image}` : `https://ui-avatars.com/api/?name=${cafe.name}`}
                                                    alt={cafe.name}
                                                    onError={(e) => { e.target.src = 'https://placehold.co/80x80?text=Error'; }}
                                                />
                                            </td>

                                            {/* 2. Bigger Text for Name (text-lg) and Type */}
                                            <td className="px-8 py-8">
                                                <div className="text-lg font-black text-slate-900 leading-tight mb-1">{cafe.name}</div>
                                                <div className="text-xs text-indigo-600 font-bold uppercase tracking-wider">{cafe.type}</div>
                                            </td>

                                            {/* 3. Roomier Location text */}
                                            <td className="px-8 py-8">
                                                <div className="flex items-center text-base text-slate-600 font-semibold">
                                                    <svg className="mr-3 h-5 w-5 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                                                    </svg>
                                                    {cafe.location}
                                                </div>
                                            </td>

                                            {/* 4. More prominent Tags (text-xs and px-3) */}
                                            <td className="px-8 py-8">
                                                <div className="flex flex-wrap justify-center gap-2 max-w-[280px] mx-auto">
                                                    {amenities.map((amenity, i) => (
                                                        <span key={i} className="inline-flex items-center px-3 py-1.5 rounded-lg text-xs font-bold bg-slate-100 text-slate-700 border border-slate-200">
                                                            {amenity}
                                                        </span>
                                                    ))}
                                                </div>
                                            </td>

                                            {/* 5. Clearer Action Buttons */}
                                            <td className="px-8 py-8 text-right space-x-6">
                                                <Link
                                                    href={route('cafes.edit', cafe.id)}
                                                    className="text-sm font-black text-slate-400 hover:text-indigo-600 transition-colors uppercase tracking-widest"
                                                >
                                                    Edit
                                                </Link>
                                                <button
                                                    onClick={() => handleDelete(cafe.id)}
                                                    className="text-sm font-black text-rose-400 hover:text-rose-600 transition-colors uppercase tracking-widest"
                                                >
                                                    Delete
                                                </button>
                                            </td>
                                        </tr>
                                    );
                                })}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}