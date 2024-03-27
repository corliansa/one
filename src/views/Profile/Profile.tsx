import { type NextPage } from "next";
import Head from "next/head";
import { Base, Protected } from "../../Components";
import { trpc } from "../../utils/trpc";
import { UpdateProfileForm } from "./UpdateForm";
import { UserInfo } from "../../Components/UserInfo";
import { Dialog, Transition } from "@headlessui/react";
import { useState, Fragment } from "react";
import { Button, EditIcon } from "evergreen-ui";

export const Profile: NextPage = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { data: user, isLoading } = trpc.user.getUser.useQuery();

  return (
    <>
      <Head>
        <title>ONE | Profile</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Base title="Profile">
        <div className="py-4">
          <Protected redirectTo="/">
            {!isLoading && user && (
              <div className="flex flex-col justify-center gap-3">
                <UserInfo user={user} />
                <Button
                  onClick={() => setIsOpen(true)}
                  className="bg-black"
                  iconAfter={EditIcon}
                  appearance="primary"
                >
                  Edit Profile
                </Button>

                <Transition appear show={isOpen} as={Fragment}>
                  <Dialog
                    as="div"
                    className="relative z-10"
                    onClose={() => setIsOpen(false)}
                  >
                    <Transition.Child
                      as={Fragment}
                      enter="ease-out duration-300"
                      enterFrom="opacity-0"
                      enterTo="opacity-100"
                      leave="ease-in duration-200"
                      leaveFrom="opacity-100"
                      leaveTo="opacity-0"
                    >
                      <div className="fixed inset-0 bg-black/25" />
                    </Transition.Child>

                    <div className="fixed inset-0 overflow-y-auto">
                      <div className="flex min-h-full items-center justify-center p-4 text-center">
                        <Transition.Child
                          as={Fragment}
                          enter="ease-out duration-300"
                          enterFrom="opacity-0 scale-95"
                          enterTo="opacity-100 scale-100"
                          leave="ease-in duration-200"
                          leaveFrom="opacity-100 scale-100"
                          leaveTo="opacity-0 scale-95"
                        >
                          <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                            <Dialog.Title
                              as="h3"
                              className="mb-10 text-lg font-medium leading-6 text-gray-900"
                            >
                              Update Profile
                            </Dialog.Title>
                            <UpdateProfileForm
                              user={user}
                              closeOnClick={() => setIsOpen(false)}
                            />
                          </Dialog.Panel>
                        </Transition.Child>
                      </div>
                    </div>
                  </Dialog>
                </Transition>
              </div>
            )}
          </Protected>
        </div>
      </Base>
    </>
  );
};
