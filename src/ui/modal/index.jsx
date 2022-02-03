import { Fragment } from "react";
import { XIcon } from "@heroicons/react/solid";
import { Dialog, Transition } from "@headlessui/react";

export default function Modal({
  children,
  isOpen = false,
  close = () => {},
  title,
}) {
  return (
    <Transition appear show={isOpen} as={Fragment}>
      <Dialog
        as="div"
        className="fixed inset-0 z-10 overflow-y-auto"
        onClose={close}>
        <div className="bg-black opacity-80 fixed inset-0" />
        <div className="min-h-screen px-4 text-center">
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0">
            <Dialog.Overlay className="fixed inset-0" />
          </Transition.Child>

          {/* This element is to trick the browser into centering the modal contents. */}
          <span
            className="inline-block h-screen align-middle"
            aria-hidden="true">
            &#8203;
          </span>
          <Transition.Child
            as={Fragment}
            show={isOpen}
            enter="ease-out duration-300"
            enterFrom="opacity-0 scale-95"
            enterTo="opacity-100 scale-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100 scale-100"
            leaveTo="opacity-0 scale-95">
            <div className="mx-auto w-full md:w-1/3 2xl:w-1/4 inline-block text-white px-6 py-2 overflow-hidden text-left align-middle transition-all transform bg-black-600 shadow-xl rounded-2xl -mt-80">
              <div className="flex items-center">
                <div className="flex-grow">
                  <Dialog.Title
                    as="h2"
                    className="text-xl font-medium leading-6 text-white">
                    {title}
                  </Dialog.Title>
                </div>
                <div>
                  <XIcon className="h-6 w-6" onClick={close} />
                </div>
              </div>
              {children}
            </div>
          </Transition.Child>
        </div>
      </Dialog>
    </Transition>
  );
}
