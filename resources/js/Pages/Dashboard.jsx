import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';

export default function Dashboard() {
    return (
        <AuthenticatedLayout
            header={
                <h2 className="text-xl font-semibold leading-tight text-gray-800">
                    Cafe Tracker - Bacoor
                </h2>
            }
        >
            <Head title="Dashboard" />

            {/* <div className="py-12">
                <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
                    <div className="overflow-hidden bg-white shadow-sm sm:rounded-lg">
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                            <div className="bg-white p-6 rounded-lg shadow border-l-4 border-blue-500">
                                <div className="text-gray-500 text-sm font-bold uppercase">Total Users</div>
                                <div className="text-2xl font-bold">1,250</div>
                            </div>
                            <div className="bg-white p-6 rounded-lg shadow border-l-4 border-green-500">
                                <div className="text-gray-500 text-sm font-bold uppercase">Revenue</div>
                                <div className="text-2xl font-bold">$12,300</div>
                            </div>
                            <div className="bg-white p-6 rounded-lg shadow border-l-4 border-purple-500">
                                <div className="text-gray-500 text-sm font-bold uppercase">Active Sessions</div>
                                <div className="text-2xl font-bold">42</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div> */}
        </AuthenticatedLayout>
    );
}
