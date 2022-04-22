import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import { useNavigate } from "react-router-dom";
import styles from "./styles/MessageBubble.module.css";

export default function MessageBubble({ recd, author, content, timestamp }) {
  // const relativeTime = require("dayjs/plugin/relativeTime");
  const navigate = useNavigate();
  dayjs.extend(relativeTime);

  return (
    <li className={styles.MessageBubbleWrapper}>
      <div className={styles.MessageBubbleContainer} recd={recd}>
        <Heading recd={recd}>
          {recd && (
            <ProfileLink
              onClick={(ev) => {
                navigate(`/profile/${author}`);
              }}
            >
              @{author}
            </ProfileLink>
          )}
        </Heading>
        <div style={{ display: "flex", justifyContent: "space-between" }}>
          {recd && <Tip src="/tip-received.svg" recd={recd} />}
          <Body recd={recd}>
            {content}
            <Timestamp>{dayjs(timestamp).format("MMM D, hh:mma")}</Timestamp>
          </Body>
          {!recd && <Tip src="/tip-sent.svg" />}
        </div>
      </div>
    </li>
  );
}

const ProfileLink = styled.div`
  all: inherit;
  cursor: pointer;
  user-select: none;
  &:hover {
    text-decoration: underline;
    text-decoration-color: var(--color-pink);
  }
`;

const Tip = styled.img`
  align-self: flex-end;
  width: 10px;
  margin: ${(props) =>
    props.recd ? "0px 0px -2px -9px" : "0px -9px -2px 0px"};
`;

const Heading = styled.div`
  display: flex;
  align-items: center;
  font-family: Karla;
  font-weight: 800;
  color: #0c211d;
  text-transform: lowercase;
  font-size: 14px;
  border-top-left-radius: 3px;
  border-top-right-radius: 3px;
  padding: ${(props) => (props.recd ? "0px 2px 2px 2px" : "0px 3px")};
`;

const Body = styled.div`
  display: flex;
  word-wrap: break-word;
  font-family: Karla;
  font-weight: 400;
  flex-direction: column;
  height: 100%;
  width: 100%;
  font-size: 16px;
  padding: 3px 7px;
  border-radius: 3px;
  background-color: ${(props) => (props.recd ? "#46494c" : "#343a40")};
  outline: 1px solid var(--color-dark-grey);
`;

const Timestamp = styled.div`
  display: flex;
  font-size: 10px;
  align-self: flex-end;
  color: var(--color-extra-medium-grey);
`;
