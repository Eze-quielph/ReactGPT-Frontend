import { useState } from "react";
import {
  GptMessage,
  MyMessage,
  TextMessagesBox,
  TypingLoader,
} from "../components";

interface Message {
  text: string;
  isGpt: boolean;
}

export const ChatTemplate = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [messages, setmessages] = useState<Message[]>([]);

  const handlePost = async (message: string) => {
    setIsLoading(true);
    setmessages([...messages, { text: message, isGpt: false }]);

    // Todo: use-case

    setIsLoading(false);

    // todo: Add response
  };
  return (
    <div className="chat-container">
      <div className="chat-messages">
        <div className="grid grid-cols-12 gap-y-2">
          <GptMessage text="Hola, proporcioname el texto y te ayudo con la ortografia..." />

          {messages.map((message, index) =>
            message.isGpt ? (
              <GptMessage key={index} text={message.text} />
            ) : (
              <MyMessage key={index} text={message.text} />
            )
          )}
          <MyMessage text="" />
          {isLoading && (
            <div className="col-start-1 col-end-12 fade-in">
              <TypingLoader className="fade-in" />
            </div>
          )}
        </div>
      </div>
      <TextMessagesBox
        onSendMessages={handlePost}
        placeholder="Escribe tu texto aquí"
        disableCorrections={true}
      />
    </div>
  );
};
