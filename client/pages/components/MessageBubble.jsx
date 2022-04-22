import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import styles from "./styles/MessageBubble.module.css";

export default function MessageBubble({
  message: { message, author, recd, timestamp },
}) {
  // const relativeTime = require("dayjs/plugin/relativeTime");
  dayjs.extend(relativeTime);

  if (recd)
    return (
      <li className={styles.MessageBubbleWrapper}>
        <div className={styles.ContainerRecd}>
          <div className={styles.MessageBubbleHeading}>@{author}</div>
          <div className={styles.MessageBubbleSubcontainer}>
            <img className={styles.BubbleTipRecd} src="/tip-received.svg" />
            <div className={styles.MessageBodyRecd}>
              {message}
              <div className={styles.Timestamp}>
                {dayjs(timestamp).format("MMM D, hh:mma")}
              </div>
            </div>
          </div>
        </div>
      </li>
    );

  if (!recd)
    return (
      <li className={styles.MessageBubbleWrapper}>
        <div className={styles.ContainerSent}>
          <div className={styles.MessageBubbleHeading}>@{author}</div>
          <div className={styles.MessageBubbleSubcontainer}>
            <img className={styles.BubbleTipSent} src="/tip-sent.svg" />
            <div className={styles.MessageBodySent}>
              {message}
              <div className={styles.Timestamp}>
                {dayjs(timestamp).format("MMM D, hh:mma")}
              </div>
            </div>
          </div>
        </div>
      </li>
    );
}
