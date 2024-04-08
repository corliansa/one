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
  Switch,
  ConfirmIcon,
} from "evergreen-ui";

const ToggleSwitch: React.FC<{
  label: string;
  checked: boolean;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}> = ({ label, checked, onChange }) => (
  <Pane display="flex" alignItems="center" marginBottom={16}>
    <Switch checked={checked} onChange={onChange} marginRight={16} />
    <div className="font-medium text-gray-700">{label}</div>
  </Pane>
);

export const Settings: NextPage = () => {
  const { data: user, isLoading: isLoadingUser } = trpc.user.getUser.useQuery();
  const [isLoadingUpdate, setIsLoadingUpdate] = useState(false);

  const [agreedToTermsAndCond, setAgreedToTermsAndCond] = useState<boolean>(
    user?.agreedToTermsAndCond ?? true,
  );
  const [forwardDataThirdParty, setForwardDataThirdParty] = useState<boolean>(
    user?.forwardDataThirdParty ?? false,
  );
  const [subscribeNewsletterEmail, setSubscribeNewsletterEmail] =
    useState<boolean>(user?.subscribeNewsletterEmail ?? false);

  const updateConsentMutation = trpc.user.updateConsent.useMutation();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoadingUpdate(true);

    await updateConsentMutation.mutateAsync(
      {
        agreedToTermsAndCond,
        forwardDataThirdParty,
        subscribeNewsletterEmail,
      },
      {
        onSuccess: () => {
          toaster.success("Settings updated successfully!");
          setIsLoadingUpdate(false);
        },
        onError: (error) => {
          console.error("Failed to update settings:", error);
          toaster.danger("Failed to update settings. Please try again.");
          setIsLoadingUpdate(false);
        },
      },
    );
  };

  if (isLoadingUser) return <Spinner />;

  return (
    <>
      <Head>
        <title>ONE | Settings</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Base title="Settings">
        <Protected redirectTo="/">
          {!isLoadingUser && user && (
            <div
              className="settings-container"
              style={{ maxWidth: "800px", margin: "0 auto" }}
            >
              <Pane
                padding={majorScale(3)}
                background="#F1F2F6"
                borderRadius={8}
                elevation={1}
              >
                <form onSubmit={handleSubmit} className="space-y-4">
                  <ToggleSwitch
                    label="I agree to the Terms and Conditions"
                    checked={agreedToTermsAndCond}
                    onChange={(e) => setAgreedToTermsAndCond(e.target.checked)}
                  />
                  <ToggleSwitch
                    label="Consent to forward data to third parties"
                    checked={forwardDataThirdParty}
                    onChange={(e) => setForwardDataThirdParty(e.target.checked)}
                  />
                  <ToggleSwitch
                    label="Subscribe to newsletter emails"
                    checked={subscribeNewsletterEmail}
                    onChange={(e) =>
                      setSubscribeNewsletterEmail(e.target.checked)
                    }
                  />
                  <Button
                    appearance="primary"
                    intent="success"
                    type="submit"
                    iconAfter={ConfirmIcon}
                    className="mt-5 w-full p-4 md:w-1/3"
                    isLoading={isLoadingUpdate}
                  >
                    Update Settings
                  </Button>
                </form>
              </Pane>
            </div>
          )}
        </Protected>
      </Base>
    </>
  );
};
