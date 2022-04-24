// import { fadeIn, RefreshAnim } from "../../../styling/animations";
import dayjs from "dayjs";
import { /*useContext,*/ useEffect, useState } from "react";
import { useWindowWidth } from "@react-hook/window-size";

const PreviewTile = ({
  partnerId,
  threadId,
  message,
  time,
  showAnim,
  setCurrentMessages,
  currentMessages,
}) => {
  const [partner, setPartner] = useState({
    username: "steve",
    avatarUrl:
      "https://robohash.org/#:~:text=https%3A//robohash.org/40.77.167.63.png",
  }); // Chat partner user object just for testing
  const collapseView = useWindowWidth({ wait: 5 }) <= SIZES.widthMin; // If window is less than 500px wide, collapse view
  const relativeTime = require("dayjs/plugin/relativeTime");
  dayjs.extend(relativeTime); // Used to display time in "(x) minutes ago" format

  if (partner && collapseView === false)
    return (
      <TileWrapper showOutline={true}>
        <Heading>
          <Avatar
            src={partner.avatarUrl}
            style={{ width: "20px", height: "20px" }}
          />
          {partner.username}
        </Heading>
        <Body>
          <Text isLoading={showLoadingAnim}>
            {message}
            <Timestamp>{dayjs(time).fromNow()}</Timestamp>
          </Text>
          {showLoadingAnim && (
            <ThreadRefreshBoundary>
              <RefreshAnim />
            </ThreadRefreshBoundary>
          )}
        </Body>
      </TileWrapper>
    );

  // If collapseView is true display mobile sized view
  if (partner && collapseView === true)
    return (
      <TileWrapper
        small={true}
        onClick={(ev) => {
          handleSelectThread(threadId);
        }}
        showOutline={isCurrentlySelected}
      >
        <Avatar src={partner.avatarUrl} />
      </TileWrapper>
    );
};

export default PreviewTile;

const Text = styled.div`
  display: flex;
  flex-direction: column;
  padding: 3px 5px;
  transition: all 0.2s ease;
  opacity: ${(props) => (props.isLoading ? "0%" : "100%")};
`;

const ThreadRefreshBoundary = styled.div`
  position: absolute;
  height: 100%;
  width: 100%;
  border-bottom-left-radius: 5px;
  border-bottom-right-radius: 5px;
  overflow: hidden;
`;

const Avatar = styled.img`
  width: 50px;
  border-radius: 300px;
`;

const TileWrapper = styled.div`
  ${centeredFlexColumn}
  transition: 0.08s all linear;
  width: 100%;
  height: fit-content;
  background-color: var(--color-darkest-grey);
  border-radius: ${(props) => (props.small ? "50px" : "5px")};
  border: ${(props) =>
    props.small
      ? "1.5px solid var(--color-less-dark-grey)"
      : "1px solid var(--color-super-dark-grey)"};
  box-shadow: ${(props) =>
    props.showOutline
      ? "inset 0px 0px 2px var(--color-super-dark-grey), 0px 2px 1px var(--color-pink)"
      : "inset 0px 0px 2px var(--color-super-dark-grey)"};
  &:hover {
    outline: solid 2px var(--color-teal);
  }
  &:active {
    outline: solid 2px var(--color-pink);
  }
  cursor: pointer;
  outline: ${(props) =>
    props.showOutline ? "2px solid var(--color-teal)" : ""};
  animation: ${fadeIn} 0.3s forwards ease;
`;

const Heading = styled.div`
  display: flex;
  align-items: center;
  font-family: Karla;
  font-size: 16px;
  gap: 4px;
  width: 100%;
  padding: 3px 5px;
  background-color: var(--color-almost-darkest-blue);
  border-top-left-radius: 5px;
  border-top-right-radius: 5px;
`;

const Body = styled.div`
  position: relative;
  display: flex;
  justify-content: space-between;
  flex-direction: column;
  width: 100%;
  height: 100%;
  font-size: 14px;
`;

const Timestamp = styled.div`
  align-self: flex-end;
  font-size: 12px;
`;
