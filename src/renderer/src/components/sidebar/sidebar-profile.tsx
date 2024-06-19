import { useNavigate } from "react-router-dom";
import { PersonIcon } from "@primer/octicons-react";
import * as styles from "./sidebar-profile.css";

import { useAppSelector, useUserDetails } from "@renderer/hooks";
import { useMemo } from "react";

export function SidebarProfile() {
  const navigate = useNavigate();

  const { userDetails, profileBackground } = useUserDetails();

  const { runningGame } = useAppSelector((state) => state.runningGame);

  const handleButtonClick = () => {
    if (userDetails === null) {
      window.electron.openExternal("https://auth.hydra.losbroxas.org");
      return;
    }

    navigate(`/user/${userDetails!.id}`);
  };

  const profileButtonBackground = useMemo(() => {
    if (profileBackground) return profileBackground;
    return undefined;
  }, [profileBackground]);

  return (
    <button
      type="button"
      className={styles.profileButton}
      style={{ background: profileButtonBackground }}
      onClick={handleButtonClick}
    >
      <div className={styles.profileButtonContent}>
        <div className={styles.profileAvatar}>
          {userDetails?.profileImageUrl ? (
            <img
              className={styles.profileAvatar}
              src={userDetails.profileImageUrl}
              alt={userDetails.displayName}
            />
          ) : (
            <PersonIcon />
          )}
        </div>

        <div className={styles.profileButtonInformation}>
          <p className={styles.profileButtonTitle}>
            {userDetails ? userDetails.displayName : "Sign in"}
          </p>

          {userDetails && runningGame && (
            <div>
              <small>{runningGame.title}</small>
            </div>
          )}
        </div>

        {userDetails && runningGame && (
          <img
            width={24}
            style={{ borderRadius: 4 }}
            src={runningGame.iconUrl}
          />
        )}
      </div>
    </button>
  );
}
