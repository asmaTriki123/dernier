/* This example requires Tailwind CSS v2.0+ */
import {Fragment, useRef, useState} from "react";
import {Dialog, Transition} from "@headlessui/react";
import {ExclamationIcon} from "@heroicons/react/outline";

export default function AddUser(props) {
    const [open, setOpen] = useState(false);
    const [business, setBusiness] = useState(false)
    const cancelButtonRef = useRef(null);

    return (
        <div>
            <button className="lg:absolute right-32 p-2 text-xs font-bold bg-green-400 rounded-xl top-5"
                onClick={
                    () => {
                        setOpen(true);
                    }
            }>
                Add new +
            </button>
            <Transition.Root show={open}
                as={Fragment}>
                <Dialog as="div" className="fixed z-10 inset-0 overflow-y-auto"
                    initialFocus={cancelButtonRef}
                    onClose={setOpen}>
                    <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
                        <Transition.Child as={Fragment}
                            enter="ease-out duration-300"
                            enterFrom="opacity-0"
                            enterTo="opacity-100"
                            leave="ease-in duration-200"
                            leaveFrom="opacity-100"
                            leaveTo="opacity-0">
                            <Dialog.Overlay className="fixed inset-0 bg-gray-500 bg-opacity-80 transition-opacity"/>
                        </Transition.Child>

                        {/* This element is to trick the browser into centering the modal contents. */}
                        <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">
                            &#8203;
                        </span>
                        <Transition.Child as={Fragment}
                            enter="ease-out duration-300"
                            enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                            enterTo="opacity-100 translate-y-0 sm:scale-100"
                            leave="ease-in duration-200"
                            leaveFrom="opacity-100 translate-y-0 sm:scale-100"
                            leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95">
                            <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
                                <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                                    <div className="sm:flex sm:items-start">
                                        <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                                            <Dialog.Title as="h3" className="text-lg leading-6 font-medium text-gray-900">
                                                Add user
                                            </Dialog.Title>
                                            <div className="mt-5 flex flex-col gap-3">
                                                <p className="text-sm text-gray-700 grid grid-cols-2 ">
                                                    <b className="">Username</b>
                                                    <input type="text" className="p-2 rounded-full bg-gray-100 float-right text-gray-900"/>
                                                </p>
                                                <p className="text-sm text-gray-700 grid grid-cols-2 ">
                                                    <b className="">Email</b>
                                                    <input type="text" className="p-2 rounded-full bg-gray-100 float-right text-gray-900"/>
                                                </p>
                                                <p className="text-sm text-gray-700 grid grid-cols-2 ">
                                                    <b className="">Password</b>
                                                    <input type="text" className="p-2 rounded-full bg-gray-100 float-right text-gray-900"/>
                                                </p>
                                                <p className="text-sm text-gray-700 grid grid-cols-2 ">
                                                    <b>Phone :</b>
                                                    <input type="text" className="p-2 rounded-full bg-gray-100 float-right text-gray-900"/>
                                                </p>
                                                <p className="text-sm text-gray-700 grid grid-cols-2 ">
                                                    <b>Type :</b>
                                                    <div className="flex gap-x-3">
                                                        <label>
                                                            Individual
                                                            <input type="checkbox" value="Individual"
                                                                  className="ml-1"
                                                                onClick={
                                                                    () => {
                                                                        setBusiness(!business)
                                                                    }
                                                                }
                                                                checked={
                                                                    !business
                                                                }/>
                                                        </label>
                                                    <label>
                                                        Business
                                                        <input type="checkbox" value="Business"
                                                              className="ml-1"
                                                            onClick={
                                                                () => {
                                                                    setBusiness(!business)
                                                                }
                                                            }
                                                            checked={business}/>
                                                    </label>
                                            </div>
                                        </p>
                                        {
                                        business ? (
                                            <div>
                                                <p className="text-sm text-gray-700 grid grid-cols-2 mt-1 mb-3">
                                                    <b className="mt-1.5">Company name</b>
                                                    <input type="text" className="p-2 rounded-full bg-gray-100 float-right text-gray-900"/>
                                                </p>
                                                <p className="text-sm text-gray-700 grid grid-cols-2 ">
                                                    <b className="">M/F</b>
                                                    <input type="text" className="p-2 rounded-full bg-gray-100 float-right text-gray-900"/>
                                                </p>
                                            </div>

                                        ) : ""
                                    }
                                        <p className="text-sm text-gray-700 grid grid-cols-2 ">
                                            <b>Date joined :</b>
                                            <input type="text" placeholder="Auto generated" disabled className="p-2 rounded-full bg-gray-300 float-right text-gray-900 cursor-not-allowed"/>
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
                            <button type="button" className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-green-600 text-base font-medium text-white hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 sm:ml-3 sm:w-auto sm:text-sm"
                                onClick={
                                    () => setOpen(false)
                            }>
                                Edit
                            </button>
                            <button type="button" className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
                                onClick={
                                    () => setOpen(false)
                                }
                                ref={cancelButtonRef}>
                                Cancel
                            </button>
                        </div>
                    </div>
                </Transition.Child>
            </div>
        </Dialog>
    </Transition.Root>
</div>
    );
}
