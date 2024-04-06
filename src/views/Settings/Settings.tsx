import React, { useState } from "react";
import Head from "next/head";
import type { NextPage } from "next";
import { Base, Protected } from "../../Components";
import { trpc } from "../../utils/trpc";
import {
  Button,
  Spinner,
  Pane,
  majorScale,
  toaster,
  ConfirmIcon,
} from "evergreen-ui";

const ToggleSwitch: React.FC<{
  label: string;
  checked: boolean;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}> = ({ label, checked, onChange }) => (
  <Pane display="flex" alignItems="center">
    <label className="flex cursor-pointer items-center">
      <div className="relative">
        <input
          type="checkbox"
          className="sr-only"
          checked={checked}
          onChange={onChange}
        />
        <div className="block h-8 w-14 rounded-full bg-gray-600"></div>
        <div className="dot absolute left-1 top-1 h-6 w-6 rounded-full bg-white transition"></div>
      </div>
      <div className="ml-3 font-medium text-gray-700">{label}</div>
    </label>
  </Pane>
);

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

  const updateConsentMutation = trpc.user.updateConsent.useMutation();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const input = {
      ...(agreedToTermsAndCond !== null && { agreedToTermsAndCond }),
      ...(forwardDataThirdParty !== null && { forwardDataThirdParty }),
      ...(subscribeNewsletterEmail !== null && { subscribeNewsletterEmail }),
    };

    await updateConsentMutation.mutateAsync(input);
    toaster.success("Settings updated successfully!");
  };

  if (isLoading) return <Spinner />;

  return (
    <>
      <Head>
        <title>ONE | Settings</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Base title="Settings">
        <Protected redirectTo="/">
          {!isLoading && user && (
            <Pane
              padding={majorScale(3)}
              background="tint2"
              borderRadius={3}
              elevation={1}
            >
              <form onSubmit={handleSubmit} className="space-y-4">
                <ToggleSwitch
                  label="I agree to the Terms and Conditions"
                  checked={!!agreedToTermsAndCond}
                  onChange={(e) => setAgreedToTermsAndCond(e.target.checked)}
                />
                <ToggleSwitch
                  label="Consent to forward data to third parties"
                  checked={!!forwardDataThirdParty}
                  onChange={(e) => setForwardDataThirdParty(e.target.checked)}
                />
                <ToggleSwitch
                  label="Subscribe to newsletter emails"
                  checked={!!subscribeNewsletterEmail}
                  onChange={(e) =>
                    setSubscribeNewsletterEmail(e.target.checked)
                  }
                />
                <Button
                  appearance="primary"
                  intent="success"
                  type="submit"
                  iconAfter={ConfirmIcon}
                  className="mt-5 w-full"
                >
                  Update Settings
                </Button>
              </form>
            </Pane>
          )}
        </Protected>
      </Base>
    </>
  );
};
