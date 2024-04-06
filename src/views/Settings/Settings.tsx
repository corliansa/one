import React, { useState } from "react";
import Head from "next/head";
import { type NextPage } from "next";
import { Base, Protected } from "../../Components";
import { trpc } from "../../utils/trpc";
import { Button, EditIcon } from "evergreen-ui";

export const Settings: NextPage = () => {
  const { data: user, isLoading } = trpc.user.getUser.useQuery();

  const [agreedToTermsAndCond, setAgreedToTermsAndCond] = useState<
    boolean | null
  >(null);
  const [forwardDataThirdParty, setForwardDataThirdParty] = useState<
    boolean | null
  >(null);
  const [subscribeNewsletterEmail, setSubscribeNewsletterEmail] = useState<
    boolean | null
  >(null);

  // Use the correct path to the mutation based on your userRouter
  const updateConsentMutation = trpc.user.updateConsent.useMutation();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const input = {
      ...(agreedToTermsAndCond !== null && { agreedToTermsAndCond }),
      ...(forwardDataThirdParty !== null && { forwardDataThirdParty }),
      ...(subscribeNewsletterEmail !== null && { subscribeNewsletterEmail }),
    };

    await updateConsentMutation.mutateAsync(input);
  };

  return (
    <>
      <Head>
        <title>ONE | Settings</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Base title="Settings">
        <div className="py-4">
          <Protected redirectTo="/">
            {!isLoading && user && (
              <div className="flex w-full flex-col gap-3 md:flex-row">
                <form onSubmit={handleSubmit}>
                  <label>
                    <input
                      type="checkbox"
                      checked={!!agreedToTermsAndCond}
                      onChange={(e) =>
                        setAgreedToTermsAndCond(e.target.checked)
                      }
                    />
                    I agree to the Terms and Conditions
                  </label>
                  <label>
                    <input
                      type="checkbox"
                      checked={!!forwardDataThirdParty}
                      onChange={(e) =>
                        setForwardDataThirdParty(e.target.checked)
                      }
                    />
                    Consent to forward data to third parties
                  </label>
                  <label>
                    <input
                      type="checkbox"
                      checked={!!subscribeNewsletterEmail}
                      onChange={(e) =>
                        setSubscribeNewsletterEmail(e.target.checked)
                      }
                    />
                    Subscribe to newsletter emails
                  </label>

                  <div className="pt-10">
                    <Button
                      appearance="primary"
                      onClick={() => {
                        window.location.href = "/profile/edit";
                      }}
                      iconAfter={EditIcon}
                      className="w-full p-4"
                    >
                      Update Settings
                    </Button>
                  </div>
                </form>
              </div>
            )}
          </Protected>
        </div>
      </Base>
    </>
  );
};
